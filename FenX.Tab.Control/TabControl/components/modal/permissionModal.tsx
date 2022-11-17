import React from 'react';
import { Text, Modal, PrimaryButton, Stack, IconButton } from '@fluentui/react';
import { ModalStyle } from '../../styles/modal';
import { UserProfileManager } from '../utility/userProfileManager';

export interface IPermission {
    permissionModalIsOpen: boolean;
    message: string;
    type: string;
}

export abstract class PermissionModal<T> extends React.Component<T> {
    state: IPermission = { permissionModalIsOpen: false, message: "", type: "" };

    executeWithPermissionHandling = async (apiCall: Promise<any>) => {
        return apiCall.catch((error) => {
            if (error?.messages?.length) {
                for (let message of error.messages) {
                    if (message.type === "Forbidden") {
                        this.setState({ 
                            permissionModalIsOpen: true, 
                            type: message.type, 
                            message: message.message 
                        })
                    }
                }
            }
            throw error;
        })
    }

    checkUserHasPermission = async (scope: string) => {
        const userProfileManager = new UserProfileManager();
        const userTeams = (await userProfileManager.getUserProfile())?.teams
        
        if (userTeams) {
            for (let team of userTeams) {
                if (team.scopes?.includes(scope)) { return true; }
            }
        }

        this.setState({ 
            permissionModalIsOpen: true, 
            type: "Forbidden", 
            message: "Access Denied. The following permission is required: " + scope 
        })
        return false;
    }

    onPermissionModalDismiss = () => {
        this.setState({ permissionModalIsOpen: false });
    }

    renderPermissionModal = () => {
        const { permissionModalIsOpen, message, type } = this.state;

        return (
            <Modal
                key="AccessDeniedModal"
                isOpen={permissionModalIsOpen}
                onDismiss={() => this.onPermissionModalDismiss()}
                >
                <Stack key={"AccessDeniedModal"} styles={{ root: { width: 340, margin: "1.5rem" } }} tokens={{ childrenGap: 20 }}>
                    <Stack.Item>
                        <Stack horizontal styles={{ root: { minWidth: 300, verticalAlign: "center", alignItems: "center" } }}>
                            <Stack.Item grow={false}><IconButton iconProps={{ iconName: "error"}} styles={{ root: {color: "red" }, icon: {fontSize: 24} }}></IconButton></Stack.Item>
                            <Stack.Item grow={true} styles={{ root: { paddingLeft: 10 } }}><h1 style={{ fontFamily: ModalStyle.fontFamily, fontSize: "1.21429rem", color: "rgb(51, 51, 51)", margin: 0 }}>{type}</h1></Stack.Item>
                            <Stack.Item grow={false}><IconButton styles={{ root: { color: 'black' } }} iconProps={{ iconName: 'Cancel' }} ariaLabel="Close popup modal" onClick={() => this.onPermissionModalDismiss()}></IconButton></Stack.Item>
                        </Stack>
                    </Stack.Item>
                    <Stack.Item align="stretch">
                        <Text>{message}</Text>
                    </Stack.Item>
                    <Stack.Item align="end">
                        <PrimaryButton onClick={() => this.onPermissionModalDismiss()}>OK</PrimaryButton>
                    </Stack.Item>
                </Stack>
            </Modal>
        )
    }
}


