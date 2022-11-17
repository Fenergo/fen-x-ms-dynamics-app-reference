/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Create new configuration
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Configuration created
     */
    createConfiguration(x_TENANT_ID: string): Promise<ConfigurationDtoServiceResponse>;
    /**
     * Update providers status (active/inactive)
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Update provider status request
     * @return Multi-Status. Each entry on list will have their own status.
     */
    updateProvidersStatus(x_TENANT_ID: string, body?: UpdateExternalDataProviderStatusDtoServiceRequest | undefined): Promise<ExternalDataProviderStatusUpdatedDtoServiceResponse>;
    /**
     * Add new provider to configuration
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Add provider request
     * @return Success. Provider added
     */
    addProvider(x_TENANT_ID: string, body?: ExternalDataProviderDtoServiceRequest | undefined): Promise<ExternalDataProviderAddedDtoServiceResponse>;
    /**
     * Update existing provider
     * @param providerId Id of the provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Data of the provider to be updated
     * @return Success. Configuration updated
     */
    updateProvider(providerId: string, x_TENANT_ID: string, body?: ExternalDataProviderDtoServiceRequest | undefined): Promise<void>;
    /**
     * Delete existing provider from configuration
     * @param providerId Id of provider to be deleted from configuration
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Provider deleted
     */
    deleteProvider(providerId: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Test provider connection
     * @param providerId Id of the provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Test requested
     */
    testProvider(providerId: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Create new import request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) The import request
     * @return Success. Import request created
     */
    import(x_TENANT_ID: string, body?: ImportRequestDtoServiceRequest | undefined): Promise<ImportRequestCreatedDtoServiceResponse>;
    /**
     * Save Associated Parties Deduplicate
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) The save Associated Parties Deduplication request
     * @return Success. Import request created
     */
    saveDeduplicationResults(x_TENANT_ID: string, body?: AssociatedPartyDeduplicationHeaderDtoServiceRequest | undefined): Promise<void>;
    /**
     * Put Mapping
     * @param providerId Provider ID
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Create or replace mapping request
     * @return Success.
     */
    putMapping(providerId: string, x_TENANT_ID: string, body?: ProviderMappingDtoServiceRequest | undefined): Promise<void>;
    /**
     * Delete Mappings
     * @param providerId Provider Id
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success.
     */
    deleteMapping(providerId: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Put Operation Mapping
     * @param providerId Provider ID
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Create or replace operation mapping request
     * @return Success.
     */
    putOperationMapping(providerId: string, x_TENANT_ID: string, body?: OperationMappingDtoServiceRequest | undefined): Promise<void>;
    /**
     * Publish data to downstream system
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Request
     * @return Success.
     */
    publish(x_TENANT_ID: string, body?: PublishOrchestratorDtoServiceRequest | undefined): Promise<void>;
    /**
     * Create new search request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) The search request
     * @return Success. Search request created
     */
    search(x_TENANT_ID: string, body?: SearchRequestDtoServiceRequest | undefined): Promise<SearchRequestCreatedDtoServiceResponse>;
    /**
     * Update search status
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Update search status request
     * @return Success. Search status updated
     */
    updateStatus(x_TENANT_ID: string, body?: SearchStatusDtoServiceRequest | undefined): Promise<void>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/externaldatacommand";
    }

    /**
     * Create new configuration
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Configuration created
     */
    createConfiguration(x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ConfigurationDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCreateConfiguration(_response);
        });
    }

    protected processCreateConfiguration(response: AxiosResponse): Promise<ConfigurationDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = ConfigurationDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 409) {
            const _responseText = response.data;
            let result409: any = null;
            let resultData409  = _responseText;
            result409 = ServiceResponse.fromJS(resultData409);
            return throwException("Conflict", status, _responseText, _headers, result409);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConfigurationDtoServiceResponse>(<any>null);
    }

    /**
     * Update providers status (active/inactive)
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Update provider status request
     * @return Multi-Status. Each entry on list will have their own status.
     */
    updateProvidersStatus(x_TENANT_ID: string, body?: UpdateExternalDataProviderStatusDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<ExternalDataProviderStatusUpdatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateProvidersStatus(_response);
        });
    }

    protected processUpdateProvidersStatus(response: AxiosResponse): Promise<ExternalDataProviderStatusUpdatedDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 207) {
            const _responseText = response.data;
            let result207: any = null;
            let resultData207  = _responseText;
            result207 = ExternalDataProviderStatusUpdatedDtoServiceResponse.fromJS(resultData207);
            return result207;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ExternalDataProviderStatusUpdatedDtoServiceResponse>(<any>null);
    }

    /**
     * Add new provider to configuration
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Add provider request
     * @return Success. Provider added
     */
    addProvider(x_TENANT_ID: string, body?: ExternalDataProviderDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<ExternalDataProviderAddedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration/provider";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddProvider(_response);
        });
    }

    protected processAddProvider(response: AxiosResponse): Promise<ExternalDataProviderAddedDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = ExternalDataProviderAddedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 409) {
            const _responseText = response.data;
            let result409: any = null;
            let resultData409  = _responseText;
            result409 = ServiceResponse.fromJS(resultData409);
            return throwException("Conflict", status, _responseText, _headers, result409);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ExternalDataProviderAddedDtoServiceResponse>(<any>null);
    }

    /**
     * Update existing provider
     * @param providerId Id of the provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Data of the provider to be updated
     * @return Success. Configuration updated
     */
    updateProvider(providerId: string, x_TENANT_ID: string, body?: ExternalDataProviderDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/configuration/provider/{providerId}";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateProvider(_response);
        });
    }

    protected processUpdateProvider(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Delete existing provider from configuration
     * @param providerId Id of provider to be deleted from configuration
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Provider deleted
     */
    deleteProvider(providerId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/configuration/provider/{providerId}";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "DELETE",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDeleteProvider(_response);
        });
    }

    protected processDeleteProvider(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Test provider connection
     * @param providerId Id of the provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Test requested
     */
    testProvider(providerId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/configuration/provider/{providerId}/test";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processTestProvider(_response);
        });
    }

    protected processTestProvider(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Create new import request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) The import request
     * @return Success. Import request created
     */
    import(x_TENANT_ID: string, body?: ImportRequestDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<ImportRequestCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/import";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processImport(_response);
        });
    }

    protected processImport(response: AxiosResponse): Promise<ImportRequestCreatedDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = ImportRequestCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ImportRequestCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Save Associated Parties Deduplicate
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) The save Associated Parties Deduplication request
     * @return Success. Import request created
     */
    saveDeduplicationResults(x_TENANT_ID: string, body?: AssociatedPartyDeduplicationHeaderDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/import/saveDeduplicationResults";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSaveDeduplicationResults(_response);
        });
    }

    protected processSaveDeduplicationResults(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Put Mapping
     * @param providerId Provider ID
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Create or replace mapping request
     * @return Success.
     */
    putMapping(providerId: string, x_TENANT_ID: string, body?: ProviderMappingDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/mapping/provider/{providerId}";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processPutMapping(_response);
        });
    }

    protected processPutMapping(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Delete Mappings
     * @param providerId Provider Id
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success.
     */
    deleteMapping(providerId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/mapping/provider/{providerId}";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "DELETE",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDeleteMapping(_response);
        });
    }

    protected processDeleteMapping(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Put Operation Mapping
     * @param providerId Provider ID
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Create or replace operation mapping request
     * @return Success.
     */
    putOperationMapping(providerId: string, x_TENANT_ID: string, body?: OperationMappingDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/mapping/provider/{providerId}/operation";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processPutOperationMapping(_response);
        });
    }

    protected processPutOperationMapping(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Publish data to downstream system
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Request
     * @return Success.
     */
    publish(x_TENANT_ID: string, body?: PublishOrchestratorDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/publish";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processPublish(_response);
        });
    }

    protected processPublish(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Create new search request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) The search request
     * @return Success. Search request created
     */
    search(x_TENANT_ID: string, body?: SearchRequestDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<SearchRequestCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/search";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSearch(_response);
        });
    }

    protected processSearch(response: AxiosResponse): Promise<SearchRequestCreatedDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = SearchRequestCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<SearchRequestCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Update search status
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param body (optional) Update search status request
     * @return Success. Search status updated
     */
    updateStatus(x_TENANT_ID: string, body?: SearchStatusDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/search";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateStatus(_response);
        });
    }

    protected processUpdateStatus(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authenticated", status, _responseText, _headers);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ObjectServiceResponse.fromJS(resultData500);
            return throwException("Internal server exception. Please, contact your provider.", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }
}

