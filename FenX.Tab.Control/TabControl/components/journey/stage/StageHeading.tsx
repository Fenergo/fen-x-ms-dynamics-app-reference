import * as React from "react";
import { ITextProps, Text } from "@fluentui/react/lib/Text";
import { titleStyle, stageHeadingDiv } from '../../../styles/stage-heading'
import { Icon, IconButton, ProgressIndicator, Stack, TooltipHost } from "@fluentui/react";
import { JourneyInstanceStageDto } from "../../../services/Clients/JourneyQueryClient";

export interface IStageHeading extends React.PropsWithChildren {
  metadata?: JourneyInstanceStageDto;
  stageName?: string;
  onToggleClick: () => void;
  isExpanded: boolean,
  isPreviousDone: boolean,
  isFirst: boolean,
  isLast: boolean
}

export const StageHeading: React.FC<IStageHeading> = (props) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div style={{ ...stageHeadingDiv as React.CSSProperties, ...{ width: props.isExpanded ? 230 : "auto", position: "relative", height: props.isExpanded ? 100 : "auto" } }}>
      {props.isExpanded ? (
        <>
          <div style={{ position: "absolute", left: "-3%", top: "24%", border: "2px solid", borderColor: props.isFirst ? "#E2E2E2" : props.isPreviousDone ? "#0082be" : "#777777", background:  props.isFirst ? "#E2E2E2" : props.isPreviousDone ? "#0082be" : "#777777", width: "44%" }}></div>
          <div style={{ position: "absolute", right: "-3%", top: "24%", border: "2px solid", borderColor: props.isLast ? "#E2E2E2" : props.metadata?.completed ? "#0082be" : "#777777", background: props.isLast ? "#E2E2E2" : props.metadata?.completed ? "#0082be" : "#777777", width: "44%" }}></div>
          <div onClick={props.onToggleClick} onMouseEnter={() => { setHover(true) }} onMouseLeave={() => setHover(false)} style={{ cursor: "pointer", width: 230, height: 100 }}>
            <div style={{ position: "relative" }}>
              <TooltipHost content="Collapse Stage">
                <div style={{ borderRadius: 90, backgroundColor: "white", width: 35, height: 35, margin: "auto" }}>
                  <Icon style={{ position: "relative", left: -2, fontWeight: 600, marginBottom: 5, lineHeight: "40px", fontSize: (props.metadata?.completed && !hover) ? 36 : 40, color: props.metadata?.completed ? "#0082be" : (props.metadata?.started ? "#0082be" : "#777777") }} iconName={hover ? "PageLeft" : props.metadata?.completed ? "SkypeCircleCheck" : (props.metadata?.started ? "Location" : "LocationCircle")} />
                </div>
              </TooltipHost>
            </div>
            <div style={{ marginTop: 4 }} >
              <TooltipHost tooltipProps={{ onRenderContent: () => (<>{props.stageName}</>) }}>
                <Text styles={{ root: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", display: "block" } }}>{props.stageName}</Text>
              </TooltipHost>
            </div>
            <div>
              {props.metadata?.stats?.completed} / {props.metadata?.stats?.total}
            </div>
            <div style={{ padding: "5px 0", marginTop: 4 }}>
              <ProgressIndicator percentComplete={(props.metadata?.stats?.progress ?? 0) / 100} />
            </div>
          </div>
        </>) : (
        <Stack onMouseEnter={() => { setHover(true) }} onMouseLeave={() => setHover(false)} onClick={props.onToggleClick} key={"StageStack1" + props.metadata?.id} styles={{ root: { borderRadius: 8, backgroundColor: "white", boxShadow: "0 1px 2px 0 #8da2b7", border: "1px solid #e4e8ec", padding: "0px 5px 5px 5px", cursor: "pointer" } }}>
          <Stack.Item>
            <TooltipHost content="Expand Stage">
              <div style={{ borderRadius: 90, backgroundColor: "white", width: 39, height: 40, margin: "auto" }}>
                <Icon style={{ fontWeight: 600, marginBottom: 5, lineHeight: "40px", fontSize: (props.metadata?.completed && !hover) ? 35 : 40, color: props.metadata?.completed ? "#0082be" : (props.metadata?.started ? "#0082be" : "#777777") }} iconName={hover ? "PageRight" : props.metadata?.completed ? "SkypeCircleCheck" : (props.metadata?.started ? "Location" : "LocationCircle")} />
              </div>
            </TooltipHost>
          </Stack.Item>
          <Stack.Item>
            <div style={{ marginBottom: 10 }}>
              {props.metadata?.stats?.completed} / {props.metadata?.stats?.total}
            </div>
            <Text {...{ ...titleStyle, ...({ styles: { root: { writingMode: "vertical-rl" } } } as ITextProps) }}>
              {props.stageName}
            </Text>
          </Stack.Item>
        </Stack>
      )}
    </div>
  );
};
