/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Get an existing Association
     * @param id Association identifier
     * @return Success
     */
    getAssociationById(id: string, x_TENANT_ID: string): Promise<AssociationDtoServiceResponse>;
    /**
     * Get all Associations by Root Entity Id and Journey Id
     * @param entityId The id of the root entity
     * @param journeyId The id of a journey that the unverified associations belong to
     * @return Success
     */
    getAssociations(entityId: string, journeyId: string | null, x_TENANT_ID: string): Promise<AssociationDtoIEnumerableServiceResponse>;
    /**
     * Get all verified Associations by Root Entity Id
     * @param entityId The id of the root entity
     * @return Success
     */
    getVerifiedAssociations(entityId: string, x_TENANT_ID: string): Promise<AssociationDtoIEnumerableServiceResponse>;
    /**
     * Get all Association Conflicts by Root Entity Id and Journey Id
     * @param entityId The id of the root entity
     * @param journeyId The id of a journey that the unverified associations belong to
     * @return Success
     */
    getAssociationConflicts(entityId: string, journeyId: string | null, x_TENANT_ID: string): Promise<AssociationConflictDtoIEnumerableServiceResponse>;
    /**
     * Get an existing Entity
     * @param id Association Entity identifier
     * @return Success
     */
    getEntityById(id: string, x_TENANT_ID: string): Promise<EntityDtoServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/associationquery";
    }

    /**
     * Get an existing Association
     * @param id Association identifier
     * @return Success
     */
    getAssociationById(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<AssociationDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/association/{id}";
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
            return this.processGetAssociationById(_response);
        });
    }

    protected processGetAssociationById(response: AxiosResponse): Promise<AssociationDtoServiceResponse> {
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
            result200 = AssociationDtoServiceResponse.fromJS(resultData200);
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
            return throwException("No association found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the query", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<AssociationDtoServiceResponse>(<any>null);
    }

    /**
     * Get all Associations by Root Entity Id and Journey Id
     * @param entityId The id of the root entity
     * @param journeyId The id of a journey that the unverified associations belong to
     * @return Success
     */
    getAssociations(entityId: string, journeyId: string | null, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<AssociationDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/association/root/{entityId}/journey/{journeyId}";
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
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
            return this.processGetAssociations(_response);
        });
    }

    protected processGetAssociations(response: AxiosResponse): Promise<AssociationDtoIEnumerableServiceResponse> {
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
            result200 = AssociationDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the query", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<AssociationDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * Get all verified Associations by Root Entity Id
     * @param entityId The id of the root entity
     * @return Success
     */
    getVerifiedAssociations(entityId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<AssociationDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/association/root/{entityId}";
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
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
            return this.processGetVerifiedAssociations(_response);
        });
    }

    protected processGetVerifiedAssociations(response: AxiosResponse): Promise<AssociationDtoIEnumerableServiceResponse> {
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
            result200 = AssociationDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the query", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<AssociationDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * Get all Association Conflicts by Root Entity Id and Journey Id
     * @param entityId The id of the root entity
     * @param journeyId The id of a journey that the unverified associations belong to
     * @return Success
     */
    getAssociationConflicts(entityId: string, journeyId: string | null, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<AssociationConflictDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/association/root/{entityId}/journey/{journeyId}/conflicts";
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
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
            return this.processGetAssociationConflicts(_response);
        });
    }

    protected processGetAssociationConflicts(response: AxiosResponse): Promise<AssociationConflictDtoIEnumerableServiceResponse> {
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
            result200 = AssociationConflictDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Invalid request", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the query", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<AssociationConflictDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * Get an existing Entity
     * @param id Association Entity identifier
     * @return Success
     */
    getEntityById(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<EntityDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/entity/{id}";
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
            result200 = EntityDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("No association entity found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("An exception occurred while processing the query", status, _responseText, _headers);
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
    ownershipPercentage?: number | undefined;
    /** The percentage amount of the target entity controlled by the source entity
(optional) */
    controlPercentage?: number | undefined;
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
    ownershipPercentage?: number | undefined;
    /** The percentage amount of the target entity controlled by the source entity
(optional) */
    controlPercentage?: number | undefined;
    /** A list of custom properties that describe the association */
    properties?: { [key: string]: string; } | undefined;
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

export class AssociationDtoIEnumerableServiceResponse implements IAssociationDtoIEnumerableServiceResponse {
    data?: AssociationDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IAssociationDtoIEnumerableServiceResponse) {
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
                    this.data!.push(AssociationDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AssociationDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AssociationDtoIEnumerableServiceResponse();
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

export interface IAssociationDtoIEnumerableServiceResponse {
    data?: AssociationDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

/** A pair of conflicting associations */
export class AssociationConflictDto implements IAssociationConflictDto {
    /** The Verified association */
    verifiedAssociation?: AssociationDto | undefined;
    /** The Unverified association */
    unverifiedAssociation?: AssociationDto | undefined;

    constructor(data?: IAssociationConflictDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.verifiedAssociation = _data["verifiedAssociation"] ? AssociationDto.fromJS(_data["verifiedAssociation"]) : <any>undefined;
            this.unverifiedAssociation = _data["unverifiedAssociation"] ? AssociationDto.fromJS(_data["unverifiedAssociation"]) : <any>undefined;
        }
    }

    static fromJS(data: any): AssociationConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new AssociationConflictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["verifiedAssociation"] = this.verifiedAssociation ? this.verifiedAssociation.toJSON() : <any>undefined;
        data["unverifiedAssociation"] = this.unverifiedAssociation ? this.unverifiedAssociation.toJSON() : <any>undefined;
        return data; 
    }
}

/** A pair of conflicting associations */
export interface IAssociationConflictDto {
    /** The Verified association */
    verifiedAssociation?: AssociationDto | undefined;
    /** The Unverified association */
    unverifiedAssociation?: AssociationDto | undefined;
}

export class AssociationConflictDtoIEnumerableServiceResponse implements IAssociationConflictDtoIEnumerableServiceResponse {
    data?: AssociationConflictDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IAssociationConflictDtoIEnumerableServiceResponse) {
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
                    this.data!.push(AssociationConflictDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AssociationConflictDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AssociationConflictDtoIEnumerableServiceResponse();
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

export interface IAssociationConflictDtoIEnumerableServiceResponse {
    data?: AssociationConflictDto[] | undefined;
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