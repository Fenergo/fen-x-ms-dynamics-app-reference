/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import moment from 'moment';

export interface IClient {
    /**
     * Create new DataGroup
     * @param body (optional) 
     * @return Accepted for processing
     */
    createDataGroup(x_TENANT_ID: string, body?: DataGroupDtoServiceRequest | undefined): Promise<DataGroupDtoServiceResponse>;
    /**
     * Create a new Version for an existing DataGroup
     * @param groupId The Id of the existing model
     * @param body (optional) ServiceRequest with the new version data
     * @return Accepted for processing
     */
    createDataGroupVersion(groupId: string, x_TENANT_ID: string, body?: DataGroupDtoServiceRequest | undefined): Promise<DataGroupDtoServiceResponse>;
    /**
     * Delete DataGroup and all it's versions
     * @param groupId The unique identifier of the Data Group to delete
     * @return Accepted for processing
     */
    deleteDataGroup(groupId: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Update an existing Version of a DataGroup
     * @param groupId The Id of the existing model
     * @param versionNumber Number of version to update
     * @param body (optional) ServiceRequest with the updated version data
     * @return Accepted for processing
     */
    updateDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string, body?: UpdateDataGroupVersionDtoServiceRequest | undefined): Promise<void>;
    /**
     * Delete an existing Version of a DataGroup
     * @return Accepted for processing
     */
    deleteDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Clone an existing Version of a Data Group to a new model
     * @param dataGroupId The Id of the existing model
     * @param versionNumber The version number of the version to clone
     * @param body (optional) The request specifying the clone properties
     * @return Accepted for processing
     */
    cloneDataGroupVersion(dataGroupId: string, versionNumber: number, x_TENANT_ID: string, body?: CloneDataGroupVersionDtoServiceRequest | undefined): Promise<CloneDataGroupVersionResponseServiceResponse>;
    /**
     * Submit an existing Version of a DataGroup for Approval
     * @param groupId The Id of the existing model
     * @param versionNumber The version number of the version to submit
     * @return Accepted for processing
     */
    submitDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Sign an existing Version of a DataGroup
     * @param groupId The Id of the existing model
     * @param versionNumber The version number of the version to sign
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Versioning.Models.ApproveAction signing data
     * @return Accepted for processing
     */
    signDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string, body?: ApproveActionServiceRequest | undefined): Promise<DataGroupVersionSignResponseServiceResponse>;
    /**
     * Archive an existing Version of a DataGroup
     * @param groupId The Id of the existing model
     * @param versionNumber The version number of the version to archive
     * @return Accepted for processing
     */
    archiveDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string): Promise<void>;
    /**
     * Add new Data Group Field
     * @param id The unique identifier of the Data Group
     * @param versionNumber The version number of the Data Group version
     * @param body (optional) Service request with Data Group Field data
     * @return Accepted for processing
     */
    addDataGroupField(id: string, versionNumber: number, x_TENANT_ID: string, body?: DataGroupFieldDtoServiceRequest | undefined): Promise<DataGroupCreatedDtoServiceResponse>;
    /**
     * Update Data Group Field
     * @param id The unique identifier of the Data Group for which we will update Data Group Field
     * @param versionNumber The version number of the Data Group version
     * @param body (optional) Service request with Data Group Field data to update
     * @return An instance of the updated Data Group Field Fenergo.Nebula.Policy.Command.Application.Dto.DataGroup.DataGroupFieldDto class.
     */
    updateDataGroupField(id: string, versionNumber: number, x_TENANT_ID: string, body?: DataGroupFieldDtoServiceRequest | undefined): Promise<void>;
    /**
     * Delete Data Group Field
     * @param id The unique identifier of the Data Group for which we will delete Data Group Field
     * @param versionNumber The version number of the Data Group version
     * @param fieldId The unique identifier of the Data Group Field to delete in specific Data Group
     * @return Accepted for processing
     */
    deleteDataGroupField(id: string, versionNumber: number, fieldId: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Create new Requirement Set
     * @param body (optional) Service request with Requirement Set parameters
     * @return Accepted for processing
     */
    createRequirementSet(x_TENANT_ID: string, body?: RequirementSetLightDtoServiceRequest | undefined): Promise<RequirementSetCreatedDtoServiceResponse>;
    /**
     * Create new Requirement Set with Requirements
     * @param body (optional) Service request with Requirement Set and Requirements data
     * @return Accepted for processing
     */
    createRequirementSetFull(x_TENANT_ID: string, body?: RequirementSetDtoServiceRequest | undefined): Promise<RequirementSetCreatedDtoServiceResponse>;
    /**
     * Clone Requirement Set
     * @param id The unique identifier of the Requirement Set to clone
     * @param body (optional) Service request with Requirement Set data to clone
     * @return Accepted for processing
     */
    cloneRequirementSet(id: string, x_TENANT_ID: string, body?: CloneRequirementSetDtoServiceRequest | undefined): Promise<RequirementSetCreatedDtoServiceResponse>;
    /**
     * Update Requirement Set
     * @param id The unique identifier of the Requirement Set to update
     * @param body (optional) Service request with Requirement Set data to update
     * @return An instance of the Fenergo.Nebula.Policy.Command.Application.Dto.Create.RequirementSetLightDto class.
     */
    updateRequirementSet(id: string, x_TENANT_ID: string, body?: RequirementSetLightDtoServiceRequest | undefined): Promise<RequirementSetLightDtoServiceResponse>;
    /**
     * Delete Requirement Set
     * @param id The unique identifier of the Requirement Set to delete
     * @return Accepted for processing
     */
    deleteRequirementSet(id: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Add new Requirement
     * @param id The unique identifier of the Requirement Set to which we will add Requirement
     * @param body (optional) Service request with Requirement data
     * @return Accepted for processing
     */
    addRequirement(id: string, x_TENANT_ID: string, body?: RequirementDtoServiceRequest | undefined): Promise<RequirementCreatedDtoServiceResponse>;
    /**
     * Update Requirement
     * @param id The unique identifier of the Requirement Set
     * @param body (optional) Service request with Requirement data to update
     * @return An instance of the Fenergo.Nebula.Policy.Command.Application.Dto.RequirementDto class.
     */
    updateRequirement(id: string, x_TENANT_ID: string, body?: RequirementDtoServiceRequest | undefined): Promise<RequirementDtoServiceResponse>;
    /**
     * Delete Requirement
     * @param id The unique identifier of the Requirement Set
     * @param identifierId The unique identifier of the Requirement to delete
     * @return Accepted for processing
     */
    deleteRequirement(id: string, identifierId: string, x_TENANT_ID: string): Promise<void>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/policycommand";
    }

    /**
     * Create new DataGroup
     * @param body (optional) 
     * @return Accepted for processing
     */
    createDataGroup(x_TENANT_ID: string, body?: DataGroupDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<DataGroupDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/data-group";
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
            return this.processCreateDataGroup(_response);
        });
    }

    protected processCreateDataGroup(response: AxiosResponse): Promise<DataGroupDtoServiceResponse> {
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
            result202 = DataGroupDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the request", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<DataGroupDtoServiceResponse>(<any>null);
    }

    /**
     * Create a new Version for an existing DataGroup
     * @param groupId The Id of the existing model
     * @param body (optional) ServiceRequest with the new version data
     * @return Accepted for processing
     */
    createDataGroupVersion(groupId: string, x_TENANT_ID: string, body?: DataGroupDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<DataGroupDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processCreateDataGroupVersion(_response);
        });
    }

    protected processCreateDataGroupVersion(response: AxiosResponse): Promise<DataGroupDtoServiceResponse> {
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
            result202 = DataGroupDtoServiceResponse.fromJS(resultData202);
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the request", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<DataGroupDtoServiceResponse>(<any>null);
    }

    /**
     * Delete DataGroup and all it's versions
     * @param groupId The unique identifier of the Data Group to delete
     * @return Accepted for processing
     */
    deleteDataGroup(groupId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processDeleteDataGroup(_response);
        });
    }

    protected processDeleteDataGroup(response: AxiosResponse): Promise<void> {
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the request", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Update an existing Version of a DataGroup
     * @param groupId The Id of the existing model
     * @param versionNumber Number of version to update
     * @param body (optional) ServiceRequest with the updated version data
     * @return Accepted for processing
     */
    updateDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string, body?: UpdateDataGroupVersionDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}/version/{versionNumber}";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processUpdateDataGroupVersion(_response);
        });
    }

    protected processUpdateDataGroupVersion(response: AxiosResponse): Promise<void> {
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the request", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Delete an existing Version of a DataGroup
     * @return Accepted for processing
     */
    deleteDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}/version/{versionNumber}";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processDeleteDataGroupVersion(_response);
        });
    }

    protected processDeleteDataGroupVersion(response: AxiosResponse): Promise<void> {
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the request", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Clone an existing Version of a Data Group to a new model
     * @param dataGroupId The Id of the existing model
     * @param versionNumber The version number of the version to clone
     * @param body (optional) The request specifying the clone properties
     * @return Accepted for processing
     */
    cloneDataGroupVersion(dataGroupId: string, versionNumber: number, x_TENANT_ID: string, body?: CloneDataGroupVersionDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<CloneDataGroupVersionResponseServiceResponse> {
        let url_ = this.baseUrl + "/api/data-group/{dataGroupId}/version/{versionNumber}/clone";
        if (dataGroupId === undefined || dataGroupId === null)
            throw new Error("The parameter 'dataGroupId' must be defined.");
        url_ = url_.replace("{dataGroupId}", encodeURIComponent("" + dataGroupId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
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
            return this.processCloneDataGroupVersion(_response);
        });
    }

    protected processCloneDataGroupVersion(response: AxiosResponse): Promise<CloneDataGroupVersionResponseServiceResponse> {
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
            result202 = CloneDataGroupVersionResponseServiceResponse.fromJS(resultData202);
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("Data Group with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the request", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<CloneDataGroupVersionResponseServiceResponse>(<any>null);
    }

    /**
     * Submit an existing Version of a DataGroup for Approval
     * @param groupId The Id of the existing model
     * @param versionNumber The version number of the version to submit
     * @return Accepted for processing
     */
    submitDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}/version/{versionNumber}/submit-for-approval";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processSubmitDataGroupVersion(_response);
        });
    }

    protected processSubmitDataGroupVersion(response: AxiosResponse): Promise<void> {
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the command", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Sign an existing Version of a DataGroup
     * @param groupId The Id of the existing model
     * @param versionNumber The version number of the version to sign
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Versioning.Models.ApproveAction signing data
     * @return Accepted for processing
     */
    signDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string, body?: ApproveActionServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<DataGroupVersionSignResponseServiceResponse> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}/version/{versionNumber}/sign";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processSignDataGroupVersion(_response);
        });
    }

    protected processSignDataGroupVersion(response: AxiosResponse): Promise<DataGroupVersionSignResponseServiceResponse> {
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
            result202 = DataGroupVersionSignResponseServiceResponse.fromJS(resultData202);
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the command", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<DataGroupVersionSignResponseServiceResponse>(<any>null);
    }

    /**
     * Archive an existing Version of a DataGroup
     * @param groupId The Id of the existing model
     * @param versionNumber The version number of the version to archive
     * @return Accepted for processing
     */
    archiveDataGroupVersion(groupId: string, versionNumber: number, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{groupId}/version/{versionNumber}/archive";
        if (groupId === undefined || groupId === null)
            throw new Error("The parameter 'groupId' must be defined.");
        url_ = url_.replace("{groupId}", encodeURIComponent("" + groupId));
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
            return this.processArchiveDataGroupVersion(_response);
        });
    }

    protected processArchiveDataGroupVersion(response: AxiosResponse): Promise<void> {
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
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("An exception occurred while processing the command", status, _responseText, _headers, result500);
        } else if (status === 404) {
            const _responseText = response.data;
            return throwException("DataGroup with given ID does not exists", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Add new Data Group Field
     * @param id The unique identifier of the Data Group
     * @param versionNumber The version number of the Data Group version
     * @param body (optional) Service request with Data Group Field data
     * @return Accepted for processing
     */
    addDataGroupField(id: string, versionNumber: number, x_TENANT_ID: string, body?: DataGroupFieldDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<DataGroupCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/data-group/{id}/version/{versionNumber}/field";
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
            return this.processAddDataGroupField(_response);
        });
    }

    protected processAddDataGroupField(response: AxiosResponse): Promise<DataGroupCreatedDtoServiceResponse> {
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
            result202 = DataGroupCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("Internal server error", status, _responseText, _headers, result500);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("Data Group with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<DataGroupCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Update Data Group Field
     * @param id The unique identifier of the Data Group for which we will update Data Group Field
     * @param versionNumber The version number of the Data Group version
     * @param body (optional) Service request with Data Group Field data to update
     * @return An instance of the updated Data Group Field Fenergo.Nebula.Policy.Command.Application.Dto.DataGroup.DataGroupFieldDto class.
     */
    updateDataGroupField(id: string, versionNumber: number, x_TENANT_ID: string, body?: DataGroupFieldDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{id}/version/{versionNumber}/field";
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
            return this.processUpdateDataGroupField(_response);
        });
    }

    protected processUpdateDataGroupField(response: AxiosResponse): Promise<void> {
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("Data Group with given ID does not exists", status, _responseText, _headers, result404);
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
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("Internal server error", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Delete Data Group Field
     * @param id The unique identifier of the Data Group for which we will delete Data Group Field
     * @param versionNumber The version number of the Data Group version
     * @param fieldId The unique identifier of the Data Group Field to delete in specific Data Group
     * @return Accepted for processing
     */
    deleteDataGroupField(id: string, versionNumber: number, fieldId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/data-group/{id}/version/{versionNumber}/field/{fieldId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        if (fieldId === undefined || fieldId === null)
            throw new Error("The parameter 'fieldId' must be defined.");
        url_ = url_.replace("{fieldId}", encodeURIComponent("" + fieldId));
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
            return this.processDeleteDataGroupField(_response);
        });
    }

    protected processDeleteDataGroupField(response: AxiosResponse): Promise<void> {
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
            result404 = ServiceResponse.fromJS(resultData404);
            return throwException("Data Group with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ServiceResponse.fromJS(resultData500);
            return throwException("Internal server error", status, _responseText, _headers, result500);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Create new Requirement Set
     * @param body (optional) Service request with Requirement Set parameters
     * @return Accepted for processing
     */
    createRequirementSet(x_TENANT_ID: string, body?: RequirementSetLightDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<RequirementSetCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/requirement-set";
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
            return this.processCreateRequirementSet(_response);
        });
    }

    protected processCreateRequirementSet(response: AxiosResponse): Promise<RequirementSetCreatedDtoServiceResponse> {
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
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = RequirementSetCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<RequirementSetCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Create new Requirement Set with Requirements
     * @param body (optional) Service request with Requirement Set and Requirements data
     * @return Accepted for processing
     */
    createRequirementSetFull(x_TENANT_ID: string, body?: RequirementSetDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<RequirementSetCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/requirement-set/full";
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
            return this.processCreateRequirementSetFull(_response);
        });
    }

    protected processCreateRequirementSetFull(response: AxiosResponse): Promise<RequirementSetCreatedDtoServiceResponse> {
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
            result202 = RequirementSetCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<RequirementSetCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Clone Requirement Set
     * @param id The unique identifier of the Requirement Set to clone
     * @param body (optional) Service request with Requirement Set data to clone
     * @return Accepted for processing
     */
    cloneRequirementSet(id: string, x_TENANT_ID: string, body?: CloneRequirementSetDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<RequirementSetCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/requirement-set/{id}/clone";
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
            return this.processCloneRequirementSet(_response);
        });
    }

    protected processCloneRequirementSet(response: AxiosResponse): Promise<RequirementSetCreatedDtoServiceResponse> {
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
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = RequirementSetCreatedDtoServiceResponse.fromJS(resultData202);
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
            return throwException("Requirement Set with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<RequirementSetCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Update Requirement Set
     * @param id The unique identifier of the Requirement Set to update
     * @param body (optional) Service request with Requirement Set data to update
     * @return An instance of the Fenergo.Nebula.Policy.Command.Application.Dto.Create.RequirementSetLightDto class.
     */
    updateRequirementSet(id: string, x_TENANT_ID: string, body?: RequirementSetLightDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<RequirementSetLightDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/requirement-set/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processUpdateRequirementSet(_response);
        });
    }

    protected processUpdateRequirementSet(response: AxiosResponse): Promise<RequirementSetLightDtoServiceResponse> {
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
            return throwException("Requirement Set with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = RequirementSetLightDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<RequirementSetLightDtoServiceResponse>(<any>null);
    }

    /**
     * Delete Requirement Set
     * @param id The unique identifier of the Requirement Set to delete
     * @return Accepted for processing
     */
    deleteRequirementSet(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/requirement-set/{id}";
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
            return this.processDeleteRequirementSet(_response);
        });
    }

    protected processDeleteRequirementSet(response: AxiosResponse): Promise<void> {
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
            return throwException("Requirement Set with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Add new Requirement
     * @param id The unique identifier of the Requirement Set to which we will add Requirement
     * @param body (optional) Service request with Requirement data
     * @return Accepted for processing
     */
    addRequirement(id: string, x_TENANT_ID: string, body?: RequirementDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<RequirementCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/requirement-set/{id}/requirement";
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
            return this.processAddRequirement(_response);
        });
    }

    protected processAddRequirement(response: AxiosResponse): Promise<RequirementCreatedDtoServiceResponse> {
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
            result202 = RequirementCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Requirement Set with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<RequirementCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Update Requirement
     * @param id The unique identifier of the Requirement Set
     * @param body (optional) Service request with Requirement data to update
     * @return An instance of the Fenergo.Nebula.Policy.Command.Application.Dto.RequirementDto class.
     */
    updateRequirement(id: string, x_TENANT_ID: string, body?: RequirementDtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<RequirementDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/requirement-set/{id}/requirement";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processUpdateRequirement(_response);
        });
    }

    protected processUpdateRequirement(response: AxiosResponse): Promise<RequirementDtoServiceResponse> {
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
            result202 = RequirementDtoServiceResponse.fromJS(resultData202);
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
            return throwException("Requirement Set with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<RequirementDtoServiceResponse>(<any>null);
    }

    /**
     * Delete Requirement
     * @param id The unique identifier of the Requirement Set
     * @param identifierId The unique identifier of the Requirement to delete
     * @return Accepted for processing
     */
    deleteRequirement(id: string, identifierId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/requirement-set/{id}/requirement/{identifierId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (identifierId === undefined || identifierId === null)
            throw new Error("The parameter 'identifierId' must be defined.");
        url_ = url_.replace("{identifierId}", encodeURIComponent("" + identifierId));
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
            return this.processDeleteRequirement(_response);
        });
    }

    protected processDeleteRequirement(response: AxiosResponse): Promise<void> {
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
            return throwException("Requirement Set/Requirement with given ID does not exists", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }
}

