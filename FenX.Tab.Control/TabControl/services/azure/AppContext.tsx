import React = require("react")
import { createContext, useContext } from "react";
import { IInputs } from "../../generated/ManifestTypes";
import { PopupRequest } from "@azure/msal-browser";

export interface IAppContext {
    children?: React.ReactNode;
    componentContext: ComponentFramework.Context<IInputs>;
    tokenRequest: PopupRequest
}



export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppContext> = (props) => {
    const { componentContext, tokenRequest, children  } = props;
    return (
        <AppContext.Provider value={{ componentContext, tokenRequest: tokenRequest, children: children }}>
            <React.Fragment>{props.children}</React.Fragment>
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);