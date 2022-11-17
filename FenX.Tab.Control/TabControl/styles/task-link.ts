import { colourPalette } from '../styles/theme';
import { ILinkStyles, ITextProps } from "@fluentui/react";

export const teamStyle: ITextProps = {
    variant: 'xSmall'
}

export const taskDiv = {
    display: "flex",
    borderBottom: "1px solid " + colourPalette.palette?.neutralTertiaryAlt
}

export const inaccessibleStyle: ITextProps = {
    styles: { root: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'left',
        textAlign: "left"
    }}
}
