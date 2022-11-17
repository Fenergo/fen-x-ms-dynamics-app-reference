/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import moment from 'moment';

export interface IClient {
        /**
     * @param ids (optional) 
     * @return Success
     */
    getBaseTenants(ids: string | null | undefined): Promise<BaseTenantDtoIEnumerableServiceResponse>;
    /**
     * @return Success
     */
    getBaseTenantById(id: string): Promise<BaseTenantDtoServiceResponse>;
    /**
     * @param ids (optional) 
     * @param attributes (optional) 
     * @return Success
     */
    getTenants(ids?: string | null | undefined, attributes?: string | null | undefined): Promise<TenantDtoIEnumerableServiceResponse>;
    /**
     * @return Success
     */
    getTenantById(id: string): Promise<TenantDtoServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/tenantquery";
    }

    /**
     * @param ids (optional) 
     * @return Success
     */
     getBaseTenants(ids: string | null | undefined , cancelToken?: CancelToken | undefined): Promise<BaseTenantDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/basetenant?";
        if (ids !== undefined && ids !== null)
            url_ += "Ids=" + encodeURIComponent("" + ids) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
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
            return this.processGetBaseTenants(_response);
        });
    }

    protected processGetBaseTenants(response: AxiosResponse): Promise<BaseTenantDtoIEnumerableServiceResponse> {
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
            result200 = BaseTenantDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Server Error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<BaseTenantDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * @return Success
     */
    getBaseTenantById(id: string , cancelToken?: CancelToken | undefined): Promise<BaseTenantDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/basetenant/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
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
            return this.processGetBaseTenantById(_response);
        });
    }

    protected processGetBaseTenantById(response: AxiosResponse): Promise<BaseTenantDtoServiceResponse> {
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
            result200 = BaseTenantDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Server Error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<BaseTenantDtoServiceResponse>(<any>null);
    }

    /**
     * @param ids (optional) 
     * @param attributes (optional) 
     * @return Success
     */
    getTenants(ids?: string | null | undefined, attributes?: string | null | undefined , cancelToken?: CancelToken | undefined): Promise<TenantDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/tenant?";
        if (ids !== undefined && ids !== null)
            url_ += "Ids=" + encodeURIComponent("" + ids) + "&";
        if (attributes !== undefined && attributes !== null)
            url_ += "Attributes=" + encodeURIComponent("" + attributes) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
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
            return this.processGetTenants(_response);
        });
    }

    protected processGetTenants(response: AxiosResponse): Promise<TenantDtoIEnumerableServiceResponse> {
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
            result200 = TenantDtoIEnumerableServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Server Error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TenantDtoIEnumerableServiceResponse>(<any>null);
    }

    /**
     * @return Success
     */
    getTenantById(id: string , cancelToken?: CancelToken | undefined): Promise<TenantDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/tenant/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
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
            return this.processGetTenantById(_response);
        });
    }

    protected processGetTenantById(response: AxiosResponse): Promise<TenantDtoServiceResponse> {
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
            result200 = TenantDtoServiceResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Server Error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TenantDtoServiceResponse>(<any>null);
    }
}

export class BaseTenantDto implements IBaseTenantDto {
    id?: string;
    name?: string | undefined;
    activeServiceIds?: string[] | undefined;
    rootUserId?: string | undefined;

    constructor(data?: IBaseTenantDto) {
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
            if (Array.isArray(_data["activeServiceIds"])) {
                this.activeServiceIds = [] as any;
                for (let item of _data["activeServiceIds"])
                    this.activeServiceIds!.push(item);
            }
            this.rootUserId = _data["rootUserId"];
        }
    }

    static fromJS(data: any): BaseTenantDto {
        data = typeof data === 'object' ? data : {};
        let result = new BaseTenantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.activeServiceIds)) {
            data["activeServiceIds"] = [];
            for (let item of this.activeServiceIds)
                data["activeServiceIds"].push(item);
        }
        data["rootUserId"] = this.rootUserId;
        return data; 
    }
}

export interface IBaseTenantDto {
    id?: string;
    name?: string | undefined;
    activeServiceIds?: string[] | undefined;
    rootUserId?: string | undefined;
}

