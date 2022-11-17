import * as React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal } from "@azure/msal-react";
import { EventType, InteractionStatus, IPublicClientApplication } from "@azure/msal-browser";
import { Stack } from "@fluentui/react/lib/Stack";
import { useAppContext } from "./AppContext";
import { ActionButton } from "@fluentui/react";

interface ILoginState {
  instance: IPublicClientApplication;
  useTokenExchange: boolean;
}

export const Login: React.FC<ILoginState> = (props) => {
  const { instance, inProgress, accounts } = useMsal();

  const account = useAccount(accounts[0] || {});
  const { tokenRequest } = useAppContext();

  const connectAzure = async () => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    } else {
      msalLogin();
    }
  };

  const msalLogin = async () => {
    instance.addEventCallback((event: any) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        instance.setActiveAccount(account);
      }
    });
    if (inProgress === InteractionStatus.None) {
      await instance.handleRedirectPromise().then(() => {
        instance.loginPopup(tokenRequest).then((token) => {
          sessionStorage.setItem("azure_token", token.accessToken);
        });
      });
    }
  };

  class AutoLogin extends React.Component {
    render() {
      if (sessionStorage.getItem("isDevelopment") === "false") {
        connectAzure();
      }
      return <></>;
    }
  }

  class AutoRefresh extends React.Component {
    render() {
      if (sessionStorage.getItem("isDevelopment") === "false") {
        const seconds = account?.idTokenClaims?.exp! - (new Date().getTime() / 1000);
        if((account?.idTokenClaims?.exp && seconds <= 300) || !sessionStorage.getItem("azure_token")) {
          msalLogin();
        }
      }
      return <></>;
    }
  }

  return (
    <Stack horizontalAlign={"end"} horizontal tokens={{ childrenGap: 4 }} verticalAlign={"center"}>
      {sessionStorage.getItem("enable_token_exchange") == "true" ? (
        <Stack horizontalAlign={"end"} horizontal tokens={{ childrenGap: 4 }} verticalAlign={"center"}>
          <UnauthenticatedTemplate>
            <AutoLogin></AutoLogin>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <AutoRefresh></AutoRefresh>
          </AuthenticatedTemplate>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};
