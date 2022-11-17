/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Get simplified configuration for specific tenant
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Configuration.ConfigurationDto class containing configuration.
     */
    getSimplifiedConfiguration(x_TENANT_ID: string): Promise<ConfigurationDtoServiceResponse>;
    /**
     * Get configuration for specific tenant
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Configuration.ConfigurationDto class containing configuration.
     */
    getConfiguration(x_TENANT_ID: string, config?: boolean | undefined): Promise<ConfigurationDtoServiceResponse>;
    /**
     * Get single provider from configuration
     * @param providerId The ID of provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Configuration.ExternalDataProviderDto class containing provider data.
     */
    getProvider(providerId: string, x_TENANT_ID: string, config?: boolean | undefined): Promise<ExternalDataProviderDtoServiceResponse>;
    /**
     * Get imported company data by import request id
     * @param id The ID of import request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.ImportedDataDto class containing company data of imported entity
     */
    getImportedDataById(id: string, x_TENANT_ID: string): Promise<ImportedDataDtoServiceResponse>;
    /**
     * Get imported company data by journey id and external id
     * @param journeyId Journey ID from which the request originated from
     * @param externalId ID of entity in External Data system
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.ImportedDataDto class containing company data of imported entity
     */
    getImportedDataByJourneyIdAndExternalId(journeyId: string, externalId: string, x_TENANT_ID: string): Promise<ImportedDataDtoServiceResponse>;
    /**
     * Get external id of last saved import by journey id
     * @param journeyId Journey ID from which the request originated from
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.ImportIdentifierDto class containing External ID of last saved import
     */
    getImportIdentifierOfLastSavedImportByJourneyId(journeyId: string, x_TENANT_ID: string): Promise<ImportIdentifierDtoServiceResponse>;
    /**
     * Get provider mapping
     * @param providerId The ID of provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Mapping.ProviderMappingDto class containing mapping for provider
     */
    getProviderMapping(providerId: string, x_TENANT_ID: string): Promise<ProviderMappingDtoServiceResponse>;
    /**
     * Get search results by search request id
     * @param id The ID of search request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Fenergo.Nebula.ExternalData.Query.Application.Dto.SearchResultsDto class containing search results
     */
    getSearchResultsById(id: string, x_TENANT_ID: string): Promise<SearchResultsDtoServiceResponse>;
    /**
     * Get search results by journey id
     * @param journeyId Journey ID from which the request originated from
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.SearchResultsDto class containing search results
     */
    getSearchResultsByJourneyId(journeyId: string, x_TENANT_ID: string): Promise<SearchResultsDtoServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/externaldataquery";
    }

    /**
     * Get simplified configuration for specific tenant
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Configuration.ConfigurationDto class containing configuration.
     */
    getSimplifiedConfiguration(x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ConfigurationDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration/simplified";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetSimplifiedConfiguration(_response);
        });
    }

    protected processGetSimplifiedConfiguration(response: AxiosResponse): Promise<ConfigurationDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ConfigurationDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("There is no configuration for this tenant", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
     * Get configuration for specific tenant
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Configuration.ConfigurationDto class containing configuration.
     */
    getConfiguration(x_TENANT_ID: string, config?: boolean | undefined , cancelToken?: CancelToken | undefined): Promise<ConfigurationDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration?";
        if (config === null)
            throw new Error("The parameter 'config' cannot be null.");
        else if (config !== undefined)
            url_ += "config=" + encodeURIComponent("" + config) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetConfiguration(_response);
        });
    }

    protected processGetConfiguration(response: AxiosResponse): Promise<ConfigurationDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ConfigurationDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("There is no configuration for this tenant", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
     * Get single provider from configuration
     * @param providerId The ID of provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Configuration.ExternalDataProviderDto class containing provider data.
     */
    getProvider(providerId: string, x_TENANT_ID: string, config?: boolean | undefined , cancelToken?: CancelToken | undefined): Promise<ExternalDataProviderDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration/provider/{providerId}?";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        if (config === null)
            throw new Error("The parameter 'config' cannot be null.");
        else if (config !== undefined)
            url_ += "config=" + encodeURIComponent("" + config) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetProvider(_response);
        });
    }

    protected processGetProvider(response: AxiosResponse): Promise<ExternalDataProviderDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ExternalDataProviderDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("There is no configuration for this tenant", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<ExternalDataProviderDtoServiceResponse>(<any>null);
    }

    /**
     * Get imported company data by import request id
     * @param id The ID of import request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.ImportedDataDto class containing company data of imported entity
     */
    getImportedDataById(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ImportedDataDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/import/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetImportedDataById(_response);
        });
    }

    protected processGetImportedDataById(response: AxiosResponse): Promise<ImportedDataDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ImportedDataDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Import request with given ID does not exist", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<ImportedDataDtoServiceResponse>(<any>null);
    }

    /**
     * Get imported company data by journey id and external id
     * @param journeyId Journey ID from which the request originated from
     * @param externalId ID of entity in External Data system
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.ImportedDataDto class containing company data of imported entity
     */
    getImportedDataByJourneyIdAndExternalId(journeyId: string, externalId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ImportedDataDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/import/journey/{journeyId}/externalId/{externalId}";
        if (journeyId === undefined || journeyId === null)
            throw new Error("The parameter 'journeyId' must be defined.");
        url_ = url_.replace("{journeyId}", encodeURIComponent("" + journeyId));
        if (externalId === undefined || externalId === null)
            throw new Error("The parameter 'externalId' must be defined.");
        url_ = url_.replace("{externalId}", encodeURIComponent("" + externalId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetImportedDataByJourneyIdAndExternalId(_response);
        });
    }

    protected processGetImportedDataByJourneyIdAndExternalId(response: AxiosResponse): Promise<ImportedDataDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ImportedDataDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<ImportedDataDtoServiceResponse>(<any>null);
    }

    /**
     * Get external id of last saved import by journey id
     * @param journeyId Journey ID from which the request originated from
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.ImportIdentifierDto class containing External ID of last saved import
     */
    getImportIdentifierOfLastSavedImportByJourneyId(journeyId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ImportIdentifierDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/import/journey/{journeyId}/latestImport";
        if (journeyId === undefined || journeyId === null)
            throw new Error("The parameter 'journeyId' must be defined.");
        url_ = url_.replace("{journeyId}", encodeURIComponent("" + journeyId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetImportIdentifierOfLastSavedImportByJourneyId(_response);
        });
    }

    protected processGetImportIdentifierOfLastSavedImportByJourneyId(response: AxiosResponse): Promise<ImportIdentifierDtoServiceResponse> {
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
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ImportIdentifierDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 404) {
            const _responseText = response.data;
            return throwException("External Id of last saved import for given Journey ID does not exist", status, _responseText, _headers);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<ImportIdentifierDtoServiceResponse>(<any>null);
    }

    /**
     * Get provider mapping
     * @param providerId The ID of provider
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.Mapping.ProviderMappingDto class containing mapping for provider
     */
    getProviderMapping(providerId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ProviderMappingDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/mapping/provider/{providerId}";
        if (providerId === undefined || providerId === null)
            throw new Error("The parameter 'providerId' must be defined.");
        url_ = url_.replace("{providerId}", encodeURIComponent("" + providerId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetProviderMapping(_response);
        });
    }

    protected processGetProviderMapping(response: AxiosResponse): Promise<ProviderMappingDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ProviderMappingDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Mapping for given tenant does not exist", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<ProviderMappingDtoServiceResponse>(<any>null);
    }

    /**
     * Get search results by search request id
     * @param id The ID of search request
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Fenergo.Nebula.ExternalData.Query.Application.Dto.SearchResultsDto class containing search results
     */
    getSearchResultsById(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<SearchResultsDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/search/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetSearchResultsById(_response);
        });
    }

    protected processGetSearchResultsById(response: AxiosResponse): Promise<SearchResultsDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = SearchResultsDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Search Results for given Search Request ID does not exist", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<SearchResultsDtoServiceResponse>(<any>null);
    }

    /**
     * Get search results by journey id
     * @param journeyId Journey ID from which the request originated from
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Instance of Fenergo.Nebula.ExternalData.Query.Application.Dto.SearchResultsDto class containing search results
     */
    getSearchResultsByJourneyId(journeyId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<SearchResultsDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/search/journey/{journeyId}";
        if (journeyId === undefined || journeyId === null)
            throw new Error("The parameter 'journeyId' must be defined.");
        url_ = url_.replace("{journeyId}", encodeURIComponent("" + journeyId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
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
            return this.processGetSearchResultsByJourneyId(_response);
        });
    }

    protected processGetSearchResultsByJourneyId(response: AxiosResponse): Promise<SearchResultsDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = SearchResultsDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Search Results for given Journey ID does not exist", status, _responseText, _headers, result404);
        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);
        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);
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
        return Promise.resolve<SearchResultsDtoServiceResponse>(<any>null);
    }
}

