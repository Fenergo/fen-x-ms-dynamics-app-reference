import React = require("react");
import ReactDOM = require("react-dom/client");
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { LandingPage } from "./pages/LandingPage";
import { PopupRequest, PublicClientApplication, Configuration } from "@azure/msal-browser";
import { EnvironmentHelper } from "./services/azure/EnvironmentHelper";
const AsyncLock = require("async-lock");
import { LookupManager } from "./components/utility/lookupManager";
import { TeamsManager } from "./components/utility/teamsManager";
import { DataGroupManager } from "./components/utility/dataGroupManager";
import configData from "./services/config/config.json";
import devConfigData from "./services/config/dev_config.json";
import { UserManager } from "./components/utility/userManager";
import { UserProfileManager } from "./components/utility/userProfileManager";
import { FenXApi } from "./services/axios/AxiosClient";

export class FenergoTabControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _tokenRequest: PopupRequest;
  private _container: HTMLDivElement;
  notifyOutputChanged: () => void;
  context: ComponentFramework.Context<IInputs>;
  legalEntityId: string | undefined;
  private _lock: any = new AsyncLock();
  private _msalInstance: PublicClientApplication;
  private root: ReactDOM.Root;
  private clientid = "";
  private tenantid = "";
  private redirect = "";
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
    this._container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.context = context;
    sessionStorage.setItem("enable_token_exchange", context.parameters.env_enable_token_exchange.raw!);
    sessionStorage.setItem("app_version", context.parameters.app_version.raw!);
    sessionStorage.setItem("isDevelopment", configData.localTesting.env! != "development" ? "false" : "true");
    sessionStorage.setItem("api_retry_count", context.parameters.retry_count.raw!);
    sessionStorage.setItem("show_logo", context.parameters.show_logo.raw!);
  }

  public refreshData(evt: Event): void {
    this.notifyOutputChanged();
  }

  onChange = (newValue: string | undefined): void => {
    this.legalEntityId = newValue;
    this.notifyOutputChanged();
  };

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this._lock
      .acquire("init", async () => {
        sessionStorage.setItem("app_version", context.parameters.app_version.raw!);

        await this.getTenantId();

        if (this._msalInstance == null || context.updatedProperties.includes("env_msalConfig")) {
          if (sessionStorage.getItem("isDevelopment") == "true") {
            this.clientid = configData.localTesting.azure.clientid;
            this.tenantid = configData.localTesting.azure.tenantid;
            this.redirect = configData.localTesting.azure.redirect;
          } else {
            await this.getEnvironmentVar(context.parameters.env_azure_con_string_env_var.raw!).then((res) => {
              const azure = JSON.parse(res);
              this.clientid = azure.clientid;
              this.tenantid = azure.tenantid;
              this.redirect = azure.redirect;
            });
          }
          this._msalInstance = await this.setMsalConfig(this.clientid, this.tenantid, this.redirect);

          if (this._tokenRequest == null) {
            this._tokenRequest = {
              scopes: this.getScopes("scopes" || ""),
            };
          }
        }
        if (sessionStorage.getItem("enable_token_exchange") && sessionStorage.getItem("enable_token_exchange") === "true") {
          if (!sessionStorage.getItem("azure_token")) {
            await this._msalInstance.loginPopup(this._tokenRequest).then((token) => {
              sessionStorage.setItem("azure_token", token.accessToken);
            });
          }
        }
      })
      .then(() => {
        FenXApi.createInstance(context.parameters.fenX_apiRoot.raw!).then(() => {
          new LookupManager().init();
          new TeamsManager().init();
          new UserManager().init();
          new DataGroupManager().init();
          new UserProfileManager().init();
        });
        if (this._msalInstance) {
          const props = {
            context: context,
            msalInstance: this._msalInstance,
            tokenRequest: this._tokenRequest,
            onChange: this.onChange,
            leId: context.parameters.value.raw!,
            key: "mainLandingPage",
            baseURL: context.parameters.fenX_apiRoot.raw ? context.parameters.fenX_apiRoot.raw : configData.apiRoot,
          };

          this.root = ReactDOM.createRoot(this._container, {
            identifierPrefix: "fen-",
          });
          this.root.render(React.createElement(LandingPage, props));
        }
      });
  }

  public async getTenantId() {
    if (configData.localTesting.env! === "development") {
      sessionStorage.setItem("FenXPortal_TenantId", devConfigData.tenantid);
    } else if (!sessionStorage.getItem("FenXPortal_TenantId")) {
      await this.getEnvironmentVar("fen_Tenant").then((tenantId) => {
        sessionStorage.setItem("FenXPortal_TenantId", tenantId);
      });
    }
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return { value: this.legalEntityId } as IOutputs;
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    this.root.unmount();
  }

  private setMsalConfig = async (clientId: string, tenantId: string, redirectUri: string) => {
    return new PublicClientApplication({
      auth: {
        clientId: clientId,
        authority: "https://login.microsoftonline.com/" + tenantId,
        redirectUri: redirectUri || window.location.href,
        postLogoutRedirectUri: window.location.href,
      },
    } as Configuration);
  };

  private getScopes = (envVarName: string) => {
    let scopes: string[] = [];
    if (envVarName) {
      scopes = ["User.Read"]; // Hardcoded until I can figure out 1. if this is needed and 2. how to get this to work.
      // (<string>(await this._environmentHelper.getValue(envVarName)))
      // 	.split(",")
      // 	.map(s => s.trim());
    }
    return scopes;
  };

  private getEnvironmentVar(environmentVariableName: String): Promise<string> {
    return new Promise(function (resolve, reject) {
      Xrm.WebApi.retrieveMultipleRecords(
        "environmentvariablevalue",
        "?$select=value&$expand=EnvironmentVariableDefinitionId&$filter=(EnvironmentVariableDefinitionId/schemaname eq '" + environmentVariableName + "')"
      ).then(
        function success(result) {
          resolve(result.entities[0].value);
        },
        function (error) {
          reject("");
        }
      );
    });
  }
}