/** Class to represent Provider Configuration associated with External Data Provider */
export class ProviderConfigurationDto implements IProviderConfigurationDto {
    /** Internal name used to identify entry of Provider Configuration */
    field!: string;
    /** Name of Provider Configuration entry */
    name!: string;
    /** Value of Provider Configuration entry */
    value?: string | undefined;
    /** Flag defining whether the value should be masked (********) or not */
    masked?: boolean;

    constructor(data?: IProviderConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.field = _data["field"];
            this.name = _data["name"];
            this.value = _data["value"];
            this.masked = _data["masked"];
        }
    }

    static fromJS(data: any): ProviderConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["field"] = this.field;
        data["name"] = this.name;
        data["value"] = this.value;
        data["masked"] = this.masked;
        return data; 
    }
}

/** Class to represent Provider Configuration associated with External Data Provider */
export interface IProviderConfigurationDto {
    /** Internal name used to identify entry of Provider Configuration */
    field: string;
    /** Name of Provider Configuration entry */
    name: string;
    /** Value of Provider Configuration entry */
    value?: string | undefined;
    /** Flag defining whether the value should be masked (********) or not */
    masked?: boolean;
}

/** Class to represent Adapter Configuration associated with External Data Provider */
export class AdapterConfigurationDto implements IAdapterConfigurationDto {
    /** URL address of External Data Adapter */
    url!: string;

    constructor(data?: IAdapterConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.url = _data["url"];
        }
    }

    static fromJS(data: any): AdapterConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new AdapterConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["url"] = this.url;
        return data; 
    }
}

/** Class to represent Adapter Configuration associated with External Data Provider */
export interface IAdapterConfigurationDto {
    /** URL address of External Data Adapter */
    url: string;
}

/** Request DTO to add/update External Data Provider.  Contains required parameters to define new External Data Provider */
export class ExternalDataProviderDto implements IExternalDataProviderDto {
    /** Id of the External Data Provider */
    id!: string;
    /** Name of the External Data Provider */
    name!: string;
    /** List of Provider Configuration associated with External Data Provider */
    providerConfiguration?: ProviderConfigurationDto[] | undefined;
    adapterConfiguration?: AdapterConfigurationDto;

    constructor(data?: IExternalDataProviderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            if (Array.isArray(_data["providerConfiguration"])) {
                this.providerConfiguration = [] as any;
                for (let item of _data["providerConfiguration"])
                    this.providerConfiguration!.push(ProviderConfigurationDto.fromJS(item));
            }
            this.adapterConfiguration = _data["adapterConfiguration"] ? AdapterConfigurationDto.fromJS(_data["adapterConfiguration"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ExternalDataProviderDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.providerConfiguration)) {
            data["providerConfiguration"] = [];
            for (let item of this.providerConfiguration)
                data["providerConfiguration"].push(item.toJSON());
        }
        data["adapterConfiguration"] = this.adapterConfiguration ? this.adapterConfiguration.toJSON() : <any>undefined;
        return data; 
    }
}

