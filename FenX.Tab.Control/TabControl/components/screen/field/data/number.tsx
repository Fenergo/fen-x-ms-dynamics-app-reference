import { IRenderFunction, IStyle, ITextFieldProps, ITooltipHostStyles, ITooltipProps, Label, Stack, TextField, Tooltip, TooltipHost } from "@fluentui/react";
import React from "react";
import { FieldStyles } from "../../../../styles/field";
import { FieldLabel } from "./fieldLabel";
import { FieldValidationMessage } from "./fieldValidationMessage";
import { ISimpleFieldType } from "./simpleFieldType";

export class NumberFieldComponent extends React.Component<ISimpleFieldType> {
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
        if(this.props.fieldModifier) newValue = this.props.fieldModifier(newValue).value as string;
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
        
        let isNumber = true;
        if (isNaN(newValue)) {
            isNumber = false;
        } else {
            newValue = Number(newValue);
        }

        const validationData = this.props.metadata.validationRule?.validationData;
        let isValid = true;
        var messages = [];
        if(validationData) {
            if (validationData.isMandatory?.active && !newValue) {
                isValid = false;
                messages.push(validationData.isMandatory?.message);
            } 
            if (validationData.noNegative?.active && isNumber && newValue < 0) {
                isValid = false;
                messages.push(validationData.noNegative?.message);
            }
            if (validationData.onlyDecimal?.active && isNumber && !this.validateDecimals(newValue)) {
                isValid = false;
                messages.push(validationData.onlyDecimal?.message);
            }
            if (validationData.onlyInteger?.active && isNumber && !Number.isInteger(newValue)) {
                isValid = false;
                messages.push(validationData.onlyInteger?.message);
            }
            if (validationData.numberLimit?.active && isNumber) {
                if(validationData.numberLimit?.minValue && 
                    newValue < validationData.numberLimit?.minValue!) {
                        isValid = false;
                        messages.push(validationData.numberLimit?.message);
                } 
                else if(validationData.numberLimit?.maxValue && 
                    newValue > validationData.numberLimit?.maxValue!) {
                        isValid = false;
                        messages.push(validationData.numberLimit?.message);
                }
            }
            if (!isNumber && isValid) {
                isValid = false;
                messages.push("This field should be a number");
            }  
        }
        
        if(this.props.metadata.isReadOnly || this.props.isReadOnly) isValid=true;
        this.props.onValidate({
            field: this.props.metadata.dataField?.propertyName!,
            isValid: isValid
        });
        if (showValidationErrors) this.setState({ validationMessages: messages });
    }

    validateDecimals = (val: number) => {
        const compareVal = Number(val.toFixed(2));
        if (compareVal == val) {
            return true;
        }

        return false;
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
        };} else {
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
                                multiline={ isTextArea ? true : false}
                                resizable={false}
                                {...textFieldProps}
                                readOnly={this.props.isReadOnly || this.props.metadata.isReadOnly}
                                type="text"
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