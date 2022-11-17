import { PrimaryButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import moment from "moment";
import React from "react";
import { FenXApi } from "../../../services/axios/AxiosClient";
import { AccessLayerDataTypeDto } from "../../../services/Clients/AuthorizationQueryClient";
import { AccessLayerDto, DocumentModelDto } from "../../../services/Clients/DocumentManagementQueryClient";
import { EntityDraftDto, ISinglePropertyDto } from "../../../services/Clients/EntityDataQueryClient";
import { PolicyTask } from "../../../services/Clients/JourneyQueryClient";
import { Requirement } from "../../../services/Clients/PolicyQueryClient";
import { IPermission, PermissionModal } from "../../modal/permissionModal";
import { EnhancedDocumentRequirement } from "../../screen/field/document/document";
import { RequirementScreen } from "../../screen/screen";
import { Notification } from "../../utility/notification";
import { AccessLevel, UserProfileManager } from "../../utility/userProfileManager";
import { ITaskScreen } from "./taskScreen";

export interface IDocumentTaskScreen extends ITaskScreen {
    metadata?: PolicyTask;
    isAssignedTo?: boolean;
}

interface IDocumentTaskScreenState extends IPermission {
    requirements: EnhancedDocumentRequirement[];
    isLoading: boolean; 
    isValid: boolean; 
    entity: EntityDraftDto
}

export class DocumentTaskScreen extends PermissionModal<IDocumentTaskScreen> {
    state: IDocumentTaskScreenState = { ...this.state, requirements: [] as EnhancedDocumentRequirement[], isLoading: true, isValid: true, entity: {} as EntityDraftDto }

    fenXClient = FenXApi.getInstance();
    userProfileManager = new UserProfileManager();

    componentDidMount = () => {
        this.setState({ isLoading: true });
        const task = this.props.metadata!;
        this.executeWithPermissionHandling(this.fenXClient.getEntityDraftData(this.props.journeyInstance.entityDraftId!, this.props.journeyInstance.entityId!).then((response) => {
            this.executeWithPermissionHandling(this.fenXClient.getRequirementsInScope({ data: { category: task.businessCategory, jurisdictions: response?.jurisdictions, type: task.policyRequirementType, entityType: response?.type, targetEntity: task.policyTarget } }).then((requirements) => {
                this.executeWithPermissionHandling(this.fenXClient.evaluateRequirements(response?.jurisdictions!, task.policyRequirementType!, task.businessCategory!, response?.properties, task.policyTarget).then((additionalRequirements) => {
                    this.executeWithPermissionHandling(this.fenXClient.getJourneyDocumentModelssByEntityIdAndJourneyId(this.props.journeyInstance.entityId!, this.props.journeyInstance.id!).then((documentModels) => {
                        this.executeWithPermissionHandling(this.fenXClient.getJourneyDocumentsByJourneyId(this.props.journeyInstance.id!).then((documents) => {
                            var reqs = [...requirements!, ...additionalRequirements?.map((ar) => { return ar as Requirement })!]?.sort((a, b) => { return a.name!.localeCompare(b.name!) }).map((req) => {
                                let r = req! as EnhancedDocumentRequirement;
                                var rModel = documentModels?.filter((dm) => { return dm.requirementId === r.id });
                                r.status = (rModel?.length) ? rModel[0].history![rModel[0].history?.length! - 1].status! : "In Progress";
                                r.deferDate = (rModel?.length) ? rModel[0].history![rModel[0].history?.length! - 1].deferUntil : undefined;
                                r.statusComment = (rModel?.length) ? rModel[0].history![rModel[0].history?.length! - 1].comment! : "";
                                r.lastModified = (rModel?.length) ? moment(rModel[0].history![rModel[0].history?.length! - 1].lastUpdated).format("YYYY-MM-DD") : moment(this.props.metadata?.started ?? Date.now()).format("YYYY-MM-DD")
                                r.documents = documents?.filter((doc) => { return (doc.documentRequirementIds ?? []).indexOf(r.id!) > -1 });
                                r.entityId = response?.sourceEntityId!;
                                r.journeyId = this.props.journeyInstance.id!;
                                r.documentModelId = (rModel?.length) ? rModel[0].id : undefined;
                                return r;
                            });
                            return reqs;
                        }).then(async (documentRequirements) => {
                            const updatedDocumentRequirements = await Promise.all(documentRequirements.map(async document => {
                                // determine document requirement access level
                                if (document.documentAccessLayers) {
                                    document.accessLevel = await this.userProfileManager.evaluateAccessLayerDto(document.documentAccessLayers, AccessLayerDataTypeDto.Document);
                                } else {
                                    document.accessLevel = "Full Access";
                                }
                                return document
                            }));
                            this.setState({ requirements: updatedDocumentRequirements, isLoading: false, entity: response });
                        })).catch((error) => { Notification.showError("Error fetching documents.", error); this.setState({ isLoading: false }); });
                    })).catch((error) => { Notification.showError("Error fetching document models.", error); this.setState({ isLoading: false }); });
                })).catch((error) => { Notification.showError("Error evaluating requirements.", error); this.setState({ isLoading: false }); });
            })).catch((error) => { Notification.showError("Error fetching requirements in scope.", error); this.setState({ isLoading: false }); });;
        })).catch((error) => { Notification.showError("Error fetching entity data.", error); this.setState({ isLoading: false }); });
    }

    setIsValid = (valid: boolean) => {
        const { isValid } = this.state;
        if (isValid !== valid){
            this.setState({ isValid: valid });
            if(this.props.onValidate) this.props.onValidate("DocumentTask-" + this.props.metadata?.id!, valid);
        } 
    }

    render = () => {
        const { isLoading, requirements, isValid, entity } = this.state;
        const isJourneyCancelled = this.props.journeyInstance.status === "Cancelled";
        let data = {} as Dictionary<any>;
        for (var key in entity?.properties) {
            var property = entity?.properties[key] as ISinglePropertyDto;
            if (property.value)
                data[key] = property.value;
        }
        return (
            <>
                <div style={{ padding: "5px 20px", margin: "0px 30px", maxHeight: 550, overflow: "auto" }}>
                    <RequirementScreen
                        isReadOnly={this.props.metadata?.isCompleted || isJourneyCancelled}
                        jurisdictions={entity.jurisdictions!}
                        policyCategories={this.props.metadata?.businessCategory!}
                        policyRequirementType="Document"
                        id={this.props.metadata?.id!}
                        onScreenValidate={this.setIsValid}
                        isLoading={isLoading}
                        initialData={data}
                        metadata={requirements}
                        onRefreshRequest={this.onRefreshRequested}
                        key={"taskScreen-" + this.props.metadata?.id}>
                    </RequirementScreen>
                </div>
                {(this.props.hideButtons) ? ('') : (
                    <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                        <PrimaryButton onClick={this.onCompleteClick} disabled={!isValid || this.props.metadata?.status != "In Progress" || !this.props.isAssignedTo || isJourneyCancelled}>Complete</PrimaryButton>
                    </div>
                )}
                {this.renderPermissionModal()}
            </>
        );
    }

    onCompleteClick = () => {
        this.executeWithPermissionHandling(this.fenXClient.completeTaskInJourney(this.props.journeyInstance.id!, this.props.metadata?.id!).then(() => {
            if (this.props.onCloseCallback) this.props.onCloseCallback();
            if (this.props.onRefresh) this.props.onRefresh();
        })).catch((error) => { Notification.showError("Error completing task.", error) });
    }

    onRefreshRequested = () => {
        const { requirements } = this.state;
        this.executeWithPermissionHandling(this.fenXClient.getJourneyDocumentModelssByEntityIdAndJourneyId(this.props.journeyInstance.entityId!, this.props.journeyInstance.id!).then((documentModels) => {
            this.executeWithPermissionHandling(this.fenXClient.getJourneyDocumentsByJourneyId(this.props.journeyInstance.id!).then((documents) => {
                requirements.forEach((r) => {
                    var rModel = documentModels?.filter((dm) => { return dm.requirementId === r.id });
                    r.status = (rModel?.length) ? r.status = rModel[0].history![rModel[0].history?.length! - 1].status! : "In Progress";
                    r.deferDate = (rModel?.length) ? rModel[0].history![rModel[0].history?.length! - 1].deferUntil : undefined;
                    r.lastModified = (rModel?.length) ? moment(rModel[0].history![rModel[0].history?.length! - 1].lastUpdated).format("YYYY-MM-DD") : moment(this.props.metadata?.started ?? Date.now()).format("YYYY-MM-DD")
                    r.documents = documents?.filter((doc) => { return (doc.documentRequirementIds ?? [])!.indexOf(r.id!) > -1 });
                    r.entityId = this.props.journeyInstance.entityId!;
                    r.journeyId = this.props.journeyInstance.id!;
                    r.documentModelId = (rModel?.length) ? rModel[0].id : undefined;
                    r.statusComment = (rModel?.length) ? rModel[0].history![rModel[0].history?.length! - 1].comment! : "";
                    return r;
                });
                this.setState({ requirements: requirements });
            })).catch((error) => { Notification.showError("Error fetching documents.", error) });
        })).catch((error) => { Notification.showError("Error fetching document models.", error) });
    }
}

