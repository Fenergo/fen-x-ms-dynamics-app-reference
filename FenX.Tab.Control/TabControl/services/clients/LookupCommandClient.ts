/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import moment from 'moment';

export interface IClient {
    /**
     * Create new Lookup
     * @param body (optional) 
     * @return Accepted for processing
     */
    createLookup(x_TENANT_ID: string, body?: LookupDtoServiceRequest | undefined): Promise<LookupDtoServiceResponse>;
    /**
     * Create a new Version for an existing Lookup
     * @param lookupId The Id of the existing model
     * @param body (optional) ServiceRequest with the new version data
     * @return Accepted for processing
     */
    createLookupVersion(lookupId: string, x_TENANT_ID: string, body?: LookupDtoServiceRequest | undefined): Promise<LookupDtoServiceResponse>;
    /**
     * Delete Lookup and all it's versions
     * @return Accepted for processing
     */
    deleteLookup(lookupId: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Update an existing Version of a Lookup
     * @param lookupId The Id of the existing model
     * @param versionNumber Number of version to update
     * @param body (optional) ServiceRequest with the updated version data
     * @return Accepted for processing
     */
    updateLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string, body?: UpdateLookupVersionDtoServiceRequest | undefined): Promise<void>;
    /**
     * Delete an existing Version of a Lookup
     * @return Accepted for processing
     */
    deleteLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Submit an existing Version of a Lookup for Approval
     * @param lookupId The Id of the existing model
     * @param versionNumber The version number of the version to submit
     * @return Accepted for processing
     */
    submitLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Sign an existing Version of a Lookup
     * @param lookupId The Id of the existing model
     * @param versionNumber The version number of the version to sign
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Versioning.Models.ApproveAction signing data
     * @return Accepted for processing
     */
    signLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string, body?: ApproveActionServiceRequest | undefined): Promise<LookupVersionSignResponseServiceResponse>;
    /**
     * Archive an existing Version of a Lookup
     * @param lookupId The Id of the existing model
     * @param versionNumber The version number of the version to archive
     * @return Accepted for processing
     */
    archiveLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Associate two lookups versions
     * @param body (optional) 
     * @return Accepted for processing
     */
    createLookupLink(x_TENANT_ID: string, body?: CreateLinkVersionDtoServiceRequest | undefined): Promise<LookupLinkVersionDtoServiceResponse>;
    /**
     * Create a new version for an existing Linked lookup
     * @param id The Id of the existing Linked Lookup
     * @param body (optional) ServiceRequest with the new version data
     * @return Accepted for processing
     */
    createLookupLinkVersion(id: string, x_TENANT_ID: string, body?: LookupLinkVersionDtoServiceRequest | undefined): Promise<LookupLinkVersionDtoServiceResponse>;
    /**
     * Delete Lookup Link and all it's versions
     * @param id The Id of the existing Linked Lookup
     * @return Accepted for processing
     */
    deleteLookupLink(id: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Update an existing Version of a Linked lookup
     * @param id The Id of the existing Linked Lookup
     * @param versionNumber Number of version to update
     * @param body (optional) ServiceRequest with the updated version data
     * @return Accepted for processing
     */
    updateLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string, body?: UpdateLinkVersionDtoServiceRequest | undefined): Promise<void>;
    /**
     * Delete an existing Version of a Linked Lookup
     * @return Accepted for processing
     */
    deleteLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Submit an existing Version of a Linked Lookup for Approval
     * @param id The Id of the existing Linked Lookup
     * @param versionNumber The version number of the version to submit
     * @return Accepted for processing
     */
    submitLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Sign an existing Version of a Linked Link
     * @param id The Id of the existing Linked Link
     * @param versionNumber The version number of the version to sign
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Versioning.Models.ApproveAction signing data
     * @return Accepted for processing
     */
    signLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string, body?: ApproveActionServiceRequest | undefined): Promise<LinkVersionSignResponseServiceResponse>;
    /**
     * Archive an existing Version of a Linked Lookup
     * @param id The Id of the existing Linked Lookup
     * @param versionNumber The version number of the version to archive
     * @return Accepted for processing
     */
    archiveLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/lookupcommand";
    }

    /**
     * Create new Lookup
     * @param body (optional) 
     * @return Accepted for processing
     */
    createLookup(x_TENANT_ID: string, body?: LookupDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<LookupDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/lookup";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
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
            return this.processCreateLookup(_response);
        });
    }

    protected processCreateLookup(response: AxiosResponse): Promise<LookupDtoServiceResponse> {
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
            result202 = LookupDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<LookupDtoServiceResponse>(<any>null);
    }

    /**
     * Create a new Version for an existing Lookup
     * @param lookupId The Id of the existing model
     * @param body (optional) ServiceRequest with the new version data
     * @return Accepted for processing
     */
    createLookupVersion(lookupId: string, x_TENANT_ID: string, body?: LookupDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<LookupDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
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
            return this.processCreateLookupVersion(_response);
        });
    }

    protected processCreateLookupVersion(response: AxiosResponse): Promise<LookupDtoServiceResponse> {
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
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = LookupDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<LookupDtoServiceResponse>(<any>null);
    }

    /**
     * Delete Lookup and all it's versions
     * @return Accepted for processing
     */
    deleteLookup(lookupId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
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
            return this.processDeleteLookup(_response);
        });
    }

    protected processDeleteLookup(response: AxiosResponse): Promise<void> {
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
        } else if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Update an existing Version of a Lookup
     * @param lookupId The Id of the existing model
     * @param versionNumber Number of version to update
     * @param body (optional) ServiceRequest with the updated version data
     * @return Accepted for processing
     */
    updateLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string, body?: UpdateLookupVersionDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}/version/{versionNumber}";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
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
            return this.processUpdateLookupVersion(_response);
        });
    }

    protected processUpdateLookupVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Delete an existing Version of a Lookup
     * @return Accepted for processing
     */
    deleteLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}/version/{versionNumber}";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
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
            return this.processDeleteLookupVersion(_response);
        });
    }

    protected processDeleteLookupVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Submit an existing Version of a Lookup for Approval
     * @param lookupId The Id of the existing model
     * @param versionNumber The version number of the version to submit
     * @return Accepted for processing
     */
    submitLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}/version/{versionNumber}/submit-for-approval";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "PUT",
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
            return this.processSubmitLookupVersion(_response);
        });
    }

    protected processSubmitLookupVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Validation error", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Sign an existing Version of a Lookup
     * @param lookupId The Id of the existing model
     * @param versionNumber The version number of the version to sign
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Versioning.Models.ApproveAction signing data
     * @return Accepted for processing
     */
    signLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string, body?: ApproveActionServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<LookupVersionSignResponseServiceResponse> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}/version/{versionNumber}/sign";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
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
            return this.processSignLookupVersion(_response);
        });
    }

    protected processSignLookupVersion(response: AxiosResponse): Promise<LookupVersionSignResponseServiceResponse> {
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
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = LookupVersionSignResponseServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Validation error", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<LookupVersionSignResponseServiceResponse>(<any>null);
    }

    /**
     * Archive an existing Version of a Lookup
     * @param lookupId The Id of the existing model
     * @param versionNumber The version number of the version to archive
     * @return Accepted for processing
     */
    archiveLookupVersion(lookupId: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookup/{lookupId}/version/{versionNumber}/archive";
        if (lookupId === undefined || lookupId === null)
            throw new Error("The parameter 'lookupId' must be defined.");
        url_ = url_.replace("{lookupId}", encodeURIComponent("" + lookupId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "PUT",
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
            return this.processArchiveLookupVersion(_response);
        });
    }

    protected processArchiveLookupVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Validation error", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status === 404) {
            const _responseText = response.data;
            return throwException("Lookup with given ID does not exists", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Associate two lookups versions
     * @param body (optional) 
     * @return Accepted for processing
     */
    createLookupLink(x_TENANT_ID: string, body?: CreateLinkVersionDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<LookupLinkVersionDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/lookuplink";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
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
            return this.processCreateLookupLink(_response);
        });
    }

    protected processCreateLookupLink(response: AxiosResponse): Promise<LookupLinkVersionDtoServiceResponse> {
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
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = LookupLinkVersionDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<LookupLinkVersionDtoServiceResponse>(<any>null);
    }

    /**
     * Create a new version for an existing Linked lookup
     * @param id The Id of the existing Linked Lookup
     * @param body (optional) ServiceRequest with the new version data
     * @return Accepted for processing
     */
    createLookupLinkVersion(id: string, x_TENANT_ID: string, body?: LookupLinkVersionDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<LookupLinkVersionDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
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
            return this.processCreateLookupLinkVersion(_response);
        });
    }

    protected processCreateLookupLinkVersion(response: AxiosResponse): Promise<LookupLinkVersionDtoServiceResponse> {
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
            result202 = LookupLinkVersionDtoServiceResponse.fromJS(resultData202);
            return result202;
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
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<LookupLinkVersionDtoServiceResponse>(<any>null);
    }

    /**
     * Delete Lookup Link and all it's versions
     * @param id The Id of the existing Linked Lookup
     * @return Accepted for processing
     */
    deleteLookupLink(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processDeleteLookupLink(_response);
        });
    }

    protected processDeleteLookupLink(response: AxiosResponse): Promise<void> {
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
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 202) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Update an existing Version of a Linked lookup
     * @param id The Id of the existing Linked Lookup
     * @param versionNumber Number of version to update
     * @param body (optional) ServiceRequest with the updated version data
     * @return Accepted for processing
     */
    updateLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string, body?: UpdateLinkVersionDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}/version/{versionNumber}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
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
            return this.processUpdateLookupLinkVersion(_response);
        });
    }

    protected processUpdateLookupLinkVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Delete an existing Version of a Linked Lookup
     * @return Accepted for processing
     */
    deleteLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}/version/{versionNumber}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
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
            return this.processDeleteLookupLinkVersion(_response);
        });
    }

    protected processDeleteLookupLinkVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the request", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Submit an existing Version of a Linked Lookup for Approval
     * @param id The Id of the existing Linked Lookup
     * @param versionNumber The version number of the version to submit
     * @return Accepted for processing
     */
    submitLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}/version/{versionNumber}/submit";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "PUT",
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
            return this.processSubmitLookupLinkVersion(_response);
        });
    }

    protected processSubmitLookupLinkVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Validation error", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Sign an existing Version of a Linked Link
     * @param id The Id of the existing Linked Link
     * @param versionNumber The version number of the version to sign
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Versioning.Models.ApproveAction signing data
     * @return Accepted for processing
     */
    signLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string, body?: ApproveActionServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<LinkVersionSignResponseServiceResponse> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}/version/{versionNumber}/sign";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "X-TENANT-ID": x_TENANT_ID !== undefined && x_TENANT_ID !== null ? "" + x_TENANT_ID : "",
                "Content-Type": "application/json",
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
            return this.processSignLookupLinkVersion(_response);
        });
    }

    protected processSignLookupLinkVersion(response: AxiosResponse): Promise<LinkVersionSignResponseServiceResponse> {
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
            result202 = LinkVersionSignResponseServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Validation error", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<LinkVersionSignResponseServiceResponse>(<any>null);
    }

    /**
     * Archive an existing Version of a Linked Lookup
     * @param id The Id of the existing Linked Lookup
     * @param versionNumber The version number of the version to archive
     * @return Accepted for processing
     */
    archiveLookupLinkVersion(id: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/lookuplink/{id}/version/{versionNumber}/archive";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "PUT",
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
            return this.processArchiveLookupLinkVersion(_response);
        });
    }

    protected processArchiveLookupLinkVersion(response: AxiosResponse): Promise<void> {
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
            return throwException("Validation error", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status === 404) {
            const _responseText = response.data;
            return throwException("Lookup Link with given ID does not exists", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }
}

export enum VersionStatus {
    Draft = "Draft",
    Pending = "Pending",
    Rejected = "Rejected",
    Published = "Published",
    Archived = "Archived",
    Deleted = "Deleted",
}

export enum Decision {
    Approve = "Approve",
    Reject = "Reject",
}

export class ApproveAction implements IApproveAction {
    comment?: string | undefined;
    decision?: Decision;
    created?: moment.Moment;

    constructor(data?: IApproveAction) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.comment = _data["comment"];
            this.decision = _data["decision"];
            this.created = _data["created"] ? moment(_data["created"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): ApproveAction {
        data = typeof data === 'object' ? data : {};
        let result = new ApproveAction();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["comment"] = this.comment;
        data["decision"] = this.decision;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        return data; 
    }
}

export interface IApproveAction {
    comment?: string | undefined;
    decision?: Decision;
    created?: moment.Moment;
}

export class Approver implements IApprover {
    subject?: string | undefined;
    role?: string | undefined;
    name?: string | undefined;
    successor?: Approver;
    action?: ApproveAction;
    readonly hasProcessedRequest?: boolean;

    constructor(data?: IApprover) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.subject = _data["subject"];
            this.role = _data["role"];
            this.name = _data["name"];
            this.successor = _data["successor"] ? Approver.fromJS(_data["successor"]) : <any>undefined;
            this.action = _data["action"] ? ApproveAction.fromJS(_data["action"]) : <any>undefined;
            (<any>this).hasProcessedRequest = _data["hasProcessedRequest"];
        }
    }

    static fromJS(data: any): Approver {
        data = typeof data === 'object' ? data : {};
        let result = new Approver();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["subject"] = this.subject;
        data["role"] = this.role;
        data["name"] = this.name;
        data["successor"] = this.successor ? this.successor.toJSON() : <any>undefined;
        data["action"] = this.action ? this.action.toJSON() : <any>undefined;
        data["hasProcessedRequest"] = this.hasProcessedRequest;
        return data; 
    }
}