/** Request DTO to add/update External Data Provider.  Contains required parameters to define new External Data Provider */
export interface IExternalDataProviderDto {
    /** Id of the External Data Provider */
    id: string;
    /** Name of the External Data Provider */
    name: string;
    /** List of Provider Configuration associated with External Data Provider */
    providerConfiguration?: ProviderConfigurationDto[] | undefined;
    adapterConfiguration?: AdapterConfigurationDto;
}

/** Response DTO with created External Data Configuration */
export class ConfigurationDto implements IConfigurationDto {
    /** List of External Data Providers inside External Data Configuration */
    externalDataProviders!: ExternalDataProviderDto[];

    constructor(data?: IConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.externalDataProviders = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["externalDataProviders"])) {
                this.externalDataProviders = [] as any;
                for (let item of _data["externalDataProviders"])
                    this.externalDataProviders!.push(ExternalDataProviderDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.externalDataProviders)) {
            data["externalDataProviders"] = [];
            for (let item of this.externalDataProviders)
                data["externalDataProviders"].push(item.toJSON());
        }
        return data; 
    }
}

/** Response DTO with created External Data Configuration */
export interface IConfigurationDto {
    /** List of External Data Providers inside External Data Configuration */
    externalDataProviders: ExternalDataProviderDto[];
}

/** The message associated to the service response */
export class ServiceResponseMessage implements IServiceResponseMessage {
    /** The message */
    message?: string | undefined;
    /** Type of the message
One of Info, Warning, Error, Forbidden */
    type?: string | undefined;

    constructor(data?: IServiceResponseMessage) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): ServiceResponseMessage {
        data = typeof data === 'object' ? data : {};
        let result = new ServiceResponseMessage();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        data["type"] = this.type;
        return data; 
    }
}

/** The message associated to the service response */
export interface IServiceResponseMessage {
    /** The message */
    message?: string | undefined;
    /** Type of the message
One of Info, Warning, Error, Forbidden */
    type?: string | undefined;
}

/** Service response data */
export class ConfigurationDtoServiceResponse implements IConfigurationDtoServiceResponse {
    data?: ConfigurationDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IConfigurationDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ConfigurationDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConfigurationDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigurationDtoServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface IConfigurationDtoServiceResponse {
    data?: ConfigurationDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Service response data */
export class ServiceResponse implements IServiceResponse {
    /** The service response DTO */
    data?: string | undefined;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"];
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface IServiceResponse {
    /** The service response DTO */
    data?: string | undefined;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Service response data */
export class ObjectServiceResponse implements IObjectServiceResponse {
    /** The service response DTO */
    data?: any | undefined;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IObjectServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"];
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ObjectServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ObjectServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface IObjectServiceResponse {
    /** The service response DTO */
    data?: any | undefined;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Object to represent update of External Data Provider status */
export class ProviderStatusDto implements IProviderStatusDto {
    /** ID of the External Data Provider to update */
    id?: string | undefined;
    /** Status value to which External Data Provider should be updated */
    active?: boolean;

    constructor(data?: IProviderStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.active = _data["active"];
        }
    }

    static fromJS(data: any): ProviderStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderStatusDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["active"] = this.active;
        return data; 
    }
}

/** Object to represent update of External Data Provider status */
export interface IProviderStatusDto {
    /** ID of the External Data Provider to update */
    id?: string | undefined;
    /** Status value to which External Data Provider should be updated */
    active?: boolean;
}

/** Request DTO to update existing External Data Providers active/inactive flag */
export class UpdateExternalDataProviderStatusDto implements IUpdateExternalDataProviderStatusDto {
    /** List of providers to update together with target status */
    providersStatus?: ProviderStatusDto[] | undefined;

    constructor(data?: IUpdateExternalDataProviderStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["providersStatus"])) {
                this.providersStatus = [] as any;
                for (let item of _data["providersStatus"])
                    this.providersStatus!.push(ProviderStatusDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateExternalDataProviderStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateExternalDataProviderStatusDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.providersStatus)) {
            data["providersStatus"] = [];
            for (let item of this.providersStatus)
                data["providersStatus"].push(item.toJSON());
        }
        return data; 
    }
}

/** Request DTO to update existing External Data Providers active/inactive flag */
export interface IUpdateExternalDataProviderStatusDto {
    /** List of providers to update together with target status */
    providersStatus?: ProviderStatusDto[] | undefined;
}

/** Service request data */
export class UpdateExternalDataProviderStatusDtoServiceRequest implements IUpdateExternalDataProviderStatusDtoServiceRequest {
    data?: UpdateExternalDataProviderStatusDto;

    constructor(data?: IUpdateExternalDataProviderStatusDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? UpdateExternalDataProviderStatusDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdateExternalDataProviderStatusDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateExternalDataProviderStatusDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IUpdateExternalDataProviderStatusDtoServiceRequest {
    data?: UpdateExternalDataProviderStatusDto;
}

export enum HttpStatusCode {
    _100 = 100,
    _101 = 101,
    _102 = 102,
    _103 = 103,
    _200 = 200,
    _201 = 201,
    _202 = 202,
    _203 = 203,
    _204 = 204,
    _205 = 205,
    _206 = 206,
    _207 = 207,
    _208 = 208,
    _226 = 226,
    _300 = 300,
    _301 = 301,
    _302 = 302,
    _303 = 303,
    _304 = 304,
    _305 = 305,
    _306 = 306,
    _307 = 307,
    _308 = 308,
    _400 = 400,
    _401 = 401,
    _402 = 402,
    _403 = 403,
    _404 = 404,
    _405 = 405,
    _406 = 406,
    _407 = 407,
    _408 = 408,
    _409 = 409,
    _410 = 410,
    _411 = 411,
    _412 = 412,
    _413 = 413,
    _414 = 414,
    _415 = 415,
    _416 = 416,
    _417 = 417,
    _421 = 421,
    _422 = 422,
    _423 = 423,
    _424 = 424,
    _426 = 426,
    _428 = 428,
    _429 = 429,
    _431 = 431,
    _451 = 451,
    _500 = 500,
    _501 = 501,
    _502 = 502,
    _503 = 503,
    _504 = 504,
    _505 = 505,
    _506 = 506,
    _507 = 507,
    _508 = 508,
    _510 = 510,
    _511 = 511,
}

/** Object to represent the updated External Data Provider status */
export class ProviderStatusUpdatedDto implements IProviderStatusUpdatedDto {
    /** ID of the External Data Provider */
    id?: string | undefined;
    httpStatusCode?: HttpStatusCode;
    /** Status value of External Data Provider. */
    active?: boolean;

    constructor(data?: IProviderStatusUpdatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.httpStatusCode = _data["httpStatusCode"];
            this.active = _data["active"];
        }
    }

    static fromJS(data: any): ProviderStatusUpdatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderStatusUpdatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["httpStatusCode"] = this.httpStatusCode;
        data["active"] = this.active;
        return data; 
    }
}

/** Object to represent the updated External Data Provider status */
export interface IProviderStatusUpdatedDto {
    /** ID of the External Data Provider */
    id?: string | undefined;
    httpStatusCode?: HttpStatusCode;
    /** Status value of External Data Provider. */
    active?: boolean;
}

/** Response DTO to represent status of External Data Provider after operation */
export class ExternalDataProviderStatusUpdatedDto implements IExternalDataProviderStatusUpdatedDto {
    /** List of providers that were requested to be updated */
    providersStatus?: ProviderStatusUpdatedDto[] | undefined;

    constructor(data?: IExternalDataProviderStatusUpdatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["providersStatus"])) {
                this.providersStatus = [] as any;
                for (let item of _data["providersStatus"])
                    this.providersStatus!.push(ProviderStatusUpdatedDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExternalDataProviderStatusUpdatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderStatusUpdatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.providersStatus)) {
            data["providersStatus"] = [];
            for (let item of this.providersStatus)
                data["providersStatus"].push(item.toJSON());
        }
        return data; 
    }
}

