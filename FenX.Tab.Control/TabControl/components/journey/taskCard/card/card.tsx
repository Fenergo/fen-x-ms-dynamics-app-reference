import * as React from "react";
import { card } from "../../../../styles/card";


// import {getTheme} from "@fluentui/react";
// const theme = getTheme();

export interface Card extends React.PropsWithChildren{
    metadata?:string;
}

export const Card: React.FC<Card> = (props) => {

    return (
        <div>
            <div style={card}>{props.children}</div>
        </div>
    );
 }