export interface IApprover {
    subject?: string | undefined;
    role?: string | undefined;
    name?: string | undefined;
    successor?: Approver;
    action?: ApproveAction;
    hasProcessedRequest?: boolean;
}

export class Signee implements ISignee {
    subject?: string | undefined;
    role?: string | undefined;
    name?: string | undefined;
    successor?: Approver;
    action?: ApproveAction;
    readonly hasProcessedRequest?: boolean;

    constructor(data?: ISignee) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.subject = _data["subject"];
            this.role = _data["role"];
            this.name = _data["name"];
            this.successor = _data["successor"] ? Approver.fromJS(_data["successor"]) : <any>undefined;
            this.action = _data["action"] ? ApproveAction.fromJS(_data["action"]) : <any>undefined;
            (<any>this).hasProcessedRequest = _data["hasProcessedRequest"];
        }
    }

    static fromJS(data: any): Signee {
        data = typeof data === 'object' ? data : {};
        let result = new Signee();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["subject"] = this.subject;
        data["role"] = this.role;
        data["name"] = this.name;
        data["successor"] = this.successor ? this.successor.toJSON() : <any>undefined;
        data["action"] = this.action ? this.action.toJSON() : <any>undefined;
        data["hasProcessedRequest"] = this.hasProcessedRequest;
        return data; 
    }
}

