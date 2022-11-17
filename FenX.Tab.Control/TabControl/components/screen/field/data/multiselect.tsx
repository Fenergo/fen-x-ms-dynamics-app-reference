import React from "react";
import { ISimpleFieldType } from "./simpleFieldType";
import { ComboBox, IComboBoxOption, IStyle, Stack, TextField, TooltipHost } from "@fluentui/react";
import { FieldLabel } from "./fieldLabel";
import { FieldValidationMessage } from "./fieldValidationMessage";
import { ComboBoxStyles, FieldStyles } from "../../../../styles/field";
import { LookupManager } from "../../../utility/lookupManager";
import { LookupVersionDto } from "../../../../services/Clients/LookupQueryClient";
import { EnhancedDataField } from "../field";
import { Notification } from "../../../utility/notification";

export class MultiselectFieldComponent extends React.Component<ISimpleFieldType> {
  state = { options: [] as IComboBoxOption[], validationMessages: [] as string[], selectedValues: [] as string[], isMouseEnter: false as boolean };
  firstOptionText: string = "Select all";

  componentDidMount = async () => {
    const lookupManager = new LookupManager();
    let lookup = {} as LookupVersionDto | null;

    if (this.props.metadata.dataField?.propertyType === "multiselect")
      if ((this.props.metadata.dataField as EnhancedDataField).resolvedLookups) lookup = (this.props.metadata.dataField as EnhancedDataField).resolvedLookups;
      else
        lookup = this.props.handleFieldPermission
          ? await this.props.handleFieldPermission(lookupManager.getLookup(this.props.metadata.dataField?.propertyTypeId!)).catch((error) => {
              Notification.showError("Error retrieving lookup.", error);
            })
          : await lookupManager.getLookup(this.props.metadata.dataField?.propertyTypeId!).catch((error) => {
              Notification.showError("Error retrieving lookup.", error);
            });
    else {
      let lookupId = this.props.handleFieldPermission
        ? await this.props.handleFieldPermission(lookupManager.getLinkLookup(this.props.metadata.dataField?.propertyTypeId!)).catch((error) => {
            Notification.showError("Error retrieving link lookup.", error);
          })
        : await lookupManager.getLinkLookup(this.props.metadata.dataField?.propertyTypeId!).catch((error) => {
            Notification.showError("Error retrieving link lookup.", error);
          });
      lookup = this.props.handleFieldPermission
        ? await this.props.handleFieldPermission(lookupManager.getLookup(lookupId?.parentLookupId!)).catch((error) => {
            Notification.showError("Error retrieving lookup.", error);
          })
        : await lookupManager.getLookup(lookupId?.parentLookupId!).catch((error) => {
            Notification.showError("Error retrieving lookup.", error);
          });
    }

    let valueList: string[] = [];
    if (lookup) {
      let options = lookup.values!.map((item) => {
        return { text: item, key: item, id: item } as IComboBoxOption;
      });
      let firstOption = [{ text: this.firstOptionText, key: this.firstOptionText, id: this.firstOptionText } as IComboBoxOption];
      options = [...firstOption, ...options];

      // set state to current value / default value / empty list
      if (this.props.data![this.props.metadata.dataField?.propertyName!]) {
        valueList = this.props.data![this.props.metadata.dataField?.propertyName!].split("|");
      } else if (this.props.metadata.defaultValue) {
        valueList = this.props.metadata.defaultValue?.split("|");
      } else {
        valueList = [];
      }
      
      this.setState({ options: options, selectedValues: valueList });
    }

    // combine selected values into a single string
    const valueString: string = valueList.join("|");

    if (this.props.onChange) {
      this.props.onChange({
        key: this.props.metadata.dataField?.propertyName!,
        value: valueString,
        type: "Single",
      });
    }

    this.validateComboBoxChange({} as React.FormEvent, valueString);
  };

  getLookups = () => {
    const { options } = this.state;
    if ((this.props.metadata.dataField as EnhancedDataField).resolvedLookups) {
      let lookup = (this.props.metadata.dataField as EnhancedDataField).resolvedLookups;
      let newOptions = lookup.values?.map((item) => {
        return { text: item, key: item, id: item } as IComboBoxOption;
      });
      let firstOption = [{ text: this.firstOptionText, key: this.firstOptionText, id: this.firstOptionText } as IComboBoxOption];
      return newOptions ? [...firstOption, ...newOptions] : firstOption;
    }

    return options;
  };

