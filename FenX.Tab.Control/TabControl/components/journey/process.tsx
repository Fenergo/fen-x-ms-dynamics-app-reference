import React from "react";
import { CardHeading } from "./taskCard/heading/CardHeading";
import { Card } from "./taskCard/card/card";
import { TaskComponent } from "./task";
import { IJourneyInstanceDto, JourneyInstanceProcessDto } from "../../services/Clients/JourneyQueryClient";
import { processStyle } from "../../styles/process";

interface IProcessProps {
  processData: JourneyInstanceProcessDto;
  journeyInstance: IJourneyInstanceDto;
  onRefresh?: () => void;
  onModalToggle?: (isOpen: boolean) => void;
}

export const ProcessElement = (props: IProcessProps) => {
  const { name, tasks } = props.processData;

  return (
    <div style={processStyle}>
      <Card>
        <CardHeading headingText={name!} />
        {tasks?.sort((t1, t2) => (t1.order ?? 0) - (t2.order ?? 0)).filter((task) => { return !task.isHidden }).map((task) => (
          <TaskComponent
            onModalToggle={props.onModalToggle}
            onRefresh={props.onRefresh}
            journeyInstance={props.journeyInstance}
            metadata={task}
            key={"task-" + task.id + "-" + task.started}
          />
        ))}
      </Card>
    </div>
  );
};