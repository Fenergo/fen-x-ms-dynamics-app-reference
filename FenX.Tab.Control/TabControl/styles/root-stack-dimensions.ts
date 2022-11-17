import * as uiConfigData from '../config/ui_config.json';
import { IStackProps } from "@fluentui/react";

// width and height of the root Stack 
export const rootStackDimensions: IStackProps = {
    styles: { root: {
        width: uiConfigData.rootWidth, 
        height: uiConfigData.rootHeight}
    }
};