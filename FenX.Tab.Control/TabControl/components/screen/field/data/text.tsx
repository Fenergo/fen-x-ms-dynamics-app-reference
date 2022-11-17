import { IRenderFunction, IStyle, ITextFieldProps, Stack, TextField } from "@fluentui/react";
import React from "react";
import { FieldStyles } from "../../../../styles/field";
import { FieldLabel } from "./fieldLabel";
import { FieldValidationMessage } from "./fieldValidationMessage";
import { ISimpleFieldType } from "./simpleFieldType";

export class TextFieldComponent extends React.Component<ISimpleFieldType> {
    state = { validationMessages: [] as string[] }

    componentDidMount = () => {
        const value = this.props.data![this.props.metadata.dataField?.propertyName!] ?? this.props.metadata.defaultValue;
        if (value && this.props.onChange) {
            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                value: value,
                type: "Single"
            });
        }
        this.validateChange(value, false);
    }

    onValueChange = (event: React.FocusEvent<HTMLInputElement, HTMLTextAreaElement>) => {
        let newValue = event.target.value;
        if (this.props.fieldModifier) newValue = this.props.fieldModifier(newValue).value as string;
        this.validateChange(newValue, true);
        if (this.props.onChange) {
            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                originalEvent: event,
                value: newValue,
                type: "Single"
            });
        }
    }

    validateChange = (newValue: any, showValidationErrors: boolean = false) => {
        if (!this.props.onValidate) return;

        let isValid = true;
        var messages = [];
        let value = newValue as string;
        if (this.props.metadata.validationRule?.validationData?.isMandatory?.active && !newValue) {
            isValid = false;
            messages.push(this.props.metadata.validationRule?.validationData?.isMandatory?.message);
        }

        if (this.props.metadata.validationRule?.validationData?.regex?.active && (newValue as string)?.length) {
            let flags = this.props.metadata.validationRule?.validationData?.regex?.isCaseSensitive ? "i" : "";
            let regex = new RegExp(this.props.metadata.validationRule?.validationData?.regex?.regexValue!, flags);
            if (!regex.test(value)) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.regex?.message);
            }
        }

        if (this.props.metadata.validationRule?.validationData?.characterLimit?.active && value?.length) {
            const numberCharacters = value.length;
            const minValue = this.props.metadata.validationRule?.validationData?.characterLimit?.minValue;
            const maxValue = this.props.metadata.validationRule?.validationData?.characterLimit?.maxValue;
            if ((minValue && numberCharacters < minValue) || (maxValue && numberCharacters > maxValue)) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.characterLimit?.message);
            }
        }
        
        if (this.props.metadata.validationRule?.validationData?.noNumbers?.active) {
            const regex = new RegExp("[0-9]");
            if (regex.test(value)) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.noNumbers.message);
            }
        }

        if (this.props.metadata.validationRule?.validationData?.specialCharacters?.active && (newValue as string)?.length) {
            const specialCharacters =  this.props.metadata.validationRule?.validationData?.specialCharacters?.excludedCharacters ? this.props.metadata.validationRule?.validationData?.specialCharacters?.excludedCharacters.join("") : "";
            const regex = new RegExp("^[\\sa-zA-Z0-9" + specialCharacters + "]*$");
            if (!regex.test(value)) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.specialCharacters?.message);
            }
        }

        if(this.props.metadata.isReadOnly || this.props.isReadOnly) isValid=true;
        this.props.onValidate({
            field: this.props.metadata.dataField?.propertyName!,
            isValid: isValid
        });

        if (showValidationErrors) this.setState({ validationMessages: messages });
    }

    render = () => {
        const onRenderLabel: IRenderFunction<ITextFieldProps> = () => (<></>);
        const { validationMessages } = this.state;

        const initialValue = this.props.data![this.props.metadata.dataField?.propertyName!] ?? this.props.metadata.defaultValue;
        const isTextArea = this.props.metadata.dataField?.propertyType === "textArea";

        let textFieldProps = {};

        if (this.props.metadata.hasEvaluatedConditionalValue) {
            textFieldProps = {
                styles: { field: FieldStyles(true) as IStyle },
                value: initialValue
            };
        } else {
            textFieldProps = {
                styles: { field: FieldStyles(this.props.isReadOnly ?? this.props.metadata.isReadOnly) as IStyle },
                defaultValue: initialValue
            };
        }

        return (
            <Stack horizontal>
                <Stack.Item>
                    <FieldLabel metadata={this.props.metadata} isReadOnly={this.props.isReadOnly}></FieldLabel>
                </Stack.Item>
                <Stack.Item >
                    <Stack >
                        <Stack.Item>
                            <TextField
                                key={"TextField-" + this.props.metadata.id}
                                id={"txt" + this.props.metadata.id}
                                required={this.props.metadata.validationRule?.validationData?.isMandatory?.active}
                                onRenderLabel={onRenderLabel}
                                placeholder="---"
                                label={this.props.metadata.name}
                                borderless
                                onBlur={this.onValueChange}
                                rows={isTextArea ? 5 : 1}
                                multiline={isTextArea ? true : false}
                                resizable={false}
                                {...textFieldProps}
                                readOnly={this.props.isReadOnly || this.props.metadata.isReadOnly}
                            >
                            </TextField>
                        </Stack.Item>
                        <Stack.Item>
                            <FieldValidationMessage key={"fvm-" + this.props.metadata.id} messages={validationMessages} />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>
        );
    }
}