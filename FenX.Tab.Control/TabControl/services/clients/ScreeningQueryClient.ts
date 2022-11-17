/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Get data of an existing batch
     * @param id The ID of the existing batch to get
     * @return Success. The batch data is returned
     */
    getBatchById(id: string, x_TENANT_ID: string): Promise<BatchDtoServiceResponse>;
    /**
     * Get data of an existing batch
     * @param journeyId The ID of the journey
     * @return Success. The batch data is returned
     */
    getBatchByJourneyId(journeyId: string, x_TENANT_ID: string): Promise<BatchDtoServiceResponse>;
    /**
     * Get data of an existing configuration
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Success. The configuration data is returned
     */
    getConfiguration(x_TENANT_ID: string, config?: boolean | undefined): Promise<ConfigurationDtoServiceResponse>;
    /**
     * Get provider from configuration
     * @param providerId The ID of provider
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Success
     */
    getProvider(providerId: string, x_TENANT_ID: string, config?: boolean | undefined): Promise<ProviderDtoServiceResponse>;
    /**
     * Get all entities in a batch
     * @param batchId The ID of the batch the entities belong to
     * @param returnMaterialMatches (optional) Return only matches where status=Match
     * @return Success. The list of entities is returned
     */
    getEntitiesByBatchId(batchId: string, x_TENANT_ID: string, returnMaterialMatches?: boolean | undefined): Promise<EntityDtoIEnumerableServiceResponse>;
    /**
     * Get data of an entity
     * @param entityId The ID of the entity
     * @param batchId The batch ID the entity belongs to
     * @param returnMaterialMatches (optional) Return only matches where status=Match
     * @return Success. The entity data is returned
     */
    getEntityById(entityId: string, batchId: string, x_TENANT_ID: string, returnMaterialMatches?: boolean | undefined): Promise<EntityDtoServiceResponse>;
    /**
     * Get all matches for an entity
     * @param entityId The ID of the entity the matches belong to
     * @param batchId The batch ID the entity belongs to
     * @param returnMaterialMatches (optional) Return only matches where status=Match
     * @return Success. The list of matches is returned
     */
    getMatchesByEntityId(entityId: string, batchId: string, x_TENANT_ID: string, returnMaterialMatches?: boolean | undefined): Promise<MatchDtoIEnumerableServiceResponse>;
    /**
     * Get data of a match
     * @param entityId The entity ID the match belongs to
     * @param batchId The batch ID the entity belongs to
     * @param matchId The ID of the match
     * @return Success. The match data is returned
     */
    getMatchById(entityId: string, batchId: string, matchId: string, x_TENANT_ID: string): Promise<MatchDtoServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/screeningquery";
    }

    /**
     * Get data of an existing batch
     * @param id The ID of the existing batch to get
     * @return Success. The batch data is returned
     */
    getBatchById(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<BatchDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/batch/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "text/plain"
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
            return this.processGetBatchById(_response);
        });
    }

    protected processGetBatchById(response: AxiosResponse): Promise<BatchDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = BatchDtoServiceResponse.fromJS(resultData200);
            return result200;
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
            return throwException("Not found. The batch couldn\'t be found", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<BatchDtoServiceResponse>(<any>null);
    }

    /**
     * Get data of an existing batch
     * @param journeyId The ID of the journey
     * @return Success. The batch data is returned
     */
    getBatchByJourneyId(journeyId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<BatchDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/batch/journey/{journeyId}";
        if (journeyId === undefined || journeyId === null)
            throw new Error("The parameter 'journeyId' must be defined.");
        url_ = url_.replace("{journeyId}", encodeURIComponent("" + journeyId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "text/plain"
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
            return this.processGetBatchByJourneyId(_response);
        });
    }

    protected processGetBatchByJourneyId(response: AxiosResponse): Promise<BatchDtoServiceResponse> {
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
            result200 = BatchDtoServiceResponse.fromJS(resultData200);
            return result200;
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
            return throwException("Not found. The batch couldn\'t be found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<BatchDtoServiceResponse>(<any>null);
    }

    /**
     * Get data of an existing configuration
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Success. The configuration data is returned
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
                "Accept": "text/plain"
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
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not found. The configuration couldn\'t be found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConfigurationDtoServiceResponse>(<any>null);
    }

    /**
     * Get provider from configuration
     * @param providerId The ID of provider
     * @param config (optional) Boolean flag whether to also return adapter and provider configuration
     * @return Success
     */
    getProvider(providerId: string, x_TENANT_ID: string, config?: boolean | undefined , cancelToken?: CancelToken | undefined): Promise<ProviderDtoServiceResponse> {
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
                "Accept": "text/plain"
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

    protected processGetProvider(response: AxiosResponse): Promise<ProviderDtoServiceResponse> {
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
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = ProviderDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Server Error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ProviderDtoServiceResponse>(<any>null);
    }

    /**
     * Get all entities in a batch
     * @param batchId The ID of the batch the entities belong to
     * @param returnMaterialMatches (optional) Return only matches where status=Match
     * @return Success. The list of entities is returned
     */
    getEntitiesByBatchId(batchId: string, x_TENANT_ID: string, returnMaterialMatches?: boolean | undefined , cancelToken?: CancelToken | undefined): Promise<EntityDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/batch/{batchId}/entity?";
        if (batchId === undefined || batchId === null)
            throw new Error("The parameter 'batchId' must be defined.");
        url_ = url_.replace("{batchId}", encodeURIComponent("" + batchId));
        if (returnMaterialMatches === null)
            throw new Error("The parameter 'returnMaterialMatches' cannot be null.");
        else if (returnMaterialMatches !== undefined)
            url_ += "returnMaterialMatches=" + encodeURIComponent("" + returnMaterialMatches) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "text/plain"
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
            return this.processGetEntitiesByBatchId(_response);
        });
    }

    protected processGetEntitiesByBatchId(response: AxiosResponse): Promise<EntityDtoIEnumerableServiceResponse> {
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
            result200 = EntityDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
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
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<EntityDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * Get data of an entity
     * @param entityId The ID of the entity
     * @param batchId The batch ID the entity belongs to
     * @param returnMaterialMatches (optional) Return only matches where status=Match
     * @return Success. The entity data is returned
     */
    getEntityById(entityId: string, batchId: string, x_TENANT_ID: string, returnMaterialMatches?: boolean | undefined , cancelToken?: CancelToken | undefined): Promise<EntityDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/batch/{batchId}/entity/{entityId}?";
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
        if (batchId === undefined || batchId === null)
            throw new Error("The parameter 'batchId' must be defined.");
        url_ = url_.replace("{batchId}", encodeURIComponent("" + batchId));
        if (returnMaterialMatches === null)
            throw new Error("The parameter 'returnMaterialMatches' cannot be null.");
        else if (returnMaterialMatches !== undefined)
            url_ += "returnMaterialMatches=" + encodeURIComponent("" + returnMaterialMatches) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "text/plain"
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
            return this.processGetEntityById(_response);
        });
    }

    protected processGetEntityById(response: AxiosResponse): Promise<EntityDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = EntityDtoServiceResponse.fromJS(resultData200);
            return result200;
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
            return throwException("Not found. The entity could not be found", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<EntityDtoServiceResponse>(<any>null);
    }

    /**
     * Get all matches for an entity
     * @param entityId The ID of the entity the matches belong to
     * @param batchId The batch ID the entity belongs to
     * @param returnMaterialMatches (optional) Return only matches where status=Match
     * @return Success. The list of matches is returned
     */
    getMatchesByEntityId(entityId: string, batchId: string, x_TENANT_ID: string, returnMaterialMatches?: boolean | undefined , cancelToken?: CancelToken | undefined): Promise<MatchDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/batch/{batchId}/entity/{entityId}/match?";
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
        if (batchId === undefined || batchId === null)
            throw new Error("The parameter 'batchId' must be defined.");
        url_ = url_.replace("{batchId}", encodeURIComponent("" + batchId));
        if (returnMaterialMatches === null)
            throw new Error("The parameter 'returnMaterialMatches' cannot be null.");
        else if (returnMaterialMatches !== undefined)
            url_ += "returnMaterialMatches=" + encodeURIComponent("" + returnMaterialMatches) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "text/plain"
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
            return this.processGetMatchesByEntityId(_response);
        });
    }

    protected processGetMatchesByEntityId(response: AxiosResponse): Promise<MatchDtoIEnumerableServiceResponse> {
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
            result200 = MatchDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
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
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<MatchDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * Get data of a match
     * @param entityId The entity ID the match belongs to
     * @param batchId The batch ID the entity belongs to
     * @param matchId The ID of the match
     * @return Success. The match data is returned
     */
    getMatchById(entityId: string, batchId: string, matchId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<MatchDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/batch/{batchId}/entity/{entityId}/match/{matchId}";
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
        if (batchId === undefined || batchId === null)
            throw new Error("The parameter 'batchId' must be defined.");
        url_ = url_.replace("{batchId}", encodeURIComponent("" + batchId));
        if (matchId === undefined || matchId === null)
            throw new Error("The parameter 'matchId' must be defined.");
        url_ = url_.replace("{matchId}", encodeURIComponent("" + matchId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Accept": "text/plain"
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
            return this.processGetMatchById(_response);
        });
    }

    protected processGetMatchById(response: AxiosResponse): Promise<MatchDtoServiceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = MatchDtoServiceResponse.fromJS(resultData200);
            return result200;
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
            return throwException("Not found. The match could not be found", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<MatchDtoServiceResponse>(<any>null);
    }
}

