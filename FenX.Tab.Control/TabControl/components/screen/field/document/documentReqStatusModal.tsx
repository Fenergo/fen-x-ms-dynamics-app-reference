import { PrimaryButton } from "@fluentui/react";
import { Dictionary } from "lodash";
import React from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { DataRequirement } from "../../../../services/Clients/PolicyQueryClient";
import { EnhancedDataField, FieldChangeEvent } from "../field";
import { EnhancedDocumentRequirement } from "./document";
import { LookupVersionDto } from "../../../../services/Clients/LookupQueryClient";
import { DocumentRequirementRequestDtoServiceRequest, UpdateDocumentRequirementDtoServiceRequest } from "../../../../services/Clients/DocumentManagementCommandClient";
import { Notification } from "../../../utility/notification";
import { Section } from "../../section";
import { IFieldValidation } from "../data/simpleFieldType";
import moment from "moment";
import { ValidationData } from "../../../../services/Clients/PolicyLogicEngineClientV2";
import { IPermission, PermissionModal } from "../../../modal/permissionModal";

interface IDocumentReqStatusModal {
    selectedDocument: EnhancedDocumentRequirement,
    onDismissModal: () => void,
    onDismissAndRefresh: () => void,
    isReadOnly?: boolean
}

interface IDocumentReqStatusModalState extends IPermission {
    formIsValid: boolean;
    data: Dictionary<any>;
    isLoading: boolean;
    additionalRequirements: DataRequirement[];
    validationData: Dictionary<any>;
}

export class DocumentReqStatusModal extends PermissionModal<IDocumentReqStatusModal> {
    state: IDocumentReqStatusModalState = {
        ...this.state,
        formIsValid: false,
        data: {} as Dictionary<any>,
        isLoading: false,
        additionalRequirements: [] as DataRequirement[],
        validationData: {} as Dictionary<any>
    }

    fenXClient = FenXApi.getInstance();

    componentDidMount = () => {
        if (this.props.selectedDocument.status === "Deferral Requested" || this.props.selectedDocument.status === "Deferred") {
            let additionalReqs = [{
                id: "DocumentRequirementDeferUntil1",
                name: "Defer Until",
                dataField: {
                    propertyName: "deferUntil",
                    propertyType: "date",
                },
                isReadOnly: true,
                validationRule: { validationData: { isMandatory: { active: true } } as ValidationData },
                category: "Document Requirement Status",
                type: "Data"
            } as DataRequirement];
            this.setState({ additionalRequirements: additionalReqs });
        }
    }

    onScreenValidate = (e: IFieldValidation) => {
        const { validationData, additionalRequirements } = this.state;
        const requirements = [...this.modalRequirements, ...additionalRequirements];
        validationData[e.field] = e.isValid;
        let isValid = true;
        for (var key in validationData) {
            let req = requirements.filter((r) => r.dataField?.propertyName === key);
            if (!req?.length || req[0].isReadOnly) validationData[key] = true;
            if (!validationData[key]) isValid = false;
        }
        this.setState({ formIsValid: isValid, validationData: validationData });
    }

    onUploadDataChange = (e: FieldChangeEvent) => {
        const { data } = this.state;
        if (data[e.key] === e.value) return;
        data[e.key] = e.value;
        let deferFields = ["Request to Defer", "Extend Deferral"];
        let deferStatuses = ["Deferred", "Deferral Requested"];
        let additionalReqs = [] as DataRequirement[];
        if (e.key === "status" && (deferFields.indexOf(e.value) > -1 || deferStatuses.indexOf(this.props.selectedDocument.status) > -1)) {
            additionalReqs = [{
                id: "DocumentRequirementDeferUntil1",
                name: "Defer Until",
                dataField: {
                    propertyName: "deferUntil",
                    propertyType: "date",
                },
                isReadOnly: deferFields.indexOf(e.value) === -1 && deferStatuses.indexOf(this.props.selectedDocument.status) > -1,
                validationRule: { validationData: { isMandatory: { active: true, message: "Required" }, noPastDates: { active: true, message: "No past dates" } } as ValidationData },
                category: "Document Requirement Status",
                type: "Data"
            } as DataRequirement];
            this.setState({ additionalRequirements: additionalReqs });
            this.onScreenValidate({ field: "deferUntil", isValid: false });
        }
        else if (e.key === "status") {
            this.setState({ additionalRequirements: [] });
            this.onScreenValidate({ field: "deferUntil", isValid: true });
        }

        this.setState({ uploadData: data });
    }

