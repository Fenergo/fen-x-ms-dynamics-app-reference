import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { DataRequirement, Requirement } from "../../services/Clients/PolicyQueryClient";
import { LoadingSpinner } from "../loader/loader";
import { EnhancedDataField, FieldChangeEvent } from "./field/field";
import { Section } from "./section";
import { IFieldValidation } from "./field/data/simpleFieldType";
import { DocumentGrid, EnhancedDocumentRequirement } from "./field/document/document";
import { FenXApi } from "../../services/axios/AxiosClient";
import { RequirementDto, VersionedJurisdictionDto } from "../../services/Clients/PolicyLogicEngineClient";
import { LookupManager } from "../utility/lookupManager";
import { LookupVersionDto } from "../../services/Clients/LookupQueryClient";
import moment from "moment";
import _ from "lodash";
import { Notification } from "../utility/notification";
import { EvaluateDataGroupFieldsRequestDto, PropertyDto as PropertyDtoV2 } from "../../services/Clients/PolicyLogicEngineClientV2";
import { DataGroupManager } from "../utility/dataGroupManager";
import { IPermission, PermissionModal } from "../modal/permissionModal";

export interface IRequirementScreen extends React.PropsWithChildren {
    metadata?: Requirement[];
    initialData: Dictionary<any>;
    properties?: Dictionary<any>;
    isLoading?: boolean;
    onScreenValidate?: (isValid: boolean) => void;
    onFieldUpdate?: (event: FieldChangeEvent) => void;
    id: string;
    hideSectionLabel?: boolean,
    jurisdictions?: VersionedJurisdictionDto[],
    policyCategories?: string[],
    policyRequirementType?: "Data" | "Document",
    isReadOnly?: boolean;
    onRefreshRequest?: () => void;
    isDataGroup?: boolean;
    dataGroupId?: string;
    dataGroupVersion?: number;
    evaluatedData?: Dictionary<any>,
    fieldModifiers?: Dictionary<(value: any) => any>
}

interface IRequirementScreenState extends IPermission {
    fieldValidation: Dictionary<boolean>;
    isValid: boolean;
    data: Dictionary<any>;
    additionalRequirements: Requirement[];
}

export class RequirementScreen extends PermissionModal<IRequirementScreen> {
    state: IRequirementScreenState = { ...this.state, fieldValidation: {} as Dictionary<boolean>, isValid: true, data: {} as Dictionary<any>, additionalRequirements: [] as Requirement[] } 
    fenXClient = FenXApi.getInstance();
    lookupManager = new LookupManager();

    onScreenValidate = (event: IFieldValidation) => {
        const { fieldValidation } = this.state;
        fieldValidation[event.field] = event.isValid;
        let screenIsValid = true;
        Object.entries(fieldValidation).forEach(function ([key, value]) { if (!value) { screenIsValid = false; } });
        if (this.props.onScreenValidate) this.props.onScreenValidate(screenIsValid);
        this.setState({ fieldValidation: fieldValidation, isValid: screenIsValid });
    }

    onFieldUpdate = async (e: FieldChangeEvent) => {
        if (this.props.onFieldUpdate) this.props.onFieldUpdate(e);
        const { data } = this.state;
        data[e.key] = { value: e.value, type: e.type, dataGroupId: e.dataGroupId, collections: e.collections };
        this.setState({ data: data });
        await this.evaluateRequirements(data);
        await this.resolveLinkLookup(e);
    }