export class AddressDto implements IAddressDto {
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    stateProvince?: string | undefined;

    constructor(data?: IAddressDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.addressLine1 = _data["addressLine1"];
            this.addressLine2 = _data["addressLine2"];
            this.city = _data["city"];
            this.postalCode = _data["postalCode"];
            this.country = _data["country"];
            this.stateProvince = _data["stateProvince"];
        }
    }

    static fromJS(data: any): AddressDto {
        data = typeof data === 'object' ? data : {};
        let result = new AddressDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["addressLine1"] = this.addressLine1;
        data["addressLine2"] = this.addressLine2;
        data["city"] = this.city;
        data["postalCode"] = this.postalCode;
        data["country"] = this.country;
        data["stateProvince"] = this.stateProvince;
        return data; 
    }
}

export interface IAddressDto {
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    stateProvince?: string | undefined;
}

export class SearchCriteriaDto implements ISearchCriteriaDto {
    fullName?: string | undefined;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    dateOfBirth?: string | undefined;
    gender?: string | undefined;
    legalEntityName?: string | undefined;
    type?: string | undefined;
    address?: AddressDto | undefined;
    idNumber?: string | undefined;
    phoneNumber?: string | undefined;
    emailAddress?: string | undefined;
    nationality?: string | undefined;
    countryOfResidence?: string | undefined;
    placeOfBirth?: string | undefined;
    citizenship?: string | undefined;
    registeredCountry?: string | undefined;