/** Response DTO to represent status of External Data Provider after operation */
export interface IExternalDataProviderStatusUpdatedDto {
    /** List of providers that were requested to be updated */
    providersStatus?: ProviderStatusUpdatedDto[] | undefined;
}

/** Service response data */
export class ExternalDataProviderStatusUpdatedDtoServiceResponse implements IExternalDataProviderStatusUpdatedDtoServiceResponse {
    data?: ExternalDataProviderStatusUpdatedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IExternalDataProviderStatusUpdatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ExternalDataProviderStatusUpdatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExternalDataProviderStatusUpdatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderStatusUpdatedDtoServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface IExternalDataProviderStatusUpdatedDtoServiceResponse {
    data?: ExternalDataProviderStatusUpdatedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Service request data */
export class ExternalDataProviderDtoServiceRequest implements IExternalDataProviderDtoServiceRequest {
    data?: ExternalDataProviderDto;

    constructor(data?: IExternalDataProviderDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ExternalDataProviderDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ExternalDataProviderDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IExternalDataProviderDtoServiceRequest {
    data?: ExternalDataProviderDto;
}

/** Response DTO representing added External Data Provider */
export class ExternalDataProviderAddedDto implements IExternalDataProviderAddedDto {
    /** ID of the added External Data Provider */
    providerId?: string | undefined;

    constructor(data?: IExternalDataProviderAddedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.providerId = _data["providerId"];
        }
    }

    static fromJS(data: any): ExternalDataProviderAddedDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderAddedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["providerId"] = this.providerId;
        return data; 
    }
}

/** Response DTO representing added External Data Provider */
export interface IExternalDataProviderAddedDto {
    /** ID of the added External Data Provider */
    providerId?: string | undefined;
}

/** Service response data */
export class ExternalDataProviderAddedDtoServiceResponse implements IExternalDataProviderAddedDtoServiceResponse {
    data?: ExternalDataProviderAddedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IExternalDataProviderAddedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ExternalDataProviderAddedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExternalDataProviderAddedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderAddedDtoServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface IExternalDataProviderAddedDtoServiceResponse {
    data?: ExternalDataProviderAddedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data; 
    }
}

export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
}

/** Request DTO Class create Import request */
export class ImportRequestDto implements IImportRequestDto {
    /** Id of the entity in External Data system */
    externalId!: string;
    /** Id of the Journey instance that will be connected to this Import request */
    journeyId?: string | undefined;
    /** Id of the provider from which we want to Import the data from */
    providerId!: string;
    /** Name of Imported entity */
    entityName!: string;

    constructor(data?: IImportRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.externalId = _data["externalId"];
            this.journeyId = _data["journeyId"];
            this.providerId = _data["providerId"];
            this.entityName = _data["entityName"];
        }
    }

    static fromJS(data: any): ImportRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new ImportRequestDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["externalId"] = this.externalId;
        data["journeyId"] = this.journeyId;
        data["providerId"] = this.providerId;
        data["entityName"] = this.entityName;
        return data; 
    }
}

/** Request DTO Class create Import request */
export interface IImportRequestDto {
    /** Id of the entity in External Data system */
    externalId: string;
    /** Id of the Journey instance that will be connected to this Import request */
    journeyId?: string | undefined;
    /** Id of the provider from which we want to Import the data from */
    providerId: string;
    /** Name of Imported entity */
    entityName: string;
}

/** Service request data */
export class ImportRequestDtoServiceRequest implements IImportRequestDtoServiceRequest {
    data?: ImportRequestDto;

