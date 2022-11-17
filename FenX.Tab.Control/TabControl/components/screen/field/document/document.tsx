import { DefaultButton, DetailsList, DetailsListLayoutMode, IconButton, Link, Modal, SelectionMode, Spinner, Stack, TagPicker, Text, TooltipHost } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React, { ChangeEvent } from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { AccessLayerDataTypeDto, AccessLayerTypeDto, UserAccessLayerDto } from "../../../../services/Clients/AuthorizationQueryClient";
import { DocumentModelDto } from "../../../../services/Clients/DocumentManagementQueryClient";
import { LookupVersionDto } from "../../../../services/Clients/LookupQueryClient";
import { DataRequirement, DocumentRequirement } from "../../../../services/Clients/PolicyQueryClient";
import { ModalContent } from "../../../modal/modalContent";
import { DataGroupManager } from "../../../utility/dataGroupManager";
import { LookupManager } from "../../../utility/lookupManager";
import { AccessLevel, UserProfileManager } from "../../../utility/userProfileManager";
import { ISection } from "../../section";
import { DocumentDeleteModal } from "./documentDeleteModal";
import { DocumentEditModal } from "./documentEditModal";
import { DocumentReqStatusModal } from "./documentReqStatusModal";
import { DocumentUploadModal } from "./documentUploadModal";
import { Notification } from "../../../utility/notification";
import { IPermission, PermissionModal } from "../../../modal/permissionModal";

interface IDocumentGrid extends ISection {
  metadata: EnhancedDocumentRequirement[];
  onRefresh?: () => void;
  isReadOnly?: boolean;
}

export class EnhancedDocumentRequirement extends DocumentRequirement {
  status: string;
  documents?: DocumentModelDto[];
  entityId: string;
  journeyId: string;
  lastModified: string;
  documentModelId: string | undefined;
  statusComment: string;
  deferDate?: Date;
  accessLevel?: AccessLevel;
}

interface IDocumentGridState extends IPermission {
  isUploadOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  isReqStatusOpen: boolean;
  selectedDocument: EnhancedDocumentRequirement;
  selectedFile: HTMLInputElement;
  isValid: boolean;
}

export class DocumentGrid extends PermissionModal<IDocumentGrid> {
  state: IDocumentGridState = {
    ...this.state,
    isUploadOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    isReqStatusOpen: false,
    selectedDocument: {} as EnhancedDocumentRequirement,
    selectedFile: {} as HTMLInputElement,
    isValid: true
  }

  timer: NodeJS.Timer;
  hiddenFileInput = React.createRef<HTMLInputElement>();
  lookupManager = new LookupManager();
  fenXClient = FenXApi.getInstance();
  userProfileManager = new UserProfileManager();