export interface ISignee {
    subject?: string | undefined;
    role?: string | undefined;
    name?: string | undefined;
    successor?: Approver;
    action?: ApproveAction;
    hasProcessedRequest?: boolean;
}

/** Lookup representation */
export class LookupDto implements ILookupDto {
    /** Lookup UiD */
    lookupId?: string;
    /** Lookup Name */
    lookupName?: string | undefined;
    /** Lookup stage collection */
    values?: string[] | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The creation date of the version (Read-only) */
    created?: moment.Moment;
    status?: VersionStatus;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;

    constructor(data?: ILookupDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.lookupId = _data["lookupId"];
            this.lookupName = _data["lookupName"];
            if (Array.isArray(_data["values"])) {
                this.values = [] as any;
                for (let item of _data["values"])
                    this.values!.push(item);
            }
            this.versionNumber = _data["versionNumber"];
            this.effectiveFrom = _data["effectiveFrom"] ? moment(_data["effectiveFrom"].toString()) : <any>undefined;
            this.created = _data["created"] ? moment(_data["created"].toString()) : <any>undefined;
            this.status = _data["status"];
            if (Array.isArray(_data["signees"])) {
                this.signees = [] as any;
                for (let item of _data["signees"])
                    this.signees!.push(Signee.fromJS(item));
            }
        }
    }

    static fromJS(data: any): LookupDto {
        data = typeof data === 'object' ? data : {};
        let result = new LookupDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lookupId"] = this.lookupId;
        data["lookupName"] = this.lookupName;
        if (Array.isArray(this.values)) {
            data["values"] = [];
            for (let item of this.values)
                data["values"].push(item);
        }
        data["versionNumber"] = this.versionNumber;
        data["effectiveFrom"] = this.effectiveFrom ? this.effectiveFrom.toISOString() : <any>undefined;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["status"] = this.status;
        if (Array.isArray(this.signees)) {
            data["signees"] = [];
            for (let item of this.signees)
                data["signees"].push(item.toJSON());
        }
        return data; 
    }
}