  onComboBoxValueChange = (event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption | undefined): void => {
    const { options } = this.state;

    // add or remove item from list
    let valueList = item?.selected ? [...this.state.selectedValues, item.key as string] : this.state.selectedValues.filter((key) => key !== item?.key);
    let messages: string[] = this.state.validationMessages;
    let valueString: string | null;

    // if Select all is clicked
    if (item?.key === this.firstOptionText) {
      valueList = item.selected
        ? (this.getLookups().map((item) => {
            return item.key;
          }) as string[])
        : ([] as string[]);
    }
    
    if(valueList[0] === this.firstOptionText && options.length != valueList.length) {
      valueList = valueList.slice(1);
    }

    // multiselect behaviour modifier
    if (this.props.fieldModifier) {
      const fieldModiferResult = this.props.fieldModifier({
        value: valueList,
        originalValue: this.state.selectedValues.filter((key) => {
          return key !== this.firstOptionText;
        }),
      });
      valueList = fieldModiferResult.value as string[];
      if (fieldModiferResult.additionalMessage && !messages.includes(fieldModiferResult.additionalMessage)) {
        messages.push(fieldModiferResult.additionalMessage);
      }
    }
    
    // combine select values into a single string    
    valueString = valueList
    .filter((key) => {
      return key !== this.firstOptionText;
    })
    .join("|");
    // validation
    this.validateComboBoxChange(event, valueString, true);

    // change value
    if (this.props.onChange) {
      this.props.onChange({
        key: this.props.metadata.dataField?.propertyName!,
        value: valueString,
        type: "Single",
      });
    }
    // update state
    this.setState({ selectedValues: valueList, validationMessages: messages });
  };

  validateComboBoxChange = (event: React.FormEvent, newValue: any, showValidationErrors: boolean = false) => {
    if (!this.props.onValidate) return;

    let isValid = true;
    var messages = [];
    if (this.props.metadata.validationRule?.validationData?.isMandatory?.active && !newValue) {
      isValid = false;
      messages.push(this.props.metadata.validationRule?.validationData?.isMandatory?.message);
    }

    if (this.props.metadata.validationRule?.validationData?.multiSelectLimit?.active && newValue) {
      const numberSelected = newValue.split("|").length;
      const minValue = this.props.metadata.validationRule?.validationData?.multiSelectLimit?.minValue;
      const maxValue = this.props.metadata.validationRule?.validationData?.multiSelectLimit?.maxValue;
      if ((minValue && numberSelected < minValue) || (maxValue && numberSelected > maxValue)) {
        isValid = false;
        messages.push(this.props.metadata.validationRule?.validationData?.multiSelectLimit?.message);
      }
    }

    if (this.props.metadata.isReadOnly || this.props.isReadOnly) isValid = true;
    this.props.onValidate({
      field: this.props.metadata.dataField?.propertyName!,
      isValid: isValid,
    });

    if (showValidationErrors) this.setState({ validationMessages: messages });
  };

  getKeys = () => {
    // if conditional value
    if (this.props.metadata.hasEvaluatedConditionalValue) {
      const conditionalValue = this.props.data![this.props.metadata.dataField?.propertyName!] ?? this.props.metadata.defaultValue;
      return { value: conditionalValue.split("|").join(", ") };
    }
    // if read only
    if (this.props.isReadOnly || this.props.metadata.isReadOnly) {
      return { value: this.state.selectedValues.join(", ") };
    }
    // default
    return { selectedKey: this.state.selectedValues };
  };
  
  renderer = (options: any) => (
    <span>
      {options
        ?.map((item: any) => item.key)
        .filter((key: any) => key !== this.firstOptionText)
        .join(", ")}
    </span>
  );

  render() {
    const { options, validationMessages, selectedValues, isMouseEnter } = this.state;
    const resolvedOptions = this.getLookups();

    let multiselectProps: any = this.getKeys();

    let placeholderProp = {};

    if (isMouseEnter) {
      placeholderProp = {
        placeholder: "--Select--",
      };
    } else {
      placeholderProp = {
        placeholder: "---",
      };
    }

    const textProp = {
      text: selectedValues?.map((item) => item.toString()).filter((key) => key !== this.firstOptionText).join(", ")
    }

    return (
      <Stack horizontal>
        <Stack.Item>
          <FieldLabel metadata={this.props.metadata} isReadOnly={this.props.isReadOnly}></FieldLabel>
        </Stack.Item>
        <Stack.Item>
          <Stack>
            <Stack.Item>
              {!(this.props.isReadOnly || this.props.metadata.isReadOnly) ? (
                <TooltipHost content={<><div style={{textAlign: "center"}}>{textProp.text}</div></>}>
                  <ComboBox
                    onMouseEnter={() => {
                      this.setState({ isMouseEnter: true });
                    }}
                    onMouseLeave={() => {
                      this.setState({ isMouseEnter: false });
                    }}
                    multiSelect
                    {...placeholderProp}
                    options={resolvedOptions}
                    {...multiselectProps}
                    onChange={this.onComboBoxValueChange}
                    allowFreeform={true}
                    styles={
                      { 
                        container: { ...ComboBoxStyles() } as IStyle,
                        input: { fontWeight: ComboBoxStyles().fontWeight} as IStyle
                    }}
                    {...textProp}
                  ></ComboBox>
                </TooltipHost>
              ) : (
                <TextField
                  id={"txt" + this.props.metadata.id}
                  required={this.props.metadata.validationRule?.validationData?.isMandatory?.active}
                  placeholder="---"
                  borderless
                  readOnly
                  styles={{ field: FieldStyles(true) as IStyle }}
                  {...multiselectProps}
                ></TextField>
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
