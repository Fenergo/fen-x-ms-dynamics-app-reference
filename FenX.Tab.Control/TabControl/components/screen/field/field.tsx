import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { DataField, DataRequirement, Requirement } from "../../../services/Clients/PolicyQueryClient";
import { SelectFieldComponent } from "./data/select";
import { IFieldValidation } from "./data/simpleFieldType";
import { TextFieldComponent } from "./data/text";
import { DateComponent } from "./data/date";
import { LookupVersionDto } from "../../../services/Clients/LookupQueryClient";
import { NumberFieldComponent } from "./data/number";
import { DataGroup } from "./data/dataGroup";
import { MultiselectFieldComponent } from "./data/multiselect";
import { IComboBox } from "@fluentui/react";

export interface IField {
    metadata: Requirement,
    onChange?: (event: FieldChangeEvent) => void,
    data: Dictionary<any>,
    onValidate?: (event: IFieldValidation) => void,
    isReadOnly?: boolean,
    fieldModifier?: (value: any) => any,
    handleFieldPermission?: (apiCall: Promise<any>) => Promise<any>
}

export class EnhancedDataField extends DataField {
    resolvedLookups: LookupVersionDto
}

export interface FieldChangeEvent {
    key: string,
    value?: any,
    type: string,
    typeId?: string,
    originalEvent?: React.FormEvent,
    originalComboBoxEvent?: React.FormEvent<IComboBox>,
    dataGroupId?: string,
    collections?: Dictionary<any>
}

export class Field extends React.Component<IField> {

    render = () => {
        switch ((this.props.metadata as DataRequirement).dataField?.propertyType) {
            case "number": return (<NumberFieldComponent fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange}></NumberFieldComponent>);
            case "status":
            case "selectLink":
            case "select": return (<SelectFieldComponent fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange} handleFieldPermission={this.props.handleFieldPermission}></SelectFieldComponent>);
            case "text":
            case "textArea": return (<TextFieldComponent fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange}></TextFieldComponent>);
            case "date": return (<DateComponent fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange}></DateComponent>);
            case "dataGroup": return (<DataGroup fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange}></DataGroup>);
            case "multiselectLink":
            case "multiselect": return (<MultiselectFieldComponent fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange} handleFieldPermission={this.props.handleFieldPermission}></MultiselectFieldComponent>)
            default:
                return (<TextFieldComponent fieldModifier={this.props.fieldModifier} isReadOnly={this.props.isReadOnly} key={"SectionField-" + this.props.metadata.id} onValidate={this.props.onValidate} data={this.props.data} metadata={this.props.metadata} onChange={this.props.onChange}></TextFieldComponent>);
        }
    }
}