    constructor(data?: ISearchCriteriaDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.fullName = _data["fullName"];
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
            this.dateOfBirth = _data["dateOfBirth"];
            this.gender = _data["gender"];
            this.legalEntityName = _data["legalEntityName"];
            this.type = _data["type"];
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
            this.idNumber = _data["idNumber"];
            this.phoneNumber = _data["phoneNumber"];
            this.emailAddress = _data["emailAddress"];
            this.nationality = _data["nationality"];
            this.countryOfResidence = _data["countryOfResidence"];
            this.placeOfBirth = _data["placeOfBirth"];
            this.citizenship = _data["citizenship"];
            this.registeredCountry = _data["registeredCountry"];
        }
    }

    static fromJS(data: any): SearchCriteriaDto {
        data = typeof data === 'object' ? data : {};
        let result = new SearchCriteriaDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fullName"] = this.fullName;
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        data["dateOfBirth"] = this.dateOfBirth;
        data["gender"] = this.gender;
        data["legalEntityName"] = this.legalEntityName;
        data["type"] = this.type;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["idNumber"] = this.idNumber;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["nationality"] = this.nationality;
        data["countryOfResidence"] = this.countryOfResidence;
        data["placeOfBirth"] = this.placeOfBirth;
        data["citizenship"] = this.citizenship;
        data["registeredCountry"] = this.registeredCountry;
        return data; 
    }
}

