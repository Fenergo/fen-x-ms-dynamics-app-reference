/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Create new Entity Association
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Association.Command.Application.Dto.AssociationDto to create
     * @return Association model created successfully
     */
    createAssociation(x_TENANT_ID: string, body?: AssociationDtoServiceRequest | null | undefined): Promise<AssociationDtoServiceResponse>;
    /**
     * Update an existing association
     * @param id The Id of the existing Association to update
     * @param body (optional) ServiceRequest with the updated Fenergo.Nebula.Association.Command.Application.Dto.AssociationDto
     * @return Association model updated successfully
     */
    updateAssociation(id: string, x_TENANT_ID: string, body?: AssociationDtoServiceRequest | null | undefined): Promise<AssociationDtoServiceResponse>;
    /**
     * Delete an existing Association
     * @param id The Id of the existing model to delete
     * @return Association model deleted successfully
     */
    deleteAssociation(id: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Resolve detected association conflict
     * @param id The Id of the existing Association to update
     * @param body (optional) ServiceRequest with the updated Fenergo.Nebula.Association.Command.Application.Dto.ConflictResolutionDto
     * @return Association conflicts merged successfully
     */
    resolveConflict(id: string, x_TENANT_ID: string, body?: ConflictResolutionDtoServiceRequest | null | undefined): Promise<ConflictResolutionDtoServiceResponse>;
    /**
     * Update an existing entity
     * @param id The Id of the existing Entity to update
     * @param body (optional) ServiceRequest with the updated Fenergo.Nebula.Association.Command.Application.Dto.EntityDto
     * @return Entity model updated successfully
     */
    updateEntity(id: string, x_TENANT_ID: string, body?: EntityDtoServiceRequest | null | undefined): Promise<EntityDtoServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/associationcommand";
    }

    /**
     * Create new Entity Association
     * @param body (optional) ServiceRequest with the Fenergo.Nebula.Association.Command.Application.Dto.AssociationDto to create
     * @return Association model created successfully
     */
    createAssociation(x_TENANT_ID: string, body?: AssociationDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<AssociationDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/association";
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
            return this.processCreateAssociation(_response);
        });
    }

    protected processCreateAssociation(response: AxiosResponse): Promise<AssociationDtoServiceResponse> {
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
            result202 = AssociationDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<AssociationDtoServiceResponse>(<any>null);
    }

    /**
     * Update an existing association
     * @param id The Id of the existing Association to update
     * @param body (optional) ServiceRequest with the updated Fenergo.Nebula.Association.Command.Application.Dto.AssociationDto
     * @return Association model updated successfully
     */
    updateAssociation(id: string, x_TENANT_ID: string, body?: AssociationDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<AssociationDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/association/{id}";
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
            return this.processUpdateAssociation(_response);
        });
    }

    protected processUpdateAssociation(response: AxiosResponse): Promise<AssociationDtoServiceResponse> {
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
            return throwException("Model Id is invalid", status, _responseText, _headers, result400);
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = AssociationDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<AssociationDtoServiceResponse>(<any>null);
    }

    /**
     * Delete an existing Association
     * @param id The Id of the existing model to delete
     * @return Association model deleted successfully
     */
    deleteAssociation(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/association/{id}";
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
            return this.processDeleteAssociation(_response);
        });
    }

    protected processDeleteAssociation(response: AxiosResponse): Promise<void> {
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
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
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
     * Resolve detected association conflict
     * @param id The Id of the existing Association to update
     * @param body (optional) ServiceRequest with the updated Fenergo.Nebula.Association.Command.Application.Dto.ConflictResolutionDto
     * @return Association conflicts merged successfully
     */
    resolveConflict(id: string, x_TENANT_ID: string, body?: ConflictResolutionDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<ConflictResolutionDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/association/resolveconflict/{id}";
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
            return this.processResolveConflict(_response);
        });
    }

    protected processResolveConflict(response: AxiosResponse): Promise<ConflictResolutionDtoServiceResponse> {
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
            return throwException("Association Id is invalid", status, _responseText, _headers, result400);
        } else if (status === 202) {
            const _responseText = response.data;
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = ConflictResolutionDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConflictResolutionDtoServiceResponse>(<any>null);
    }

    /**
     * Update an existing entity
     * @param id The Id of the existing Entity to update
     * @param body (optional) ServiceRequest with the updated Fenergo.Nebula.Association.Command.Application.Dto.EntityDto
     * @return Entity model updated successfully
     */
    updateEntity(id: string, x_TENANT_ID: string, body?: EntityDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<EntityDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/entity/{id}";
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
            return this.processUpdateEntity(_response);
        });
    }

    protected processUpdateEntity(response: AxiosResponse): Promise<EntityDtoServiceResponse> {
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
            let result202: any = null;
            let resultData202  = _responseText;
            result202 = EntityDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Model Id is invalid", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the command", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<EntityDtoServiceResponse>(<any>null);
    }
}

