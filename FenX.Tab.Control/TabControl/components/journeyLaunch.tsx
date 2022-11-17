import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { FenXApi } from "../services/axios/AxiosClient";
import { AccessLayerDto, AccessLayerTypeDto } from "../services/Clients/AuthorizationQueryClient";
import { AccessLayerDto as JourneyAccessLayer } from "../services/Clients/JourneyQueryClient";
import { EntityDto } from "../services/Clients/EntityDataQueryClient";
import { LookupVersionDto } from "../services/Clients/LookupQueryClient";
import { DataRequirement } from "../services/Clients/PolicyQueryClient";
import { FieldChangeEvent } from "./screen/field/field";
import { RequirementScreen } from "./screen/screen";
import { Notification } from "./utility/notification";
import { IPermission, PermissionModal } from "./modal/permissionModal";

interface IJourneyLaunch {
    entityId: string,
    onModalDismiss: () => void,
    onRefresh: () => void
}

interface IJourneySchema {
    id: string,
    version: number,
    name: string
}

export function businessRelatedAccessLayersModifier(item: any) {
    let values = item.value as string[];
    if (values.length > 1 && values.indexOf("Enterprise") > -1) {
        values.splice(values.indexOf('Enterprise'), 1)
    }
    else if (!values.length) values = ["Enterprise"];
    return {value: values};
}

export function geographicAccessLayersModifier(item: any) {
    let values = item.value as string[];
    if (values.length > 1 && values.indexOf("Global") > -1) {
        values.splice(values.indexOf('Global'), 1)
    }
    else if (!values.length) values = ["Global"];
    return {value: values};
}

interface IJourneyLaunchState extends IPermission {
    schemas: IJourneySchema[];
    entity: EntityDto;
    accessLayers: AccessLayerDto[]; 
    newJourneyData: Dictionary<any>; 
    isValid: boolean;
    isLoading: boolean;
}

export class JourneyLaunch extends PermissionModal<IJourneyLaunch> {
    state: IJourneyLaunchState = { ...this.state, schemas: [] as IJourneySchema[], entity: {} as EntityDto, accessLayers: [] as AccessLayerDto[], newJourneyData: {} as Dictionary<any>, isValid: false, isLoading: false }
    fenXClient = FenXApi.getInstance();

    componentDidMount = () => {
        this.fenXClient.getAllAccessLayers().then((accessLayers) => {
            this.executeWithPermissionHandling(this.fenXClient.getEntityData(this.props.entityId).then((entity) => {
                this.executeWithPermissionHandling(this.fenXClient.evaluateJourneySchema({ data: { properties: { entityType: { type: "Single", value: entity?.type }, ...entity?.properties } } }).then((response) => {
                    const schemas = response?.map((s) => { return { id: s.journeySchemaId!, version: s.journeySchemaVersion!, name: s.name! } as IJourneySchema });
                    this.setState({ schemas: schemas, entity: entity, accessLayers: accessLayers });
                })).catch((error) => {Notification.showError("Error evaluating journey schema.", error)});
            })).catch((error) => {Notification.showError("Error fetching entity data.", error)});
        });
    }

    onJourneyLaunchFieldChange = (e: FieldChangeEvent) => {
        const { newJourneyData } = this.state;
        newJourneyData[e.key] = e.value;
        this.setState({ newJourneyData: newJourneyData });
    }

    onScreenValidate = (valid: boolean) => {
        this.setState({ isValid: valid });
    }

    onContinueClick = () => {
        const { schemas, entity, newJourneyData } = this.state;
        this.setState({ isLoading: true });
        const selectedSchema = schemas.filter((s) => { return s.name === newJourneyData["journeySchema"] })[0];
        this.executeWithPermissionHandling(this.fenXClient.createJourneyForEntity(entity.id!, selectedSchema.id, new JourneyAccessLayer({ businessRelated: newJourneyData["businessRelatedAccessLayers"].split("|"), geographic: newJourneyData["geographicAccessLayers"].split("|") })).then((journey) => {
            this.executeWithPermissionHandling(this.fenXClient.createEntityDraft(entity.id!, { data: { journeyId: journey?.journeyInstanceId } }).then(() => {
                this.props.onRefresh();
            })).catch((error) => { Notification.showError("Error creating entity draft", error); this.setState({ isLoading: false }); })
        })).catch((error) => { Notification.showError("Error creating journey instance", error); this.setState({ isLoading: false }); })
    }

    render = () => {
        const { schemas, accessLayers, isValid, isLoading, newJourneyData } = this.state;

        const distinct = (item: any, index: number, self: any[]) => { return self.indexOf(item) === index; }
        const business = accessLayers.filter((al) => { return al.type! === AccessLayerTypeDto.BusinessRelated && al.dataType === "Journey" }).map((al) => { return al.label }).filter(distinct);
        const geographic = accessLayers.filter((al) => { return al.type! === AccessLayerTypeDto.Geographic && al.dataType === "Journey" }).map((al) => { return al.label }).filter(distinct);

        const metadata = [{
            id: "journeySchema1",
            name: "Journey Type",
            dataField: {
                propertyName: "journeySchema",
                propertyType: "select",
                resolvedLookups: { values: schemas.map((s) => { return s.name }) } as LookupVersionDto
            },
            validationRule: { validationData: { isMandatory: { active: true } } },
            category: "New Journey Metadata",
            type: "Data"
        } as any, {
            id: "businessRelatedAccessLayers1",
            name: "Business Related Access Layers",
            dataField: {
                propertyName: "businessRelatedAccessLayers",
                propertyType: "multiselect",
                resolvedLookups: { values: ["Enterprise", ...business] } as LookupVersionDto
            },
            validationRule: { validationData: { isMandatory: { active: true } } },
            category: "New Journey Metadata",
            type: "Data"
        } as any,
        {
            id: "geographicAccessLayers1",
            name: "Geographic Access Layers",
            dataField: {
                propertyName: "geographicAccessLayers",
                propertyType: "multiselect",
                resolvedLookups: { values: ["Global", ...geographic] } as LookupVersionDto
            },
            validationRule: { validationData: { isMandatory: { active: true } } },
            category: "New Journey Metadata",
            type: "Data"
        }] as DataRequirement[];
        let initialAccessLayerData = { businessRelatedAccessLayers: "Enterprise", geographicAccessLayers: "Global" };
        let fieldModifiers = { businessRelatedAccessLayers: businessRelatedAccessLayersModifier, geographicAccessLayers: geographicAccessLayersModifier };
        return (
            <>
                <RequirementScreen
                    hideSectionLabel
                    metadata={metadata}
                    id="NewJouenyLaunchScreen"
                    key="NewJouenyLaunchRequirementScreen"
                    initialData={initialAccessLayerData}
                    onFieldUpdate={this.onJourneyLaunchFieldChange}
                    onScreenValidate={this.onScreenValidate}
                    isLoading={isLoading}
                    evaluatedData={newJourneyData}
                    fieldModifiers={fieldModifiers}
                >
                    <div key="NewJourneyButtonsWrapper" style={{ padding: "20px 0px 35px 0px", textAlign: "right", marginTop: 20 }}>
                        <PrimaryButton key="btnCreateNewJourney" disabled={!isValid} styles={{ root: { marginRight: 10 } }} onClick={this.onContinueClick}>Continue</PrimaryButton>
                        <DefaultButton key="btnCancelNewJourney" onClick={this.props.onModalDismiss}>Cancel</DefaultButton>
                    </div>
                </RequirementScreen>
                {this.renderPermissionModal()}
            </>
        )
    }
}