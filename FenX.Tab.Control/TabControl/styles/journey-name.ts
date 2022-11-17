import { ITextProps } from "@fluentui/react";
import { colourPalette } from './theme';

// styling the heading of each container
export const titleStyle: ITextProps = {
    variant: 'xLarge',
    styles: { root: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'left',
        paddingTop: 14,
        paddingLeft: 22,
        paddingBottom: 10,
        fontWeight: 600
    }}
}
