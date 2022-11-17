import React from "react";
import { IJourneyInstanceDto, JourneyInstanceStageDto } from "../../services/Clients/JourneyQueryClient";
import { ProcessElement } from "./process";
import { stageStyle } from '../../styles/stage';
import { StageHeading } from "./stage/StageHeading";

interface IStageElement {
    stage: JourneyInstanceStageDto;
    journeyInstance: IJourneyInstanceDto;
    onRefresh?: () => void;
    onModalToggle?: (isOpen: boolean) => void;
    isPreviousDone: boolean;
    isFirst: boolean;
    isLast: boolean;
}

export const StageElement: React.FC<IStageElement> = props => {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
        <div style={{ margin: "0 5px" }}>
            <StageHeading isFirst={props.isFirst} isLast={props.isLast} isPreviousDone={props.isPreviousDone} metadata={props.stage} isExpanded={!collapsed} onToggleClick={() => setCollapsed(!collapsed)} key={"stage-" + props.stage.id} stageName={props.stage.name} />
            <div {...stageStyle} style={{display: collapsed ? "none" : "block"}}>
                {props.stage.processes?.filter((item) => { return !item.isHidden }).sort((p1, p2) => (p1.order ?? 0) - (p2.order ?? 0)).map(function (item) {
                    return (
                        <ProcessElement onModalToggle={props.onModalToggle} onRefresh={props.onRefresh} journeyInstance={props.journeyInstance} key={"process-" + item.id} processData={item}></ProcessElement>
                    );
                })}
            </div>
        </div>
    );
}