import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { FenXApi } from "../services/axios/AxiosClient";
import { AccessLayerTypeDto, UserAccessLayerDto } from "../services/Clients/AuthorizationQueryClient";
import { LookupVersionDto } from "../services/Clients/LookupQueryClient";
import { DataRequirement } from "../services/Clients/PolicyQueryClient";
import { businessRelatedAccessLayersModifier, geographicAccessLayersModifier } from "./journeyLaunch";
import { FieldChangeEvent } from "./screen/field/field";
import { RequirementScreen } from "./screen/screen";

interface INewRequestAccessLayers {
    onModalDismiss: () => void,
    onInitiateOnboardingClick: (data: Dictionary<any>) => void
}

export class NewRequestAccessLayers extends React.Component<INewRequestAccessLayers> {
    state = {
        accessLayers: [] as UserAccessLayerDto[],
        selectedAccessLayers: { businessRelatedAccessLayers: "", geographicAccessLayers: "" },
        isValid: false,
        isLoading: false,
        data: {} as Dictionary<any>
    }

    fenXClient = FenXApi.getInstance();

    componentDidMount = () => {
        this.fenXClient.getCurrentUserAuthProfile().then((accessLayers) => {
            this.setState({ accessLayers: accessLayers?.accessLayers });
        });
    }

    onJourneyLaunchFieldChange = (e: FieldChangeEvent) => {
        const { data } = this.state;
        data[e.key] = e.value;
        this.setState({ data: data });
    }

    onScreenValidate = (valid: boolean) => {
        this.setState({ isValid: valid });
    }

    onInitiateClick = () => {
        const { data } = this.state;
        this.props.onInitiateOnboardingClick(data);
    }

    render = () => {
        const { accessLayers, isValid, isLoading, data } = this.state;

        let fieldModifiers = { businessRelatedAccessLayers: businessRelatedAccessLayersModifier, geographicAccessLayers: geographicAccessLayersModifier };
        const distinct = (item: any, index: number, self: any[]) => { return self.indexOf(item) === index; }
        const business = accessLayers.filter((al) => { return al.type! === AccessLayerTypeDto.BusinessRelated && al.dataType === "Entity" }).map((al) => { return al.label }).filter(distinct);
        const geographic = accessLayers.filter((al) => { return al.type! === AccessLayerTypeDto.Geographic && al.dataType === "Entity" }).map((al) => { return al.label }).filter(distinct);

        const metadata = [{
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
                    evaluatedData={data}
                    fieldModifiers={fieldModifiers}
                >
                    <div key="NewJourneyButtonsWrapper" style={{ padding: "20px 0px 35px 0px", textAlign: "right", marginTop: 20 }}>
                        <PrimaryButton key="btnCreateNewJourney" disabled={!isValid} styles={{ root: { marginRight: 10 } }} onClick={this.onInitiateClick}>Initiate Onboarding</PrimaryButton>
                        <DefaultButton key="btnCancelNewJourney" onClick={this.props.onModalDismiss}>Cancel</DefaultButton>
                    </div>
                </RequirementScreen>
            </>
        )
    }
}