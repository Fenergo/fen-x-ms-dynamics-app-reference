import * as React from "react";
import { FontIcon, Icon } from "@fluentui/react/lib/Icon";
import { Task } from "../../../../services/Clients/JourneyQueryClient";

export interface TaskIcon extends React.PropsWithChildren {
  metadata: Task;
}

export const TaskIcon: React.FC<TaskIcon> = (props) => {
  const css = `
    .icon-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      opacity: 1;
      display: flex;
      text-align: center;
      vertical-align: middle;
      justify-content: center;
      flex-direction: column;
    }  

    .not-started {
      background-color: #777777;
    }
    
    .in-progress {
      background-color: #0082be;
    }

    .error {
      background-color: #da3b01;
    }
    
    .complete {
      background-color: #77dd77;
    }

    .icon-avatar {
      font-size: 20px;
      color: white;
      height: 18;
      width: 18;
      vertical-align: middle;
    }
    `;

  var iconType = "";
  var circleClass = "";

  if (props.metadata.taskType === "ServiceTask") {
    iconType = "Settings";
  } else {
    iconType = "People";
  }

  if (props.metadata.status === "Not Started" || props.metadata.status === "Cancelled") {
    circleClass = "icon-circle not-started";
  } else if (props.metadata.status === "In Progress") {
    circleClass = "icon-circle in-progress";
  } else if (props.metadata.status === "Done") {
    circleClass = "icon-circle complete";
  } else if (props.metadata.status === "Error") {
    circleClass = "icon-circle error";
  }

  let statusColor = props.metadata.status === "Not Started" || props.metadata.status === "Cancelled" ? "#777777"
    : props.metadata.status === "In Progress" ? "#0082be"
    : props.metadata.status === "Done" ? "#77dd77"
    : "#da3b01";

  return (!props.metadata.teamId) ? (
    <Icon styles={{ root: { fontSize: 30, color: statusColor  } }} iconName="ProgressLoopOuter" />
  ) : (
    <div>
      <style>{css}</style>
      <div className={circleClass}>
        <FontIcon iconName={iconType} className="icon-avatar" />
      </div>
    </div>
  );
};
