import { Pivot, PivotItem, PrimaryButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import _ from "lodash";
import React from "react";
import { FenXApi } from "../../../services/axios/AxiosClient";
import { EntityDraftDto } from "../../../services/Clients/EntityDataQueryClient";
import { CombinedPolicyTask, PolicyTask } from "../../../services/Clients/JourneyQueryClient";
import { IPermission, PermissionModal } from "../../modal/permissionModal";
import { Notification } from "../../utility/notification";
import { ITaskScreen, TaskScreen } from "./taskScreen";

export interface ICombinedPolicyTaskScreen extends ITaskScreen {
    metadata?: CombinedPolicyTask;
    isAssignedTo?: boolean;
}

interface ICombinedPolicyTaskScreenState extends IPermission {
    isValid: boolean; 
    validationData: Dictionary<any>; 
    data: Dictionary<any>; 
    entity: EntityDraftDto
}

export class CombinedPolicyTaskScreen extends PermissionModal<ICombinedPolicyTaskScreen> {
    state: ICombinedPolicyTaskScreenState = { ...this.state, isValid: true, validationData: {} as Dictionary<any>, data: {} as Dictionary<any>, entity: {} as EntityDraftDto };

    fenXClient = FenXApi.getInstance();

    componentDidMount = () => {
        this.executeWithPermissionHandling(this.fenXClient.getEntityDraftData(this.props.journeyInstance.entityDraftId!, this.props.journeyInstance.entityId!)
            .then((response) => {
                this.setState({ entity: response });
            })).catch((error) => { Notification.showError("Error fetching entity data.", error) });
    }

    onDataChange = (data: Dictionary<any>) => {
        this.setState({ data: data });
    }

    onValidateTaskScreen = (key: string, isValid: boolean) => {
        const { validationData } = this.state;
        validationData[key] = isValid;
        let screenValid = true;
        for (var screen in validationData) {
            if (!validationData[screen]) screenValid = false;
        }
        this.setState({ validationData: validationData, isValid: screenValid });
    }

    saveLegalEntityDraft = (callback?: () => void) => {
        const { data, entity } = this.state;
        this.setState({ isLoading: true });
        this.executeWithPermissionHandling(this.fenXClient.updateEntityDraft(this.props.journeyInstance.entityId!, this.props.journeyInstance.entityDraftId!, {
            data: {
                properties: data,
                jurisdictions: entity.jurisdictions,
                version: entity.version,
                category: this.props.metadata?.businessCategory,
                entityType: entity.type,
                targetEntity: this.props.metadata?.policyTarget
            }
        }).then(() => {
            if (callback) callback();
            Notification.showSuccess("Entity data saved succesfully!");
        })).catch((reason) => {
            console.log(reason);
            Notification.showError("Error saving entity data.");
            this.setState({ isLoading: false });
        });
    }

    onSaveClick = () => {
        this.saveLegalEntityDraft(() => {
            this.setState({ isLoading: false });
            if (this.props.onCloseCallback) this.props.onCloseCallback();
        });
    }

    onCompleteClick = () => {
        this.saveLegalEntityDraft(() => {
            this.executeWithPermissionHandling(this.fenXClient.completeTaskInJourney(this.props.journeyInstance.id!, this.props.metadata?.id!).then(() => {
                this.setState({ isLoading: false });
                if (this.props.onCloseCallback) this.props.onCloseCallback();
                if (this.props.onRefresh) this.props.onRefresh();
            })).catch((error) => { Notification.showError("Error completing task.", error) });
        });
    }

    render = () => {
        const { isValid } = this.state;
        const isJourneyCancelled = this.props.journeyInstance.status === "Cancelled";
        return (
            <>
                <div key="CombinedPolicyTaskScreenWrapper">
                    <Pivot key="CombinedPolicyTaskScreen">
                        {this.props.metadata?.policyRequirementTypes?.map((taskType, index) => {
                            let metadata = _.cloneDeep(this.props.metadata) as PolicyTask;
                            metadata!.policyRequirementType = taskType;
                            metadata!.taskType = "PolicyTask";
                            return (
                                <PivotItem alwaysRender={true} key={"CombinedPolicyTaskScreenTab-" + metadata.id! + "-" + taskType} headerText={taskType} headerButtonProps={{
                                    'data-order': index,
                                    'data-title': taskType,
                                }}>
                                    <TaskScreen onDataChange={this.onDataChange} onValidate={this.onValidateTaskScreen} hideButtons journeyInstance={this.props.journeyInstance} key={"CombinedPolicyTaskTabScreen-" + metadata?.id + "-" + taskType} metadata={metadata} />
                                </PivotItem>
                            )
                        }
                        )}
                    </Pivot>
                    <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                        <PrimaryButton disabled={!isValid || this.props.metadata?.isCompleted || isJourneyCancelled} style={{ marginRight: 10 }} onClick={this.onSaveClick}>Save</PrimaryButton>
                        <PrimaryButton disabled={!isValid || this.props.metadata?.isCompleted || this.props.metadata?.status !== "In Progress" || !this.props.isAssignedTo || isJourneyCancelled} onClick={this.onCompleteClick}>Complete</PrimaryButton>
                    </div>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }

}