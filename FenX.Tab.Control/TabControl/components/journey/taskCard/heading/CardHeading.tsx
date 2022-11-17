import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { titleStyle, horizontalRuleStyle } from '../../../../styles/card-heading'

export interface CardHeading extends React.PropsWithChildren {
  metadata?: string;
  headingText: string;
}



export const CardHeading: React.FC<CardHeading> = (props) => {

  return (
    <div>
      <Text {...titleStyle}>
        {props.headingText}
      </Text>
      <hr style={horizontalRuleStyle}></hr>
    </div>
  );
};