export interface ISearchCriteriaDto {
    fullName?: string | undefined;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    dateOfBirth?: string | undefined;
    gender?: string | undefined;
    legalEntityName?: string | undefined;
    type?: string | undefined;
    address?: AddressDto | undefined;
    idNumber?: string | undefined;
    phoneNumber?: string | undefined;
    emailAddress?: string | undefined;
    nationality?: string | undefined;
    countryOfResidence?: string | undefined;
    placeOfBirth?: string | undefined;
    citizenship?: string | undefined;
    registeredCountry?: string | undefined;
}

export class BatchEntityDto implements IBatchEntityDto {
    id?: string;
    legalEntityId?: string | undefined;
    searchCriteria?: SearchCriteriaDto | undefined;

    constructor(data?: IBatchEntityDto) {
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
            this.legalEntityId = _data["legalEntityId"];
            this.searchCriteria = _data["searchCriteria"] ? SearchCriteriaDto.fromJS(_data["searchCriteria"]) : <any>undefined;
        }
    }

    static fromJS(data: any): BatchEntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new BatchEntityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["legalEntityId"] = this.legalEntityId;
        data["searchCriteria"] = this.searchCriteria ? this.searchCriteria.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IBatchEntityDto {
    id?: string;
    legalEntityId?: string | undefined;
    searchCriteria?: SearchCriteriaDto | undefined;
}

export class BatchDto implements IBatchDto {
    id?: string | undefined;
    entities?: BatchEntityDto[] | undefined;
    totalEntities?: number;
    totalAdverseMedia?: number;
    reviewDecision?: string | undefined;
    reviewReason?: string | undefined;
    totalSanctions?: number;
    reviewComments?: string | undefined;
    totalPEPs?: number;
    totalScreeningsCompleted?: number;
    status?: string | undefined;