/** Provider Configuration data */
export class ProviderConfigurationDto implements IProviderConfigurationDto {
    /** Internal name used to identify entry of Provider Configuration */
    field?: string | undefined;
    /** Name of Provider Configuration entry */
    name?: string | undefined;
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

/** Provider Configuration data */
export interface IProviderConfigurationDto {
    /** Internal name used to identify entry of Provider Configuration */
    field?: string | undefined;
    /** Name of Provider Configuration entry */
    name?: string | undefined;
    /** Value of Provider Configuration entry */
    value?: string | undefined;
    /** Flag defining whether the value should be masked (********) or not */
    masked?: boolean;
}

/** Adapter Configuration data associated with External Data Provider */
export class AdapterConfigurationDto implements IAdapterConfigurationDto {
    /** URL address of External Data Adapter */
    url?: string | undefined;

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

/** Adapter Configuration data associated with External Data Provider */
export interface IAdapterConfigurationDto {
    /** URL address of External Data Adapter */
    url?: string | undefined;
}

/** Details of error that might occur */
export class ErrorDetailsDto implements IErrorDetailsDto {
    /** Source from where the error comes from */
    source?: string | undefined;
    /** Internal error code */
    errorCode?: string | undefined;
    /** Error message */
    message?: string | undefined;

    constructor(data?: IErrorDetailsDto) {
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
            this.errorCode = _data["errorCode"];
            this.message = _data["message"];
        }
    }

