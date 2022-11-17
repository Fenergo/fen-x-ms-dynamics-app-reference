import { Icon, Stack } from "@fluentui/react";
import React from "react";

interface IFieldValidationMessage {
    messages: string[]
}

export class FieldValidationMessage extends React.Component<IFieldValidationMessage> {
    
    static fvm: 0;

    render = () => {
        const validationMessages = this.props.messages;
        const id = (FieldValidationMessage.fvm++).toString();
        return (
            <div key={"fvm" + id}>
                {(validationMessages.length) ?
                    (<Stack key={"fvmStack1-" + id} horizontal styles={{ root: { marginTop: 5, backgroundColor: "rgba(191, 9, 0, 0.075);", padding: "0.5rem" } }}>
                        <Stack.Item key={"fvmStack1Item1-" + id} styles={{ root: { color: "rgb(191, 9, 0)", paddingRight: 5, fontWeight: 600 } }}><Icon iconName="ErrorBadge"></Icon></Stack.Item>
                        <Stack.Item key={"fvmStack1Item2-" + id}>
                            <Stack key={"fvmStack2-" + id}>
                                {validationMessages.map((message, index) => {
                                    return (<Stack.Item key={"fvmStack2Item1-" + index.toString() + "-" + id}><span><small style={{ color: "rgb(191, 9, 0)", fontWeight: 600, wordBreak: "break-word" }}>{message}</small></span></Stack.Item>);
                                })}
                            </Stack>
                        </Stack.Item>
                    </Stack>)
                    : ('')}
            </div>
        );
    }
}