/** Data Field DTO metadata */
export class DataFieldDto implements IDataFieldDto {
    /** Property Name */
    propertyName?: string | undefined;
    /** Property Type */
    propertyType?: string | undefined;
    /** Property Type ID */
    propertyTypeId?: string | undefined;

    constructor(data?: IDataFieldDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.propertyName = _data["propertyName"];
            this.propertyType = _data["propertyType"];
            this.propertyTypeId = _data["propertyTypeId"];
        }
    }

    static fromJS(data: any): DataFieldDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataFieldDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["propertyName"] = this.propertyName;
        data["propertyType"] = this.propertyType;
        data["propertyTypeId"] = this.propertyTypeId;
        return data; 
    }
}

/** Data Field DTO metadata */
export interface IDataFieldDto {
    /** Property Name */
    propertyName?: string | undefined;
    /** Property Type */
    propertyType?: string | undefined;
    /** Property Type ID */
    propertyTypeId?: string | undefined;
}

/** Reference DTO metadata */
export class ReferenceDto implements IReferenceDto {
    /** Reference Type */
    type?: string | undefined;
    /** Reference Description */
    description?: string | undefined;
    /** Reference URL */
    url?: string | undefined;

    constructor(data?: IReferenceDto) {
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
            this.description = _data["description"];
            this.url = _data["url"];
        }
    }

    static fromJS(data: any): ReferenceDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReferenceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["description"] = this.description;
        data["url"] = this.url;
        return data; 
    }
}

