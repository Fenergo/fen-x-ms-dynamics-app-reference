import { ITextProps } from "@fluentui/react";
import { colourPalette } from '../styles/theme';

// styling the heading of each container
export const titleStyle: ITextProps = {
    variant: 'small',
    styles: { root: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'left',
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