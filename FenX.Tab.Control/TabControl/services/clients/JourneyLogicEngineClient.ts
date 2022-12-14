//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Allows clearing the Logic Engine API cache.
    This is an maintenance endpoint and does not need to be used under normal circumstances.
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Cache was flushed successfully.
     */
    flush(x_TENANT_ID: string): Promise<void>;
    /**
     * Evaluates logic condition to retrieve matching Journey Schema(s)
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param journeyTypeFilter (optional) Optional filter(s) to retrieve matched schemas only for specified journey type.
    If multiple filters specified (i.e. Client Onboarding and Client Offboarding) both journey types will be returned (if matched).
    If empty (no filters), all matched journey types will be returned.
     * @param body (optional) Service request with key-value data required for evaluation
     * @return Success. The list of evaluated journey schemas is returned
     */
    evaluateJourneySchemaV2(x_TENANT_ID: string, journeyTypeFilter?: string[] | undefined, body?: EvaluateJourneySchemaRequestV2DtoServiceRequest | undefined): Promise<EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/journeylogicengine";

    }

    /**
     * Allows clearing the Logic Engine API cache.
    This is an maintenance endpoint and does not need to be used under normal circumstances.
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @return Success. Cache was flushed successfully.
     */
    flush(x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/v2/cache/flush";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
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
            return this.processFlush(_response);
        });
    }

    protected processFlush(response: AxiosResponse): Promise<void> {
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
            return Promise.resolve<void>(null as any);

        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);

        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);

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
        return Promise.resolve<void>(null as any);
    }

    /**
     * Evaluates logic condition to retrieve matching Journey Schema(s)
     * @param x_TENANT_ID The UiD of the tenant representing organization
     * @param journeyTypeFilter (optional) Optional filter(s) to retrieve matched schemas only for specified journey type.
    If multiple filters specified (i.e. Client Onboarding and Client Offboarding) both journey types will be returned (if matched).
    If empty (no filters), all matched journey types will be returned.
     * @param body (optional) Service request with key-value data required for evaluation
     * @return Success. The list of evaluated journey schemas is returned
     */
    evaluateJourneySchemaV2(x_TENANT_ID: string, journeyTypeFilter?: string[] | undefined, body?: EvaluateJourneySchemaRequestV2DtoServiceRequest | undefined , cancelToken?: CancelToken | undefined): Promise<EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse> {
        let url_ = this.baseUrl + "/api/v2/engine/evaluate-journey-schema?";
        if (journeyTypeFilter === null)
            throw new Error("The parameter 'journeyTypeFilter' cannot be null.");
        else if (journeyTypeFilter !== undefined)
            journeyTypeFilter && journeyTypeFilter.forEach(item => { url_ += "journeyTypeFilter=" + encodeURIComponent("" + item) + "&"; });
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: AxiosRequestConfig = {
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
            return this.processEvaluateJourneySchemaV2(_response);
        });
    }

    protected processEvaluateJourneySchemaV2(response: AxiosResponse): Promise<EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse> {
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
            result200 = EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse.fromJS(resultData200);
            return Promise.resolve<EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);

        } else if (status === 401) {
            const _responseText = response.data;
            return throwException("User is not authorized to perform this request", status, _responseText, _headers);

        } else if (status === 403) {
            const _responseText = response.data;
            let result403: any = null;
            let resultData403  = _responseText;
            result403 = ObjectServiceResponse.fromJS(resultData403);
            return throwException("Access to resource is forbidden", status, _responseText, _headers, result403);

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
        return Promise.resolve<EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse>(null as any);
    }
}

export enum ChannelTypeDto {
    Internal = "Internal",
    External = "External",
    InternalAndExternal = "InternalAndExternal",
}

export class CollectionDto implements ICollectionDto {
    isValid?: boolean;
    properties?: { [key: string]: string; } | undefined;

    constructor(data?: ICollectionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (_data["properties"]) {
                this.properties = {} as any;
                for (let key in _data["properties"]) {
                    if (_data["properties"].hasOwnProperty(key))
                        (<any>this.properties)![key] = _data["properties"][key];
                }
            }
        }
    }

    static fromJS(data: any): CollectionDto {
        data = typeof data === 'object' ? data : {};
        let result = new CollectionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (this.properties) {
            data["properties"] = {};
            for (let key in this.properties) {
                if (this.properties.hasOwnProperty(key))
                    (<any>data["properties"])[key] = (<any>this.properties)[key];
            }
        }
        return data;
    }
}

