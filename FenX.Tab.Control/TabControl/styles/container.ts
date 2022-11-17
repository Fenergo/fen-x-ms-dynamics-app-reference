import { IStackStyles, IStackProps } from "@fluentui/react";
import { relative } from "path";
import { colourPalette } from '../styles/theme';

// individual containers
export function containerStyles(width: string, overflow: 'visible' | 'auto' | 'hidden' | 'unset', minWidth?: string | number | undefined, marginRight?: string | number | undefined) {
    const styles: IStackStyles = {
        root: {
            width: width,
            overflow: overflow,
            boxSizing: 'border-box',
            height: "100%",
            border: '1px solid ' + colourPalette.palette?.neutralTertiaryAlt,
            padding: 3,
            margin: 0,
            minWidth: minWidth,
            position: "relative",
            boxShadow: "rgb(0, 0, 0, 0.11) 0px 0.3px 0.9px, rgb(0, 0, 0, 0.133) 0px 1.6px 3.6px",
            marginRight: marginRight
        }
    }
    return styles;
}

// container columns
export function columnStyles(width: string) {
    const styles: IStackStyles = {
        root: {
            boxSizing: 'border-box',
            width: width,
            minWidth: 300,
            padding: 0,
            margin: 0
        }
    }
    return styles;
}