    static fromJS(data: any): ErrorDetailsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ErrorDetailsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["source"] = this.source;
        data["errorCode"] = this.errorCode;
        data["message"] = this.message;
        return data; 
    }
}

/** Details of error that might occur */
export interface IErrorDetailsDto {
    /** Source from where the error comes from */
    source?: string | undefined;
    /** Internal error code */
    errorCode?: string | undefined;
    /** Error message */
    message?: string | undefined;
}

/** External Data Provider data */
export class ExternalDataProviderDto implements IExternalDataProviderDto {
    /** The UiD of the External Data Provider */
    id?: string | undefined;
    /** Name of the External Data Provider */
    name?: string | undefined;
    /** Active flag (disabled/enabled) */
    active?: boolean;
    /** Current status of External Data Provider, one of: [Not verified, Testing, Verification failed, Verified] */
    status?: string | undefined;
    /** List of Provider Configuration associated with this External Data Provider */
    providerConfiguration?: ProviderConfigurationDto[] | undefined;
    adapterConfiguration?: AdapterConfigurationDto;
    errorDetails?: ErrorDetailsDto;

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
            this.active = _data["active"];
            this.status = _data["status"];
            if (Array.isArray(_data["providerConfiguration"])) {
                this.providerConfiguration = [] as any;
                for (let item of _data["providerConfiguration"])
                    this.providerConfiguration!.push(ProviderConfigurationDto.fromJS(item));
            }
            this.adapterConfiguration = _data["adapterConfiguration"] ? AdapterConfigurationDto.fromJS(_data["adapterConfiguration"]) : <any>undefined;
            this.errorDetails = _data["errorDetails"] ? ErrorDetailsDto.fromJS(_data["errorDetails"]) : <any>undefined;
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
        data["active"] = this.active;
        data["status"] = this.status;
        if (Array.isArray(this.providerConfiguration)) {
            data["providerConfiguration"] = [];
            for (let item of this.providerConfiguration)
                data["providerConfiguration"].push(item.toJSON());
        }
        data["adapterConfiguration"] = this.adapterConfiguration ? this.adapterConfiguration.toJSON() : <any>undefined;
        data["errorDetails"] = this.errorDetails ? this.errorDetails.toJSON() : <any>undefined;
        return data; 
    }
}

