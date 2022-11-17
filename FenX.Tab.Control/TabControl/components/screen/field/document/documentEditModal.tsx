import { PrimaryButton } from "@fluentui/react";
import _, { Dictionary } from "lodash";
import React from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { DataGroupVersionDto, DataRequirement, VersionedJurisdictionDto } from "../../../../services/Clients/PolicyQueryClient";
import { FieldChangeEvent } from "../field";
import { DocumentMetadata, EnhancedDocumentRequirement } from "./document";
import { Notification } from "../../../utility/notification";
import { UpdateDocumentDto } from "../../../../services/Clients/DocumentManagementCommandClient";
import { RequirementScreen } from "../../screen";
import { UserAccessLayerDto } from "../../../../services/Clients/AuthorizationQueryClient";
import { AccessLayerDto, Property } from "../../../../services/Clients/DocumentManagementQueryClient";
import { UpdateDraftAccessLayersDto } from "../../../../services/Clients/EntityDataCommandClient";
import { LoadingSpinner } from "../../../loader/loader";
import { IPermission, PermissionModal } from "../../../modal/permissionModal";

interface IDocumentEditModal {
    selectedDocument: EnhancedDocumentRequirement,
    onDismissModal: () => void,
    isReadOnly?: boolean,
    fieldModifiers?: Dictionary<(value: any) => any>
}

interface IDocumentEditModalState extends IPermission {
    isValid: boolean;
    screenValidationData: Dictionary<any>;
    data: Dictionary<Dictionary<any>>;
    isLoading: boolean;
    documentMetadata: DataRequirement[];
    accessLayers: AccessLayerDto[];
    dataGroup: DataGroupVersionDto;
}