/** Lookup representation */
export interface ILookupDto {
    /** Lookup UiD */
    lookupId?: string;
    /** Lookup Name */
    lookupName?: string | undefined;
    /** Lookup stage collection */
    values?: string[] | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The creation date of the version (Read-only) */
    created?: moment.Moment;
    status?: VersionStatus;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;
}

export class LookupDtoServiceRequest implements ILookupDtoServiceRequest {
    data?: LookupDto;

    constructor(data?: ILookupDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? LookupDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): LookupDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new LookupDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ILookupDtoServiceRequest {
    data?: LookupDto;
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

export class LookupDtoServiceResponse implements ILookupDtoServiceResponse {
    data?: LookupDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ILookupDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? LookupDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): LookupDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new LookupDtoServiceResponse();
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

export interface ILookupDtoServiceResponse {
    data?: LookupDto;
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

/** Set of properties which define new version of Lookup */
export class UpdateLookupVersionDto implements IUpdateLookupVersionDto {
    /** Lookup UiD */
    lookupId?: string;
    /** Lookup Name */
    lookupName?: string | undefined;
    /** Lookup stage collection */
    values?: string[] | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;

    constructor(data?: IUpdateLookupVersionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.lookupId = _data["lookupId"];
            this.lookupName = _data["lookupName"];
            if (Array.isArray(_data["values"])) {
                this.values = [] as any;
                for (let item of _data["values"])
                    this.values!.push(item);
            }
            this.versionNumber = _data["versionNumber"];
            this.effectiveFrom = _data["effectiveFrom"] ? moment(_data["effectiveFrom"].toString()) : <any>undefined;
            if (Array.isArray(_data["signees"])) {
                this.signees = [] as any;
                for (let item of _data["signees"])
                    this.signees!.push(Signee.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateLookupVersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateLookupVersionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lookupId"] = this.lookupId;
        data["lookupName"] = this.lookupName;
        if (Array.isArray(this.values)) {
            data["values"] = [];
            for (let item of this.values)
                data["values"].push(item);
        }
        data["versionNumber"] = this.versionNumber;
        data["effectiveFrom"] = this.effectiveFrom ? this.effectiveFrom.toISOString() : <any>undefined;
        if (Array.isArray(this.signees)) {
            data["signees"] = [];
            for (let item of this.signees)
                data["signees"].push(item.toJSON());
        }
        return data; 
    }
}

/** Set of properties which define new version of Lookup */
export interface IUpdateLookupVersionDto {
    /** Lookup UiD */
    lookupId?: string;
    /** Lookup Name */
    lookupName?: string | undefined;
    /** Lookup stage collection */
    values?: string[] | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;
}

export class UpdateLookupVersionDtoServiceRequest implements IUpdateLookupVersionDtoServiceRequest {
    data?: UpdateLookupVersionDto;

    constructor(data?: IUpdateLookupVersionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? UpdateLookupVersionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdateLookupVersionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateLookupVersionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IUpdateLookupVersionDtoServiceRequest {
    data?: UpdateLookupVersionDto;
}

export class ApproveActionServiceRequest implements IApproveActionServiceRequest {
    data?: ApproveAction;

    constructor(data?: IApproveActionServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ApproveAction.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ApproveActionServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ApproveActionServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IApproveActionServiceRequest {
    data?: ApproveAction;
}

/** Contains the new version Status, after a version sign operation */
export class LookupVersionSignResponse implements ILookupVersionSignResponse {
    /** The Id of the Lookup Link the version belongs to */
    lookupId?: string;
    /** The number of the version that has been signed */
    versionNumber?: number;
    status?: VersionStatus;

    constructor(data?: ILookupVersionSignResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.lookupId = _data["lookupId"];
            this.versionNumber = _data["versionNumber"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): LookupVersionSignResponse {
        data = typeof data === 'object' ? data : {};
        let result = new LookupVersionSignResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lookupId"] = this.lookupId;
        data["versionNumber"] = this.versionNumber;
        data["status"] = this.status;
        return data; 
    }
}

/** Contains the new version Status, after a version sign operation */
export interface ILookupVersionSignResponse {
    /** The Id of the Lookup Link the version belongs to */
    lookupId?: string;
    /** The number of the version that has been signed */
    versionNumber?: number;
    status?: VersionStatus;
}

export class LookupVersionSignResponseServiceResponse implements ILookupVersionSignResponseServiceResponse {
    data?: LookupVersionSignResponse;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ILookupVersionSignResponseServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? LookupVersionSignResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): LookupVersionSignResponseServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new LookupVersionSignResponseServiceResponse();
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

export interface ILookupVersionSignResponseServiceResponse {
    data?: LookupVersionSignResponse;
    messages?: ServiceResponseMessage[] | undefined;
}

export class LinkedValues implements ILinkedValues {
    parentValue?: string | undefined;
    childValue?: string | undefined;

    constructor(data?: ILinkedValues) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.parentValue = _data["parentValue"];
            this.childValue = _data["childValue"];
        }
    }

    static fromJS(data: any): LinkedValues {
        data = typeof data === 'object' ? data : {};
        let result = new LinkedValues();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["parentValue"] = this.parentValue;
        data["childValue"] = this.childValue;
        return data; 
    }
}

export interface ILinkedValues {
    parentValue?: string | undefined;
    childValue?: string | undefined;
}

export class CreateLinkVersionDto implements ICreateLinkVersionDto {
    /** Lookup Link Name */
    name?: string | undefined;
    /** Parent Lookup Id Linked */
    parentLookupId?: string;
    /** Parent Lookup Version Linked */
    parentLookupVersion?: number;
    /** Child Lookup Id Linked */
    childLookupId?: string;
    /** Child Lookup Version Linked */
    childLookupVersion?: number;
    /** Lookup Link RelationshipValues collection */
    relationshipValues?: LinkedValues[] | undefined;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;

    constructor(data?: ICreateLinkVersionDto) {
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
            this.parentLookupId = _data["parentLookupId"];
            this.parentLookupVersion = _data["parentLookupVersion"];
            this.childLookupId = _data["childLookupId"];
            this.childLookupVersion = _data["childLookupVersion"];
            if (Array.isArray(_data["relationshipValues"])) {
                this.relationshipValues = [] as any;
                for (let item of _data["relationshipValues"])
                    this.relationshipValues!.push(LinkedValues.fromJS(item));
            }
            this.effectiveFrom = _data["effectiveFrom"] ? moment(_data["effectiveFrom"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CreateLinkVersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateLinkVersionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["parentLookupId"] = this.parentLookupId;
        data["parentLookupVersion"] = this.parentLookupVersion;
        data["childLookupId"] = this.childLookupId;
        data["childLookupVersion"] = this.childLookupVersion;
        if (Array.isArray(this.relationshipValues)) {
            data["relationshipValues"] = [];
            for (let item of this.relationshipValues)
                data["relationshipValues"].push(item.toJSON());
        }
        data["effectiveFrom"] = this.effectiveFrom ? this.effectiveFrom.toISOString() : <any>undefined;
        return data; 
    }
}

export interface ICreateLinkVersionDto {
    /** Lookup Link Name */
    name?: string | undefined;
    /** Parent Lookup Id Linked */
    parentLookupId?: string;
    /** Parent Lookup Version Linked */
    parentLookupVersion?: number;
    /** Child Lookup Id Linked */
    childLookupId?: string;
    /** Child Lookup Version Linked */
    childLookupVersion?: number;
    /** Lookup Link RelationshipValues collection */
    relationshipValues?: LinkedValues[] | undefined;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
}

export class CreateLinkVersionDtoServiceRequest implements ICreateLinkVersionDtoServiceRequest {
    data?: CreateLinkVersionDto;

    constructor(data?: ICreateLinkVersionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? CreateLinkVersionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CreateLinkVersionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateLinkVersionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICreateLinkVersionDtoServiceRequest {
    data?: CreateLinkVersionDto;
}

/** Class to represent a custom pair of values of Linked Lookups */
export class LinkedValuesDto implements ILinkedValuesDto {
    /** The value of the Parent Lookup */
    parentValue?: string | undefined;
    /** The value of the Child Lookup */
    childValue?: string | undefined;

    constructor(data?: ILinkedValuesDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.parentValue = _data["parentValue"];
            this.childValue = _data["childValue"];
        }
    }

    static fromJS(data: any): LinkedValuesDto {
        data = typeof data === 'object' ? data : {};
        let result = new LinkedValuesDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["parentValue"] = this.parentValue;
        data["childValue"] = this.childValue;
        return data; 
    }
}

/** Class to represent a custom pair of values of Linked Lookups */
export interface ILinkedValuesDto {
    /** The value of the Parent Lookup */
    parentValue?: string | undefined;
    /** The value of the Child Lookup */
    childValue?: string | undefined;
}

export class LookupLinkVersionDto implements ILookupLinkVersionDto {
    /** The Id of the Lookup Link the version belongs to */
    lookupLinkId?: string;
    /** Lookup Link Name */
    name?: string | undefined;
    /** Parent Lookup Id Linked */
    parentLookupId?: string;
    /** Parent Lookup Version Linked */
    parentLookupVersion?: number;
    /** Child Lookup Id Linked */
    childLookupId?: string;
    /** Child Lookup Version Linked */
    childLookupVersion?: number;
    /** The number of the Link version */
    versionNumber?: number;
    /** Lookup Link RelationshipValues collection */
    relationshipValues?: LinkedValuesDto[] | undefined;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The creation date of the version (Read-only) */
    created?: moment.Moment;
    status?: VersionStatus;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;

    constructor(data?: ILookupLinkVersionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.lookupLinkId = _data["lookupLinkId"];
            this.name = _data["name"];
            this.parentLookupId = _data["parentLookupId"];
            this.parentLookupVersion = _data["parentLookupVersion"];
            this.childLookupId = _data["childLookupId"];
            this.childLookupVersion = _data["childLookupVersion"];
            this.versionNumber = _data["versionNumber"];
            if (Array.isArray(_data["relationshipValues"])) {
                this.relationshipValues = [] as any;
                for (let item of _data["relationshipValues"])
                    this.relationshipValues!.push(LinkedValuesDto.fromJS(item));
            }
            this.effectiveFrom = _data["effectiveFrom"] ? moment(_data["effectiveFrom"].toString()) : <any>undefined;
            this.created = _data["created"] ? moment(_data["created"].toString()) : <any>undefined;
            this.status = _data["status"];
            if (Array.isArray(_data["signees"])) {
                this.signees = [] as any;
                for (let item of _data["signees"])
                    this.signees!.push(Signee.fromJS(item));
            }
        }
    }

    static fromJS(data: any): LookupLinkVersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new LookupLinkVersionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lookupLinkId"] = this.lookupLinkId;
        data["name"] = this.name;
        data["parentLookupId"] = this.parentLookupId;
        data["parentLookupVersion"] = this.parentLookupVersion;
        data["childLookupId"] = this.childLookupId;
        data["childLookupVersion"] = this.childLookupVersion;
        data["versionNumber"] = this.versionNumber;
        if (Array.isArray(this.relationshipValues)) {
            data["relationshipValues"] = [];
            for (let item of this.relationshipValues)
                data["relationshipValues"].push(item.toJSON());
        }
        data["effectiveFrom"] = this.effectiveFrom ? this.effectiveFrom.toISOString() : <any>undefined;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["status"] = this.status;
        if (Array.isArray(this.signees)) {
            data["signees"] = [];
            for (let item of this.signees)
                data["signees"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ILookupLinkVersionDto {
    /** The Id of the Lookup Link the version belongs to */
    lookupLinkId?: string;
    /** Lookup Link Name */
    name?: string | undefined;
    /** Parent Lookup Id Linked */
    parentLookupId?: string;
    /** Parent Lookup Version Linked */
    parentLookupVersion?: number;
    /** Child Lookup Id Linked */
    childLookupId?: string;
    /** Child Lookup Version Linked */
    childLookupVersion?: number;
    /** The number of the Link version */
    versionNumber?: number;
    /** Lookup Link RelationshipValues collection */
    relationshipValues?: LinkedValuesDto[] | undefined;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The creation date of the version (Read-only) */
    created?: moment.Moment;
    status?: VersionStatus;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;
}

export class LookupLinkVersionDtoServiceResponse implements ILookupLinkVersionDtoServiceResponse {
    data?: LookupLinkVersionDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ILookupLinkVersionDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? LookupLinkVersionDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): LookupLinkVersionDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new LookupLinkVersionDtoServiceResponse();
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

export interface ILookupLinkVersionDtoServiceResponse {
    data?: LookupLinkVersionDto;
    messages?: ServiceResponseMessage[] | undefined;
}

export class LookupLinkVersionDtoServiceRequest implements ILookupLinkVersionDtoServiceRequest {
    data?: LookupLinkVersionDto;

    constructor(data?: ILookupLinkVersionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? LookupLinkVersionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): LookupLinkVersionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new LookupLinkVersionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ILookupLinkVersionDtoServiceRequest {
    data?: LookupLinkVersionDto;
}

/** Set of properties which define new version of Link Lookup */
export class UpdateLinkVersionDto implements IUpdateLinkVersionDto {
    /** The UiD of the Lookup Link that the version belongs to */
    parentLinkId?: string;
    /** Display name of the Lookup Link */
    name?: string | undefined;
    /** Parent Lookup Id Linked */
    parentLookupId?: string;
    /** Parent Lookup Version Linked */
    parentLookupVersion?: number;
    /** Child Lookup Id Linked */
    childLookupId?: string;
    /** Child Lookup Version Linked */
    childLookupVersion?: number;
    /** List of linked values for lookups */
    relationshipValues?: LinkedValues[] | undefined;
    /** The versions number */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;

    constructor(data?: IUpdateLinkVersionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.parentLinkId = _data["parentLinkId"];
            this.name = _data["name"];
            this.parentLookupId = _data["parentLookupId"];
            this.parentLookupVersion = _data["parentLookupVersion"];
            this.childLookupId = _data["childLookupId"];
            this.childLookupVersion = _data["childLookupVersion"];
            if (Array.isArray(_data["relationshipValues"])) {
                this.relationshipValues = [] as any;
                for (let item of _data["relationshipValues"])
                    this.relationshipValues!.push(LinkedValues.fromJS(item));
            }
            this.versionNumber = _data["versionNumber"];
            this.effectiveFrom = _data["effectiveFrom"] ? moment(_data["effectiveFrom"].toString()) : <any>undefined;
            if (Array.isArray(_data["signees"])) {
                this.signees = [] as any;
                for (let item of _data["signees"])
                    this.signees!.push(Signee.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateLinkVersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateLinkVersionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["parentLinkId"] = this.parentLinkId;
        data["name"] = this.name;
        data["parentLookupId"] = this.parentLookupId;
        data["parentLookupVersion"] = this.parentLookupVersion;
        data["childLookupId"] = this.childLookupId;
        data["childLookupVersion"] = this.childLookupVersion;
        if (Array.isArray(this.relationshipValues)) {
            data["relationshipValues"] = [];
            for (let item of this.relationshipValues)
                data["relationshipValues"].push(item.toJSON());
        }
        data["versionNumber"] = this.versionNumber;
        data["effectiveFrom"] = this.effectiveFrom ? this.effectiveFrom.toISOString() : <any>undefined;
        if (Array.isArray(this.signees)) {
            data["signees"] = [];
            for (let item of this.signees)
                data["signees"].push(item.toJSON());
        }
        return data; 
    }
}

/** Set of properties which define new version of Link Lookup */
export interface IUpdateLinkVersionDto {
    /** The UiD of the Lookup Link that the version belongs to */
    parentLinkId?: string;
    /** Display name of the Lookup Link */
    name?: string | undefined;
    /** Parent Lookup Id Linked */
    parentLookupId?: string;
    /** Parent Lookup Version Linked */
    parentLookupVersion?: number;
    /** Child Lookup Id Linked */
    childLookupId?: string;
    /** Child Lookup Version Linked */
    childLookupVersion?: number;
    /** List of linked values for lookups */
    relationshipValues?: LinkedValues[] | undefined;
    /** The versions number */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;
}

export class UpdateLinkVersionDtoServiceRequest implements IUpdateLinkVersionDtoServiceRequest {
    data?: UpdateLinkVersionDto;

    constructor(data?: IUpdateLinkVersionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? UpdateLinkVersionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdateLinkVersionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateLinkVersionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IUpdateLinkVersionDtoServiceRequest {
    data?: UpdateLinkVersionDto;
}

export class LinkVersionSignResponse implements ILinkVersionSignResponse {
    /** The Id of the model the version belongs to */
    id?: string;
    /** The number of the version that has been signed */
    versionNumber?: number;
    status?: VersionStatus;

    constructor(data?: ILinkVersionSignResponse) {
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
            this.versionNumber = _data["versionNumber"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): LinkVersionSignResponse {
        data = typeof data === 'object' ? data : {};
        let result = new LinkVersionSignResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["versionNumber"] = this.versionNumber;
        data["status"] = this.status;
        return data; 
    }
}

export interface ILinkVersionSignResponse {
    /** The Id of the model the version belongs to */
    id?: string;
    /** The number of the version that has been signed */
    versionNumber?: number;
    status?: VersionStatus;
}

export class LinkVersionSignResponseServiceResponse implements ILinkVersionSignResponseServiceResponse {
    data?: LinkVersionSignResponse;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ILinkVersionSignResponseServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? LinkVersionSignResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): LinkVersionSignResponseServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new LinkVersionSignResponseServiceResponse();
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

export interface ILinkVersionSignResponseServiceResponse {
    data?: LinkVersionSignResponse;
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