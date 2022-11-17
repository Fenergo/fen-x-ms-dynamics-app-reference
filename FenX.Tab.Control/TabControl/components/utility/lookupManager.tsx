import { reject } from "lodash";
import { FenXApi } from "../../services/axios/AxiosClient";
import { LookupDto, LookupLinkDto, LookupLinkVersionDto, LookupVersionDto, VersionStatus } from "../../services/Clients/LookupQueryClient";
import { Notification } from "../utility/notification";

export class LookupManager {

    fenXClient = FenXApi.getInstance();
    lookupString = "fen_lookups";
    linkLookupString = "fen_linkLookups";

    private getLookups = async () => {
        return this.fenXClient.getAllLookupsLite().then((response) => {
            window.sessionStorage.setItem(this.lookupString, JSON.stringify(response.data));
        });
    }

    private getLinkLookups = async () => {
        return this.fenXClient.getAllLinkLookupsLite().then((response) => {
            window.sessionStorage.setItem(this.linkLookupString, JSON.stringify(response.data));
        });
    }

    async init() {
        if (!window.sessionStorage.getItem(this.lookupString)) await this.getLookups().catch((error) => Notification.showError("Error retrieving lookups.", error));

        if (!window.sessionStorage.getItem(this.linkLookupString)) await this.getLinkLookups().catch((error) => Notification.showError("Error retrieving link lookups.", error));
    }

    async getLookupIdByName(name: string): Promise<string | null> {
        let lookupsString = window.sessionStorage.getItem(this.lookupString);
        if (!lookupsString) await this.getLookups().then(() => { lookupsString = window.sessionStorage.getItem(this.lookupString); });

        const lookups = JSON.parse(lookupsString!) as LookupDto[];

        let lookup = lookups.filter((item) => {
            let isFound = false;
            item.versions?.forEach((version) => {
                if(version.lookupName === name) isFound = true;
            });
            return isFound;
        });

        if (!lookup?.length || !lookup[0].versions) return null;
        return (!lookup?.length || !lookup[0].versions) ? null : lookup[0].id!;
    }

    async getLookup(id: string): Promise<LookupVersionDto | null> {
        let lookupsString = window.sessionStorage.getItem(this.lookupString);
        
        if (!lookupsString) await this.getLookups()
            .then(() => { lookupsString = window.sessionStorage.getItem(this.lookupString); })
            .catch((error) => {{ return Promise.reject(error); } });

        const lookups = JSON.parse(lookupsString!) as LookupDto[];
        const lookup = lookups.filter((item) => { return item.id === id;});

        // resolve versions
        if (!lookup?.length || !lookup[0].versions) return null;
        let versions = lookup[0].versions!.sort((l1, l2) => l2.versionNumber! - l1.versionNumber!); // decending order
        let latestVersion = versions.filter((l) => { return l.status === VersionStatus.Published; }) // remove unpublished
        if (!latestVersion.length) latestVersion = versions; // set to draft version if needed
        const latestVersionLite = (latestVersion.length) ? latestVersion[0] : null;
        
        // if lookup values already present, return
        if (!latestVersionLite) return null;
        if (latestVersionLite?.values) return latestVersionLite;

        // otherwise retrieve lookup values
        const versionNumber =  latestVersionLite?.versionNumber as number;
        let latestVersionWithValues;
        await this.fenXClient.getLookupVersionById(id, versionNumber).then((response) => {
            latestVersionWithValues = response;
        }).catch(() => { 
            console.log("Error retrieving lookup."); 
            latestVersionWithValues = null;
        });
        if (!latestVersionWithValues) return null;
        
        // update cache
        this.updateCache(id, latestVersionWithValues, versionNumber, this.lookupString);
        
        // return latest version with values
        return latestVersionWithValues;
    }

    async getLinkLookup(id: string): Promise<LookupLinkVersionDto | null> {
        let linkLookupsString = window.sessionStorage.getItem(this.linkLookupString);
        
        if (!linkLookupsString) await this.getLinkLookups()
            .then(() => { linkLookupsString = window.sessionStorage.getItem(this.linkLookupString); })
            .catch((error) => { return Promise.reject(error) });

        const linkLookups = JSON.parse(linkLookupsString!) as LookupLinkDto[];
        const linkLookup = linkLookups.filter((ll) => { return ll.id === id });

        if (linkLookup?.length) {
            const ll = linkLookup[0];
            let versions = ll.versions!.sort((l1, l2) => l2.versionNumber! - l1.versionNumber!);
            let latestVersion = versions.filter((l) => { return l.status === VersionStatus.Published; })
            if (!latestVersion.length) latestVersion = versions;
            const latestVersionLite = (latestVersion.length) ? latestVersion[0] : null;
        
            // if lookup values already present, return
            if (!latestVersionLite) return null;
            if (latestVersionLite?.properties) return latestVersionLite;
    
            // otherwise retrieve link lookup properties
            const versionNumber =  latestVersionLite?.versionNumber as number;
            let latestVersionWithProperties; 
            await this.fenXClient.getLinkLookupVersionById(id, versionNumber).then((response) => {
                latestVersionWithProperties = response;
            }).catch(() => { 
                console.log("Error retrieving link lookup."); 
                latestVersionWithProperties = null;
            });
            if (!latestVersionWithProperties) return null;
            
            // update cache
            this.updateCache(id, latestVersionWithProperties, versionNumber, this.linkLookupString);
            
            // return latest version with properties
            return latestVersionWithProperties;
        }
        
        return null;
    }
    
    updateCache = (id: string, latestVersion: any, versionNumber: number, lookupString: string) => {
        // retrieve lookups or linklookups
        const updatedLookups: LookupDto[] = JSON.parse(window.sessionStorage.getItem(lookupString)!);
        // find index of relevant lookup
        const lookupIdx: number = updatedLookups.findIndex(item => item.id === id);
        // find version index
        const versionIdx: number = updatedLookups[lookupIdx].versions!.findIndex(item => item.versionNumber === versionNumber);
        // update with values now populated
        updatedLookups[lookupIdx].versions![versionIdx] = latestVersion;
        // set updated cache
        window.sessionStorage.setItem(lookupString, JSON.stringify(updatedLookups));
    }
}