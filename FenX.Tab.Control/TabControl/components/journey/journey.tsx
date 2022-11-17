import { Stack } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import React from "react";
import { IJourneyInstanceDto } from "../../services/Clients/JourneyQueryClient";
import { StageElement } from "./stage";
import { titleStyle } from "../../styles/journey-name";
import { EntityDraftDto } from "../../services/Clients/EntityDataQueryClient";
import { FenXApi } from "../../services/axios/AxiosClient";
import { Notification } from "../utility/notification";
import { IPermission, PermissionModal } from "../modal/permissionModal";

interface IJourney {
  journeyInstance: IJourneyInstanceDto;
  onRefresh?: () => void;
  onModalToggle?: (isOpen: boolean) => void;
  entity: EntityDraftDto;
}

export class Journey extends React.Component<IJourney> {
  
  render = () => {
    const journeyInstance = this.props.journeyInstance;
    const entity = this.props.entity;
    const onRefresh = this.props.onRefresh;
    const onModalToggle = this.props.onModalToggle;

    const stages = journeyInstance.stages?.filter((item) => {
        return !item.isHidden;
      }).sort((s1, s2) => (s1.order ?? 0) - (s2.order ?? 0));
    
    return (
      <Stack key={"Stack1Journey" + journeyInstance.id} styles={{ root: {display: "inline-block", marginRight: 15, minWidth: "100%" }}} verticalFill={true}>
        <Stack.Item key={"Stack1Item1Journey" + journeyInstance.id} align="stretch">
          <Text key={"Stack3Journey" + journeyInstance.id} {...titleStyle}>{journeyInstance.name}</Text>
          <div style={{ textAlign: "left", paddingLeft: 22 }}>{entity.jurisdictions?.map((j) => j.jurisdiction).join(" | ")}</div>
        </Stack.Item>
        <Stack.Item styles={{ root: { position: "relative", minWidth: "100%" } }} key={"Stack1Item2Journey" + journeyInstance.id} align="stretch">
          <div style={{ backgroundColor: "#EFEFEF", position: "absolute", top: 28.5, left: 0, width: "100%", minWidth: "100%", height: 63, borderTop: "4px solid rgb(226, 226, 226)" }} ></div>
          <div style={{ backgroundColor: "#FAF9F8", position: "absolute", top: 91, left: 0, width: "100%", minWidth: "100%", height: "100%", minHeight: "100%" }}></div>
          <Stack styles={{ root: { paddingLeft: 20 } }} key={"Stack4Journey" + journeyInstance.id} horizontal>
            {
              stages!.map(function (currentValue, index, arr) {
                let isPreviousDone = index === 0 || !(!stages![index - 1].completed);
                return (
                  <Stack.Item styles={{ root: { position: "relative" } }} key={"Stack4Item1Journey" + journeyInstance.id + "-" + currentValue.id}>
                    <StageElement
                      isFirst={index === 0}
                      isLast={index === stages!.length - 1}
                      isPreviousDone={isPreviousDone}
                      onModalToggle={onModalToggle}
                      onRefresh={onRefresh}
                      journeyInstance={journeyInstance}
                      key={"stage-" + currentValue.id}
                      stage={currentValue}
                      ></StageElement>
                  </Stack.Item>
                );
              })}
          </Stack>
        </Stack.Item>
      </Stack>
    );
  };
}
