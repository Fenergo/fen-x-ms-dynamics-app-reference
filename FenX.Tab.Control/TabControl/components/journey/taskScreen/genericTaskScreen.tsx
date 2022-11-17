import { PrimaryButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { DataRequirement } from "../../../services/Clients/PolicyQueryClient";
import { RequirementScreen } from "../../screen/screen";
import { ITaskScreen } from "./taskScreen";

export class GenericTaskScreen extends React.Component<ITaskScreen> {
    state = { requirements: [] as DataRequirement[], initialData: {} as Dictionary<any> }
    componentDidMount = async () => {
        const reqs = [
            {
                name: "Task Name",
                dataField: {
                    propertyName: "name",
                    propertyType: "text"
                },
                isReadOnly: true,
                type: "Data",
                id:"TaskName-1"
            },
            {
                name: "Task Status",
                dataField: {
                    propertyName: "status",
                    propertyType: "text"
                },
                isReadOnly: true,
                type: "Data",
                id:"TaskStatus-1"
            },
            {
                name: "Task Description",
                dataField: {
                    propertyName: "description",
                    propertyType: "textArea"
                },
                isReadOnly: true,
                type: "Data",
                id:"TaskDescription-1"
            }
        ] as DataRequirement[];

        const data = {
            name: this.props.metadata?.name,
            status: this.props.metadata?.status,
            description: this.props.metadata?.description
        } as Dictionary<any>;

        this.setState({ requirements: reqs, initialData: data });
    }

    render = () => {
        const { requirements, initialData } = this.state;
        return (
            <>
                <div key={"divWrapper-" + this.props.metadata?.id} style={{ padding: "5px 20px", margin: "0px 30px", maxHeight: 550, overflow: "auto" }}>
                    <RequirementScreen id={this.props.metadata?.id!} initialData={initialData} metadata={requirements} key={"taskScreen-" + this.props.metadata?.id}>
                    </RequirementScreen>
                </div>
                <div key={"divWrapper2-" + this.props.metadata?.id}  style={{ padding: "20px 35px 35px 0px", textAlign: "right", marginTop: 20 }}>
                    <PrimaryButton onClick={this.props.onCloseCallback} style={{ marginRight: 10 }}>Close</PrimaryButton>
                </div>
            </>
        );
    }
}