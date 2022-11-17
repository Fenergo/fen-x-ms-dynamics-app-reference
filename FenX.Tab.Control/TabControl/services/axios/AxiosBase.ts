import axios, { AxiosInstance } from "axios";
import configData from "../config/config.json";
import devConfigData from "../config/dev_config.json";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["X-TENANT-ID"] = sessionStorage.getItem("FenXPortal_TenantId");
  }

  CallAuthPlugin(): Promise<string> {
    var globalContext = Xrm.Utility.getGlobalContext();
    var serverURL = globalContext.getClientUrl();
    var actionName = "fen_FenergoTokenAction";

    const useTokenExchange = sessionStorage.getItem("enable_token_exchange");

    var data = {
      AzureToken: useTokenExchange === "true" ? sessionStorage.getItem("azure_token") : "",
      AppVersion: sessionStorage.getItem("app_version"),
    };
    var req = new XMLHttpRequest();
    req.open("POST", serverURL + "/api/data/v9.2/" + actionName, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    return new Promise(function (resolve, reject) {
      req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */) {
          req.onreadystatechange = null;

          if (this.status == 200 || this.status == 204) {
            let result = JSON.parse(this.response);
            sessionStorage.setItem("fen_token", result.FenXToken);
            resolve(result.FenXToken);
          } else {
            var error = JSON.parse(this.response).error;
            console.log("Error in Action: " + error.message);
            reject(error.message);
          }
        }
      };
      req.send(window.JSON.stringify(data));
    });
  }

  callFenXAuth = async() => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
  
    const params = new URLSearchParams();
    params.append("grant_type", devConfigData.grant_type);
    params.append("scope", devConfigData.scope);
    params.append("client_secret", devConfigData.client_secret);
    params.append("client_id", devConfigData.client_id);
    await axios
      .post(configData.localTesting.identityProviderToken, params, {
        headers: headers,
      })
      .then((fenxResponse: any) => {
        sessionStorage.setItem("fen_token", "Bearer " + fenxResponse.data.access_token);
        return fenxResponse;
      })
      .catch((error: any) => {
        console.log(error);
      });
    return "";
  }

  protected _handleError = (error: any) => {
    Promise.reject(error);
  };
}
