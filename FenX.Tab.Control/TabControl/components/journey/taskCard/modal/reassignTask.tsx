import React from "react";
import { PrimaryButton } from "@fluentui/react";
import { RequirementScreen } from "../../../screen/screen";
import { Dictionary } from "@reduxjs/toolkit";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { DataRequirement, ICollectionPropertyDto, ISinglePropertyDto } from "../../../../services/Clients/PolicyQueryClient";
import { LookupVersionDto } from "../../../../services/Clients/LookupQueryClient";
import { TeamDto, UserDto } from "../../../../services/Clients/AuthorizationQueryClient";
import { IJourneyInstanceDto } from "../../../../services/Clients/JourneyQueryClient";
import { FieldChangeEvent } from "../../../screen/field/field";
import { EntityDraftDto } from "../../../../services/Clients/EntityDataQueryClient";
import { Task as TaskDto } from "../../../../services/Clients/JourneyQueryClient";
import { TeamsManager } from "../../../utility/teamsManager";
import { UserManager } from "../../../utility/userManager";
import { ReassignTaskDtoServiceRequest } from "../../../../services/Clients/JourneyCommandClient";
import { Notification } from "../../../utility/notification";  
import { IPermission, PermissionModal } from "../../../modal/permissionModal";

interface IReassignTaskModal {
    metadata?: TaskDto;
    journeyInstance?: IJourneyInstanceDto;
    onModalDismiss: () => void;
    onRefresh?: () => void;
}

interface ReassignTaskModalState extends IPermission {
    data: Dictionary<any>;
    entity: EntityDraftDto;
    selectedTeam: TeamDto;
    userDropdownOptions: string[];
    isLoading: boolean;
}

export class ReassignTaskModal extends PermissionModal<IReassignTaskModal> {
    state: ReassignTaskModalState= { ...this.state, data: {} as Dictionary<any>, entity: {} as EntityDraftDto, selectedTeam: {} as TeamDto, userDropdownOptions: [] as string[], isLoading: false as boolean } 

    // teams dictionaries 
    teamNameToUserIds: Dictionary<string[]> = {};
    teamNameToTeamId: Dictionary<string> = {};
    
    // users dictionaires
    userIdToName: Dictionary<string> = {};
    userNameToId: Dictionary<string> = {};
    
    teamDropdownOptions: string[] = [];
    fenXClient = FenXApi.getInstance();
    
    componentDidMount = async () => {
        this.setState({ isLoading: true });

        // fetch teams from cache
        const teamsManager = new TeamsManager();
        const teams = await teamsManager.getAllTeams();
        
        // team dropdown options
        this.teamDropdownOptions = teams!.map(team => team.name) as string[];

        // create desired dictionaries using teams
        const teamNameToUserIds: Dictionary<string[]> = {};
        const teamNameToTeamId: Dictionary<string> = {};
        
        teams!.forEach((team) => {
            teamNameToUserIds[team.name!] = team.users;
            teamNameToTeamId[team.name!] = team.id;
        })
        
        this.teamNameToUserIds = teamNameToUserIds;
        this.teamNameToTeamId = teamNameToTeamId;

        // fetch users from cache
        const userManager = new UserManager();
        const users = await userManager.getAllUsers();

        // create desired dictionaries using users
        const userIdToName: Dictionary<string> = {};
        const userNameToId: Dictionary<string> = {};

        users!.forEach((user) => {
            userIdToName[user.id!] = user.username;
            userNameToId[user.username!] = user.id;
        })
        
        this.userIdToName = userIdToName;
        this.userNameToId = userNameToId;

        this.setState({ isLoading: false });
    }

    onFieldUpdate = async (e: FieldChangeEvent) => {
        const { data } = this.state;
        data[e.key] = e.value;
        this.setState({ data: data });

        if (e.key === "team" && e.originalEvent?.currentTarget.textContent) {
            const currentUserIds = this.teamNameToUserIds[e.originalEvent?.currentTarget.textContent as string]
            const currentUserNames = (currentUserIds as string[]).map(userId => {
                return this.userIdToName[userId.toLowerCase()]
            })
            this.setState({ userDropdownOptions: currentUserNames });
        }
    }

    reassignTask = (callback?: () => void) => {
        this.setState({ isLoading: true });
        const { data } = this.state;
        this.executeWithPermissionHandling(this.fenXClient.reassignTaskInJourney(this.props.journeyInstance?.id as string, this.props.metadata?.id as string, {
            data: {
                teamId: this.teamNameToTeamId[data.team],
                ownerId: this.userNameToId[data.owner],
                comment: data.comment
            }
        } as ReassignTaskDtoServiceRequest).then(() => {
            if (callback) callback();
            Notification.showSuccess("Task succesfully reassigned!");
            this.setState({ isLoading: false });
            this.props.onModalDismiss();
        }).then(() => {
            if (this.props.onRefresh) this.props.onRefresh();
        })).catch((reason) => {
            Notification.showError("Error reassigning task.", reason);
            this.setState({ isLoading: false });
        });
    }

    render = () => {

        const { userDropdownOptions, isLoading } = this.state;

        const taskReassignData = [
            {
                id: "taskReassignTeamId",
                name: "Team",
                dataField: {
                    propertyName: "team",
                    propertyType: "selectLink",
                    resolvedLookups: { values: this.teamDropdownOptions } as LookupVersionDto,
                    linkChildFieldPropertyName: "owner"
                },
                validationRule: { validationData: { isMandatory: { active: false } } },
                type: "Data"
            },
            {
                id: "taskReassignOwnerId",
                name: "Owner",
                dataField: {
                    propertyName: "owner",
                    propertyType: "select",
                    resolvedLookups: { values: userDropdownOptions } as LookupVersionDto
                },
                validationRule: { validationData: { isMandatory: { active: false } } },
                type: "Data"
            },
            {
                id: "taskReassignCommentId",
                name: "Comment",
                dataField: {
                    propertyName: "comment",
                    propertyType: "text"
                },
                validationRule: { validationData: { isMandatory: { active: false } } },
                type: "Data"
            }
        ] as DataRequirement[]; 
          
        return (
            <>
                <div style={{ padding: "5px 20px", margin: "0px 30px" }}>
                    <RequirementScreen id ={"id"} initialData={{}} metadata={taskReassignData} onFieldUpdate={this.onFieldUpdate} isLoading={isLoading}>
                        <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                            <PrimaryButton key="btnSave" disabled={false} style={{ marginRight: 10 }} onClick={() => this.reassignTask()}>Save</PrimaryButton>
                        </div>
                    </RequirementScreen>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }
}  