    resolveLinkLookup = async (e: FieldChangeEvent) => {
        const requirement = this.props.metadata?.filter((item) => { return (item as DataRequirement).dataField?.propertyName === e.key });
        if (requirement?.length) {
            var req = requirement[0] as DataRequirement;
            if (req.dataField?.propertyType == "selectLink") {
                var linkedLookup = await this.executeWithPermissionHandling(this.lookupManager.getLinkLookup(req.dataField.propertyTypeId!))
                    .catch((error) => { Notification.showError("Error retrieving lookup.", error) });
                var childRequirement = this.props.metadata?.filter((cr) => { return (cr as DataRequirement).dataField?.propertyName === req.dataField?.linkChildFieldPropertyName });
                if (childRequirement?.length && linkedLookup?.properties) {
                    const cr = childRequirement[0] as DataRequirement;
                    cr.dataField = {
                        propertyName: cr.dataField!.propertyName,
                        propertyType: cr.dataField!.propertyType,
                        propertyTypeVersion: linkedLookup?.childLookupVersion,
                        propertyTypeId: linkedLookup?.childLookupId,
                        resolvedLookups: { id: linkedLookup?.childLookupId, values: linkedLookup.properties[e.value]?.childValues } as LookupVersionDto

                    } as EnhancedDataField;
                }
            }
        }
    }

    evaluateRequirements = async (propData: Dictionary<any>) => {
        if (Object.keys(propData).length) {
            if (this.props.isDataGroup) {
                var dataGroup = await new DataGroupManager().getDataGroupById(this.props.dataGroupId!);
                var props = {} as Dictionary<any>;
                for(var key in propData){ props[dataGroup?.name! + "." + key] = propData[key]; }               
                await this.fenXClient.evaluateDataGroupFields({
                    dataGroupId: this.props.dataGroupId!,
                    dataGroupVersionNumber: this.props.dataGroupVersion!,
                    properties: props as { [key: string]: PropertyDtoV2; }
                } as EvaluateDataGroupFieldsRequestDto).then((response) => {
                    const requirements = response?.map((dgf) => {
                        const req = dgf as DataRequirement;
                        req.category = "Data Group";
                        req.id = dgf.identifier;
                        req.type = "Data"
                        return req;
                    });
                    this.setState({ additionalRequirements: requirements! });
                }).catch((err) => { Notification.showError("Error evaluating data group requirements.", err) });;
            }
            else if(this.props.policyRequirementType) {
                let properties = this.props.properties ?? {};
                for (var key in propData) { 
                    properties[key] = propData[key];
                }
                await this.executeWithPermissionHandling(this.fenXClient.evaluateRequirements(this.props.jurisdictions!, this.props.policyRequirementType!, this.props.policyCategories!, properties)
                    .then((result) => {
                        this.setState({ additionalRequirements: result! });
                    })).catch((err) => { Notification.showError("Error evaluating requirements.", err) });
            }
        }
        else {
            this.setState({ additionalRequirements: [] as RequirementDto[] });
        }
    }

    mergeAdditionalRequirements = () => {
        const { additionalRequirements } = this.state;
        let evaluatedData = {} as Dictionary<any>;
        let metadata = _.cloneDeep(this.props.metadata!);
        additionalRequirements.filter((ar) => { return metadata.filter((mr: DataRequirement) => { return mr.id === ar.id }).length === 0 }).forEach((r) => {
            metadata.push(r);
        });

        metadata.forEach((data: DataRequirement) => {
            const requirement = additionalRequirements.filter((req) => req.id == data.id);
            if (requirement.length > 0 && data.dataField) {
                switch (data.dataField?.propertyType) {
                    case "date": {
                        if (moment(requirement[0].evaluatedConditionalValue, moment.ISO_8601, true).isValid()) {
                            evaluatedData[data.dataField.propertyName!] = moment(requirement[0].evaluatedConditionalValue).format("YYYY-MM-DD");
                            data.isReadOnly = true;
                        } else {
                            evaluatedData[data.dataField.propertyName!] = requirement[0].evaluatedConditionalValue;
                            data.isReadOnly = false;
                        }
                    }
                    default: {
                        if (requirement[0].hasEvaluatedConditionalValue) {
                            evaluatedData[data.dataField!.propertyName!] = requirement[0].evaluatedConditionalValue;
                            data.isReadOnly = true;
                            data.hasEvaluatedConditionalValue = true;
                        }
                    }
                };
            }
        });

        if(this.props.evaluatedData)
            for(var key in this.props.evaluatedData)
                evaluatedData[key] = this.props.evaluatedData[key];

        return { metadata: metadata, evaluatedData: evaluatedData };
    }

