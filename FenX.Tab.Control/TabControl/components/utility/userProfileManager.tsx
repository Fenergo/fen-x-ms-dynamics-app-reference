import { FenXApi } from "../../services/axios/AxiosClient";
import { AccessLayerDataTypeDto, AccessLayerTypeDto, UserAccessLayerDto, UserAuthorizationProfileDto, UserProfileTeamDto } from "../../services/Clients/AuthorizationQueryClient";
import { AccessLayerDto as JourneyAccessLayerDto } from "../../services/Clients/JourneyQueryClient";
import { Notification } from "../utility/notification";

export type AccessLevel = "Full Access" | "Partial Access" | "No Access";

export class UserProfileManager {

    fenXClient = FenXApi.getInstance();
    userProfileString = "fen_user_profile";
    isTokenExchange = window.sessionStorage.getItem("enable_token_exchange") == "true";

    private getCurrentUserAuthorizationProfile = async () => {
        if (this.isTokenExchange) {
            // token exchange profile
            const userProfile = await this.fenXClient.getCurrentUserAuthProfile().catch((error) => { 
                Notification.showError("Error retrieving user authorization profile.", error); 
                return undefined;
            });
            const tenantAccessLayers = await this.fenXClient.getAllAccessLayers().catch((error) => { 
                Notification.showError("Error retrieving tenant access layers.", error) 
            });
            
            if (!tenantAccessLayers || !userProfile) return;
    
            // update user profile with correct details (getCurrentUserAuthProfile returns null for the below)
            userProfile?.accessLayers?.forEach((accessLayer, idx) => {
                const accessLayerDetails = tenantAccessLayers.filter(item => item.id === accessLayer.id)[0];
                if (!userProfile.accessLayers![idx].dataKey) userProfile.accessLayers![idx].dataKey = accessLayerDetails.dataKey;
                if (!userProfile.accessLayers![idx].dataType) userProfile.accessLayers![idx].dataType = accessLayerDetails.dataType;
                if (!userProfile.accessLayers![idx].label) userProfile.accessLayers![idx].label = accessLayerDetails.dataType;
                if (!userProfile.accessLayers![idx].type) userProfile.accessLayers![idx].type = accessLayerDetails.type;
            })
            window.sessionStorage.setItem(this.userProfileString, JSON.stringify(userProfile))
        } else {
            // client credentials profile (all teams and access layers)
            const allTeams = await this.fenXClient.getAllTeams().then((response) => {
                return response?.map((item) => { return { id: item.id, name: item.name, scopes: item.scopes } as UserProfileTeamDto }) 
            }).catch((error) => { 
                Notification.showError("Error retrieving all teams.", error) 
            });
            
            const allAccessLayers = await this.fenXClient.getAllAccessLayers().then((response) => { 
                return response?.map((item) => { return { id: item.id, dataKey: item.dataKey, label: item.label, type: item.type, dataType: item.dataType} as UserAccessLayerDto }) 
            }).catch((error) => { 
                Notification.showError("Error retrieving all access layers.", error)
            });

            const clientCredentialsProfile  = { teams: allTeams, accessLayers: allAccessLayers } as UserAuthorizationProfileDto
            window.sessionStorage.setItem(this.userProfileString, JSON.stringify(clientCredentialsProfile))
        }
    }

    getUserProfile = async () => {
        let userProfile = window.sessionStorage.getItem(this.userProfileString);
        if (!userProfile) await this.getCurrentUserAuthorizationProfile().then(() => { userProfile = window.sessionStorage.getItem(this.userProfileString) });
        return JSON.parse(userProfile!) as UserAuthorizationProfileDto;
    }

    async init() {
        const userProfile = window.sessionStorage.getItem(this.userProfileString);
        if (!userProfile) await this.getCurrentUserAuthorizationProfile();
    }

    evaluateSingleAccessLayer = async (accessLayer: string, type: AccessLayerTypeDto, dataType: AccessLayerDataTypeDto) : Promise<boolean | null> => {
        // if access layers is enterprise or global
        if (type === "BusinessRelated" && accessLayer === "Enterprise") return true;
        if (type === "Geographic" && accessLayer === "Global") return true;

        const userProfile = await this.getUserProfile();
        if (!userProfile) return null;
        const validAccessLayer = userProfile.accessLayers!.filter(item => (item.dataKey === accessLayer && item.type === type && item.dataType === dataType));
        
        return Boolean(validAccessLayer.length);
    }

    evaluateAccessLayerDto = async (accessLayer: JourneyAccessLayerDto, dataType: AccessLayerDataTypeDto) : Promise<AccessLevel> => {
        let isValidBusinessAccess = false;
        let isValidGeographicAccess = false;

        // assess business layers
        for (let item of accessLayer.businessRelated!) {
            const isAccessible = await this.evaluateSingleAccessLayer(item, AccessLayerTypeDto.BusinessRelated, dataType);
            if (isAccessible) {
                isValidBusinessAccess = true;
                break;
            }
        }
        
        // assess geographic layers
        for (let item of accessLayer.geographic!) {
            const isAccessible = await this.evaluateSingleAccessLayer(item, AccessLayerTypeDto.Geographic, dataType);
            if (isAccessible) {
                isValidGeographicAccess = true;
                break;
            }
        }

        // if no access layers provided
        if (!accessLayer.businessRelated?.length) isValidBusinessAccess = true;
        if (!accessLayer.geographic?.length) isValidGeographicAccess = true;

        // return access level
        if (isValidBusinessAccess && isValidGeographicAccess) return "Full Access";
        if (isValidBusinessAccess || isValidGeographicAccess) return "Partial Access";
        return "No Access";
    }

    evaluateTeamAccess = async (teamId: string) => {
        const userProfile = await this.getUserProfile(); 
        return Boolean(userProfile!.teams?.filter(team => { return team.id === teamId }).length)
    }
    
    evaluateUserAccess = async (assignedTo: string) => {
        // if client credentials, then accessible
        if (!this.isTokenExchange) return true;
        
        const userProfile = await this.getUserProfile(); 
        return userProfile!.id === assignedTo;
    }
}