export class BaseTenantDtoIEnumerableServiceResponse implements IBaseTenantDtoIEnumerableServiceResponse {
    data?: BaseTenantDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IBaseTenantDtoIEnumerableServiceResponse) {
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
                    this.data!.push(BaseTenantDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BaseTenantDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BaseTenantDtoIEnumerableServiceResponse();
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

export interface IBaseTenantDtoIEnumerableServiceResponse {
    data?: BaseTenantDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class BaseTenantDtoServiceResponse implements IBaseTenantDtoServiceResponse {
    data?: BaseTenantDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IBaseTenantDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? BaseTenantDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BaseTenantDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BaseTenantDtoServiceResponse();
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

export interface IBaseTenantDtoServiceResponse {
    data?: BaseTenantDto;
    messages?: ServiceResponseMessage[] | undefined;
}

export class DynamoDbConfigDto implements IDynamoDbConfigDto {
    entityDataTableName?: string | undefined;
    kycTableName?: string | undefined;
    productTableName?: string | undefined;
    riskTableName?: string | undefined;

    constructor(data?: IDynamoDbConfigDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.entityDataTableName = _data["entityDataTableName"];
            this.kycTableName = _data["kycTableName"];
            this.productTableName = _data["productTableName"];
            this.riskTableName = _data["riskTableName"];
        }
    }

    static fromJS(data: any): DynamoDbConfigDto {
        data = typeof data === 'object' ? data : {};
        let result = new DynamoDbConfigDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["entityDataTableName"] = this.entityDataTableName;
        data["kycTableName"] = this.kycTableName;
        data["productTableName"] = this.productTableName;
        data["riskTableName"] = this.riskTableName;
        return data; 
    }
}

export interface IDynamoDbConfigDto {
    entityDataTableName?: string | undefined;
    kycTableName?: string | undefined;
    productTableName?: string | undefined;
    riskTableName?: string | undefined;
}

export class HostPortConfigDto implements IHostPortConfigDto {
    host?: string | undefined;
    port?: number;

    constructor(data?: IHostPortConfigDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.host = _data["host"];
            this.port = _data["port"];
        }
    }

    static fromJS(data: any): HostPortConfigDto {
        data = typeof data === 'object' ? data : {};
        let result = new HostPortConfigDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["host"] = this.host;
        data["port"] = this.port;
        return data; 
    }
}

export interface IHostPortConfigDto {
    host?: string | undefined;
    port?: number;
}

export class TenantDto implements ITenantDto {
    id?: string;
    name?: string | undefined;
    dynamoDbConfig?: DynamoDbConfigDto;
    eventStoreConfig?: HostPortConfigDto;
    neptuneDbConfig?: HostPortConfigDto;
    elasticSearchConfig?: HostPortConfigDto;
    createdOn?: moment.Moment;
    lastEditedOn?: moment.Moment;
    activeServiceIds?: string[] | undefined;

    constructor(data?: ITenantDto) {
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
            this.dynamoDbConfig = _data["dynamoDbConfig"] ? DynamoDbConfigDto.fromJS(_data["dynamoDbConfig"]) : <any>undefined;
            this.eventStoreConfig = _data["eventStoreConfig"] ? HostPortConfigDto.fromJS(_data["eventStoreConfig"]) : <any>undefined;
            this.neptuneDbConfig = _data["neptuneDbConfig"] ? HostPortConfigDto.fromJS(_data["neptuneDbConfig"]) : <any>undefined;
            this.elasticSearchConfig = _data["elasticSearchConfig"] ? HostPortConfigDto.fromJS(_data["elasticSearchConfig"]) : <any>undefined;
            this.createdOn = _data["createdOn"] ? moment(_data["createdOn"].toString()) : <any>undefined;
            this.lastEditedOn = _data["lastEditedOn"] ? moment(_data["lastEditedOn"].toString()) : <any>undefined;
            if (Array.isArray(_data["activeServiceIds"])) {
                this.activeServiceIds = [] as any;
                for (let item of _data["activeServiceIds"])
                    this.activeServiceIds!.push(item);
            }
        }
    }

    static fromJS(data: any): TenantDto {
        data = typeof data === 'object' ? data : {};
        let result = new TenantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["dynamoDbConfig"] = this.dynamoDbConfig ? this.dynamoDbConfig.toJSON() : <any>undefined;
        data["eventStoreConfig"] = this.eventStoreConfig ? this.eventStoreConfig.toJSON() : <any>undefined;
        data["neptuneDbConfig"] = this.neptuneDbConfig ? this.neptuneDbConfig.toJSON() : <any>undefined;
        data["elasticSearchConfig"] = this.elasticSearchConfig ? this.elasticSearchConfig.toJSON() : <any>undefined;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        data["lastEditedOn"] = this.lastEditedOn ? this.lastEditedOn.toISOString() : <any>undefined;
        if (Array.isArray(this.activeServiceIds)) {
            data["activeServiceIds"] = [];
            for (let item of this.activeServiceIds)
                data["activeServiceIds"].push(item);
        }
        return data; 
    }
}

export interface ITenantDto {
    id?: string;
    name?: string | undefined;
    dynamoDbConfig?: DynamoDbConfigDto;
    eventStoreConfig?: HostPortConfigDto;
    neptuneDbConfig?: HostPortConfigDto;
    elasticSearchConfig?: HostPortConfigDto;
    createdOn?: moment.Moment;
    lastEditedOn?: moment.Moment;
    activeServiceIds?: string[] | undefined;
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

export class TenantDtoIEnumerableServiceResponse implements ITenantDtoIEnumerableServiceResponse {
    data?: TenantDto[] | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ITenantDtoIEnumerableServiceResponse) {
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
                    this.data!.push(TenantDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TenantDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TenantDtoIEnumerableServiceResponse();
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

export interface ITenantDtoIEnumerableServiceResponse {
    data?: TenantDto[] | undefined;
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

export class TenantDtoServiceResponse implements ITenantDtoServiceResponse {
    data?: TenantDto;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: ITenantDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? TenantDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TenantDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TenantDtoServiceResponse();
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

export interface ITenantDtoServiceResponse {
    data?: TenantDto;
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