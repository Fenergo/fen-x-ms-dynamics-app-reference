import { PrimaryButton, ThemeSettingName } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { DataGroupVersionDto, DataRequirement } from "../../../../../services/Clients/PolicyQueryClient";
import { RequirementScreen } from "../../../screen";
import { FieldChangeEvent } from "../../field";

interface IDataGroupAddModal {
    dataGroup: DataGroupVersionDto
    onSaveClick?: (data: Dictionary<any>) => void,
    onAddAnotherClick?: (data: Dictionary<any>) => void
}

export class DataGroupAddModal extends React.Component<IDataGroupAddModal> {
    state = { data: {} as Dictionary<any>, isValid: true }

    onFieldDataChange = (e: FieldChangeEvent) => {
        const { data } = this.state;
        data[e.key] = e.value;
        this.setState({ data: data });
    }

    onScreenValid = (isValid: boolean) => {
        const { data } = this.state;
        const screenIsValid = isValid && Object.entries(data).length > 0;
        this.setState({ isValid: screenIsValid });
    }

    onAddAnotherClick = () => {
        const { data } = this.state;
        if (this.props.onAddAnotherClick)
            this.props.onAddAnotherClick(data);
    }

    onSaveClick = () => {
        const { data } = this.state;
        if (this.props.onSaveClick)
            this.props.onSaveClick(data);
    }

    render = () => {
        const { isValid } = this.state;

        const requirements = this.props.dataGroup.dataGroupFields?.map((dgf) => {
            const req = dgf as DataRequirement;
            req.category = "Data Group";
            req.id = dgf.identifier;
            req.type = "Data"
            return req;
        });

        return (
            <>
                <RequirementScreen
                    id="DataGroupRequirementScreen"
                    isDataGroup={true}
                    initialData={{}}
                    dataGroupId={this.props.dataGroup.groupId}
                    dataGroupVersion={this.props.dataGroup.versionNumber}
                    onFieldUpdate={this.onFieldDataChange}
                    onScreenValidate={this.onScreenValid}
                    hideSectionLabel={true}
                    metadata={requirements}
                ></RequirementScreen>
                <div style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                    <PrimaryButton key="btnAddAnother" disabled={!isValid} style={{ marginRight: 10 }} onClick={this.onAddAnotherClick}>Add Another</PrimaryButton>
                    <PrimaryButton key="btnSaveAndClose" disabled={!isValid} style={{ marginRight: 10 }} onClick={this.onSaveClick}>Save</PrimaryButton>
                </div>
            </>
        );
    }
}