import { IconButton, Stack } from "@fluentui/react";
import React from "react";
import { ModalStyle } from "../../styles/modal";

export interface IModalContent extends React.PropsWithChildren {
    onDismissClick: () => void;
    title: string;
    width?: number
}

export class ModalContent extends React.Component<IModalContent> {
    static counter = 0;

    render = () => {
        return (
            <Stack key={"ModalContent" + (ModalContent.counter++).toString()} styles={{ root: { width: this.props.width ?? ModalStyle.width, margin: "1.5rem 1.5rem 0 1.5rem" } }}>
                <Stack.Item>
                    <Stack horizontal styles={{ root: { minWidth: 300, verticalAlign: "middle", alignItems: "center", marginBottom: 20 } }}>
                        <Stack.Item grow={true} styles={{ root: { paddingLeft: 10 } }}><h1 style={{ fontFamily: ModalStyle.fontFamily, fontSize: "1.21429rem", color: "rgb(51, 51, 51)", margin: 0 }}>{this.props.title}</h1></Stack.Item>
                        <Stack.Item grow={false}><IconButton styles={{ root: { color: 'black' } }} iconProps={{ iconName: 'Cancel' }} ariaLabel="Close popup modal" onClick={this.props.onDismissClick}></IconButton></Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item>
                    {this.props.children}
                </Stack.Item>
            </Stack>
        );
    }

}