/** External Data Provider data */
export interface IExternalDataProviderDto {
    /** The UiD of the External Data Provider */
    id?: string | undefined;
    /** Name of the External Data Provider */
    name?: string | undefined;
    /** Active flag (disabled/enabled) */
    active?: boolean;
    /** Current status of External Data Provider, one of: [Not verified, Testing, Verification failed, Verified] */
    status?: string | undefined;
    /** List of Provider Configuration associated with this External Data Provider */
    providerConfiguration?: ProviderConfigurationDto[] | undefined;
    adapterConfiguration?: AdapterConfigurationDto;
    errorDetails?: ErrorDetailsDto;
}

/** External Data Configuration data */
export class ConfigurationDto implements IConfigurationDto {
    /** The UiD of the External Data Configuration */
    id?: string | undefined;
    /** List of External Data Providers associated with this External Data Configuration */
    externalDataProviders?: ExternalDataProviderDto[] | undefined;

    constructor(data?: IConfigurationDto) {
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
        data["id"] = this.id;
        if (Array.isArray(this.externalDataProviders)) {
            data["externalDataProviders"] = [];
            for (let item of this.externalDataProviders)
                data["externalDataProviders"].push(item.toJSON());
        }
        return data; 
    }
}

/** External Data Configuration data */
export interface IConfigurationDto {
    /** The UiD of the External Data Configuration */
    id?: string | undefined;
    /** List of External Data Providers associated with this External Data Configuration */
    externalDataProviders?: ExternalDataProviderDto[] | undefined;
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

/** Service response data */
export class ExternalDataProviderDtoServiceResponse implements IExternalDataProviderDtoServiceResponse {
    data?: ExternalDataProviderDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IExternalDataProviderDtoServiceResponse) {
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
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExternalDataProviderDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalDataProviderDtoServiceResponse();
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
export interface IExternalDataProviderDtoServiceResponse {
    data?: ExternalDataProviderDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Class to represent deduplication state of Association */
export class AssociatedPartyDeduplicationDto implements IAssociatedPartyDeduplicationDto {
    /** ID of the added External Data Provider */
    providerId?: string | undefined;
    /** Id of the entity in External Data system */
    externalId?: string | undefined;
    /** Deduplication state of Association, one of: [LinkedToExisting, NewEntity, ReviewMatches, DismissAllMatches, Rejected] */
    deduplicationState?: string | undefined;
    /** Id of Entity, to which Association is linked */
    linkedLegalEntityId?: string | undefined;
    /** Information, how Association was rejected, one of: [Manual, Auto, InvalidAssociation] */
    deduplicationRejectMethod?: string | undefined;
    /** Search result values */
    duplicateSearchResults?: any[] | undefined;

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
            if (Array.isArray(_data["duplicateSearchResults"])) {
                this.duplicateSearchResults = [] as any;
                for (let item of _data["duplicateSearchResults"])
                    this.duplicateSearchResults!.push(item);
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
        if (Array.isArray(this.duplicateSearchResults)) {
            data["duplicateSearchResults"] = [];
            for (let item of this.duplicateSearchResults)
                data["duplicateSearchResults"].push(item);
        }
        return data; 
    }
}

/** Class to represent deduplication state of Association */
export interface IAssociatedPartyDeduplicationDto {
    /** ID of the added External Data Provider */
    providerId?: string | undefined;
    /** Id of the entity in External Data system */
    externalId?: string | undefined;
    /** Deduplication state of Association, one of: [LinkedToExisting, NewEntity, ReviewMatches, DismissAllMatches, Rejected] */
    deduplicationState?: string | undefined;
    /** Id of Entity, to which Association is linked */
    linkedLegalEntityId?: string | undefined;
    /** Information, how Association was rejected, one of: [Manual, Auto, InvalidAssociation] */
    deduplicationRejectMethod?: string | undefined;
    /** Search result values */
    duplicateSearchResults?: any[] | undefined;
}

/** Class to represent imported data */
export class ImportedDataDto implements IImportedDataDto {
    /** Import Id */
    id?: string | undefined;
    /** JourneyId of the Root Legal Entity */
    journeyId?: string | undefined;
    /** External Data provider Id */
    providerId?: string | undefined;
    /** ExternalId of the root Legal Entity */
    externalId?: string | undefined;
    /** Search Status, one of: [NotStarted, InProgress, DataReceived, DataSaved] */
    status?: string | undefined;
    /** Root Legal Entity details returned by the External Data Provider */
    importedEntityData?: any | undefined;
    /** List of Associated Parties returned by the External Data Provider */
    importedHierarchyDataList?: any[] | undefined;
    /** List of Associations returned by the External Data Provider */
    associations?: any[] | undefined;
    /** List of Deduplication results */
    associatedPartyDeduplicationList?: AssociatedPartyDeduplicationDto[] | undefined;

    constructor(data?: IImportedDataDto) {
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
            this.journeyId = _data["journeyId"];
            this.providerId = _data["providerId"];
            this.externalId = _data["externalId"];
            this.status = _data["status"];
            this.importedEntityData = _data["importedEntityData"];
            if (Array.isArray(_data["importedHierarchyDataList"])) {
                this.importedHierarchyDataList = [] as any;
                for (let item of _data["importedHierarchyDataList"])
                    this.importedHierarchyDataList!.push(item);
            }
            if (Array.isArray(_data["associations"])) {
                this.associations = [] as any;
                for (let item of _data["associations"])
                    this.associations!.push(item);
            }
            if (Array.isArray(_data["associatedPartyDeduplicationList"])) {
                this.associatedPartyDeduplicationList = [] as any;
                for (let item of _data["associatedPartyDeduplicationList"])
                    this.associatedPartyDeduplicationList!.push(AssociatedPartyDeduplicationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ImportedDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new ImportedDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["journeyId"] = this.journeyId;
        data["providerId"] = this.providerId;
        data["externalId"] = this.externalId;
        data["status"] = this.status;
        data["importedEntityData"] = this.importedEntityData;
        if (Array.isArray(this.importedHierarchyDataList)) {
            data["importedHierarchyDataList"] = [];
            for (let item of this.importedHierarchyDataList)
                data["importedHierarchyDataList"].push(item);
        }
        if (Array.isArray(this.associations)) {
            data["associations"] = [];
            for (let item of this.associations)
                data["associations"].push(item);
        }
        if (Array.isArray(this.associatedPartyDeduplicationList)) {
            data["associatedPartyDeduplicationList"] = [];
            for (let item of this.associatedPartyDeduplicationList)
                data["associatedPartyDeduplicationList"].push(item.toJSON());
        }
        return data; 
    }
}

/** Class to represent imported data */
export interface IImportedDataDto {
    /** Import Id */
    id?: string | undefined;
    /** JourneyId of the Root Legal Entity */
    journeyId?: string | undefined;
    /** External Data provider Id */
    providerId?: string | undefined;
    /** ExternalId of the root Legal Entity */
    externalId?: string | undefined;
    /** Search Status, one of: [NotStarted, InProgress, DataReceived, DataSaved] */
    status?: string | undefined;
    /** Root Legal Entity details returned by the External Data Provider */
    importedEntityData?: any | undefined;
    /** List of Associated Parties returned by the External Data Provider */
    importedHierarchyDataList?: any[] | undefined;
    /** List of Associations returned by the External Data Provider */
    associations?: any[] | undefined;
    /** List of Deduplication results */
    associatedPartyDeduplicationList?: AssociatedPartyDeduplicationDto[] | undefined;
}

/** Service response data */
export class ImportedDataDtoServiceResponse implements IImportedDataDtoServiceResponse {
    data?: ImportedDataDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IImportedDataDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ImportedDataDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ImportedDataDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ImportedDataDtoServiceResponse();
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
export interface IImportedDataDtoServiceResponse {
    data?: ImportedDataDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Class to represent information about Imported Entity */
export class ImportIdentifierDto implements IImportIdentifierDto {
    /** Id of the entity in External Data system */
    externalId?: string | undefined;
    /** ID of the added External Data Provider */
    providerId?: string | undefined;

    constructor(data?: IImportIdentifierDto) {
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
            this.providerId = _data["providerId"];
        }
    }

    static fromJS(data: any): ImportIdentifierDto {
        data = typeof data === 'object' ? data : {};
        let result = new ImportIdentifierDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["externalId"] = this.externalId;
        data["providerId"] = this.providerId;
        return data; 
    }
}

/** Class to represent information about Imported Entity */
export interface IImportIdentifierDto {
    /** Id of the entity in External Data system */
    externalId?: string | undefined;
    /** ID of the added External Data Provider */
    providerId?: string | undefined;
}

/** Service response data */
export class ImportIdentifierDtoServiceResponse implements IImportIdentifierDtoServiceResponse {
    data?: ImportIdentifierDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IImportIdentifierDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ImportIdentifierDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ImportIdentifierDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ImportIdentifierDtoServiceResponse();
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
export interface IImportIdentifierDtoServiceResponse {
    data?: ImportIdentifierDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
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
                        (<any>this.map)![key] = _data["map"][key];
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
                    (<any>data["map"])[key] = this.map[key];
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
                        (<any>this.map)![key] = _data["map"][key] !== undefined ? _data["map"][key] : [];
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
                    (<any>data["map"])[key] = this.map[key];
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
    operation?: string | undefined;
    /** Operation Type, one of: [Request, Response] */
    operationType?: string | undefined;
    /** Set of Maps */
    maps?: MapDto[] | undefined;

    constructor(data?: IOperationMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
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
    operation?: string | undefined;
    /** Operation Type, one of: [Request, Response] */
    operationType?: string | undefined;
    /** Set of Maps */
    maps?: MapDto[] | undefined;
}

/** Class to represent mappings set for Provider */
export class ProviderMappingDto implements IProviderMappingDto {
    /** The UiD of the Provider */
    providerId?: string | undefined;
    /** Set of Operation Mappings (Search Request, Search Response, Get Request, Get Response) */
    operationsMappings?: OperationMappingDto[] | undefined;

    constructor(data?: IProviderMappingDto) {
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
        data["providerId"] = this.providerId;
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
    /** The UiD of the Provider */
    providerId?: string | undefined;
    /** Set of Operation Mappings (Search Request, Search Response, Get Request, Get Response) */
    operationsMappings?: OperationMappingDto[] | undefined;
}

/** Service response data */
export class ProviderMappingDtoServiceResponse implements IProviderMappingDtoServiceResponse {
    data?: ProviderMappingDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IProviderMappingDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ProviderMappingDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProviderMappingDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderMappingDtoServiceResponse();
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
export interface IProviderMappingDtoServiceResponse {
    data?: ProviderMappingDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
}

/** Class to represent Search response from specific Provider */
export class SearchResponseDto implements ISearchResponseDto {
    /** Id of the Provider from which Search response is from */
    providerId?: string | undefined;
    /** Status of the Search response */
    status?: string | undefined;
    /** List of results from this Search operation */
    results?: any[] | undefined;

    constructor(data?: ISearchResponseDto) {
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
            this.status = _data["status"];
            if (Array.isArray(_data["results"])) {
                this.results = [] as any;
                for (let item of _data["results"])
                    this.results!.push(item);
            }
        }
    }

    static fromJS(data: any): SearchResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SearchResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["providerId"] = this.providerId;
        data["status"] = this.status;
        if (Array.isArray(this.results)) {
            data["results"] = [];
            for (let item of this.results)
                data["results"].push(item);
        }
        return data; 
    }
}

/** Class to represent Search response from specific Provider */
export interface ISearchResponseDto {
    /** Id of the Provider from which Search response is from */
    providerId?: string | undefined;
    /** Status of the Search response */
    status?: string | undefined;
    /** List of results from this Search operation */
    results?: any[] | undefined;
}

/** Class to represent Search results */
export class SearchResultsDto implements ISearchResultsDto {
    /** Id of the Search results */
    id?: string | undefined;
    /** Id of the Journey from which the request originated from */
    journeyId?: string | undefined;
    /** Status of Search results */
    status?: string | undefined;
    /** List of Provider Ids that were called */
    providerIds?: string[] | undefined;
    /** Search Criteria on which the search was based on */
    searchCriteria?: any | undefined;
    /** List of each Search response returned from each provider */
    searchResponses?: SearchResponseDto[] | undefined;

    constructor(data?: ISearchResultsDto) {
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
            this.journeyId = _data["journeyId"];
            this.status = _data["status"];
            if (Array.isArray(_data["providerIds"])) {
                this.providerIds = [] as any;
                for (let item of _data["providerIds"])
                    this.providerIds!.push(item);
            }
            this.searchCriteria = _data["searchCriteria"];
            if (Array.isArray(_data["searchResponses"])) {
                this.searchResponses = [] as any;
                for (let item of _data["searchResponses"])
                    this.searchResponses!.push(SearchResponseDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SearchResultsDto {
        data = typeof data === 'object' ? data : {};
        let result = new SearchResultsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["journeyId"] = this.journeyId;
        data["status"] = this.status;
        if (Array.isArray(this.providerIds)) {
            data["providerIds"] = [];
            for (let item of this.providerIds)
                data["providerIds"].push(item);
        }
        data["searchCriteria"] = this.searchCriteria;
        if (Array.isArray(this.searchResponses)) {
            data["searchResponses"] = [];
            for (let item of this.searchResponses)
                data["searchResponses"].push(item.toJSON());
        }
        return data; 
    }
}

/** Class to represent Search results */
export interface ISearchResultsDto {
    /** Id of the Search results */
    id?: string | undefined;
    /** Id of the Journey from which the request originated from */
    journeyId?: string | undefined;
    /** Status of Search results */
    status?: string | undefined;
    /** List of Provider Ids that were called */
    providerIds?: string[] | undefined;
    /** Search Criteria on which the search was based on */
    searchCriteria?: any | undefined;
    /** List of each Search response returned from each provider */
    searchResponses?: SearchResponseDto[] | undefined;
}

/** Service response data */
export class SearchResultsDtoServiceResponse implements ISearchResultsDtoServiceResponse {
    data?: SearchResultsDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ISearchResultsDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? SearchResultsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SearchResultsDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new SearchResultsDtoServiceResponse();
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
export interface ISearchResultsDtoServiceResponse {
    data?: SearchResultsDto;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;
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