import { ComboBox, IComboBox, IComboBoxOption, IOnRenderComboBoxLabelProps, IRenderFunction, IStyle, ITextFieldProps, Stack, TextField } from "@fluentui/react";
import React from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { LookupVersionDto } from "../../../../services/Clients/LookupQueryClient";
import { ComboBoxStyles, FieldStyles } from "../../../../styles/field";
import { LookupManager } from "../../../utility/lookupManager";
import { EnhancedDataField } from "../field";
import { FieldLabel } from "./fieldLabel";
import { FieldValidationMessage } from "./fieldValidationMessage";
import { ISimpleFieldType } from "./simpleFieldType";
import { Notification } from "../../../utility/notification";

interface ISelectFieldType extends ISimpleFieldType {
    handleFieldPermission?: (apiCall: Promise<any>) => Promise<any>;
}

export class SelectFieldComponent extends React.Component<ISimpleFieldType> {
    state = { options: [] as IComboBoxOption[], selectedValue: "" as string, validationMessages: [] as string[] }

    fenXClient = FenXApi.getInstance();
    componentDidMount = async () => {
        const { selectedValue } = this.state;
        const lookupManager = new LookupManager();
        const isStatusField = this.props.metadata.dataField?.propertyType === "status";
        
        let lookup = {} as LookupVersionDto | null;
        // select field
        if (this.props.metadata.dataField?.propertyType === "select") {
            if ((this.props.metadata.dataField as EnhancedDataField).resolvedLookups)
                lookup = (this.props.metadata.dataField as EnhancedDataField).resolvedLookups;
            else
                lookup = this.props.handleFieldPermission ? 
                    await this.props.handleFieldPermission(lookupManager.getLookup(this.props.metadata.dataField?.propertyTypeId!)).catch((error) => { Notification.showError("Error retrieving lookup.", error)}) : 
                    await lookupManager.getLookup(this.props.metadata.dataField?.propertyTypeId!).catch((error) => { Notification.showError("Error retrieving lookup.", error)}) ;
        } 
        // link select field
        if (this.props.metadata.dataField?.propertyType === "selectLink") {
            let lookupId = this.props.handleFieldPermission ? 
                await this.props.handleFieldPermission(lookupManager.getLinkLookup(this.props.metadata.dataField?.propertyTypeId!)).catch((error) => { Notification.showError("Error retrieving link lookup.", error)})  : 
                await lookupManager.getLinkLookup(this.props.metadata.dataField?.propertyTypeId!).catch((error) => { Notification.showError("Error retrieving link lookup.", error)})  ;
            lookup = this.props.handleFieldPermission ? 
                await this.props.handleFieldPermission(lookupManager.getLookup(lookupId?.parentLookupId!)).catch((error) => { Notification.showError("Error retrieving lookup.", error)})  : 
                await lookupManager.getLookup(lookupId?.parentLookupId!).catch((error) => { Notification.showError("Error retrieving lookup.", error)}) ;
        } 
        //status field
        if (isStatusField) {
            this.setState({selectedValue: this.props.metadata.defaultValue});
        }

        if (lookup && !isStatusField) {
            let options = lookup.values!.map((item) => {
                return { text: item, key: item, id: item } as IComboBoxOption;
            });
            let firstOption = [{ text: "--Select--", key: "empty", id: "empty" } as IComboBoxOption];
            options = [...firstOption, ...options];
            this.setState({ options: options, selectedValue: this.props.data![this.props.metadata.dataField?.propertyName!] ?? this.props.metadata.defaultValue });
        }

        let value: string;
        if (this.props.data![this.props.metadata.dataField?.propertyName!]) {
            value = this.props.data![this.props.metadata.dataField?.propertyName!];
        } else if (this.props.metadata.defaultValue) {
            value = this.props.metadata.defaultValue;
        } else {
            value = "";
        }
        
        if (this.props.onChange && value?.length) {
            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                value: value,
                type: "Single"
            });
        }

        this.validateChange({} as React.FormEvent, value);
    }

    getLookups = () => {
        const { options } = this.state;
        if ((this.props.metadata.dataField as EnhancedDataField).resolvedLookups) {
            let lookup = (this.props.metadata.dataField as EnhancedDataField).resolvedLookups;
            let newOptions = lookup.values?.map((item) => {
                return { text: item, key: item, id: item } as IComboBoxOption;
            });
            let firstOption = [{ text: "--Select--", key: "empty", id: "empty" } as IComboBoxOption];
            return newOptions ? [...firstOption, ...newOptions] : firstOption;
        }

        return options;
    }

    onValueChange = (event: React.FormEvent, newValue: any) => {
        let value = newValue?.key === "empty" ? null : newValue?.key;
        if(this.props.fieldModifier) value = this.props.fieldModifier(value).value as string;
        this.validateChange(event, value, true);
        if (this.props.onChange) {
            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                originalEvent: event,
                value: value,
                type: "Single"
            });
        }
        if (newValue?.key === "empty") this.setState({ selectedValue: null });
        else this.setState({ selectedValue: newValue?.key });
    }

    validateChange = (event: React.FormEvent, newValue: any, showValidationErrors: boolean = false) => {
        if (!this.props.onValidate) return;

        let isValid = true;
        var messages = [];
        if (this.props.metadata.validationRule?.validationData?.isMandatory?.active && !(newValue)) {
            isValid = false;
            messages.push(this.props.metadata.validationRule?.validationData?.isMandatory?.message);
        }
        
        if(this.props.metadata.isReadOnly || this.props.isReadOnly) isValid=true;
        this.props.onValidate({
            field: this.props.metadata.dataField?.propertyName!,
            isValid: isValid
        });

        if (showValidationErrors) this.setState({ validationMessages: messages });
    }

    onComboboxValueChange = (event: React.FormEvent<IComboBox>, newValue: any) => {
      let value = newValue?.key === "empty" ? null : newValue?.key;
      if (this.props.fieldModifier) value = this.props.fieldModifier(value).value as string;
      this.validateComboBoxChange(event, value, true);
      if (this.props.onChange) {
        this.props.onChange({
          key: this.props.metadata.dataField?.propertyName!,
          originalComboBoxEvent: event,
          value: value,
          type: "Single",
        });
      }
      if (newValue?.key === "empty") this.setState({ selectedValue: null });
      else this.setState({ selectedValue: newValue?.key });
    };
  
    validateComboBoxChange = (event: React.FormEvent<IComboBox>, newValue: any, showValidationErrors: boolean = false) => {
      if (!this.props.onValidate) return;
  
      let isValid = true;
      var messages = [];
      if (this.props.metadata.validationRule?.validationData?.isMandatory?.active && !newValue) {
        isValid = false;
        messages.push(this.props.metadata.validationRule?.validationData?.isMandatory?.message);
      }
  
      if (this.props.metadata.isReadOnly || this.props.isReadOnly) isValid = true;
      this.props.onValidate({
        field: this.props.metadata.dataField?.propertyName!,
        isValid: isValid,
      });
  
      if (showValidationErrors) this.setState({ validationMessages: messages });
    };

    render = () => {
        const { options, selectedValue, validationMessages } = this.state;
        const isStatusField = this.props.metadata.dataField?.propertyType === "status";
        const isReadOnly = this.props.isReadOnly || this.props.metadata.isReadOnly || isStatusField;
        const onRenderLabel: IRenderFunction<IOnRenderComboBoxLabelProps> = (props) => <></>;
        const onRenderTextLabel: IRenderFunction<ITextFieldProps> = props => (<></>);
        const resolvedOptions = this.getLookups();
        return (
            <Stack horizontal>
                <Stack.Item>
                    <FieldLabel metadata={this.props.metadata} isReadOnly={isReadOnly}></FieldLabel>
                </Stack.Item>
                <Stack.Item>
                    <Stack>
                        <Stack.Item>
                            {!isReadOnly ?
                                (<ComboBox
                                  required={this.props.metadata.validationRule?.validationData?.isMandatory?.active}
                                  onRenderLabel={onRenderLabel}
                                  placeholder="---"
                                  onChange={this.onComboboxValueChange}
                                  options={resolvedOptions}
                                  selectedKey={selectedValue}
                                  label={this.props.metadata.name}
                                  allowFreeform={true}
                                  styles={
                                    { container: { ...ComboBoxStyles()} as IStyle,
                                    input: {fontWeight: ComboBoxStyles().fontWeight} as IStyle
                                  }}
                                ></ComboBox>)
                                : (
                                <TextField id={"txt" + this.props.metadata.id} required={this.props.metadata.validationRule?.validationData?.isMandatory?.active}
                                    onRenderLabel={onRenderTextLabel}
                                    placeholder="---"
                                    label={this.props.metadata.name}
                                    borderless
                                    readOnly
                                    styles={{ field: FieldStyles(true) as IStyle }}
                                    onChange={this.onValueChange}
                                    value={this.props.data![this.props.metadata.dataField?.propertyName!]}></TextField>
                            )}
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