import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { IJourneyInstanceDto, PolicyTask, Task } from "../../../services/Clients/JourneyQueryClient";
import { CombinedPolicyTaskScreen } from "./combinedPolicyTask";
import { DataTaskScreen } from "./dataTaskScreen";
import { DocumentTaskScreen } from "./documentTaskScreen";
import { GenericTaskScreen } from "./genericTaskScreen";

export interface ITaskScreen {
    metadata?: Task;
    journeyInstance: IJourneyInstanceDto;
    onCloseCallback?: () => void;
    onRefresh?: () => void;
    hideButtons?: boolean;
    onDataChange?: (data: Dictionary<any>) => void;
    onValidate?: (key:string, isValid: boolean) => void;
    isAssignedTo?: boolean;
}

export class TaskScreen extends React.Component<ITaskScreen> {
    render = () => {
        switch(this.props.metadata?.taskType!){
            case "PolicyTask":
                if((this.props.metadata as PolicyTask).policyRequirementType == "Data")
                    return (<DataTaskScreen onDataChange={this.props.onDataChange} onValidate={this.props.onValidate} hideButtons={this.props.hideButtons} onRefresh={this.props.onRefresh} key={"DataTaskScreen-" + this.props.metadata?.id} onCloseCallback={this.props.onCloseCallback} metadata={this.props.metadata} journeyInstance={this.props.journeyInstance} isAssignedTo={this.props.isAssignedTo}/>)
                else if((this.props.metadata as PolicyTask).policyRequirementType == "Document")
                    return (<DocumentTaskScreen onDataChange={this.props.onDataChange} onValidate={this.props.onValidate} hideButtons={this.props.hideButtons} onRefresh={this.props.onRefresh} key={"DocumentTaskScreen-" + this.props.metadata?.id} onCloseCallback={this.props.onCloseCallback} metadata={this.props.metadata} journeyInstance={this.props.journeyInstance} isAssignedTo={this.props.isAssignedTo} />)
                else return (<GenericTaskScreen onDataChange={this.props.onDataChange} onValidate={this.props.onValidate} hideButtons={this.props.hideButtons} onRefresh={this.props.onRefresh} key={"GenericTaskScreen-" + this.props.metadata?.id} onCloseCallback={this.props.onCloseCallback} metadata={this.props.metadata} journeyInstance={this.props.journeyInstance} />)
            case "CombinedPolicyTask":
                return (<CombinedPolicyTaskScreen onDataChange={this.props.onDataChange} onValidate={this.props.onValidate} hideButtons={this.props.hideButtons} onRefresh={this.props.onRefresh} key={"CombinedTaskScreen-" + this.props.metadata?.id} onCloseCallback={this.props.onCloseCallback} metadata={this.props.metadata} journeyInstance={this.props.journeyInstance} isAssignedTo={this.props.isAssignedTo} />)
            default: 
                return (<GenericTaskScreen onDataChange={this.props.onDataChange} onValidate={this.props.onValidate} hideButtons={this.props.hideButtons} onRefresh={this.props.onRefresh} key={"GenericTaskScreen-" + this.props.metadata?.id} onCloseCallback={this.props.onCloseCallback} metadata={this.props.metadata} journeyInstance={this.props.journeyInstance} />)
        }
    }
}