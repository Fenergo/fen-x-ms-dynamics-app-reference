import { PrimaryButton } from "@fluentui/react";
import { Dictionary } from "lodash";
import React from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { DataGroupVersionDto, DataRequirement, DocumentRequirement, VersionedJurisdictionDto } from "../../../../services/Clients/PolicyQueryClient";
import { FieldChangeEvent } from "../field";
import { DocumentMetadata, EnhancedDocumentRequirement } from "./document";
import { Notification } from "../../../utility/notification";
import { CreateSignedUrlToUploadFileRequestServiceRequest, DocumentRequirementRequestDtoServiceRequest, UpdateDocumentRequirementDtoServiceRequest } from "../../../../services/Clients/DocumentManagementCommandClient";
import { RequirementScreen } from "../../screen";
import { AccessLayerDto, UserAccessLayerDto } from "../../../../services/Clients/AuthorizationQueryClient";
import { IPermission, PermissionModal } from "../../../modal/permissionModal";

interface IDocumentUploadModal {
    selectedDocument: DocumentRequirement,
    selectedFile: HTMLInputElement,
    initialData: Dictionary<any>,
    onDismissModal: () => void,
    fieldModifiers?: Dictionary<(value: any) => any>
}

interface IDocumentUploadModalState extends IPermission {
    uploadIsValid: boolean;
    uploadData: Dictionary<any>;
    isLoading: boolean;
    documentMetadata: DataRequirement[];
    accessLayers: AccessLayerDto[];
    dataGroup: DataGroupVersionDto;
}

export class DocumentUploadModal extends PermissionModal<IDocumentUploadModal> {
    state: IDocumentUploadModalState = {
        ...this.state,
        uploadIsValid: false,
        uploadData: {} as Dictionary<any>,
        isLoading: false,
        documentMetadata: [] as DataRequirement[],
        accessLayers: [] as AccessLayerDto[],
        dataGroup: {} as DataGroupVersionDto
    }

    fenXClient = FenXApi.getInstance();

    componentDidMount = async () => {
        this.fenXClient.getAllAccessLayers().then(async (accessLayers) => {
            await this.setDocumentMetadataRequirements(accessLayers!);
        }).catch(async (error) => {
            //client credentials don't have a valid token for this call
            await this.setDocumentMetadataRequirements([]);
        });
    }

    setDocumentMetadataRequirements = async (accessLayers: UserAccessLayerDto[]) => {
        let documentMetadata = await DocumentMetadata(accessLayers);
        this.setState({ accessLayers: accessLayers, documentMetadata: documentMetadata.metadata, dataGroup: documentMetadata.dataGroup });
    }

    onUploadFieldValidate = (screenIsValid: boolean) => {
        this.setState({ uploadIsValid: screenIsValid });
    }

    onUploadDataChange = (e: FieldChangeEvent) => {
        const { uploadData } = this.state;
        if (uploadData[e.key] === e.value) return;
        uploadData[e.key] = e.value;
        this.setState({ uploadData: uploadData });
    }

    onSaveAndUploadClick = () => {
        const selectedDocument = this.props.selectedDocument;
        const selectedFile = this.props.selectedFile;
        this.setState({ isLoading: true });
        const doc = selectedDocument as EnhancedDocumentRequirement;
        if (!selectedFile?.files?.length) return;

        if (!doc.documentModelId) {
            this.executeWithPermissionHandling(this.fenXClient.createDocRequirement({
                data: {
                    journeyId: doc.journeyId,
                    entityId: doc.entityId,
                    requirementId: doc.id,
                    status: "Submit for Approval"
                }
            } as DocumentRequirementRequestDtoServiceRequest).then((response) => {
                this.uploadDocument(doc);
            })).catch((err) => { Notification.showError("Error creating document requirement", err); this.setState({ isLoading: false }); });;
        }
        else if(doc.status !== "Approved" && doc.status !== "Approval Pending") {
            this.executeWithPermissionHandling(this.fenXClient.updateDocumentRequirement(doc.documentModelId!, {
                data: {
                    status: "Submit for Approval"
                }
            } as UpdateDocumentRequirementDtoServiceRequest).then((response) => {
                this.uploadDocument(doc);
            })).catch((err) => { Notification.showError("Error updating document requirement status", err); this.setState({ isLoading: false }); });
        }
        else{
            this.uploadDocument(doc);
        }
    }

    uploadDocument = (doc: EnhancedDocumentRequirement) => {
        const { uploadData } = this.state;
        const selectedFile = this.props.selectedFile;
        if (!selectedFile?.files?.length) return;
        const accessLayers = { geographic: uploadData["geographicAccessLayers"] ? uploadData["geographicAccessLayers"].split("|") : [], 
            businessRelated: uploadData["businessRelatedAccessLayers"] ? uploadData["businessRelatedAccessLayers"].split("|") : [] }
        // dynamic properties of upload data 
        const properties =  Object.keys(uploadData)
            .filter(key => !["name", "documentType", "geographicAccessLayers", "businessRelatedAccessLayers"].includes(key))
            .reduce((obj, key) => {
                obj[key] = { value: uploadData[key], type: "Single"}; // correct properties format
                return obj;
            }, {} as any);
        this.executeWithPermissionHandling(this.fenXClient.uploadDocument({ data: { entityId: doc.entityId, journeyId: doc.journeyId, documentRequirementIds: [doc.id!], friendlyName: uploadData["name"], fileName: selectedFile.files[0].name, documentType: uploadData["documentType"], accessLayers: accessLayers, properties: properties }} as CreateSignedUrlToUploadFileRequestServiceRequest).then(async (response) => {
            if (!selectedFile?.files?.length) return;
            fetch(response?.signedUrlToUpload!, {
                method: 'PUT',
                body: await selectedFile.files[0].arrayBuffer()
            }).then(() => {
                this.setState({ isLoading: false });
                this.props.onDismissModal();
            }).catch((err) => { Notification.showError("Error uploading document", err); this.setState({ isLoading: false }); });
        })).catch((err) => { Notification.showError("Error saving document metadata", err); this.setState({ isLoading: false }); });
    }

    render = () => {
        const { isLoading, uploadIsValid, documentMetadata, dataGroup } = this.state;
        const selectedFile = this.props.selectedFile;
        return (
            <>
                <h4 style={{padding: "0 10px 0 10px"}}>{(selectedFile?.files?.length) ? selectedFile.files[0].name : ""}</h4>
                <RequirementScreen 
                    isDataGroup={true}
                    dataGroupId={dataGroup.groupId}
                    dataGroupVersion={dataGroup.versionNumber}                
                    policyRequirementType="Document" 
                    policyCategories={["Document Metadata"]} 
                    jurisdictions={[{ jurisdiction: "Global" } as VersionedJurisdictionDto]} 
                    hideSectionLabel id={"documentRequirementUploadModalScreen"} 
                    key="documentUploadModalSection" isLoading={isLoading} 
                    onFieldUpdate={this.onUploadDataChange} 
                    onScreenValidate={this.onUploadFieldValidate} 
                    initialData={this.props.initialData} 
                    metadata={documentMetadata}
                    fieldModifiers={this.props.fieldModifiers}></RequirementScreen>
                <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                    <PrimaryButton key="btnUploadConfirm" disabled={!uploadIsValid} style={{ marginRight: 10 }} onClick={this.onSaveAndUploadClick}>Upload</PrimaryButton>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }
}