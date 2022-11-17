import * as React from "react";
import { Text } from "@fluentui/react";
import { titleStyle } from '../../../styles/container-heading'
import { colourPalette } from '../../../styles/theme';

export interface IScreenHeading extends React.PropsWithChildren{
    title:string;
}

// screen heading is made up of a title and horizontal rule
export const ScreenHeading: React.FC<IScreenHeading> = props => {
    const { title } = props;
    return (
        <>
            <Text {...titleStyle}>{title}</Text>
            <hr style={{height: 0, border: "none", borderTop: "1px solid " + colourPalette.palette?.neutralTertiaryAlt, padding: "none"}}></hr>
        </>
    );
 }