import { FenXApi } from "../../services/axios/AxiosClient";
import { DataGroupDto, DataGroupVersionDto, VersionStatus } from "../../services/Clients/PolicyQueryClient";

export class DataGroupManager {
    fenXClient = FenXApi.getInstance();
    dataGroupString = "fen_dataGroups";


    private getDataGroups = async () => {
        return this.fenXClient.getDataGroups(false).then((response) => {
            window.sessionStorage.setItem(this.dataGroupString, JSON.stringify(response));
        }).catch(() => { console.log("Error retrieving data groups.") });
    }

    async init() {
        if (!window.sessionStorage.getItem(this.dataGroupString)) await this.getDataGroups();
    }

    getDataGroupByName = async (name: string) => {
        let dataGroupString = window.sessionStorage.getItem(this.dataGroupString);
        if (!dataGroupString) await this.getDataGroups().then(() => { dataGroupString = window.sessionStorage.getItem(this.dataGroupString); });

        const dataGroups = JSON.parse(dataGroupString!) as DataGroupDto[];
        let dataGroup = {} as DataGroupVersionDto;
        dataGroups.forEach((dg) => {
            let versions = dg.versions!.sort((l1, l2) => l2.versionNumber! - l1.versionNumber!);
            let latestVersion = versions.filter((l) => { return l.status === VersionStatus.Published; })
            if (!latestVersion.length) latestVersion = versions;
            if(latestVersion[0].name === name) {
                dataGroup = latestVersion[0];            
                return dataGroup;
            }
        });
        
        return Object.entries(dataGroup) ? dataGroup : null;
    }

    getDataGroupById = async (id: string) => {
        let dataGroupString = window.sessionStorage.getItem(this.dataGroupString);
        if (!dataGroupString) await this.getDataGroups().then(() => { dataGroupString = window.sessionStorage.getItem(this.dataGroupString); });

        const dataGroups = JSON.parse(dataGroupString!) as DataGroupDto[];
        const dataGroup = dataGroups.filter((dg) => { return dg.id === id});
        if (!dataGroup?.length || !dataGroup[0].versions) return null;
        let versions = dataGroup[0].versions!.sort((l1, l2) => l2.versionNumber! - l1.versionNumber!);
        let latestVersion = versions.filter((l) => { return l.status === VersionStatus.Published; })
        if (!latestVersion.length) latestVersion = versions;

        return (latestVersion.length) ? latestVersion[0] : null;
    }
}