    constructor(data?: IBatchDto) {
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
            if (Array.isArray(_data["entities"])) {
                this.entities = [] as any;
                for (let item of _data["entities"])
                    this.entities!.push(BatchEntityDto.fromJS(item));
            }
            this.totalEntities = _data["totalEntities"];
            this.totalAdverseMedia = _data["totalAdverseMedia"];
            this.reviewDecision = _data["reviewDecision"];
            this.reviewReason = _data["reviewReason"];
            this.totalSanctions = _data["totalSanctions"];
            this.reviewComments = _data["reviewComments"];
            this.totalPEPs = _data["totalPEPs"];
            this.totalScreeningsCompleted = _data["totalScreeningsCompleted"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): BatchDto {
        data = typeof data === 'object' ? data : {};
        let result = new BatchDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        if (Array.isArray(this.entities)) {
            data["entities"] = [];
            for (let item of this.entities)
                data["entities"].push(item.toJSON());
        }
        data["totalEntities"] = this.totalEntities;
        data["totalAdverseMedia"] = this.totalAdverseMedia;
        data["reviewDecision"] = this.reviewDecision;
        data["reviewReason"] = this.reviewReason;
        data["totalSanctions"] = this.totalSanctions;
        data["reviewComments"] = this.reviewComments;
        data["totalPEPs"] = this.totalPEPs;
        data["totalScreeningsCompleted"] = this.totalScreeningsCompleted;
        data["status"] = this.status;
        return data; 
    }
}

export interface IBatchDto {
    id?: string | undefined;
    entities?: BatchEntityDto[] | undefined;
    totalEntities?: number;
    totalAdverseMedia?: number;
    reviewDecision?: string | undefined;
    reviewReason?: string | undefined;
    totalSanctions?: number;
    reviewComments?: string | undefined;
    totalPEPs?: number;
    totalScreeningsCompleted?: number;
    status?: string | undefined;
}

export class ServiceResponseMessage implements IServiceResponseMessage {
    message?: string | undefined;
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

export interface IServiceResponseMessage {
    message?: string | undefined;
    type?: string | undefined;
}

export class BatchDtoServiceResponse implements IBatchDtoServiceResponse {
    data?: BatchDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IBatchDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? BatchDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BatchDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BatchDtoServiceResponse();
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

export interface IBatchDtoServiceResponse {
    data?: BatchDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class ServiceResponse implements IServiceResponse {
    data?: string | undefined;
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

export interface IServiceResponse {
    data?: string | undefined;
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

export class ProviderConfigurationDto implements IProviderConfigurationDto {
    field?: string | undefined;
    name?: string | undefined;
    value?: string | undefined;
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

export interface IProviderConfigurationDto {
    field?: string | undefined;
    name?: string | undefined;
    value?: string | undefined;
    masked?: boolean;
}

export class AdapterConfigurationDto implements IAdapterConfigurationDto {
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

export interface IAdapterConfigurationDto {
    url?: string | undefined;
}

export class ListSettingsItemDto implements IListSettingsItemDto {
    field?: string | undefined;
    name?: string | undefined;
    value?: string | undefined;

    constructor(data?: IListSettingsItemDto) {
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
        }
    }

    static fromJS(data: any): ListSettingsItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new ListSettingsItemDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["field"] = this.field;
        data["name"] = this.name;
        data["value"] = this.value;
        return data; 
    }
}

export interface IListSettingsItemDto {
    field?: string | undefined;
    name?: string | undefined;
    value?: string | undefined;
}

export class ListSettingsDto implements IListSettingsDto {
    active?: boolean;
    items?: ListSettingsItemDto[] | undefined;

    constructor(data?: IListSettingsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.active = _data["active"];
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(ListSettingsItemDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ListSettingsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ListSettingsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["active"] = this.active;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IListSettingsDto {
    active?: boolean;
    items?: ListSettingsItemDto[] | undefined;
}

export class ProviderDto implements IProviderDto {
    id?: string | undefined;
    name?: string | undefined;
    active?: boolean;
    providerConfiguration?: ProviderConfigurationDto[] | undefined;
    adapterConfiguration?: AdapterConfigurationDto | undefined;
    listSettings?: ListSettingsDto | undefined;

    constructor(data?: IProviderDto) {
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
            if (Array.isArray(_data["providerConfiguration"])) {
                this.providerConfiguration = [] as any;
                for (let item of _data["providerConfiguration"])
                    this.providerConfiguration!.push(ProviderConfigurationDto.fromJS(item));
            }
            this.adapterConfiguration = _data["adapterConfiguration"] ? AdapterConfigurationDto.fromJS(_data["adapterConfiguration"]) : <any>undefined;
            this.listSettings = _data["listSettings"] ? ListSettingsDto.fromJS(_data["listSettings"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ProviderDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["active"] = this.active;
        if (Array.isArray(this.providerConfiguration)) {
            data["providerConfiguration"] = [];
            for (let item of this.providerConfiguration)
                data["providerConfiguration"].push(item.toJSON());
        }
        data["adapterConfiguration"] = this.adapterConfiguration ? this.adapterConfiguration.toJSON() : <any>undefined;
        data["listSettings"] = this.listSettings ? this.listSettings.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IProviderDto {
    id?: string | undefined;
    name?: string | undefined;
    active?: boolean;
    providerConfiguration?: ProviderConfigurationDto[] | undefined;
    adapterConfiguration?: AdapterConfigurationDto | undefined;
    listSettings?: ListSettingsDto | undefined;
}

export class ConfigurationDto implements IConfigurationDto {
    tenant?: string | undefined;
    providers?: ProviderDto[] | undefined;

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
            this.tenant = _data["tenant"];
            if (Array.isArray(_data["providers"])) {
                this.providers = [] as any;
                for (let item of _data["providers"])
                    this.providers!.push(ProviderDto.fromJS(item));
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
        data["tenant"] = this.tenant;
        if (Array.isArray(this.providers)) {
            data["providers"] = [];
            for (let item of this.providers)
                data["providers"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IConfigurationDto {
    tenant?: string | undefined;
    providers?: ProviderDto[] | undefined;
}

export class ConfigurationDtoServiceResponse implements IConfigurationDtoServiceResponse {
    data?: ConfigurationDto | undefined;
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

export interface IConfigurationDtoServiceResponse {
    data?: ConfigurationDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class ProviderDtoServiceResponse implements IProviderDtoServiceResponse {
    data?: ProviderDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IProviderDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ProviderDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProviderDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderDtoServiceResponse();
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

export interface IProviderDtoServiceResponse {
    data?: ProviderDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class AdditionalInfoDto implements IAdditionalInfoDto {
    title?: string | undefined;
    content?: string[] | undefined;

    constructor(data?: IAdditionalInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["title"];
            if (Array.isArray(_data["content"])) {
                this.content = [] as any;
                for (let item of _data["content"])
                    this.content!.push(item);
            }
        }
    }

    static fromJS(data: any): AdditionalInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new AdditionalInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        if (Array.isArray(this.content)) {
            data["content"] = [];
            for (let item of this.content)
                data["content"].push(item);
        }
        return data; 
    }
}

export interface IAdditionalInfoDto {
    title?: string | undefined;
    content?: string[] | undefined;
}

export class AssociationDto implements IAssociationDto {
    category?: string | undefined;
    fullName?: string | undefined;
    relationship?: string | undefined;

    constructor(data?: IAssociationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.category = _data["category"];
            this.fullName = _data["fullName"];
            this.relationship = _data["relationship"];
        }
    }

    static fromJS(data: any): AssociationDto {
        data = typeof data === 'object' ? data : {};
        let result = new AssociationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["category"] = this.category;
        data["fullName"] = this.fullName;
        data["relationship"] = this.relationship;
        return data; 
    }
}

export interface IAssociationDto {
    category?: string | undefined;
    fullName?: string | undefined;
    relationship?: string | undefined;
}

export class MatchDataDto implements IMatchDataDto {
    externalId?: string | undefined;
    name?: string | undefined;
    aliases?: string[] | undefined;
    gender?: string | undefined;
    dateOfBirth?: string | undefined;
    country?: string | undefined;
    entityType?: string | undefined;
    matchScore?: number;
    providerSourceName?: string | undefined;
    providerSourceUrl?: string | undefined;
    addresses?: AddressDto[] | undefined;
    citizenship?: string | undefined;
    nationality?: string | undefined;
    placeOfBirth?: string | undefined;
    countryOfResidence?: string | undefined;
    additionalInfo?: AdditionalInfoDto[] | undefined;
    categories?: string[] | undefined;
    sources?: string[] | undefined;
    registeredCountry?: string | undefined;
    ids?: { [key: string]: string; } | undefined;
    associations?: AssociationDto[] | undefined;

    constructor(data?: IMatchDataDto) {
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
            this.name = _data["name"];
            if (Array.isArray(_data["aliases"])) {
                this.aliases = [] as any;
                for (let item of _data["aliases"])
                    this.aliases!.push(item);
            }
            this.gender = _data["gender"];
            this.dateOfBirth = _data["dateOfBirth"];
            this.country = _data["country"];
            this.entityType = _data["entityType"];
            this.matchScore = _data["matchScore"];
            this.providerSourceName = _data["providerSourceName"];
            this.providerSourceUrl = _data["providerSourceUrl"];
            if (Array.isArray(_data["addresses"])) {
                this.addresses = [] as any;
                for (let item of _data["addresses"])
                    this.addresses!.push(AddressDto.fromJS(item));
            }
            this.citizenship = _data["citizenship"];
            this.nationality = _data["nationality"];
            this.placeOfBirth = _data["placeOfBirth"];
            this.countryOfResidence = _data["countryOfResidence"];
            if (Array.isArray(_data["additionalInfo"])) {
                this.additionalInfo = [] as any;
                for (let item of _data["additionalInfo"])
                    this.additionalInfo!.push(AdditionalInfoDto.fromJS(item));
            }
            if (Array.isArray(_data["categories"])) {
                this.categories = [] as any;
                for (let item of _data["categories"])
                    this.categories!.push(item);
            }
            if (Array.isArray(_data["sources"])) {
                this.sources = [] as any;
                for (let item of _data["sources"])
                    this.sources!.push(item);
            }
            this.registeredCountry = _data["registeredCountry"];
            if (_data["ids"]) {
                this.ids = {} as any;
                for (let key in _data["ids"]) {
                    if (_data["ids"].hasOwnProperty(key))
                        this.ids![key] = _data["ids"][key];
                }
            }
            if (Array.isArray(_data["associations"])) {
                this.associations = [] as any;
                for (let item of _data["associations"])
                    this.associations!.push(AssociationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): MatchDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new MatchDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["externalId"] = this.externalId;
        data["name"] = this.name;
        if (Array.isArray(this.aliases)) {
            data["aliases"] = [];
            for (let item of this.aliases)
                data["aliases"].push(item);
        }
        data["gender"] = this.gender;
        data["dateOfBirth"] = this.dateOfBirth;
        data["country"] = this.country;
        data["entityType"] = this.entityType;
        data["matchScore"] = this.matchScore;
        data["providerSourceName"] = this.providerSourceName;
        data["providerSourceUrl"] = this.providerSourceUrl;
        if (Array.isArray(this.addresses)) {
            data["addresses"] = [];
            for (let item of this.addresses)
                data["addresses"].push(item.toJSON());
        }
        data["citizenship"] = this.citizenship;
        data["nationality"] = this.nationality;
        data["placeOfBirth"] = this.placeOfBirth;
        data["countryOfResidence"] = this.countryOfResidence;
        if (Array.isArray(this.additionalInfo)) {
            data["additionalInfo"] = [];
            for (let item of this.additionalInfo)
                data["additionalInfo"].push(item.toJSON());
        }
        if (Array.isArray(this.categories)) {
            data["categories"] = [];
            for (let item of this.categories)
                data["categories"].push(item);
        }
        if (Array.isArray(this.sources)) {
            data["sources"] = [];
            for (let item of this.sources)
                data["sources"].push(item);
        }
        data["registeredCountry"] = this.registeredCountry;
        if (this.ids) {
            data["ids"] = {};
            for (let key in this.ids) {
                if (this.ids.hasOwnProperty(key))
                    data["ids"][key] = this.ids[key];
            }
        }
        if (Array.isArray(this.associations)) {
            data["associations"] = [];
            for (let item of this.associations)
                data["associations"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IMatchDataDto {
    externalId?: string | undefined;
    name?: string | undefined;
    aliases?: string[] | undefined;
    gender?: string | undefined;
    dateOfBirth?: string | undefined;
    country?: string | undefined;
    entityType?: string | undefined;
    matchScore?: number;
    providerSourceName?: string | undefined;
    providerSourceUrl?: string | undefined;
    addresses?: AddressDto[] | undefined;
    citizenship?: string | undefined;
    nationality?: string | undefined;
    placeOfBirth?: string | undefined;
    countryOfResidence?: string | undefined;
    additionalInfo?: AdditionalInfoDto[] | undefined;
    categories?: string[] | undefined;
    sources?: string[] | undefined;
    registeredCountry?: string | undefined;
    ids?: { [key: string]: string; } | undefined;
    associations?: AssociationDto[] | undefined;
}

export class MatchDto implements IMatchDto {
    id?: string;
    status?: string | undefined;
    reason?: string | undefined;
    comments?: string | undefined;
    matchData?: MatchDataDto | undefined;

    constructor(data?: IMatchDto) {
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
            this.reason = _data["reason"];
            this.comments = _data["comments"];
            this.matchData = _data["matchData"] ? MatchDataDto.fromJS(_data["matchData"]) : <any>undefined;
        }
    }

    static fromJS(data: any): MatchDto {
        data = typeof data === 'object' ? data : {};
        let result = new MatchDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        data["reason"] = this.reason;
        data["comments"] = this.comments;
        data["matchData"] = this.matchData ? this.matchData.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IMatchDto {
    id?: string;
    status?: string | undefined;
    reason?: string | undefined;
    comments?: string | undefined;
    matchData?: MatchDataDto | undefined;
}

export class EntityDto implements IEntityDto {
    id?: string | undefined;
    legalEntityId?: string | undefined;
    entityName?: string | undefined;
    searchCriteria?: SearchCriteriaDto | undefined;
    matches?: MatchDto[] | undefined;

    constructor(data?: IEntityDto) {
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
            this.legalEntityId = _data["legalEntityId"];
            this.entityName = _data["entityName"];
            this.searchCriteria = _data["searchCriteria"] ? SearchCriteriaDto.fromJS(_data["searchCriteria"]) : <any>undefined;
            if (Array.isArray(_data["matches"])) {
                this.matches = [] as any;
                for (let item of _data["matches"])
                    this.matches!.push(MatchDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): EntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new EntityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["legalEntityId"] = this.legalEntityId;
        data["entityName"] = this.entityName;
        data["searchCriteria"] = this.searchCriteria ? this.searchCriteria.toJSON() : <any>undefined;
        if (Array.isArray(this.matches)) {
            data["matches"] = [];
            for (let item of this.matches)
                data["matches"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IEntityDto {
    id?: string | undefined;
    legalEntityId?: string | undefined;
    entityName?: string | undefined;
    searchCriteria?: SearchCriteriaDto | undefined;
    matches?: MatchDto[] | undefined;
}

export class EntityDtoIEnumerableServiceResponse implements IEntityDtoIEnumerableServiceResponse {
    data?: EntityDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IEntityDtoIEnumerableServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(EntityDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): EntityDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new EntityDtoIEnumerableServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item.toJSON());
        }
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IEntityDtoIEnumerableServiceResponse {
    data?: EntityDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class EntityDtoServiceResponse implements IEntityDtoServiceResponse {
    data?: EntityDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IEntityDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? EntityDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): EntityDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new EntityDtoServiceResponse();
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

export interface IEntityDtoServiceResponse {
    data?: EntityDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class MatchDtoIEnumerableServiceResponse implements IMatchDtoIEnumerableServiceResponse {
    data?: MatchDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IMatchDtoIEnumerableServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(MatchDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): MatchDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new MatchDtoIEnumerableServiceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item.toJSON());
        }
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IMatchDtoIEnumerableServiceResponse {
    data?: MatchDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class MatchDtoServiceResponse implements IMatchDtoServiceResponse {
    data?: MatchDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IMatchDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? MatchDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): MatchDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new MatchDtoServiceResponse();
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

export interface IMatchDtoServiceResponse {
    data?: MatchDto | undefined;
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