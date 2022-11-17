import { FontIcon, ITooltipProps, Stack, Text, TooltipHost } from "@fluentui/react";
import React from "react";
import { DataRequirement } from "../../../../services/Clients/PolicyQueryClient";

export interface IFieldLabel {
    metadata: DataRequirement,
    isReadOnly?: boolean
}

export class FieldLabel extends React.Component<IFieldLabel> {
    render = () => {
        const labelId: string = "label-" + this.props.metadata.id!;
        const tooltipProps: ITooltipProps = {
            onRenderContent: () => (<>{this.props.metadata.description}</>),
        };

        return (

            <TooltipHost id={"tlt" + this.props.metadata.id} tooltipProps={tooltipProps} hidden={!this.props.metadata.description} styles={{ root: { width: "100%" } }}>
                <Stack horizontal styles={{ root: {position: "relative"}}}>
                    <Stack.Item style={{ position: "absolute", left: -17, top: -2 }}>
                        {this.props.metadata.isReadOnly || this.props.isReadOnly ? <FontIcon iconName="lock" style={{ fontSize: 13 }}/> : ""}
                    </Stack.Item>
                    <Stack.Item>
                        <Text key={labelId} styles={{ root: { width: 214, fontWeight: "normal", display: "inline-block", whiteSpace: "pre-wrap" } }}>
                            {this.props.metadata.name}
                        </Text>
                    </Stack.Item>
                    <Stack.Item styles={{ root: { minWidth: 6 } }}>
                        {(this.props.metadata.validationRule?.validationData?.isMandatory?.active) ? (<span style={{ color: "red", float: "right" }}>* </span>) : " "}
                    </Stack.Item>
                </Stack>
            </TooltipHost>
        );
    }
}