  componentDidMount = async () => {
    this.startRefreshInterval();
    this.onValidateRequirements();
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  onDocumentDeleteClick(item: DocumentModelDto) {
    clearInterval(this.timer);
    this.setState({ isDeleteOpen: true, selectedDocument: item });
  }

  onUploadClick = (item: DocumentRequirement) => {
    clearInterval(this.timer);
    this.setState({ selectedDocument: item });
    if (this.hiddenFileInput?.current)
      this.hiddenFileInput.current.click();
  }

  onEditClick = (item: DocumentRequirement) => {
    clearInterval(this.timer);
    this.setState({ selectedDocument: item, isEditOpen: true });
  }

  onReqStatusClick = (item: DocumentRequirement) => {
    clearInterval(this.timer);
    this.setState({ isReqStatusOpen: true, selectedDocument: item });
  }

  onDocumentUploaded = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      this.setState({ selectedFile: event.target, isUploadOpen: true });
    }
    else {
      this.startRefreshInterval();
    }
  }

  onDocumentClick = (item: DocumentModelDto) => {
    this.executeWithPermissionHandling(this.fenXClient.getDocumentUrl(item.id!).then((response) => {
      window.open(response);
    })).catch((error) => { Notification.showError("Error fetching document URL.", error) });
  }

  startRefreshInterval = () => {
    this.timer = setInterval(async () => { if (this.props.onRefresh) await this.props.onRefresh() }, 5000);
  }

  onValidateRequirements = () => {
    const { isValid,  } = this.state;
    let formIsValid = true;
    this.props.metadata.forEach((docReq) => {
      if (docReq.isMandatory) {
        if (docReq.status !== "Approved") { formIsValid = false; return; }
      }
    });

    if (formIsValid === isValid) return;
    this.setState({ isValid: formIsValid });
    if (this.props.onFieldValidate) this.props.onFieldValidate({ field: "documentRequirements", isValid: formIsValid });
  }
  
  businessRelatedAccessLayersModifier = (item: {value: string[], originalValue: string[]}) => {
    let values = item.value as string[];
    let message: string | null = null;
    const messageText = "Cannot remove policy enforced access layers."
    
    // policy enforced layers
    const businessAccessLayers = this.state.selectedDocument.documentAccessLayers?.businessRelated
    // if no enforced layers, return
    if (!businessAccessLayers?.length) return {value: values, additionalMessage: message};
    // if select all has removed everything, return policy enforced layers
    if (!values.length) return {value: businessAccessLayers, additionalMessage: messageText};
    // else, find if an enforced access layer has been removed
    for (let layer of businessAccessLayers) {
      if (!values.includes(layer)) {
        return {value: item.originalValue, additionalMessage: messageText}
      }
    }
    return {value: values, additionalMessage: message};
  }
  
  geographicAccessLayersModifier = (item: {value: string[], originalValue: string[]}) => {
    let values = item.value as string[];
    let message: string | null = null;
    const messageText = "Cannot remove policy enforced access layers."
    
    // policy enforced layers
    const geographicAccessLayers = this.state.selectedDocument.documentAccessLayers?.geographic
    // if no enforced layers, return
    if (!geographicAccessLayers?.length) return {value: values, additionalMessage: message};
    // if select all has removed everything, return policy enforced layers
    if (!values.length) return {value: geographicAccessLayers, additionalMessage: messageText};
    // else, find if an enforced access layer has been removed
    for (let layer of geographicAccessLayers) {
      if (!values.includes(layer)) {
        return {value: item.originalValue, additionalMessage: messageText}
      }
    }
    return {value: values, additionalMessage: message};
  }

  render = () => {
    const { isUploadOpen, isEditOpen, isDeleteOpen, isReqStatusOpen, selectedFile, selectedDocument } = this.state;
    
    const columns = [
      {
        key: "docRequirement",
        name: "Document Requirement",
        minWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: EnhancedDocumentRequirement) => (
          <Text styles={{ root: { whiteSpace: "pre-wrap" } }}>{item.name}<span hidden={!item.isMandatory} style={{ color: "red" }}>*</span></Text>
        ),
      },
      {
        key: "status",
        name: "Status",
        minWidth: 100,
        isResizable: true,
        onRender: (item: EnhancedDocumentRequirement) => (
          <Text styles={{ root: { whiteSpace: "pre-wrap" } }}>{item.status ?? "In Progress"}</Text>
        ),
      },
      {
        key: "linedDocuments",
        name: "Linked Documents",
        minWidth: 200,
        isResizable: true,
        onRender: (item: EnhancedDocumentRequirement) => (
          <>
            {item.documents?.map((doc) => {
              const documentLink = (
                <Link style={{ textDecoration: "none" }} styles={{ root: { color: "rgb(50, 49, 48)", whiteSpace: "pre-wrap", ":hover": { color: "rgb(50, 49, 48)" }, ":a:visited": { color: "rgb(50, 49, 48)" } } }} disabled={doc.status !== "Completed"} onClick={() => { this.onDocumentClick(doc) }}>
                  {doc.fileName}
                </Link>)
              return (
                <div key={"documentStack-" + doc.id + "-" + doc.documentKey} style={{ backgroundColor: "rgb(243, 242, 241)", padding: "5px", width: "fit-content", maxWidth: "90%", display: "flex" }}>
                  {doc.status === "Forbidden" ? <TooltipHost content="Insufficient permissions to access document.">{documentLink}</TooltipHost> : documentLink}
                  {this.props.isReadOnly ? ('') : doc.status ? ( doc.status === "Forbidden" ? ('') : (doc.status === "Completed" ? (
                      <IconButton onClick={() => { this.onDocumentDeleteClick(doc) }} styles={{ root: { color: 'black', width: 20, height: 20, margin: "auto", paddingRight: 0 }, icon: { fontSize: 10 } }} iconProps={{ iconName: 'Cancel' }} ariaLabel="Close popup modal"></IconButton>
                    ) : (
                      <Spinner styles={{ root: { display: "inline-flex", marginLeft: 5 }, circle: { width: 12, height: 12 } }} />
                    )
                  )) : ('')}
                </div>
              );
            })}
          </>
        ),
      },
      {
        key: "actions",
        name: "Actions",
        minWidth: 150,
        isResizable: true,
        onRender: (item: EnhancedDocumentRequirement) => {
          const editableDocumentsLength = item.documents?.filter(document => { return document.hasRequiredAccessLayers }).length;
          return (
          <>
            <DefaultButton key={"docButton1" + item.id} onClick={() => this.onUploadClick(item)} text="Upload" styles={{ root: { marginRight: 5 } }} disabled={ this.props.isReadOnly } />
            <TooltipHost tooltipProps={{ onRenderContent: () => (<>Edit document metadata</>) }}>
              <IconButton key={"docButton2" + item.id} onClick={() => this.onEditClick(item)} disabled={!editableDocumentsLength} styles={{ root: { color: 'black', width: 20, ":disabled": { backgroundColor: "white" } }, icon: { fontSize: 14 } }} iconProps={{ iconName: 'Edit' }} />
            </TooltipHost>
            <TooltipHost tooltipProps={{ onRenderContent: () => (<>Edit requirement status</>) }}>
              <IconButton key={"docButton3" + item.id} onClick={() => this.onReqStatusClick(item)} disabled={item.accessLevel !== "Full Access"} styles={{ root: { color: 'black', width: 20, ":disabled": { backgroundColor: "white" }}, icon: { fontSize: 14 } }} iconProps={{ iconName: 'SkypeCircleCheck' }} />
            </TooltipHost>
          </>
        )}
      }
    ];

    let id = (this.props.metadata && this.props.metadata?.length) ? this.props.metadata[0]?.id : "12345";
    let initialData = {} as Dictionary<any>;
    if (selectedFile?.files?.length) {
      initialData["name"] = selectedFile.files[0].name.substring(0, selectedFile.files[0].name.lastIndexOf('.'));
      if (selectedDocument.documentAccessLayers?.businessRelated?.length) initialData["businessRelatedAccessLayers"] = selectedDocument.documentAccessLayers?.businessRelated?.join("|");
      if (selectedDocument.documentAccessLayers?.geographic?.length) initialData["geographicAccessLayers"] = selectedDocument.documentAccessLayers?.geographic?.join("|");
    }

    let fieldModifiers = { businessRelatedAccessLayers: this.businessRelatedAccessLayersModifier, geographicAccessLayers: this.geographicAccessLayersModifier };

    return (
      <div key={"DocRequirementsGridWrapper-" + id}>
        <DetailsList
          key={"DocRequirementsGrid-" + id}
          items={this.props.metadata}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          styles={{ contentWrapper: { selectors: { ".ms-DetailsRow-fields": { backgroundColor: "white !important" } } } }}
        />
        <input type="file" ref={this.hiddenFileInput} onChange={this.onDocumentUploaded} style={{ display: 'none' }} />
        <Modal key="documentUploadModal" titleAriaId={"id"}
          isBlocking={true}
          isOpen={isUploadOpen}
          onDismiss={this.onDismissModal}>
          <ModalContent key="documentUploadModalContent" title="Document Upload" onDismissClick={this.onDismissModal}>
            <DocumentUploadModal onDismissModal={this.onDismissAndRefresh} key={"DocumentUploadModalCompoent-" + id} selectedDocument={selectedDocument} selectedFile={selectedFile} initialData={initialData} fieldModifiers={fieldModifiers} />
          </ModalContent>
        </Modal>
        <Modal key="documentDeleteModal" titleAriaId={"id"}
          isBlocking={true}
          isOpen={isDeleteOpen}
          onDismiss={this.onDismissModal}>
          <ModalContent width={350} key="documentDeleteModalContent" title="Confirm Deletion" onDismissClick={this.onDismissModal}>
            <DocumentDeleteModal onDismissAndRefresh={this.onDismissAndRefresh} onDismissModal={this.onDismissAndRefresh} key={"DocumentDeleteModalCompoent-" + id} selectedDocument={selectedDocument} />
          </ModalContent>
        </Modal>
        <Modal key="documentReqStatusModal" titleAriaId={"id"}
          isBlocking={true}
          isOpen={isReqStatusOpen}
          onDismiss={this.onDismissModal}>
          <ModalContent key="documentReqStatusModalContent" title="Document Requirement Status" onDismissClick={this.onDismissModal}>
            <DocumentReqStatusModal onDismissAndRefresh={this.onDismissAndRefresh} onDismissModal={this.onDismissModal} key={"DocumentReqStatusModalCompoent-" + id} selectedDocument={selectedDocument} isReadOnly={this.props.isReadOnly} />
          </ModalContent>
        </Modal>
        <Modal key="documentEditModal" titleAriaId={"id"}
          isBlocking={true}
          isOpen={isEditOpen}
          onDismiss={this.onDismissModal}>
          <ModalContent key="documentEditModalContent" title="Document Edit" onDismissClick={this.onDismissModal}>
            <DocumentEditModal onDismissModal={this.onDismissAndRefresh} key={"DocumentEditModalComponent-" + id} selectedDocument={selectedDocument} isReadOnly={this.props.isReadOnly} fieldModifiers={fieldModifiers}/>
          </ModalContent>
        </Modal>
        {this.renderPermissionModal()}
      </div>
    );
  }

  onDismissModal = () => {
    if (this.hiddenFileInput?.current) this.hiddenFileInput.current.value = "";
    this.setState({ isUploadOpen: false, isDeleteOpen: false, isEditOpen: false, isReqStatusOpen: false });
    this.startRefreshInterval();
    this.onValidateRequirements();
  }

  onDismissAndRefresh = () => {
    if (this.hiddenFileInput?.current) this.hiddenFileInput.current.value = "";
    if (this.props.onRefresh) this.props.onRefresh();
    this.startRefreshInterval();
    this.setState({ isUploadOpen: false, isDeleteOpen: false, isEditOpen: false, isReqStatusOpen: false });
    this.onValidateRequirements();
  }
}

