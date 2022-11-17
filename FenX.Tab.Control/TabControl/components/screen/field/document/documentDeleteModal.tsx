import { DefaultButton, PrimaryButton, Text } from "@fluentui/react";
import React from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { Notification } from "../../../utility/notification";
import { DocumentModelDto } from "../../../../services/Clients/DocumentManagementQueryClient";
import { PermissionModal } from "../../../modal/permissionModal";

interface IDocumentDeleteModal {
    selectedDocument: DocumentModelDto,
    onDismissModal: () => void,
    onDismissAndRefresh: () => void
}

export class DocumentDeleteModal extends PermissionModal<IDocumentDeleteModal> {
    fenXClient = FenXApi.getInstance();

    onConfirmClick = () => {
        this.executeWithPermissionHandling(this.fenXClient.removeDocument(this.props.selectedDocument.id!).then(() => {
            this.props.onDismissAndRefresh();
        })).catch((error) => { Notification.showError("Error deleting document.", error) });
    }

    render = () => {
        return (
            <>
                <div style={{ padding: "0 10px 0 10px" }}>
                    <Text>Are you sure you want to permanently delete '{this.props.selectedDocument.fileName}'?</Text>
                </div>
                <div style={{ padding: "20px 10px 35px 0px", textAlign: "right", marginTop: 20 }}>
                    <DefaultButton key="btnDeleteCancel" style={{ marginRight: 10 }} onClick={this.props.onDismissModal}>Cancel</DefaultButton>
                    <PrimaryButton key="btnDeleteConfirm" onClick={this.onConfirmClick}>Confirm</PrimaryButton>
                </div>
                {this.renderPermissionModal()}
            </>
        )
    }
}