    constructor(data?: IImportRequestDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ImportRequestDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ImportRequestDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ImportRequestDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IImportRequestDtoServiceRequest {
    data?: ImportRequestDto;
}

/** Response DTO representing the created Import request */
export class ImportRequestCreatedDto implements IImportRequestCreatedDto {
    /** ID of the created Import request */
    importRequestId?: string | undefined;

    constructor(data?: IImportRequestCreatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.importRequestId = _data["importRequestId"];
        }
    }

    static fromJS(data: any): ImportRequestCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new ImportRequestCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["importRequestId"] = this.importRequestId;
        return data; 
    }
}

/** Response DTO representing the created Import request */
export interface IImportRequestCreatedDto {
    /** ID of the created Import request */
    importRequestId?: string | undefined;
}

/** Service response data */
export class ImportRequestCreatedDtoServiceResponse implements IImportRequestCreatedDtoServiceResponse {
    data?: ImportRequestCreatedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IImportRequestCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ImportRequestCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ImportRequestCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ImportRequestCreatedDtoServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface IImportRequestCreatedDtoServiceResponse {
    data?: ImportRequestCreatedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Abstraction that represents properties */
export class PropertyDto implements IPropertyDto {
    /** Value of the property */
    value?: string | undefined;
    /** Type of property */
    type?: string | undefined;
    /** Id of custom type */
    customTypeId?: string;
    /** The is valid flag */
    isValid?: boolean;
    /** Dictionary of properties */
    properties?: { [key: string]: PropertyDto; } | undefined;

    constructor(data?: IPropertyDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.value = _data["value"];
            this.type = _data["type"];
            this.customTypeId = _data["customTypeId"];
            this.isValid = _data["isValid"];
            if (_data["properties"]) {
                this.properties = {} as any;
                for (let key in _data["properties"]) {
                    if (_data["properties"].hasOwnProperty(key))
                        this.properties![key] = _data["properties"][key] ? PropertyDto.fromJS(_data["properties"][key]) : new PropertyDto();
                }
            }
        }
    }

    static fromJS(data: any): PropertyDto {
        data = typeof data === 'object' ? data : {};
        let result = new PropertyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["value"] = this.value;
        data["type"] = this.type;
        data["customTypeId"] = this.customTypeId;
        data["isValid"] = this.isValid;
        if (this.properties) {
            data["properties"] = {};
            for (let key in this.properties) {
                if (this.properties.hasOwnProperty(key))
                    data["properties"][key] = this.properties[key] ? this.properties[key].toJSON() : <any>undefined;
            }
        }
        return data; 
    }
}

/** Abstraction that represents properties */
export interface IPropertyDto {
    /** Value of the property */
    value?: string | undefined;
    /** Type of property */
    type?: string | undefined;
    /** Id of custom type */
    customTypeId?: string;
    /** The is valid flag */
    isValid?: boolean;
    /** Dictionary of properties */
    properties?: { [key: string]: PropertyDto; } | undefined;
}

/** Class to represent deduplication search result */
export class DuplicationSearchResultDto implements IDuplicationSearchResultDto {
    /** Id of the entity */
    id?: string | undefined;
    /** Type of the entity */
    type?: string | undefined;
    /** Is Policy Jurisdiction */
    policyJurisdiction?: string | undefined;
    /** Search result values */
    properties?: { [key: string]: PropertyDto; } | undefined;

    constructor(data?: IDuplicationSearchResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.type = _data["type"];
            this.policyJurisdiction = _data["policyJurisdiction"];
            if (_data["properties"]) {
                this.properties = {} as any;
                for (let key in _data["properties"]) {
                    if (_data["properties"].hasOwnProperty(key))
                        this.properties![key] = _data["properties"][key] ? PropertyDto.fromJS(_data["properties"][key]) : new PropertyDto();
                }
            }
        }
    }

    static fromJS(data: any): DuplicationSearchResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new DuplicationSearchResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["policyJurisdiction"] = this.policyJurisdiction;
        if (this.properties) {
            data["properties"] = {};
            for (let key in this.properties) {
                if (this.properties.hasOwnProperty(key))
                    data["properties"][key] = this.properties[key] ? this.properties[key].toJSON() : <any>undefined;
            }
        }
        return data; 
    }
}

/** Class to represent deduplication search result */
export interface IDuplicationSearchResultDto {
    /** Id of the entity */
    id?: string | undefined;
    /** Type of the entity */
    type?: string | undefined;
    /** Is Policy Jurisdiction */
    policyJurisdiction?: string | undefined;
    /** Search result values */
    properties?: { [key: string]: PropertyDto; } | undefined;
}

/** Class to represent deduplication state of Association */
export class AssociatedPartyDeduplicationDto implements IAssociatedPartyDeduplicationDto {
    /** ID of the added External Data Provider */
    providerId!: string;
    /** Id of the entity in External Data system */
    externalId!: string;
    /** Deduplication state of Association, one of: [LinkedToExisting, NewEntity, ReviewMatches, DismissAllMatches, Rejected] */
    deduplicationState!: string;
    /** Id of Entity, to which Association is linked */
    linkedLegalEntityId?: string | undefined;
    /** Information, how Association was rejected, one of: [Manual, Auto, InvalidAssociation] */
    deduplicationRejectMethod?: string | undefined;
    /** List of Duplication Search Results */
    duplicationSearchResults?: DuplicationSearchResultDto[] | undefined;