export async function DocumentMetadata(accessLayers: UserAccessLayerDto[]) {
  const distinct = (item: any, index: number, self: any[]) => { return self.indexOf(item) === index; }
  const business = accessLayers.filter((al) => { return al.type! === AccessLayerTypeDto.BusinessRelated && al.dataType === "Document" }).map((al) => { return al.label }).filter(distinct);
  const geographic = accessLayers.filter((al) => { return al.type! === AccessLayerTypeDto.Geographic && al.dataType === "Document" }).map((al) => { return al.label }).filter(distinct);
  const documentDataGroup = await new DataGroupManager().getDataGroupByName("Document Metadata");
  const metadataFields = documentDataGroup?.dataGroupFields?.map((dgf) => {
    const req = dgf as DataRequirement;
    req.category = "Data Group";
    req.id = dgf.identifier;
    req.type = "Data"
    return req;
  }) ?? [];

  return {
    metadata: [
      {
        id: "documentName-12345679",
        name: "Name",
        dataField: {
          propertyName: "name",
          propertyType: "text"
        },
        validationRule: { validationData: { isMandatory: { active: true } } },
        category: "Document Metadata",
        type: "Data"
      },
      {
        id: "documentType-12345679",
        name: "Document Type",
        dataField: {
          propertyName: "documentType",
          propertyType: "select",
          propertyTypeId: await new LookupManager().getLookupIdByName("Document Type")
        },
        validationRule: { validationData: { isMandatory: { active: true } } },
        category: "Document Metadata",
        type: "Data"
      },
      {
        id: "businessRelatedAccessLayers-12345679",
        name: "Business Related Access Layers",
        dataField: {
          propertyName: "businessRelatedAccessLayers",
          propertyType: "multiselect",
          resolvedLookups: { values: business } as LookupVersionDto
        },
        validationRule: { validationData: { isMandatory: { active: false } } },
        category: "Document Metadata",
        type: "Data"
      } as any,
      {
        id: "geographicAccessLayers-12345679",
        name: "Geographic Access Layers",
        dataField: {
          propertyName: "geographicAccessLayers",
          propertyType: "multiselect",
          resolvedLookups: { values: geographic } as LookupVersionDto
        },
        validationRule: { validationData: { isMandatory: { active: false } } },
        category: "Document Metadata",
        type: "Data"
      },
      ...metadataFields.sort((m1, m2) => { return (m1.order ?? 0) - (m2.order ?? 0) })
    ] as DataRequirement[], dataGroup: documentDataGroup
  };
};