export class DocumentEditModal extends PermissionModal<IDocumentEditModal> {
    state: IDocumentEditModalState = {
        ...this.state,
        isValid: false,
        screenValidationData: {} as Dictionary<any>,
        data: {} as Dictionary<Dictionary<any>>,
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
           Notification.showError("Error fetching access layers.", error);
        });
    }

    setDocumentMetadataRequirements = async (accessLayers: UserAccessLayerDto[]) => {
        let documentMetadata = await DocumentMetadata(accessLayers);
        this.setState({ accessLayers: accessLayers, documentMetadata: documentMetadata.metadata, dataGroup: documentMetadata.dataGroup });
    }

    onFieldValidate = (id: string, screenIsValid: boolean) => {
        const { screenValidationData } = this.state;
        screenValidationData[id] = screenIsValid;
        let isValid = true;
        for (var key in screenValidationData) { if (!screenValidationData[key]) { isValid = false; } }
        this.setState({ isValid: isValid, screenValidationData: screenValidationData });
    }

    onDataChange = (id: string, e: FieldChangeEvent) => {
        const { data } = this.state;
        if (!data[id]) data[id] = {} as Dictionary<any>;
        if (data[id][e.key] === e.value) return;
        data[id][e.key] = e.value;
        this.setState({ data: data });
    }

    onUpdateClick = async () => {
        const { data } = this.state;
        const selectedDocument = this.props.selectedDocument;
        this.setState({ isLoading: true });
        for (var docId in data) {
            let docData = {} as Dictionary<any>;
            let props = { fileName: "", docType: "", businessAccessLayers: [] as string[] | undefined, geoAccessLayers: [] as string[] | undefined };
            for (var entry in data[docId]) {
                var item = data[docId][entry];
                switch (entry) {
                    case "name":
                        props.fileName = item;
                        break;
                    case "documentType":
                        props.docType = item;
                        break;
                    case "businessRelatedAccessLayers":
                        props.businessAccessLayers = item ? item?.split("|") : [];
                        break;
                    case "geographicAccessLayers":
                        props.geoAccessLayers = item ? item?.split("|") : [];
                        break;
                    default:
                        docData[entry] = { value: item, type: "Single" };
                }
            }
            const document = selectedDocument.documents?.filter((d) => { return d.id === docId })[0]!;
            await this.executeWithPermissionHandling(this.fenXClient.updateDocumentModel(docId, {
                    documentDataKey: document.documentDataKey,
                    documentType: props.docType!,
                    friendlyName: props.fileName,
                    properties: docData,
                    documentRequirementIds: document.documentRequirementIds
                } as UpdateDocumentDto)
                .then(() => {
                    this.executeWithPermissionHandling(this.fenXClient.updateDocumentAccessLayers(docId, {
                        accessLayers: { businessRelated: props.businessAccessLayers, geographic: props.geoAccessLayers } as AccessLayerDto
                    } as UpdateDraftAccessLayersDto)).catch((error) => { 
                        this.setState({isLoading: false}); 
                        Notification.showError("Error updating document '" + props.fileName + "' access layers.", error); 
                    });
                })
                .then(() => {
                    this.setState({isLoading: false}); 
                    this.props.onDismissModal();
                }))
                .catch((error) => {
                    this.setState({isLoading: false});
                    Notification.showError("Error updating document '" + props.fileName + "'.", error)
                });
        }
    }

    render = () => {
        const { isLoading, isValid, documentMetadata, dataGroup } = this.state;
        let metadata = documentMetadata.length ? this.props.selectedDocument.documents?.map((doc) => {
            let docMetadata = _.cloneDeep(documentMetadata);
            docMetadata.forEach((dm) => {
                dm.category = doc.fileName;
                dm.requirementSetId = doc.id;
                dm.id = dm.id + "-" + doc.id;
            });
            return { metadata: docMetadata, document: doc };
        }) : undefined;

        // filter no access documents
        const filteredMetadata = metadata?.filter((dm) => { return dm.document.hasRequiredAccessLayers })
        
        return (isLoading) ? (<LoadingSpinner key="DocumentEditScreenLoader" />) : (
            <>
                {
                    filteredMetadata?.map((dm) => {
                        let initialData = {} as Dictionary<any>;
                        if (dm.document.properties) {
                            for (var key in dm.document.properties) {
                                initialData[key] = dm.document.properties[key].value;
                            }
                        };
                        initialData["name"] = dm.document.fileName;
                        initialData["documentType"] = dm.document.documentType;
                        if (dm.document.accessLayers?.businessRelated?.length) initialData["businessRelatedAccessLayers"] = dm.document.accessLayers?.businessRelated?.join("|");
                        if (dm.document.accessLayers?.geographic?.length) initialData["geographicAccessLayers"] = dm.document.accessLayers?.geographic?.join("|");
                        
                        return (
                            <div key={"ScreenWrapper-" + dm.document.id + "-" + dm.document.documentKey}>
                                <h4 style={{ padding: "0 10px 0 10px" }}>{dm.document.fileName}</h4>
                                <RequirementScreen
                                    hideSectionLabel
                                    isDataGroup={true}
                                    dataGroupId={dataGroup.groupId}
                                    dataGroupVersion={dataGroup.versionNumber}
                                    policyRequirementType="Document"
                                    policyCategories={["Document Metadata"]}
                                    jurisdictions={[{ jurisdiction: "Global" } as VersionedJurisdictionDto]}
                                    id={"documentRequirementEditModalScreen-" + dm.document.id}
                                    key={"documentEditModalSection-" + dm.document.id}
                                    isLoading={isLoading}
                                    isReadOnly={this.props.isReadOnly}
                                    onFieldUpdate={(e) => { this.onDataChange(dm.document.id!, e); }}
                                    onScreenValidate={(v) => { this.onFieldValidate(dm.document.id!, v) }}
                                    initialData={initialData}
                                    metadata={dm.metadata}
                                    fieldModifiers={this.props.fieldModifiers}></RequirementScreen>
                            </div>
                        );
                    })
                }
                <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                    <PrimaryButton key="btnUpdateClick" disabled={!isValid || this.props.isReadOnly} style={{ marginRight: 10 }} onClick={this.onUpdateClick}>Update</PrimaryButton>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }
}