    constructor(data?: IAssociatedPartyDeduplicationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.providerId = _data["providerId"];
            this.externalId = _data["externalId"];
            this.deduplicationState = _data["deduplicationState"];
            this.linkedLegalEntityId = _data["linkedLegalEntityId"];
            this.deduplicationRejectMethod = _data["deduplicationRejectMethod"];
            if (Array.isArray(_data["duplicationSearchResults"])) {
                this.duplicationSearchResults = [] as any;
                for (let item of _data["duplicationSearchResults"])
                    this.duplicationSearchResults!.push(DuplicationSearchResultDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AssociatedPartyDeduplicationDto {
        data = typeof data === 'object' ? data : {};
        let result = new AssociatedPartyDeduplicationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["providerId"] = this.providerId;
        data["externalId"] = this.externalId;
        data["deduplicationState"] = this.deduplicationState;
        data["linkedLegalEntityId"] = this.linkedLegalEntityId;
        data["deduplicationRejectMethod"] = this.deduplicationRejectMethod;
        if (Array.isArray(this.duplicationSearchResults)) {
            data["duplicationSearchResults"] = [];
            for (let item of this.duplicationSearchResults)
                data["duplicationSearchResults"].push(item.toJSON());
        }
        return data; 
    }
}

/** Class to represent deduplication state of Association */
export interface IAssociatedPartyDeduplicationDto {
    /** ID of the added External Data Provider */
    providerId: string;
    /** Id of the entity in External Data system */
    externalId: string;
    /** Deduplication state of Association, one of: [LinkedToExisting, NewEntity, ReviewMatches, DismissAllMatches, Rejected] */
    deduplicationState: string;
    /** Id of Entity, to which Association is linked */
    linkedLegalEntityId?: string | undefined;
    /** Information, how Association was rejected, one of: [Manual, Auto, InvalidAssociation] */
    deduplicationRejectMethod?: string | undefined;
    /** List of Duplication Search Results */
    duplicationSearchResults?: DuplicationSearchResultDto[] | undefined;
}

/** Class to represent deduplication statuses for all Associations */
export class AssociatedPartyDeduplicationHeaderDto implements IAssociatedPartyDeduplicationHeaderDto {
    /** ID of the created Import request */
    importId!: string;
    /** List of Associations with Deduplication statuses */
    associatedPartyDeduplicationList?: AssociatedPartyDeduplicationDto[] | undefined;

    constructor(data?: IAssociatedPartyDeduplicationHeaderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.importId = _data["importId"];
            if (Array.isArray(_data["associatedPartyDeduplicationList"])) {
                this.associatedPartyDeduplicationList = [] as any;
                for (let item of _data["associatedPartyDeduplicationList"])
                    this.associatedPartyDeduplicationList!.push(AssociatedPartyDeduplicationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AssociatedPartyDeduplicationHeaderDto {
        data = typeof data === 'object' ? data : {};
        let result = new AssociatedPartyDeduplicationHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["importId"] = this.importId;
        if (Array.isArray(this.associatedPartyDeduplicationList)) {
            data["associatedPartyDeduplicationList"] = [];
            for (let item of this.associatedPartyDeduplicationList)
                data["associatedPartyDeduplicationList"].push(item.toJSON());
        }
        return data; 
    }
}

/** Class to represent deduplication statuses for all Associations */
export interface IAssociatedPartyDeduplicationHeaderDto {
    /** ID of the created Import request */
    importId: string;
    /** List of Associations with Deduplication statuses */
    associatedPartyDeduplicationList?: AssociatedPartyDeduplicationDto[] | undefined;
}

/** Service request data */
export class AssociatedPartyDeduplicationHeaderDtoServiceRequest implements IAssociatedPartyDeduplicationHeaderDtoServiceRequest {
    data?: AssociatedPartyDeduplicationHeaderDto;

    constructor(data?: IAssociatedPartyDeduplicationHeaderDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? AssociatedPartyDeduplicationHeaderDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): AssociatedPartyDeduplicationHeaderDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AssociatedPartyDeduplicationHeaderDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IAssociatedPartyDeduplicationHeaderDtoServiceRequest {
    data?: AssociatedPartyDeduplicationHeaderDto;
}

export enum MappingType {
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
}

export class Mapping implements IMapping {
    source?: string | undefined;
    target?: string | undefined;
    type?: MappingType;
    loVMapName?: string | undefined;
    toArray?: boolean;
    displaySource?: boolean;
    constantValue?: string | undefined;
    mappings?: Mapping[] | undefined;

    constructor(data?: IMapping) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.source = _data["source"];
            this.target = _data["target"];
            this.type = _data["type"];
            this.loVMapName = _data["loVMapName"];
            this.toArray = _data["toArray"];
            this.displaySource = _data["displaySource"];
            this.constantValue = _data["constantValue"];
            if (Array.isArray(_data["mappings"])) {
                this.mappings = [] as any;
                for (let item of _data["mappings"])
                    this.mappings!.push(Mapping.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Mapping {
        data = typeof data === 'object' ? data : {};
        let result = new Mapping();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["source"] = this.source;
        data["target"] = this.target;
        data["type"] = this.type;
        data["loVMapName"] = this.loVMapName;
        data["toArray"] = this.toArray;
        data["displaySource"] = this.displaySource;
        data["constantValue"] = this.constantValue;
        if (Array.isArray(this.mappings)) {
            data["mappings"] = [];
            for (let item of this.mappings)
                data["mappings"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IMapping {
    source?: string | undefined;
    target?: string | undefined;
    type?: MappingType;
    loVMapName?: string | undefined;
    toArray?: boolean;
    displaySource?: boolean;
    constantValue?: string | undefined;
    mappings?: Mapping[] | undefined;
}

export class LoVMap implements ILoVMap {
    name?: string | undefined;
    map?: { [key: string]: string; } | undefined;

    constructor(data?: ILoVMap) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            if (_data["map"]) {
                this.map = {} as any;
                for (let key in _data["map"]) {
                    if (_data["map"].hasOwnProperty(key))
                        this.map![key] = _data["map"][key];
                }
            }
        }
    }

    static fromJS(data: any): LoVMap {
        data = typeof data === 'object' ? data : {};
        let result = new LoVMap();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        if (this.map) {
            data["map"] = {};
            for (let key in this.map) {
                if (this.map.hasOwnProperty(key))
                    data["map"][key] = this.map[key];
            }
        }
        return data; 
    }
}

export interface ILoVMap {
    name?: string | undefined;
    map?: { [key: string]: string; } | undefined;
}

export class LoVArrayMap implements ILoVArrayMap {
    name?: string | undefined;
    map?: { [key: string]: string[]; } | undefined;

    constructor(data?: ILoVArrayMap) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            if (_data["map"]) {
                this.map = {} as any;
                for (let key in _data["map"]) {
                    if (_data["map"].hasOwnProperty(key))
                        this.map![key] = _data["map"][key] !== undefined ? _data["map"][key] : [];
                }
            }
        }
    }

    static fromJS(data: any): LoVArrayMap {
        data = typeof data === 'object' ? data : {};
        let result = new LoVArrayMap();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        if (this.map) {
            data["map"] = {};
            for (let key in this.map) {
                if (this.map.hasOwnProperty(key))
                    data["map"][key] = this.map[key];
            }
        }
        return data; 
    }
}

export interface ILoVArrayMap {
    name?: string | undefined;
    map?: { [key: string]: string[]; } | undefined;
}

export class Map implements IMap {
    mappings?: Mapping[] | undefined;
    loVMaps?: LoVMap[] | undefined;
    loVArrayMaps?: LoVArrayMap[] | undefined;

    constructor(data?: IMap) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["mappings"])) {
                this.mappings = [] as any;
                for (let item of _data["mappings"])
                    this.mappings!.push(Mapping.fromJS(item));
            }
            if (Array.isArray(_data["loVMaps"])) {
                this.loVMaps = [] as any;
                for (let item of _data["loVMaps"])
                    this.loVMaps!.push(LoVMap.fromJS(item));
            }
            if (Array.isArray(_data["loVArrayMaps"])) {
                this.loVArrayMaps = [] as any;
                for (let item of _data["loVArrayMaps"])
                    this.loVArrayMaps!.push(LoVArrayMap.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Map {
        data = typeof data === 'object' ? data : {};
        let result = new Map();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.mappings)) {
            data["mappings"] = [];
            for (let item of this.mappings)
                data["mappings"].push(item.toJSON());
        }
        if (Array.isArray(this.loVMaps)) {
            data["loVMaps"] = [];
            for (let item of this.loVMaps)
                data["loVMaps"].push(item.toJSON());
        }
        if (Array.isArray(this.loVArrayMaps)) {
            data["loVArrayMaps"] = [];
            for (let item of this.loVArrayMaps)
                data["loVArrayMaps"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IMap {
    mappings?: Mapping[] | undefined;
    loVMaps?: LoVMap[] | undefined;
    loVArrayMaps?: LoVArrayMap[] | undefined;
}

/** Class to represent Source - Target Map */
export class MapDto implements IMapDto {
    /** Map Name */
    name?: string | undefined;
    map?: Map;

    constructor(data?: IMapDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.map = _data["map"] ? Map.fromJS(_data["map"]) : <any>undefined;
        }
    }

    static fromJS(data: any): MapDto {
        data = typeof data === 'object' ? data : {};
        let result = new MapDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["map"] = this.map ? this.map.toJSON() : <any>undefined;
        return data; 
    }
}

/** Class to represent Source - Target Map */
export interface IMapDto {
    /** Map Name */
    name?: string | undefined;
    map?: Map;
}

/** Class to represent mapping for single operation */
export class OperationMappingDto implements IOperationMappingDto {
    /** Operation, one of: [Search, Get] */
    operation!: string;
    /** Operation Type, one of: [Request, Response] */
    operationType!: string;
    /** Set of Maps */
    maps!: MapDto[];

    constructor(data?: IOperationMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.maps = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.operation = _data["operation"];
            this.operationType = _data["operationType"];
            if (Array.isArray(_data["maps"])) {
                this.maps = [] as any;
                for (let item of _data["maps"])
                    this.maps!.push(MapDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): OperationMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new OperationMappingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["operation"] = this.operation;
        data["operationType"] = this.operationType;
        if (Array.isArray(this.maps)) {
            data["maps"] = [];
            for (let item of this.maps)
                data["maps"].push(item.toJSON());
        }
        return data; 
    }
}

/** Class to represent mapping for single operation */
export interface IOperationMappingDto {
    /** Operation, one of: [Search, Get] */
    operation: string;
    /** Operation Type, one of: [Request, Response] */
    operationType: string;
    /** Set of Maps */
    maps: MapDto[];
}

/** Class to represent mappings set for Provider */
export class ProviderMappingDto implements IProviderMappingDto {
    /** Set of Operation Mappings (Search Request, Search Response, Get Request, Get Response) */
    operationsMappings!: OperationMappingDto[];

    constructor(data?: IProviderMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.operationsMappings = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["operationsMappings"])) {
                this.operationsMappings = [] as any;
                for (let item of _data["operationsMappings"])
                    this.operationsMappings!.push(OperationMappingDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProviderMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderMappingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.operationsMappings)) {
            data["operationsMappings"] = [];
            for (let item of this.operationsMappings)
                data["operationsMappings"].push(item.toJSON());
        }
        return data; 
    }
}

/** Class to represent mappings set for Provider */
export interface IProviderMappingDto {
    /** Set of Operation Mappings (Search Request, Search Response, Get Request, Get Response) */
    operationsMappings: OperationMappingDto[];
}

/** Service request data */
export class ProviderMappingDtoServiceRequest implements IProviderMappingDtoServiceRequest {
    data!: ProviderMappingDto;

    constructor(data?: IProviderMappingDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.data = new ProviderMappingDto();
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ProviderMappingDto.fromJS(_data["data"]) : new ProviderMappingDto();
        }
    }

    static fromJS(data: any): ProviderMappingDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderMappingDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IProviderMappingDtoServiceRequest {
    data: ProviderMappingDto;
}

/** Service request data */
export class OperationMappingDtoServiceRequest implements IOperationMappingDtoServiceRequest {
    data!: OperationMappingDto;

    constructor(data?: IOperationMappingDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.data = new OperationMappingDto();
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? OperationMappingDto.fromJS(_data["data"]) : new OperationMappingDto();
        }
    }

    static fromJS(data: any): OperationMappingDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new OperationMappingDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IOperationMappingDtoServiceRequest {
    data: OperationMappingDto;
}

/** Class to represent the publish external data process */
export class PublishOrchestratorDto implements IPublishOrchestratorDto {
    /** Id of the Tenant */
    tenant?: string | undefined;
    /** Id of the Journey (Needed to update EntityDraft for the root legal entity) */
    journeyId!: string;
    /** Id of the Search Request */
    searchId!: string;
    /** ExternalId of the root Legal Entity */
    externalId!: string;
    /** Id of the External Data Import */
    importId!: string;
    /** EntityId of the root Legal Entity */
    entityId!: string;
    /** Id of the External Data Provider */
    externalDataProviderId!: string;
    /** DraftId of the root Legal Entity */
    draftId!: string;

    constructor(data?: IPublishOrchestratorDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.tenant = _data["tenant"];
            this.journeyId = _data["journeyId"];
            this.searchId = _data["searchId"];
            this.externalId = _data["externalId"];
            this.importId = _data["importId"];
            this.entityId = _data["entityId"];
            this.externalDataProviderId = _data["externalDataProviderId"];
            this.draftId = _data["draftId"];
        }
    }

    static fromJS(data: any): PublishOrchestratorDto {
        data = typeof data === 'object' ? data : {};
        let result = new PublishOrchestratorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tenant"] = this.tenant;
        data["journeyId"] = this.journeyId;
        data["searchId"] = this.searchId;
        data["externalId"] = this.externalId;
        data["importId"] = this.importId;
        data["entityId"] = this.entityId;
        data["externalDataProviderId"] = this.externalDataProviderId;
        data["draftId"] = this.draftId;
        return data; 
    }
}

/** Class to represent the publish external data process */
export interface IPublishOrchestratorDto {
    /** Id of the Tenant */
    tenant?: string | undefined;
    /** Id of the Journey (Needed to update EntityDraft for the root legal entity) */
    journeyId: string;
    /** Id of the Search Request */
    searchId: string;
    /** ExternalId of the root Legal Entity */
    externalId: string;
    /** Id of the External Data Import */
    importId: string;
    /** EntityId of the root Legal Entity */
    entityId: string;
    /** Id of the External Data Provider */
    externalDataProviderId: string;
    /** DraftId of the root Legal Entity */
    draftId: string;
}

/** Service request data */
export class PublishOrchestratorDtoServiceRequest implements IPublishOrchestratorDtoServiceRequest {
    data?: PublishOrchestratorDto;

    constructor(data?: IPublishOrchestratorDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? PublishOrchestratorDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): PublishOrchestratorDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new PublishOrchestratorDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface IPublishOrchestratorDtoServiceRequest {
    data?: PublishOrchestratorDto;
}

/** Request DTO to create a Search request */
export class SearchRequestDto implements ISearchRequestDto {
    /** Search Criteria that we want to search for */
    searchCriteria!: any;
    /** Id of the Journey instance that will be connected to this Search request */
    journeyId?: string | undefined;

    constructor(data?: ISearchRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.searchCriteria = _data["searchCriteria"];
            this.journeyId = _data["journeyId"];
        }
    }

    static fromJS(data: any): SearchRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new SearchRequestDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["searchCriteria"] = this.searchCriteria;
        data["journeyId"] = this.journeyId;
        return data; 
    }
}

/** Request DTO to create a Search request */
export interface ISearchRequestDto {
    /** Search Criteria that we want to search for */
    searchCriteria: any;
    /** Id of the Journey instance that will be connected to this Search request */
    journeyId?: string | undefined;
}

/** Service request data */
export class SearchRequestDtoServiceRequest implements ISearchRequestDtoServiceRequest {
    data?: SearchRequestDto;

    constructor(data?: ISearchRequestDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? SearchRequestDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SearchRequestDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SearchRequestDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface ISearchRequestDtoServiceRequest {
    data?: SearchRequestDto;
}

/** Response DTO representing the created Search request */
export class SearchRequestCreatedDto implements ISearchRequestCreatedDto {
    /** ID of the created Search request */
    searchRequestId?: string | undefined;

    constructor(data?: ISearchRequestCreatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.searchRequestId = _data["searchRequestId"];
        }
    }

    static fromJS(data: any): SearchRequestCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new SearchRequestCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["searchRequestId"] = this.searchRequestId;
        return data; 
    }
}

/** Response DTO representing the created Search request */
export interface ISearchRequestCreatedDto {
    /** ID of the created Search request */
    searchRequestId?: string | undefined;
}

/** Service response data */
export class SearchRequestCreatedDtoServiceResponse implements ISearchRequestCreatedDtoServiceResponse {
    data?: SearchRequestCreatedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ISearchRequestCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? SearchRequestCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SearchRequestCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new SearchRequestCreatedDtoServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

/** Service response data */
export interface ISearchRequestCreatedDtoServiceResponse {
    data?: SearchRequestCreatedDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Class to represent status of Search operation */
export class SearchStatusDto implements ISearchStatusDto {
    /** Id of the Search operation */
    id!: string;
    /** Status of the Search operation */
    status!: string;

    constructor(data?: ISearchStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): SearchStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new SearchStatusDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        return data; 
    }
}

/** Class to represent status of Search operation */
export interface ISearchStatusDto {
    /** Id of the Search operation */
    id: string;
    /** Status of the Search operation */
    status: string;
}

/** Service request data */
export class SearchStatusDtoServiceRequest implements ISearchStatusDtoServiceRequest {
    data?: SearchStatusDto;

    constructor(data?: ISearchStatusDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? SearchStatusDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SearchStatusDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SearchStatusDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

/** Service request data */
export interface ISearchStatusDtoServiceRequest {
    data?: SearchStatusDto;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}