export interface ICollectionDto {
    isValid?: boolean;
    properties?: { [key: string]: string; } | undefined;
}

export class PropertyDto implements IPropertyDto {
    readonly type?: PropertyType;
    isValid?: boolean | undefined;

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
            (<any>this).type = _data["type"];
            this.isValid = _data["isValid"];
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
        data["type"] = this.type;
        data["isValid"] = this.isValid;
        return data;
    }
}

export interface IPropertyDto {
    type?: PropertyType;
    isValid?: boolean | undefined;
}

export class CollectionPropertyDto extends PropertyDto implements ICollectionPropertyDto {
    dataGroupId?: string;
    collections?: { [key: string]: CollectionDto; } | undefined;

    constructor(data?: ICollectionPropertyDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.dataGroupId = _data["dataGroupId"];
            if (_data["collections"]) {
                this.collections = {} as any;
                for (let key in _data["collections"]) {
                    if (_data["collections"].hasOwnProperty(key))
                        (<any>this.collections)![key] = _data["collections"][key] ? CollectionDto.fromJS(_data["collections"][key]) : new CollectionDto();
                }
            }
        }
    }

    static fromJS(data: any): CollectionPropertyDto {
        data = typeof data === 'object' ? data : {};
        let result = new CollectionPropertyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dataGroupId"] = this.dataGroupId;
        if (this.collections) {
            data["collections"] = {};
            for (let key in this.collections) {
                if (this.collections.hasOwnProperty(key))
                    (<any>data["collections"])[key] = this.collections[key] ? this.collections[key].toJSON() : <any>undefined;
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface ICollectionPropertyDto extends IPropertyDto {
    dataGroupId?: string;
    collections?: { [key: string]: CollectionDto; } | undefined;
}

export class CustomPropertyDto extends PropertyDto implements ICustomPropertyDto {
    customTypeId?: string;
    properties?: { [key: string]: PropertyDto; } | undefined;

    constructor(data?: ICustomPropertyDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.customTypeId = _data["customTypeId"];
            if (_data["properties"]) {
                this.properties = {} as any;
                for (let key in _data["properties"]) {
                    if (_data["properties"].hasOwnProperty(key))
                        (<any>this.properties)![key] = _data["properties"][key] ? PropertyDto.fromJS(_data["properties"][key]) : new PropertyDto();
                }
            }
        }
    }

    static fromJS(data: any): CustomPropertyDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomPropertyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["customTypeId"] = this.customTypeId;
        if (this.properties) {
            data["properties"] = {};
            for (let key in this.properties) {
                if (this.properties.hasOwnProperty(key))
                    (<any>data["properties"])[key] = this.properties[key] ? this.properties[key].toJSON() : <any>undefined;
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface ICustomPropertyDto extends IPropertyDto {
    customTypeId?: string;
    properties?: { [key: string]: PropertyDto; } | undefined;
}

/** Request DTO representing entity data properties used to evaluate the condition of journey schema */
export class EvaluateJourneySchemaRequestV2Dto implements IEvaluateJourneySchemaRequestV2Dto {
    /** Entity data properties for condition evaluation */
    properties!: { [key: string]: PropertyDto; };

    constructor(data?: IEvaluateJourneySchemaRequestV2Dto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.properties = {};
        }
    }

    init(_data?: any) {
        if (_data) {
            if (_data["properties"]) {
                this.properties = {} as any;
                for (let key in _data["properties"]) {
                    if (_data["properties"].hasOwnProperty(key))
                        (<any>this.properties)![key] = _data["properties"][key] ? PropertyDto.fromJS(_data["properties"][key]) : new PropertyDto();
                }
            }
        }
    }

    static fromJS(data: any): EvaluateJourneySchemaRequestV2Dto {
        data = typeof data === 'object' ? data : {};
        let result = new EvaluateJourneySchemaRequestV2Dto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.properties) {
            data["properties"] = {};
            for (let key in this.properties) {
                if (this.properties.hasOwnProperty(key))
                    (<any>data["properties"])[key] = this.properties[key] ? this.properties[key].toJSON() : <any>undefined;
            }
        }
        return data;
    }
}

/** Request DTO representing entity data properties used to evaluate the condition of journey schema */
export interface IEvaluateJourneySchemaRequestV2Dto {
    /** Entity data properties for condition evaluation */
    properties: { [key: string]: PropertyDto; };
}

/** Service request data */
export class EvaluateJourneySchemaRequestV2DtoServiceRequest implements IEvaluateJourneySchemaRequestV2DtoServiceRequest {
    /** The service request DTO */
    data?: EvaluateJourneySchemaRequestV2Dto | undefined;

    constructor(data?: IEvaluateJourneySchemaRequestV2DtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? EvaluateJourneySchemaRequestV2Dto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): EvaluateJourneySchemaRequestV2DtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EvaluateJourneySchemaRequestV2DtoServiceRequest();
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
export interface IEvaluateJourneySchemaRequestV2DtoServiceRequest {
    /** The service request DTO */
    data?: EvaluateJourneySchemaRequestV2Dto | undefined;
}

/** Response DTO representing parameters of matched journey schema */
export class EvaluateJourneySchemaResponseDto implements IEvaluateJourneySchemaResponseDto {
    /** The UiD of matched journey schema */
    journeySchemaId?: string;
    /** The version number of matched journey schema */
    journeySchemaVersion?: number;
    /** Name of matched journey schema */
    name?: string | undefined;
    /** Short identifier of matched journey schema */
    identifier?: string | undefined;
    /** Type of matched journey schema */
    journeyType?: string | undefined;
    /** Channel type of matched journey schema */
    channelType?: ChannelTypeDto;

    constructor(data?: IEvaluateJourneySchemaResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.journeySchemaId = _data["journeySchemaId"];
            this.journeySchemaVersion = _data["journeySchemaVersion"];
            this.name = _data["name"];
            this.identifier = _data["identifier"];
            this.journeyType = _data["journeyType"];
            this.channelType = _data["channelType"];
        }
    }

    static fromJS(data: any): EvaluateJourneySchemaResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new EvaluateJourneySchemaResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["journeySchemaId"] = this.journeySchemaId;
        data["journeySchemaVersion"] = this.journeySchemaVersion;
        data["name"] = this.name;
        data["identifier"] = this.identifier;
        data["journeyType"] = this.journeyType;
        data["channelType"] = this.channelType;
        return data;
    }
}

/** Response DTO representing parameters of matched journey schema */
export interface IEvaluateJourneySchemaResponseDto {
    /** The UiD of matched journey schema */
    journeySchemaId?: string;
    /** The version number of matched journey schema */
    journeySchemaVersion?: number;
    /** Name of matched journey schema */
    name?: string | undefined;
    /** Short identifier of matched journey schema */
    identifier?: string | undefined;
    /** Type of matched journey schema */
    journeyType?: string | undefined;
    /** Channel type of matched journey schema */
    channelType?: ChannelTypeDto;
}

/** Service response data */
export class EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse implements IEvaluateJourneySchemaResponseDtoIEnumerableServiceResponse {
    /** The service response DTO */
    data?: EvaluateJourneySchemaResponseDto[] | undefined;
    /** List of Fenergo.Nebula.Platform.Core.Response.ServiceResponseMessage associated to the service response */
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IEvaluateJourneySchemaResponseDtoIEnumerableServiceResponse) {
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
                    this.data!.push(EvaluateJourneySchemaResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new EvaluateJourneySchemaResponseDtoIEnumerableServiceResponse();
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

/** Service response data */
export interface IEvaluateJourneySchemaResponseDtoIEnumerableServiceResponse {
    /** The service response DTO */
    data?: EvaluateJourneySchemaResponseDto[] | undefined;
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

export enum PropertyType {
    Single = "Single",
    Custom = "Custom",
    Collection = "Collection",
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

export class SinglePropertyDto extends PropertyDto implements ISinglePropertyDto {
    value?: string | undefined;

    constructor(data?: ISinglePropertyDto) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): SinglePropertyDto {
        data = typeof data === 'object' ? data : {};
        let result = new SinglePropertyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["value"] = this.value;
        super.toJSON(data);
        return data;
    }
}

export interface ISinglePropertyDto extends IPropertyDto {
    value?: string | undefined;
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