/** Reference DTO metadata */
export interface IReferenceDto {
    /** Reference Type */
    type?: string | undefined;
    /** Reference Description */
    description?: string | undefined;
    /** Reference URL */
    url?: string | undefined;
}

export class ConditionDefinitionDto implements IConditionDefinitionDto {
    fieldName?: string | undefined;
    value?: string[] | undefined;
    valueType?: string | undefined;
    operation?: string | undefined;
    logicalOperation?: string | undefined;
    operands?: ConditionDefinitionDto[] | undefined;

    constructor(data?: IConditionDefinitionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.fieldName = _data["fieldName"];
            if (Array.isArray(_data["value"])) {
                this.value = [] as any;
                for (let item of _data["value"])
                    this.value!.push(item);
            }
            this.valueType = _data["valueType"];
            this.operation = _data["operation"];
            this.logicalOperation = _data["logicalOperation"];
            if (Array.isArray(_data["operands"])) {
                this.operands = [] as any;
                for (let item of _data["operands"])
                    this.operands!.push(ConditionDefinitionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConditionDefinitionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConditionDefinitionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fieldName"] = this.fieldName;
        if (Array.isArray(this.value)) {
            data["value"] = [];
            for (let item of this.value)
                data["value"].push(item);
        }
        data["valueType"] = this.valueType;
        data["operation"] = this.operation;
        data["logicalOperation"] = this.logicalOperation;
        if (Array.isArray(this.operands)) {
            data["operands"] = [];
            for (let item of this.operands)
                data["operands"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IConditionDefinitionDto {
    fieldName?: string | undefined;
    value?: string[] | undefined;
    valueType?: string | undefined;
    operation?: string | undefined;
    logicalOperation?: string | undefined;
    operands?: ConditionDefinitionDto[] | undefined;
}

export class ConditionDto implements IConditionDto {
    id?: string;
    name?: string | undefined;
    description?: string | undefined;
    logicalOperation?: string | undefined;
    operands?: ConditionDefinitionDto[] | undefined;

    constructor(data?: IConditionDto) {
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
            this.description = _data["description"];
            this.logicalOperation = _data["logicalOperation"];
            if (Array.isArray(_data["operands"])) {
                this.operands = [] as any;
                for (let item of _data["operands"])
                    this.operands!.push(ConditionDefinitionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConditionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConditionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["logicalOperation"] = this.logicalOperation;
        if (Array.isArray(this.operands)) {
            data["operands"] = [];
            for (let item of this.operands)
                data["operands"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IConditionDto {
    id?: string;
    name?: string | undefined;
    description?: string | undefined;
    logicalOperation?: string | undefined;
    operands?: ConditionDefinitionDto[] | undefined;
}

/** Basic Rule DTO metadata */
export class BasicRuleDto implements IBasicRuleDto {
    /** Validation Rule active flag */
    active?: boolean;
    /** Validation Rule error message */
    message?: string | undefined;

    constructor(data?: IBasicRuleDto) {
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
            this.message = _data["message"];
        }
    }

    static fromJS(data: any): BasicRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new BasicRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["active"] = this.active;
        data["message"] = this.message;
        return data; 
    }
}

/** Basic Rule DTO metadata */
export interface IBasicRuleDto {
    /** Validation Rule active flag */
    active?: boolean;
    /** Validation Rule error message */
    message?: string | undefined;
}

/** Date Limit Rule DTO metadata */
export class DateLimitRuleDto extends BasicRuleDto implements IDateLimitRuleDto {
    /** Minimum date in the range */
    minDate?: moment.Moment | undefined;
    /** Maximum date in the range */
    maxDate?: moment.Moment | undefined;

    constructor(data?: IDateLimitRuleDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.minDate = _data["minDate"] ? moment(_data["minDate"].toString()) : <any>undefined;
            this.maxDate = _data["maxDate"] ? moment(_data["maxDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): DateLimitRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new DateLimitRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["minDate"] = this.minDate ? this.minDate.toISOString() : <any>undefined;
        data["maxDate"] = this.maxDate ? this.maxDate.toISOString() : <any>undefined;
        super.toJSON(data);
        return data; 
    }
}

/** Date Limit Rule DTO metadata */
export interface IDateLimitRuleDto extends IBasicRuleDto {
    /** Minimum date in the range */
    minDate?: moment.Moment | undefined;
    /** Maximum date in the range */
    maxDate?: moment.Moment | undefined;
}

/** Regex Rule DTO metadata */
export class RegexRuleDto extends BasicRuleDto implements IRegexRuleDto {
    /** Regex value */
    regexValue?: string | undefined;

    constructor(data?: IRegexRuleDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.regexValue = _data["regexValue"];
        }
    }

    static fromJS(data: any): RegexRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegexRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["regexValue"] = this.regexValue;
        super.toJSON(data);
        return data; 
    }
}

/** Regex Rule DTO metadata */
export interface IRegexRuleDto extends IBasicRuleDto {
    /** Regex value */
    regexValue?: string | undefined;
}

/** Special Characters Rule DTO metadata */
export class SpecialCharactersRuleDto extends BasicRuleDto implements ISpecialCharactersRuleDto {
    /** Array of special characters, which will be ignored by validation */
    excludedCharacters?: string[] | undefined;

    constructor(data?: ISpecialCharactersRuleDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            if (Array.isArray(_data["excludedCharacters"])) {
                this.excludedCharacters = [] as any;
                for (let item of _data["excludedCharacters"])
                    this.excludedCharacters!.push(item);
            }
        }
    }

    static fromJS(data: any): SpecialCharactersRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new SpecialCharactersRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.excludedCharacters)) {
            data["excludedCharacters"] = [];
            for (let item of this.excludedCharacters)
                data["excludedCharacters"].push(item);
        }
        super.toJSON(data);
        return data; 
    }
}

/** Special Characters Rule DTO metadata */
export interface ISpecialCharactersRuleDto extends IBasicRuleDto {
    /** Array of special characters, which will be ignored by validation */
    excludedCharacters?: string[] | undefined;
}

/** Value Limit Rule DTO metadata */
export class ValueLimitRuleDto extends BasicRuleDto implements IValueLimitRuleDto {
    /** Minimum value in the range */
    minValue?: number | undefined;
    /** Maximum value in the range */
    maxValue?: number | undefined;

    constructor(data?: IValueLimitRuleDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.minValue = _data["minValue"];
            this.maxValue = _data["maxValue"];
        }
    }

    static fromJS(data: any): ValueLimitRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ValueLimitRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["minValue"] = this.minValue;
        data["maxValue"] = this.maxValue;
        super.toJSON(data);
        return data; 
    }
}

/** Value Limit Rule DTO metadata */
export interface IValueLimitRuleDto extends IBasicRuleDto {
    /** Minimum value in the range */
    minValue?: number | undefined;
    /** Maximum value in the range */
    maxValue?: number | undefined;
}

/** Validation Data DTO metadata */
export class ValidationDataDto implements IValidationDataDto {
    isMandatory?: BasicRuleDto;
    specialCharacters?: SpecialCharactersRuleDto;
    noNumbers?: BasicRuleDto;
    onlyInteger?: BasicRuleDto;
    noNegative?: BasicRuleDto;
    onlyDecimal?: BasicRuleDto;
    regex?: RegexRuleDto;
    characterLimit?: ValueLimitRuleDto;
    numberLimit?: ValueLimitRuleDto;
    noFutureDates?: BasicRuleDto;
    noPastDates?: BasicRuleDto;
    dateLimit?: DateLimitRuleDto;
    multiSelectLimit?: ValueLimitRuleDto;

    constructor(data?: IValidationDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isMandatory = _data["isMandatory"] ? BasicRuleDto.fromJS(_data["isMandatory"]) : <any>undefined;
            this.specialCharacters = _data["specialCharacters"] ? SpecialCharactersRuleDto.fromJS(_data["specialCharacters"]) : <any>undefined;
            this.noNumbers = _data["noNumbers"] ? BasicRuleDto.fromJS(_data["noNumbers"]) : <any>undefined;
            this.onlyInteger = _data["onlyInteger"] ? BasicRuleDto.fromJS(_data["onlyInteger"]) : <any>undefined;
            this.noNegative = _data["noNegative"] ? BasicRuleDto.fromJS(_data["noNegative"]) : <any>undefined;
            this.onlyDecimal = _data["onlyDecimal"] ? BasicRuleDto.fromJS(_data["onlyDecimal"]) : <any>undefined;
            this.regex = _data["regex"] ? RegexRuleDto.fromJS(_data["regex"]) : <any>undefined;
            this.characterLimit = _data["characterLimit"] ? ValueLimitRuleDto.fromJS(_data["characterLimit"]) : <any>undefined;
            this.numberLimit = _data["numberLimit"] ? ValueLimitRuleDto.fromJS(_data["numberLimit"]) : <any>undefined;
            this.noFutureDates = _data["noFutureDates"] ? BasicRuleDto.fromJS(_data["noFutureDates"]) : <any>undefined;
            this.noPastDates = _data["noPastDates"] ? BasicRuleDto.fromJS(_data["noPastDates"]) : <any>undefined;
            this.dateLimit = _data["dateLimit"] ? DateLimitRuleDto.fromJS(_data["dateLimit"]) : <any>undefined;
            this.multiSelectLimit = _data["multiSelectLimit"] ? ValueLimitRuleDto.fromJS(_data["multiSelectLimit"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ValidationDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isMandatory"] = this.isMandatory ? this.isMandatory.toJSON() : <any>undefined;
        data["specialCharacters"] = this.specialCharacters ? this.specialCharacters.toJSON() : <any>undefined;
        data["noNumbers"] = this.noNumbers ? this.noNumbers.toJSON() : <any>undefined;
        data["onlyInteger"] = this.onlyInteger ? this.onlyInteger.toJSON() : <any>undefined;
        data["noNegative"] = this.noNegative ? this.noNegative.toJSON() : <any>undefined;
        data["onlyDecimal"] = this.onlyDecimal ? this.onlyDecimal.toJSON() : <any>undefined;
        data["regex"] = this.regex ? this.regex.toJSON() : <any>undefined;
        data["characterLimit"] = this.characterLimit ? this.characterLimit.toJSON() : <any>undefined;
        data["numberLimit"] = this.numberLimit ? this.numberLimit.toJSON() : <any>undefined;
        data["noFutureDates"] = this.noFutureDates ? this.noFutureDates.toJSON() : <any>undefined;
        data["noPastDates"] = this.noPastDates ? this.noPastDates.toJSON() : <any>undefined;
        data["dateLimit"] = this.dateLimit ? this.dateLimit.toJSON() : <any>undefined;
        data["multiSelectLimit"] = this.multiSelectLimit ? this.multiSelectLimit.toJSON() : <any>undefined;
        return data; 
    }
}

/** Validation Data DTO metadata */
export interface IValidationDataDto {
    isMandatory?: BasicRuleDto;
    specialCharacters?: SpecialCharactersRuleDto;
    noNumbers?: BasicRuleDto;
    onlyInteger?: BasicRuleDto;
    noNegative?: BasicRuleDto;
    onlyDecimal?: BasicRuleDto;
    regex?: RegexRuleDto;
    characterLimit?: ValueLimitRuleDto;
    numberLimit?: ValueLimitRuleDto;
    noFutureDates?: BasicRuleDto;
    noPastDates?: BasicRuleDto;
    dateLimit?: DateLimitRuleDto;
    multiSelectLimit?: ValueLimitRuleDto;
}

/** Validation Rule DTO metadata */
export class ValidationRuleDto implements IValidationRuleDto {
    /** Unique identifier of Validation Rule */
    id?: string;
    /** Unique identifier of Requirement Set/Data Group */
    setId?: string;
    /** Unique identifier of Requirement/Data Group Field */
    propertyId?: string;
    /** Unique identifier of Data Group */
    dataGroupId?: string | undefined;
    /** Flag indicating it is validation rules for Data Group Field */
    isDataGroup?: boolean;
    /** Requirement/Data Group Field property name */
    propertyName?: string | undefined;
    /** Friendly property name */
    friendlyName?: string | undefined;
    /** Validation Type */
    validationType?: string | undefined;
    validationData?: ValidationDataDto;

    constructor(data?: IValidationRuleDto) {
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
            this.setId = _data["setId"];
            this.propertyId = _data["propertyId"];
            this.dataGroupId = _data["dataGroupId"];
            this.isDataGroup = _data["isDataGroup"];
            this.propertyName = _data["propertyName"];
            this.friendlyName = _data["friendlyName"];
            this.validationType = _data["validationType"];
            this.validationData = _data["validationData"] ? ValidationDataDto.fromJS(_data["validationData"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ValidationRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["setId"] = this.setId;
        data["propertyId"] = this.propertyId;
        data["dataGroupId"] = this.dataGroupId;
        data["isDataGroup"] = this.isDataGroup;
        data["propertyName"] = this.propertyName;
        data["friendlyName"] = this.friendlyName;
        data["validationType"] = this.validationType;
        data["validationData"] = this.validationData ? this.validationData.toJSON() : <any>undefined;
        return data; 
    }
}

/** Validation Rule DTO metadata */
export interface IValidationRuleDto {
    /** Unique identifier of Validation Rule */
    id?: string;
    /** Unique identifier of Requirement Set/Data Group */
    setId?: string;
    /** Unique identifier of Requirement/Data Group Field */
    propertyId?: string;
    /** Unique identifier of Data Group */
    dataGroupId?: string | undefined;
    /** Flag indicating it is validation rules for Data Group Field */
    isDataGroup?: boolean;
    /** Requirement/Data Group Field property name */
    propertyName?: string | undefined;
    /** Friendly property name */
    friendlyName?: string | undefined;
    /** Validation Type */
    validationType?: string | undefined;
    validationData?: ValidationDataDto;
}

/** Requirement DTO metadata */
export class RequirementDto implements IRequirementDto {
    /** Unique identifier of Requirement */
    identifier?: string;
    /** Unique identifier of Requirement Set */
    requirementSetId?: string;
    /** Requirement Business Category */
    category?: string | undefined;
    /** Requirement Description */
    description?: string | undefined;
    /** Requirement Template */
    template?: string | undefined;
    /** Requirement EntityType */
    entityType?: string | undefined;
    /** Requirement Exclusive Country List */
    exclusiveCountryList?: string | undefined;
    /** Requirement Name */
    name?: string | undefined;
    /** Requirement IsSensitiveData */
    isSensitiveData?: boolean;
    /** Requirement Is Material Data flag */
    isMaterialData?: boolean;
    /** Requirement is defined as core
and cannot be deleted or altered */
    isCoreDefinition?: boolean;
    /** Requirement Jurisdiction */
    jurisdiction?: string | undefined;
    /** Requirement Classification */
    classification?: string | undefined;
    /** Requirement Mandatory flag */
    isMandatory?: boolean;
    /** Requirement Target Entity */
    targetEntity?: string | undefined;
    /** Requirement Type */
    type?: string | undefined;
    /** Requirement Document Description */
    documentDescription?: string | undefined;
    /** Requirement Party Type */
    partyType?: string | undefined;
    /** Requirement Party Count */
    partyCount?: number | undefined;
    /** Requirement UBO Threshold */
    uboThreshold?: number | undefined;
    dataField?: DataFieldDto;
    /** Requirement References List */
    references?: ReferenceDto[] | undefined;
    /** Requirement Conditions List */
    conditions?: ConditionDto[] | undefined;
    validationRule?: ValidationRuleDto;

    constructor(data?: IRequirementDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.identifier = _data["identifier"];
            this.requirementSetId = _data["requirementSetId"];
            this.category = _data["category"];
            this.description = _data["description"];
            this.template = _data["template"];
            this.entityType = _data["entityType"];
            this.exclusiveCountryList = _data["exclusiveCountryList"];
            this.name = _data["name"];
            this.isSensitiveData = _data["isSensitiveData"];
            this.isMaterialData = _data["isMaterialData"];
            this.isCoreDefinition = _data["isCoreDefinition"];
            this.jurisdiction = _data["jurisdiction"];
            this.classification = _data["classification"];
            this.isMandatory = _data["isMandatory"];
            this.targetEntity = _data["targetEntity"];
            this.type = _data["type"];
            this.documentDescription = _data["documentDescription"];
            this.partyType = _data["partyType"];
            this.partyCount = _data["partyCount"];
            this.uboThreshold = _data["uboThreshold"];
            this.dataField = _data["dataField"] ? DataFieldDto.fromJS(_data["dataField"]) : <any>undefined;
            if (Array.isArray(_data["references"])) {
                this.references = [] as any;
                for (let item of _data["references"])
                    this.references!.push(ReferenceDto.fromJS(item));
            }
            if (Array.isArray(_data["conditions"])) {
                this.conditions = [] as any;
                for (let item of _data["conditions"])
                    this.conditions!.push(ConditionDto.fromJS(item));
            }
            this.validationRule = _data["validationRule"] ? ValidationRuleDto.fromJS(_data["validationRule"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RequirementDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["identifier"] = this.identifier;
        data["requirementSetId"] = this.requirementSetId;
        data["category"] = this.category;
        data["description"] = this.description;
        data["template"] = this.template;
        data["entityType"] = this.entityType;
        data["exclusiveCountryList"] = this.exclusiveCountryList;
        data["name"] = this.name;
        data["isSensitiveData"] = this.isSensitiveData;
        data["isMaterialData"] = this.isMaterialData;
        data["isCoreDefinition"] = this.isCoreDefinition;
        data["jurisdiction"] = this.jurisdiction;
        data["classification"] = this.classification;
        data["isMandatory"] = this.isMandatory;
        data["targetEntity"] = this.targetEntity;
        data["type"] = this.type;
        data["documentDescription"] = this.documentDescription;
        data["partyType"] = this.partyType;
        data["partyCount"] = this.partyCount;
        data["uboThreshold"] = this.uboThreshold;
        data["dataField"] = this.dataField ? this.dataField.toJSON() : <any>undefined;
        if (Array.isArray(this.references)) {
            data["references"] = [];
            for (let item of this.references)
                data["references"].push(item.toJSON());
        }
        if (Array.isArray(this.conditions)) {
            data["conditions"] = [];
            for (let item of this.conditions)
                data["conditions"].push(item.toJSON());
        }
        data["validationRule"] = this.validationRule ? this.validationRule.toJSON() : <any>undefined;
        return data; 
    }
}

/** Requirement DTO metadata */
export interface IRequirementDto {
    /** Unique identifier of Requirement */
    identifier?: string;
    /** Unique identifier of Requirement Set */
    requirementSetId?: string;
    /** Requirement Business Category */
    category?: string | undefined;
    /** Requirement Description */
    description?: string | undefined;
    /** Requirement Template */
    template?: string | undefined;
    /** Requirement EntityType */
    entityType?: string | undefined;
    /** Requirement Exclusive Country List */
    exclusiveCountryList?: string | undefined;
    /** Requirement Name */
    name?: string | undefined;
    /** Requirement IsSensitiveData */
    isSensitiveData?: boolean;
    /** Requirement Is Material Data flag */
    isMaterialData?: boolean;
    /** Requirement is defined as core
and cannot be deleted or altered */
    isCoreDefinition?: boolean;
    /** Requirement Jurisdiction */
    jurisdiction?: string | undefined;
    /** Requirement Classification */
    classification?: string | undefined;
    /** Requirement Mandatory flag */
    isMandatory?: boolean;
    /** Requirement Target Entity */
    targetEntity?: string | undefined;
    /** Requirement Type */
    type?: string | undefined;
    /** Requirement Document Description */
    documentDescription?: string | undefined;
    /** Requirement Party Type */
    partyType?: string | undefined;
    /** Requirement Party Count */
    partyCount?: number | undefined;
    /** Requirement UBO Threshold */
    uboThreshold?: number | undefined;
    dataField?: DataFieldDto;
    /** Requirement References List */
    references?: ReferenceDto[] | undefined;
    /** Requirement Conditions List */
    conditions?: ConditionDto[] | undefined;
    validationRule?: ValidationRuleDto;
}

/** Data Group Field DTO metadata */
export class DataGroupFieldDto extends RequirementDto implements IDataGroupFieldDto {
    /** Data Group Field Order */
    order?: number;
    /** Data Group Field Type */
    readonly type?: string | undefined;

    constructor(data?: IDataGroupFieldDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.order = _data["order"];
            (<any>this).type = _data["type"];
        }
    }

    static fromJS(data: any): DataGroupFieldDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupFieldDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["order"] = this.order;
        data["type"] = this.type;
        super.toJSON(data);
        return data; 
    }
}

/** Data Group Field DTO metadata */
export interface IDataGroupFieldDto extends IRequirementDto {
    /** Data Group Field Order */
    order?: number;
    /** Data Group Field Type */
    type?: string | undefined;
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

/** DataGroup representation */
export class DataGroupDto implements IDataGroupDto {
    /** DataGroup UiD */
    groupId?: string;
    /** DataGroup Name */
    name?: string | undefined;
    /** Data Group Description */
    description?: string | undefined;
    /** List of DataGroupFieldDto */
    dataGroupFields?: DataGroupFieldDto[] | undefined;
    /** Data Group Cardinality */
    cardinality?: boolean;
    /** Data Group Template */
    template?: string | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The creation date of the version (Read-only) */
    created?: moment.Moment;
    status?: VersionStatus;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;

    constructor(data?: IDataGroupDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.groupId = _data["groupId"];
            this.name = _data["name"];
            this.description = _data["description"];
            if (Array.isArray(_data["dataGroupFields"])) {
                this.dataGroupFields = [] as any;
                for (let item of _data["dataGroupFields"])
                    this.dataGroupFields!.push(DataGroupFieldDto.fromJS(item));
            }
            this.cardinality = _data["cardinality"];
            this.template = _data["template"];
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

    static fromJS(data: any): DataGroupDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["groupId"] = this.groupId;
        data["name"] = this.name;
        data["description"] = this.description;
        if (Array.isArray(this.dataGroupFields)) {
            data["dataGroupFields"] = [];
            for (let item of this.dataGroupFields)
                data["dataGroupFields"].push(item.toJSON());
        }
        data["cardinality"] = this.cardinality;
        data["template"] = this.template;
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

/** DataGroup representation */
export interface IDataGroupDto {
    /** DataGroup UiD */
    groupId?: string;
    /** DataGroup Name */
    name?: string | undefined;
    /** Data Group Description */
    description?: string | undefined;
    /** List of DataGroupFieldDto */
    dataGroupFields?: DataGroupFieldDto[] | undefined;
    /** Data Group Cardinality */
    cardinality?: boolean;
    /** Data Group Template */
    template?: string | undefined;
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

export class DataGroupDtoServiceRequest implements IDataGroupDtoServiceRequest {
    data?: DataGroupDto;

    constructor(data?: IDataGroupDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? DataGroupDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DataGroupDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IDataGroupDtoServiceRequest {
    data?: DataGroupDto;
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

export class DataGroupDtoServiceResponse implements IDataGroupDtoServiceResponse {
    data?: DataGroupDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IDataGroupDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? DataGroupDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DataGroupDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupDtoServiceResponse();
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

export interface IDataGroupDtoServiceResponse {
    data?: DataGroupDto;
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

/** Set of properties which define new version of DataGroup */
export class UpdateDataGroupVersionDto implements IUpdateDataGroupVersionDto {
    /** DataGroup UiD */
    groupId?: string;
    /** DataGroup Name */
    name?: string | undefined;
    /** Data Group Description */
    description?: string | undefined;
    /** List of DataGroupFieldDto */
    dataGroupFields?: DataGroupFieldDto[] | undefined;
    /** Data Group Cardinality */
    cardinality?: boolean;
    /** Data Group Template */
    template?: string | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;

    constructor(data?: IUpdateDataGroupVersionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.groupId = _data["groupId"];
            this.name = _data["name"];
            this.description = _data["description"];
            if (Array.isArray(_data["dataGroupFields"])) {
                this.dataGroupFields = [] as any;
                for (let item of _data["dataGroupFields"])
                    this.dataGroupFields!.push(DataGroupFieldDto.fromJS(item));
            }
            this.cardinality = _data["cardinality"];
            this.template = _data["template"];
            this.versionNumber = _data["versionNumber"];
            this.effectiveFrom = _data["effectiveFrom"] ? moment(_data["effectiveFrom"].toString()) : <any>undefined;
            if (Array.isArray(_data["signees"])) {
                this.signees = [] as any;
                for (let item of _data["signees"])
                    this.signees!.push(Signee.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateDataGroupVersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateDataGroupVersionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["groupId"] = this.groupId;
        data["name"] = this.name;
        data["description"] = this.description;
        if (Array.isArray(this.dataGroupFields)) {
            data["dataGroupFields"] = [];
            for (let item of this.dataGroupFields)
                data["dataGroupFields"].push(item.toJSON());
        }
        data["cardinality"] = this.cardinality;
        data["template"] = this.template;
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

/** Set of properties which define new version of DataGroup */
export interface IUpdateDataGroupVersionDto {
    /** DataGroup UiD */
    groupId?: string;
    /** DataGroup Name */
    name?: string | undefined;
    /** Data Group Description */
    description?: string | undefined;
    /** List of DataGroupFieldDto */
    dataGroupFields?: DataGroupFieldDto[] | undefined;
    /** Data Group Cardinality */
    cardinality?: boolean;
    /** Data Group Template */
    template?: string | undefined;
    /** The number of the model version */
    versionNumber?: number;
    /** The date that the version takes effect when published */
    effectiveFrom?: moment.Moment;
    /** The defined list of signees for the version */
    signees?: Signee[] | undefined;
}

export class UpdateDataGroupVersionDtoServiceRequest implements IUpdateDataGroupVersionDtoServiceRequest {
    data?: UpdateDataGroupVersionDto;

    constructor(data?: IUpdateDataGroupVersionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? UpdateDataGroupVersionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdateDataGroupVersionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateDataGroupVersionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IUpdateDataGroupVersionDtoServiceRequest {
    data?: UpdateDataGroupVersionDto;
}

export class CloneDataGroupVersionDto implements ICloneDataGroupVersionDto {
    /** Name of new  data group */
    name?: string | undefined;
    /** Description of new data group */
    description?: string | undefined;

    constructor(data?: ICloneDataGroupVersionDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CloneDataGroupVersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new CloneDataGroupVersionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        return data; 
    }
}

export interface ICloneDataGroupVersionDto {
    /** Name of new  data group */
    name?: string | undefined;
    /** Description of new data group */
    description?: string | undefined;
}

export class CloneDataGroupVersionDtoServiceRequest implements ICloneDataGroupVersionDtoServiceRequest {
    data?: CloneDataGroupVersionDto;

    constructor(data?: ICloneDataGroupVersionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? CloneDataGroupVersionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CloneDataGroupVersionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CloneDataGroupVersionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICloneDataGroupVersionDtoServiceRequest {
    data?: CloneDataGroupVersionDto;
}

export class CloneDataGroupVersionResponse implements ICloneDataGroupVersionResponse {
    /** ID of the clone */
    dataGroupId?: string;

    constructor(data?: ICloneDataGroupVersionResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.dataGroupId = _data["dataGroupId"];
        }
    }

    static fromJS(data: any): CloneDataGroupVersionResponse {
        data = typeof data === 'object' ? data : {};
        let result = new CloneDataGroupVersionResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dataGroupId"] = this.dataGroupId;
        return data; 
    }
}

export interface ICloneDataGroupVersionResponse {
    /** ID of the clone */
    dataGroupId?: string;
}

export class CloneDataGroupVersionResponseServiceResponse implements ICloneDataGroupVersionResponseServiceResponse {
    data?: CloneDataGroupVersionResponse;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ICloneDataGroupVersionResponseServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? CloneDataGroupVersionResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CloneDataGroupVersionResponseServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new CloneDataGroupVersionResponseServiceResponse();
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

export interface ICloneDataGroupVersionResponseServiceResponse {
    data?: CloneDataGroupVersionResponse;
    messages?: ServiceResponseMessage[] | undefined;
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
export class DataGroupVersionSignResponse implements IDataGroupVersionSignResponse {
    /** The Id of the model the version belongs to */
    groupId?: string;
    /** The number of the version that has been signed */
    versionNumber?: number;
    status?: VersionStatus;

    constructor(data?: IDataGroupVersionSignResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.groupId = _data["groupId"];
            this.versionNumber = _data["versionNumber"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): DataGroupVersionSignResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupVersionSignResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["groupId"] = this.groupId;
        data["versionNumber"] = this.versionNumber;
        data["status"] = this.status;
        return data; 
    }
}

/** Contains the new version Status, after a version sign operation */
export interface IDataGroupVersionSignResponse {
    /** The Id of the model the version belongs to */
    groupId?: string;
    /** The number of the version that has been signed */
    versionNumber?: number;
    status?: VersionStatus;
}

export class DataGroupVersionSignResponseServiceResponse implements IDataGroupVersionSignResponseServiceResponse {
    data?: DataGroupVersionSignResponse;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IDataGroupVersionSignResponseServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? DataGroupVersionSignResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DataGroupVersionSignResponseServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupVersionSignResponseServiceResponse();
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

export interface IDataGroupVersionSignResponseServiceResponse {
    data?: DataGroupVersionSignResponse;
    messages?: ServiceResponseMessage[] | undefined;
}

export class DataGroupFieldDtoServiceRequest implements IDataGroupFieldDtoServiceRequest {
    data?: DataGroupFieldDto;

    constructor(data?: IDataGroupFieldDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? DataGroupFieldDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DataGroupFieldDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupFieldDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IDataGroupFieldDtoServiceRequest {
    data?: DataGroupFieldDto;
}

/** Response DTO representing created Data Group Instance */
export class DataGroupCreatedDto implements IDataGroupCreatedDto {
    /** Unique identifier of created Data Group */
    readonly id?: string;

    constructor(data?: IDataGroupCreatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            (<any>this).id = _data["id"];
        }
    }

    static fromJS(data: any): DataGroupCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data; 
    }
}

/** Response DTO representing created Data Group Instance */
export interface IDataGroupCreatedDto {
    /** Unique identifier of created Data Group */
    id?: string;
}

export class DataGroupCreatedDtoServiceResponse implements IDataGroupCreatedDtoServiceResponse {
    data?: DataGroupCreatedDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IDataGroupCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? DataGroupCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DataGroupCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DataGroupCreatedDtoServiceResponse();
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

export interface IDataGroupCreatedDtoServiceResponse {
    data?: DataGroupCreatedDto;
    messages?: ServiceResponseMessage[] | undefined;
}

/** Requirement Set Light DTO metadata */
export class RequirementSetLightDto implements IRequirementSetLightDto {
    /** Requirement Set Name */
    name?: string | undefined;
    /** Requirement Set Jurisdiction */
    jurisdiction?: string | undefined;
    /** Conditions under which the requirement set can be applied */
    conditions?: ConditionDto[] | undefined;

    constructor(data?: IRequirementSetLightDto) {
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
            this.jurisdiction = _data["jurisdiction"];
            if (Array.isArray(_data["conditions"])) {
                this.conditions = [] as any;
                for (let item of _data["conditions"])
                    this.conditions!.push(ConditionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RequirementSetLightDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetLightDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["jurisdiction"] = this.jurisdiction;
        if (Array.isArray(this.conditions)) {
            data["conditions"] = [];
            for (let item of this.conditions)
                data["conditions"].push(item.toJSON());
        }
        return data; 
    }
}

/** Requirement Set Light DTO metadata */
export interface IRequirementSetLightDto {
    /** Requirement Set Name */
    name?: string | undefined;
    /** Requirement Set Jurisdiction */
    jurisdiction?: string | undefined;
    /** Conditions under which the requirement set can be applied */
    conditions?: ConditionDto[] | undefined;
}

export class RequirementSetLightDtoServiceRequest implements IRequirementSetLightDtoServiceRequest {
    data?: RequirementSetLightDto;

    constructor(data?: IRequirementSetLightDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementSetLightDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RequirementSetLightDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetLightDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IRequirementSetLightDtoServiceRequest {
    data?: RequirementSetLightDto;
}

/** Response DTO representing created Requirement Set Instance */
export class RequirementSetCreatedDto implements IRequirementSetCreatedDto {
    /** Unique identifier of Requirement Set */
    id?: string;

    constructor(data?: IRequirementSetCreatedDto) {
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
        }
    }

    static fromJS(data: any): RequirementSetCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data; 
    }
}

/** Response DTO representing created Requirement Set Instance */
export interface IRequirementSetCreatedDto {
    /** Unique identifier of Requirement Set */
    id?: string;
}

export class RequirementSetCreatedDtoServiceResponse implements IRequirementSetCreatedDtoServiceResponse {
    data?: RequirementSetCreatedDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IRequirementSetCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementSetCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RequirementSetCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetCreatedDtoServiceResponse();
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

export interface IRequirementSetCreatedDtoServiceResponse {
    data?: RequirementSetCreatedDto;
    messages?: ServiceResponseMessage[] | undefined;
}

/** Requirement Set DTO metadata */
export class RequirementSetDto implements IRequirementSetDto {
    /** Requirement Set Jurisdiction */
    jurisdiction?: string | undefined;
    /** Requirement Set Name */
    name?: string | undefined;
    /** List of Requirements */
    requirements?: RequirementDto[] | undefined;
    /** Conditions under which the requirement set can be applied */
    conditions?: ConditionDto[] | undefined;

    constructor(data?: IRequirementSetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.jurisdiction = _data["jurisdiction"];
            this.name = _data["name"];
            if (Array.isArray(_data["requirements"])) {
                this.requirements = [] as any;
                for (let item of _data["requirements"])
                    this.requirements!.push(RequirementDto.fromJS(item));
            }
            if (Array.isArray(_data["conditions"])) {
                this.conditions = [] as any;
                for (let item of _data["conditions"])
                    this.conditions!.push(ConditionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RequirementSetDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["jurisdiction"] = this.jurisdiction;
        data["name"] = this.name;
        if (Array.isArray(this.requirements)) {
            data["requirements"] = [];
            for (let item of this.requirements)
                data["requirements"].push(item.toJSON());
        }
        if (Array.isArray(this.conditions)) {
            data["conditions"] = [];
            for (let item of this.conditions)
                data["conditions"].push(item.toJSON());
        }
        return data; 
    }
}

/** Requirement Set DTO metadata */
export interface IRequirementSetDto {
    /** Requirement Set Jurisdiction */
    jurisdiction?: string | undefined;
    /** Requirement Set Name */
    name?: string | undefined;
    /** List of Requirements */
    requirements?: RequirementDto[] | undefined;
    /** Conditions under which the requirement set can be applied */
    conditions?: ConditionDto[] | undefined;
}

export class RequirementSetDtoServiceRequest implements IRequirementSetDtoServiceRequest {
    data?: RequirementSetDto;

    constructor(data?: IRequirementSetDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementSetDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RequirementSetDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IRequirementSetDtoServiceRequest {
    data?: RequirementSetDto;
}

/** Requirement Set Light DTO metadata */
export class CloneRequirementSetDto implements ICloneRequirementSetDto {
    /** Requirement Set Name */
    name?: string | undefined;
    /** Requirement Set Jurisdiction */
    jurisdiction?: string | undefined;

    constructor(data?: ICloneRequirementSetDto) {
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
            this.jurisdiction = _data["jurisdiction"];
        }
    }

    static fromJS(data: any): CloneRequirementSetDto {
        data = typeof data === 'object' ? data : {};
        let result = new CloneRequirementSetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["jurisdiction"] = this.jurisdiction;
        return data; 
    }
}

/** Requirement Set Light DTO metadata */
export interface ICloneRequirementSetDto {
    /** Requirement Set Name */
    name?: string | undefined;
    /** Requirement Set Jurisdiction */
    jurisdiction?: string | undefined;
}

export class CloneRequirementSetDtoServiceRequest implements ICloneRequirementSetDtoServiceRequest {
    data?: CloneRequirementSetDto;

    constructor(data?: ICloneRequirementSetDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? CloneRequirementSetDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CloneRequirementSetDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CloneRequirementSetDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICloneRequirementSetDtoServiceRequest {
    data?: CloneRequirementSetDto;
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

export class ValidationProblemDetails extends ProblemDetails implements IValidationProblemDetails {
    readonly errors?: { [key: string]: string[]; } | undefined;

    constructor(data?: IValidationProblemDetails) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            if (_data["errors"]) {
                (<any>this).errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this).errors![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static fromJS(data: any): ValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    data["errors"][key] = this.errors[key];
            }
        }
        super.toJSON(data);
        return data; 
    }
}

export interface IValidationProblemDetails extends IProblemDetails {
    errors?: { [key: string]: string[]; } | undefined;
}

export class RequirementSetLightDtoServiceResponse implements IRequirementSetLightDtoServiceResponse {
    data?: RequirementSetLightDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IRequirementSetLightDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementSetLightDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RequirementSetLightDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementSetLightDtoServiceResponse();
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

export interface IRequirementSetLightDtoServiceResponse {
    data?: RequirementSetLightDto;
    messages?: ServiceResponseMessage[] | undefined;
}

export class RequirementDtoServiceRequest implements IRequirementDtoServiceRequest {
    data?: RequirementDto;

    constructor(data?: IRequirementDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RequirementDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IRequirementDtoServiceRequest {
    data?: RequirementDto;
}

/** Response DTO representing created Requirement Instance */
export class RequirementCreatedDto implements IRequirementCreatedDto {
    /** Unique identifier of Requirement */
    id?: string;

    constructor(data?: IRequirementCreatedDto) {
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
        }
    }

    static fromJS(data: any): RequirementCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data; 
    }
}

/** Response DTO representing created Requirement Instance */
export interface IRequirementCreatedDto {
    /** Unique identifier of Requirement */
    id?: string;
}

export class RequirementCreatedDtoServiceResponse implements IRequirementCreatedDtoServiceResponse {
    data?: RequirementCreatedDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IRequirementCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RequirementCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementCreatedDtoServiceResponse();
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

export interface IRequirementCreatedDtoServiceResponse {
    data?: RequirementCreatedDto;
    messages?: ServiceResponseMessage[] | undefined;
}

export class RequirementDtoServiceResponse implements IRequirementDtoServiceResponse {
    data?: RequirementDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IRequirementDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? RequirementDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RequirementDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequirementDtoServiceResponse();
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

export interface IRequirementDtoServiceResponse {
    data?: RequirementDto;
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