    onSaveClick = () => {
        const { data } = this.state;
        const selectedDocument = this.props.selectedDocument;
        this.setState({ isLoading: true });
        let deferFields = ["Request to Defer", "Extend Deferral", "Defer"];
        if (!selectedDocument.documentModelId) {
            this.executeWithPermissionHandling(this.fenXClient.createDocRequirement({
                data: {
                    journeyId: selectedDocument.journeyId,
                    entityId: selectedDocument.entityId,
                    requirementId: selectedDocument.id,
                    status: data["status"],
                    comment: data["comment"],
                    deferUntil: deferFields.indexOf(data["status"]) > -1 ? moment(data["deferUntil"], "YYYY-MM-DD").toDate() : undefined
                }
            } as DocumentRequirementRequestDtoServiceRequest).then((response) => {
                this.props.onDismissAndRefresh();
            })).catch((err) => { Notification.showError("Error creating document requirement", err); });;
        }
        else {
            this.executeWithPermissionHandling(this.fenXClient.updateDocumentRequirement(selectedDocument.documentModelId!, {
                data: {
                    status: data["status"],
                    comment: data["comment"],
                    deferUntil: deferFields.indexOf(data["status"]) > -1 ? moment(data["deferUntil"], "YYYY-MM-DD").toDate() : undefined
                }
            } as UpdateDocumentRequirementDtoServiceRequest).then((response) => {
                this.props.onDismissAndRefresh();
            })).catch((err) => { Notification.showError("Error updating document requirement status", err); });
        }
    }

    getLookups = () => {
        let lookupValues = [] as string[];
        switch (this.props.selectedDocument.status) {
            case "In Progress":
            case "Rejected":
                lookupValues = ["Request to Waive", "Submit for Approval", "Request to Defer"];
                break;
            case "Waive Requested":
                lookupValues = ["Submit for Approval", "Cancel Request", "Waive", "Reject"];
                break;
            case "Approval Pending":
                lookupValues = ["Approve", "Reject"];
                break;
            case "Deferral Requested":
                lookupValues = ["Submit for Approval", "Cancel Request", "Defer", "Reject"];
                break;
            case "Deferred":
                lookupValues = ["Request to Waive", "Submit for Approval", "Extend Deferral"];
                break;
            case "Waived":
                lookupValues = ["Submit for Approval"];
                break;
        }

        return {
            id: "123456",
            lookupName: "Document Requirement Status",
            values: lookupValues
        } as LookupVersionDto;
    }

    modalRequirements = [
        {
            id: "DocumentRequirementStatus1",
            name: "Document Requirement Status",
            dataField: {
                propertyName: "status",
                propertyType: "select",
                resolvedLookups: this.getLookups()
            } as EnhancedDataField,
            validationRule: { validationData: { isMandatory: { active: true, message: "Required" } } },
            category: "Document Requirement Status",
            type: "Data"
        },
        {
            id: "comment1",
            name: "Comment",
            dataField: {
                propertyName: "comment",
                propertyType: "textArea"
            },
            validationRule: { validationData: { isMandatory: { active: false } } },
            category: "Document Requirement Status",
            type: "Data"
        }
    ] as DataRequirement[];

    render = () => {
        const { isLoading, formIsValid, additionalRequirements } = this.state;
        const requirements = [...this.modalRequirements, ...additionalRequirements];

        let initialData = {} as Dictionary<any>;
        if (this.props.selectedDocument.status === "Approved") {
            initialData["comment"] = this.props.selectedDocument.statusComment;
            initialData["status"] = "Approved";
        }
        if (this.props.selectedDocument.deferDate) {
            initialData["deferUntil"] = moment(this.props.selectedDocument.deferDate).format("YYYY-MM-DD");
        }

        return (
            <>
                <h4 style={{ marginBottom: 0, padding: "0 10px 0 10px" }}>{this.props.selectedDocument.name}</h4>
                <small style={{ padding: "0 10px 10px 10px", display: "block" }}>{this.props.selectedDocument.status} | {this.props.selectedDocument.lastModified}</small>
                <Section
                    evaluatedData={{}}
                    isReadOnly={this.props.selectedDocument.status === "Approved" || this.props.isReadOnly}
                    key="documentUploadModalSection"
                    isLoading={isLoading}
                    onFieldUpdate={this.onUploadDataChange}
                    onFieldValidate={this.onScreenValidate}
                    initialData={initialData}
                    metadata={requirements}></Section>
                <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                    <PrimaryButton key="btnUploadConfirm" disabled={!formIsValid || this.props.selectedDocument.status === "Approved" || this.props.isReadOnly} style={{ marginRight: 10 }} onClick={this.onSaveClick}>Save</PrimaryButton>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }
}