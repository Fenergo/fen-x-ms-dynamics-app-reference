import React from "react";
import { Dictionary } from "@reduxjs/toolkit";
import { IJourneyInstanceDto } from "../../../../services/Clients/JourneyQueryClient";
import { Task as TaskDto } from "../../../../services/Clients/JourneyQueryClient";
import { RequirementScreen } from "../../../screen/screen";
import { PrimaryButton } from "@fluentui/react";
import { DataRequirement } from "../../../../services/Clients/PolicyQueryClient";
import { FieldChangeEvent } from "../../../screen/field/field";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { Notification } from "../../../utility/notification";  
import { ResetTaskDtoServiceRequest } from "../../../../services/Clients/JourneyCommandClient";
import { IPermission, PermissionModal } from "../../../modal/permissionModal";

interface IReopenTaskModal {
    metadata?: TaskDto;
    journeyInstance?: IJourneyInstanceDto;
    onModalDismiss: () => void;
    onRefresh?: () => void;
}

interface IReopenTaskModalState extends IPermission {
    data: Dictionary<any>; 
    isLoading: boolean;
    isValid: boolean;
}

export class ReopenTaskModal extends PermissionModal<IReopenTaskModal> {
    state: IReopenTaskModalState = { ...this.state, data: {} as Dictionary<any>, isLoading: false as boolean, isValid: true as boolean }
    
    fenXClient = FenXApi.getInstance();
    
    onFieldUpdate = async (e: FieldChangeEvent) => {
        const { data } = this.state;
        data[e.key] = e.value;
        this.setState({ data: data });
    }

    reopenTask = async (callback?: () => void) => {
        this.setState({ isLoading: true });
        const { data } = this.state;
        this.executeWithPermissionHandling(this.fenXClient.reopenTaskInJourney(this.props.journeyInstance?.id as string, this.props.metadata?.id as string, {
            data: {
                comment: data.comment
            }
        } as ResetTaskDtoServiceRequest).then(() => {
            if (callback) callback();
            Notification.showSuccess("Task succesfully reopened!");
            this.setState({ isLoading: false });
            this.props.onModalDismiss();
        }).then(() => {
            if (this.props.onRefresh) this.props.onRefresh();
        })).catch((reason) => {
            Notification.showError("Error reopening task.", reason);
            this.setState({ isLoading: false });
        });
    }

    setIsValid = (valid: boolean) => {
        const { isValid } = this.state;
        if (isValid !== valid) this.setState({ isValid: valid });
    }

    render = () => {
        const { isLoading, isValid } = this.state;
        
        const taskReopenData = [
            {
                id: "taskReopenTaskId",
                name: "Task Name",
                dataField: {
                    propertyName: "taskName",
                    propertyType: "text",
                },
                type: "Data",
                isReadOnly: true,
                defaultValue: this.props.metadata?.name
            },
            {
                id: "taskReopenComment",
                name: "Comment",
                dataField: {
                    propertyName: "comment",
                    propertyType: "text",
                },
                validationRule: { validationData: { isMandatory: { active: true, message: "Field must be completed." } } },
                type: "Data"
            }
        ] as DataRequirement[]; 

        return (
            <>
                <div style={{ padding: "5px 20px", margin: "0px 30px" }}>
                    <RequirementScreen id ={"id"} initialData={{}} metadata={taskReopenData} onFieldUpdate={this.onFieldUpdate} isLoading={isLoading} onScreenValidate={this.setIsValid} >
                        <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                            <PrimaryButton key="btnSave" disabled={!isValid} style={{ marginRight: 10 }} onClick={() => this.reopenTask()}>Save</PrimaryButton>
                        </div>
                    </RequirementScreen>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }
}

