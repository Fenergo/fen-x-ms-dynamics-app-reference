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

// styling the default messages (when no journey exists)
export const messageStyles: ITextProps = {
    variant: 'xSmall',
    styles: { root: {
        color: colourPalette.palette?.neutralSecondary,
        justifyContent: 'center',
    }}
}