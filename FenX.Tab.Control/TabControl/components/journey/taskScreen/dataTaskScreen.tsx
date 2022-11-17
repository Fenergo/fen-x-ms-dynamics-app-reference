import { PrimaryButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { FenXApi } from "../../../services/axios/AxiosClient";
import { EntityDraftDto, ICollectionPropertyDto, ISinglePropertyDto } from "../../../services/Clients/EntityDataQueryClient";
import { PolicyTask } from "../../../services/Clients/JourneyQueryClient";
import { DataRequirement, Requirement } from "../../../services/Clients/PolicyQueryClient";
import { IPermission, PermissionModal } from "../../modal/permissionModal";
import { FieldChangeEvent } from "../../screen/field/field";
import { RequirementScreen } from "../../screen/screen";
import { Notification } from "../../utility/notification";
import { ITaskScreen } from "./taskScreen";

export interface IDataTaskScreen extends ITaskScreen {
    metadata?: PolicyTask;
    isAssignedTo?: boolean;
}

interface IDataTaskScreenState extends IPermission {
    requirements: Requirement[];
    initialData: Dictionary<any>; 
    data: Dictionary<any>;
    isLoading: boolean; 
    isValid: boolean; 
    entity: EntityDraftDto;
    properties: Dictionary<any>;
}

export class DataTaskScreen extends PermissionModal<IDataTaskScreen> {
    state: IDataTaskScreenState = { ...this.state, requirements: [] as Requirement[], initialData: {} as Dictionary<any>, data: {} as Dictionary<any>, isLoading: true, isValid: true, entity: {} as EntityDraftDto, properties: {} as Dictionary<any> }

    fenXClient = FenXApi.getInstance();

    componentDidMount = () => {
        const task = this.props.metadata!;
        this.executeWithPermissionHandling(this.fenXClient.getEntityDraftData(this.props.journeyInstance.entityDraftId!, this.props.journeyInstance.entityId!)
            .then((response) => {
                var data = {} as Dictionary<any>;
                for (var key in response?.properties) {
                    var property = response?.properties[key] as ISinglePropertyDto;
                    data[key] = property.value ?? (property as ICollectionPropertyDto).collections;
                }
                this.executeWithPermissionHandling(this.fenXClient.getRequirementsInScope({ data: { category: task.businessCategory, jurisdictions: response?.jurisdictions, type: task.policyRequirementType, entityType: response?.type, targetEntity: task.policyTarget } })
                    .then((result) => {
                        
                        this.setState({ initialData: data, requirements: result!, isLoading: false, entity: response, properties: response?.properties });
                    })).catch((error) => { Notification.showError("Error fetching requirements.", error); this.setState({ isLoading: false }) });
            })).catch((error) => { 
                Notification.showError("Error fetching entity data.", error);
                this.setState({ isLoading: false });
            });
    }

    onFieldUpdate = async (e: FieldChangeEvent) => {
        const { data } = this.state;
        data[e.key] = { value: e.value, type: e.type, dataGroupId: e.dataGroupId, collections: e.collections };
        this.setState({ data: data });
        if (this.props.onDataChange) this.props.onDataChange(data);
    }

    setIsValid = (valid: boolean) => {
        const { isValid } = this.state;
        if (isValid !== valid) {
            this.setState({ isValid: valid });
            if (this.props.onValidate) this.props.onValidate("DataTask-" + this.props.metadata?.id!, valid);
        }
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
        const { isLoading, requirements, initialData, isValid, entity, properties } = this.state;
        const isJourneyCancelled = this.props.journeyInstance.status === "Cancelled";
        return (
            <>
                <div style={{ padding: "5px 20px", margin: "0px 30px", maxHeight: 550, overflow: "auto" }}>
                    <RequirementScreen
                        isReadOnly={this.props.metadata?.isCompleted || isJourneyCancelled}
                        jurisdictions={entity.jurisdictions!}
                        policyCategories={this.props.metadata?.businessCategory!}
                        policyRequirementType="Data"
                        id={this.props.metadata?.id!}
                        onFieldUpdate={this.onFieldUpdate}
                        onScreenValidate={this.setIsValid}
                        isLoading={isLoading}
                        initialData={initialData}
                        properties={properties}
                        metadata={requirements}
                        key={"taskScreen-" + this.props.metadata?.id}>
                    </RequirementScreen>
                </div>
                {(this.props.hideButtons) ? ('') : (
                    <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                        <PrimaryButton disabled={!isValid || this.props.metadata?.isCompleted || isJourneyCancelled} style={{ marginRight: 10 }} onClick={this.onSaveClick}>Save</PrimaryButton>
                        <PrimaryButton disabled={!isValid || this.props.metadata?.isCompleted || this.props.metadata?.status !== "In Progress" || !this.props.isAssignedTo || isJourneyCancelled} onClick={this.onCompleteClick}>Complete</PrimaryButton>
                    </div>
                )}
                {this.renderPermissionModal()}
            </>
        );
    }
}

