import { IStyle, ITextProps } from "@fluentui/react";
import { colourPalette } from '../styles/theme';

// styling the heading of each container
export const titleStyle: ITextProps = {
    variant: 'large',
    styles: { root: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 3,
        fontWeight: 600
    }}
}

// styling horizontal rule
export const horizontalRuleStyle = {
    height: 0, 
    border: "none", 
    borderTop: "1px solid " + colourPalette.palette?.neutralTertiaryAlt,
    padding: "none"
}


export const stageHeadingDiv = {
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 230
};