    handleFieldPermission = (apiCall: Promise<any>): Promise<any> => {
        return this.executeWithPermissionHandling(apiCall);
    }

    sortFields = async (dataGroup: DataRequirement[]) => {
        dataGroup = dataGroup.sort((l1, l2) => (l1.order && l2.order) ? l1.order - l2.order : 0);
        dataGroup = dataGroup.sort((l1, l2) => l1.category!.localeCompare(l2.category!));
    }

    render = () => {
        const requirements = this.mergeAdditionalRequirements();
        this.sortFields(requirements.metadata);
        
        const dataRequirements = requirements.metadata.filter((req: DataRequirement) => { return req.type === "Data" }).map((req: DataRequirement) => { return req as DataRequirement; });
        const docRequirements = requirements.metadata.filter((req: DataRequirement) => { return req.type === "Document" });
        const dataSections = dataRequirements?.filter((req: DataRequirement) => { return req.dataField?.propertyType !== "dataGroup" }).reduce((group: Dictionary<DataRequirement[]>, requirement: DataRequirement) => {
            group[requirement.category!] = group[requirement.category!] ?? [];
            group[requirement.category!]!.push(requirement);
            return group;
        }, {} as Dictionary<Requirement[]>) ?? {} as Dictionary<Requirement[]>;

        const dataGroupSections = dataRequirements?.filter((req: DataRequirement) => { return req.dataField?.propertyType === "dataGroup" });
        return this.props.isLoading ?
            (<>
                <LoadingSpinner key={"ScreenLoader-" + this.props.id} />
            </>) : (
                <>
                    {Object.values(dataSections!).map((values: any) => {
                        return (<div key={"divSectionWrapper-" + this.props.id + values![0].category} style={{ marginBottom: 20 }}>
                            <Section fieldModifiers={this.props.fieldModifiers} evaluatedData={requirements.evaluatedData} isCollapsible isReadOnly={this.props.isReadOnly} key={"ScreenSection" + this.props.id + values![0].category} onFieldValidate={this.onScreenValidate} title={(this.props.hideSectionLabel) ? '' : values![0].category} metadata={values} initialData={this.props.initialData} onFieldUpdate={this.onFieldUpdate} handleFieldPermission={this.handleFieldPermission} />
                        </div>);
                    })}
                    {dataGroupSections?.map((dataGroup: DataRequirement) => {
                        return (<div key={"divDataGroupSectionWrapper-" + dataGroup.id} style={{ marginBottom: 20 }}><Section fieldModifiers={this.props.fieldModifiers} evaluatedData={requirements.evaluatedData} isCollapsible isReadOnly={this.props.isReadOnly} key={"DataGroupScreenSection" + dataGroup.id} onFieldValidate={this.onScreenValidate} title={(this.props.hideSectionLabel) ? '' : dataGroup.name} metadata={[dataGroup]} initialData={this.props.initialData} onFieldUpdate={this.onFieldUpdate} handleFieldPermission={this.handleFieldPermission} /></div>);
                    })}
                    {(docRequirements?.length) ? (
                        <div key={"divDocumentSectionWrapper-" + this.props.id} style={{ marginBottom: 20 }}>
                            <DocumentGrid evaluatedData={requirements.evaluatedData} onFieldValidate={this.onScreenValidate} onRefresh={this.props.onRefreshRequest} isReadOnly={this.props.isReadOnly} key={"DocRequirementGrid-" + this.props.id} metadata={docRequirements as EnhancedDocumentRequirement[]} />
                        </div>
                    ) : ('')}
                    {this.props.children}
                    {this.renderPermissionModal()}
                </>
            );
    }
}