/** The metadata of an association between two entities */
export class AssociationDto implements IAssociationDto {
    /** The UiD of the association model */
    id?: string;
    /** The UiD of the Parent Entity */
    sourceId?: string;
    /** The UiD of the Child Entity */
    targetId?: string;
    /** The type of association */
    type?: string | undefined;
    /** The UiD of the Journey that this association was created */
    journeyId?: string;
    /** Annotates whether the association has been validated */
    isVerified?: boolean;
    /** The percentage amount of the target entity owned by the source entity
(optional) */
    ownershipPercentage?: number;
    /** The percentage amount of the target entity controlled by the source entity
(optional) */
    controlPercentage?: number;
    /** A list of custom properties that describe the association */
    properties?: { [key: string]: string; } | undefined;

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
            this.id = _data["id"];
            this.sourceId = _data["sourceId"];
            this.targetId = _data["targetId"];
            this.type = _data["type"];
            this.journeyId = _data["journeyId"];
            this.isVerified = _data["isVerified"];
            this.ownershipPercentage = _data["ownershipPercentage"];
            this.controlPercentage = _data["controlPercentage"];
            if (_data["properties"]) {
                this.properties = {} as any;
                for (let key in _data["properties"]) {
                    if (_data["properties"].hasOwnProperty(key))
                        this.properties![key] = _data["properties"][key];
                }
            }
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
        data["id"] = this.id;
        data["sourceId"] = this.sourceId;
        data["targetId"] = this.targetId;
        data["type"] = this.type;
        data["journeyId"] = this.journeyId;
        data["isVerified"] = this.isVerified;
        data["ownershipPercentage"] = this.ownershipPercentage;
        data["controlPercentage"] = this.controlPercentage;
        if (this.properties) {
            data["properties"] = {};
            for (let key in this.properties) {
                if (this.properties.hasOwnProperty(key))
                    data["properties"][key] = this.properties[key];
            }
        }
        return data; 
    }
}

/** The metadata of an association between two entities */
export interface IAssociationDto {
    /** The UiD of the association model */
    id?: string;
    /** The UiD of the Parent Entity */
    sourceId?: string;
    /** The UiD of the Child Entity */
    targetId?: string;
    /** The type of association */
    type?: string | undefined;
    /** The UiD of the Journey that this association was created */
    journeyId?: string;
    /** Annotates whether the association has been validated */
    isVerified?: boolean;
    /** The percentage amount of the target entity owned by the source entity
(optional) */
    ownershipPercentage?: number;
    /** The percentage amount of the target entity controlled by the source entity
(optional) */
    controlPercentage?: number;
    /** A list of custom properties that describe the association */
    properties?: { [key: string]: string; } | undefined;
}

export class AssociationDtoServiceRequest implements IAssociationDtoServiceRequest {
    /** The metadata of an association between two entities */
    data?: AssociationDto | undefined;

    constructor(data?: IAssociationDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? AssociationDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): AssociationDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AssociationDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IAssociationDtoServiceRequest {
    /** The metadata of an association between two entities */
    data?: AssociationDto | undefined;
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

export class AssociationDtoServiceResponse implements IAssociationDtoServiceResponse {
    /** The metadata of an association between two entities */
    data?: AssociationDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IAssociationDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? AssociationDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AssociationDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AssociationDtoServiceResponse();
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

export interface IAssociationDtoServiceResponse {
    /** The metadata of an association between two entities */
    data?: AssociationDto | undefined;
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

/** Resolve Association conflict wrapper */
export class ConflictResolutionDto implements IConflictResolutionDto {
    /** The resulting merged association */
    mergeResult?: AssociationDto | undefined;
    /** The UiD of the invalid association model */
    invalidAssociation?: string;

    constructor(data?: IConflictResolutionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.mergeResult = _data["mergeResult"] ? AssociationDto.fromJS(_data["mergeResult"]) : <any>undefined;
            this.invalidAssociation = _data["invalidAssociation"];
        }
    }

    static fromJS(data: any): ConflictResolutionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConflictResolutionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["mergeResult"] = this.mergeResult ? this.mergeResult.toJSON() : <any>undefined;
        data["invalidAssociation"] = this.invalidAssociation;
        return data; 
    }
}

/** Resolve Association conflict wrapper */
export interface IConflictResolutionDto {
    /** The resulting merged association */
    mergeResult?: AssociationDto | undefined;
    /** The UiD of the invalid association model */
    invalidAssociation?: string;
}

export class ConflictResolutionDtoServiceRequest implements IConflictResolutionDtoServiceRequest {
    /** Resolve Association conflict wrapper */
    data?: ConflictResolutionDto | undefined;

    constructor(data?: IConflictResolutionDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ConflictResolutionDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ConflictResolutionDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ConflictResolutionDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IConflictResolutionDtoServiceRequest {
    /** Resolve Association conflict wrapper */
    data?: ConflictResolutionDto | undefined;
}

export class ConflictResolutionDtoServiceResponse implements IConflictResolutionDtoServiceResponse {
    /** Resolve Association conflict wrapper */
    data?: ConflictResolutionDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IConflictResolutionDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ConflictResolutionDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConflictResolutionDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ConflictResolutionDtoServiceResponse();
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

export interface IConflictResolutionDtoServiceResponse {
    /** Resolve Association conflict wrapper */
    data?: ConflictResolutionDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

/** The metadata of an Entity */
export class EntityDto implements IEntityDto {
    /** The UiD of the entity model */
    id?: string;
    /** The type of the entity */
    type?: string | undefined;

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
            this.type = _data["type"];
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
        data["type"] = this.type;
        return data; 
    }
}

/** The metadata of an Entity */
export interface IEntityDto {
    /** The UiD of the entity model */
    id?: string;
    /** The type of the entity */
    type?: string | undefined;
}

export class EntityDtoServiceRequest implements IEntityDtoServiceRequest {
    /** The metadata of an Entity */
    data?: EntityDto | undefined;

    constructor(data?: IEntityDtoServiceRequest) {
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
        }
    }

    static fromJS(data: any): EntityDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EntityDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IEntityDtoServiceRequest {
    /** The metadata of an Entity */
    data?: EntityDto | undefined;
}

export class EntityDtoServiceResponse implements IEntityDtoServiceResponse {
    /** The metadata of an Entity */
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
    /** The metadata of an Entity */
    data?: EntityDto | undefined;
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