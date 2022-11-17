/* tslint:disable */
/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Creates a new screening batch to screen one or more entities
     * @param body (optional) The Create Batch request
     * @return Success. Batch created
     */
    createBatch(x_TENANT_ID: string, body?: CreateBatchDtoServiceRequest | null | undefined): Promise<BatchCreatedDtoServiceResponse>;
    /**
     * Completes an existing screening batch
     * @param id The ID of the existing batch to be completed
     * @return Accepted. The request to complete the batch has been accepted
     */
    completeBatch(id: string, x_TENANT_ID: string): Promise<void>;
    /**
     * Updates a list of matches in a batch
     * @param id The ID of the batch
     * @param body (optional) The request with the list of matches to be updated
     * @return Accepted. The request to update the list of matches has been accepted
     */
    updateMatches(id: string, x_TENANT_ID: string, body?: UpdateEntityMatchesDtoListServiceRequest | null | undefined): Promise<void>;
    /**
     * Creates a new screening configuration
     * @param body (optional) The Create screening providers configuration request
     * @return Success. Providers configuration created
     */
    createConfiguration(x_TENANT_ID: string, body?: CreateConfigurationDtoServiceRequest | null | undefined): Promise<ConfigurationCreatedDtoServiceResponse>;
    /**
     * Updates providers status (active/inactive)
     * @param body (optional) Update providers status request
     * @return Success. Providers status updated
     */
    updateProvidersActiveStatus(x_TENANT_ID: string, body?: ProviderActiveStatusDtoListServiceRequest | null | undefined): Promise<ServiceResponse>;
    /**
     * Adds provider to existing configuration
     * @param body (optional) Add provider request
     * @return Success. Provider added
     */
    addProvider(x_TENANT_ID: string, body?: AddProviderDtoServiceRequest | null | undefined): Promise<void>;
    /**
     * Deletes provider from existing configuration
     * @param providerId Id of provider to be deletd from configuration
     * @return Success. Provider deleted
     */
    deleteProvider(providerId: string, x_TENANT_ID: string): Promise<ServiceResponse>;
    /**
     * Updates provider configuration inside specific provider
     * @param providerId Id of the provider
     * @param body (optional) Data of the provider to be updated
     * @return Success. Configuration updated
     */
    updateProvider(providerId: string, x_TENANT_ID: string, body?: ProviderDtoServiceRequest | null | undefined): Promise<ServiceResponse>;
}

export class Client implements IClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/screeningcommand";
    }

    /**
     * Creates a new screening batch to screen one or more entities
     * @param body (optional) The Create Batch request
     * @return Success. Batch created
     */
    createBatch(x_TENANT_ID: string, body?: CreateBatchDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<BatchCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/batch";
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
            return this.processCreateBatch(_response);
        });
    }

    protected processCreateBatch(response: AxiosResponse): Promise<BatchCreatedDtoServiceResponse> {
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
            result202 = BatchCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<BatchCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Completes an existing screening batch
     * @param id The ID of the existing batch to be completed
     * @return Accepted. The request to complete the batch has been accepted
     */
    completeBatch(id: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/batch/{id}/complete";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processCompleteBatch(_response);
        });
    }

    protected processCompleteBatch(response: AxiosResponse): Promise<void> {
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
     * Updates a list of matches in a batch
     * @param id The ID of the batch
     * @param body (optional) The request with the list of matches to be updated
     * @return Accepted. The request to update the list of matches has been accepted
     */
    updateMatches(id: string, x_TENANT_ID: string, body?: UpdateEntityMatchesDtoListServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/batch/{id}/matches";
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
            return this.processUpdateMatches(_response);
        });
    }

    protected processUpdateMatches(response: AxiosResponse): Promise<void> {
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
     * Creates a new screening configuration
     * @param body (optional) The Create screening providers configuration request
     * @return Success. Providers configuration created
     */
    createConfiguration(x_TENANT_ID: string, body?: CreateConfigurationDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<ConfigurationCreatedDtoServiceResponse> {
        let url_ = this.baseUrl + "/api/configuration";
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
            return this.processCreateConfiguration(_response);
        });
    }

    protected processCreateConfiguration(response: AxiosResponse): Promise<ConfigurationCreatedDtoServiceResponse> {
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
            result202 = ConfigurationCreatedDtoServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConfigurationCreatedDtoServiceResponse>(<any>null);
    }

    /**
     * Updates providers status (active/inactive)
     * @param body (optional) Update providers status request
     * @return Success. Providers status updated
     */
    updateProvidersActiveStatus(x_TENANT_ID: string, body?: ProviderActiveStatusDtoListServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<ServiceResponse> {
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
            return this.processUpdateProvidersActiveStatus(_response);
        });
    }

    protected processUpdateProvidersActiveStatus(response: AxiosResponse): Promise<ServiceResponse> {
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
            result202 = ServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ServiceResponse>(<any>null);
    }

    /**
     * Adds provider to existing configuration
     * @param body (optional) Add provider request
     * @return Success. Provider added
     */
    addProvider(x_TENANT_ID: string, body?: AddProviderDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
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

    protected processAddProvider(response: AxiosResponse): Promise<void> {
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
     * Deletes provider from existing configuration
     * @param providerId Id of provider to be deletd from configuration
     * @return Success. Provider deleted
     */
    deleteProvider(providerId: string, x_TENANT_ID: string , cancelToken?: CancelToken | undefined): Promise<ServiceResponse> {
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
            return this.processDeleteProvider(_response);
        });
    }

    protected processDeleteProvider(response: AxiosResponse): Promise<ServiceResponse> {
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
            result202 = ServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ServiceResponse>(<any>null);
    }

    /**
     * Updates provider configuration inside specific provider
     * @param providerId Id of the provider
     * @param body (optional) Data of the provider to be updated
     * @return Success. Configuration updated
     */
    updateProvider(providerId: string, x_TENANT_ID: string, body?: ProviderDtoServiceRequest | null | undefined , cancelToken?: CancelToken | undefined): Promise<ServiceResponse> {
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
            return this.processUpdateProvider(_response);
        });
    }

    protected processUpdateProvider(response: AxiosResponse): Promise<ServiceResponse> {
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
            result202 = ServiceResponse.fromJS(resultData202);
            return result202;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ServiceResponse.fromJS(resultData400);
            return throwException("Bad request. The request has missing/invalid values", status, _responseText, _headers, result400);
        } else if (status === 500) {
            const _responseText = response.data;
            return throwException("Internal server error", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ServiceResponse>(<any>null);
    }
}

export class AddressDto implements IAddressDto {
    /** The first line in the address */
    addressLine1?: string | undefined;
    /** The second line in the address */
    addressLine2?: string | undefined;
    /** The city */
    city?: string | undefined;
    /** The postal code */
    postalCode?: string | undefined;
    /** The country */
    country?: string | undefined;
    /** The state or province */
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
    /** The first line in the address */
    addressLine1?: string | undefined;
    /** The second line in the address */
    addressLine2?: string | undefined;
    /** The city */
    city?: string | undefined;
    /** The postal code */
    postalCode?: string | undefined;
    /** The country */
    country?: string | undefined;
    /** The state or province */
    stateProvince?: string | undefined;
}

export class SearchCriteriaDto implements ISearchCriteriaDto {
    /** The Individual's firstname and surname. Alternatively use FirstName with LastName. */
    fullName?: string | undefined;
    /** The Individual's first name. Alternatively use FullName. */
    firstName?: string | undefined;
    /** The Individual's middle name */
    middleName?: string | undefined;
    /** The Individual's surname. Alternatively use FullName. */
    lastName?: string | undefined;
    /** The Individual's date of birth in DD/MM/YYYY format */
    dateOfBirth?: string | undefined;
    /** The Individual's gender */
    gender?: string | undefined;
    /** Full Company name */
    legalEntityName?: string | undefined;
    /** Legal entity type i.e. Individual or Company */
    type?: string | undefined;
    /** Address of the Individual or Company */
    address?: AddressDto | undefined;
    /** The Individual's or Company's ID number */
    idNumber?: string | undefined;
    /** The Individual's or Company's phone number */
    phoneNumber?: string | undefined;
    /** The Individual's or Company's email address */
    emailAddress?: string | undefined;
    /** The Individual's nationality */
    nationality?: string | undefined;
    /** The Individual's country of residence */
    countryOfResidence?: string | undefined;
    /** The Individual's place of birth */
    placeOfBirth?: string | undefined;
    /** The Individual's citizenship */
    citizenship?: string | undefined;
    /** The country the Company is registered in */
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
    /** The Individual's firstname and surname. Alternatively use FirstName with LastName. */
    fullName?: string | undefined;
    /** The Individual's first name. Alternatively use FullName. */
    firstName?: string | undefined;
    /** The Individual's middle name */
    middleName?: string | undefined;
    /** The Individual's surname. Alternatively use FullName. */
    lastName?: string | undefined;
    /** The Individual's date of birth in DD/MM/YYYY format */
    dateOfBirth?: string | undefined;
    /** The Individual's gender */
    gender?: string | undefined;
    /** Full Company name */
    legalEntityName?: string | undefined;
    /** Legal entity type i.e. Individual or Company */
    type?: string | undefined;
    /** Address of the Individual or Company */
    address?: AddressDto | undefined;
    /** The Individual's or Company's ID number */
    idNumber?: string | undefined;
    /** The Individual's or Company's phone number */
    phoneNumber?: string | undefined;
    /** The Individual's or Company's email address */
    emailAddress?: string | undefined;
    /** The Individual's nationality */
    nationality?: string | undefined;
    /** The Individual's country of residence */
    countryOfResidence?: string | undefined;
    /** The Individual's place of birth */
    placeOfBirth?: string | undefined;
    /** The Individual's citizenship */
    citizenship?: string | undefined;
    /** The country the Company is registered in */
    registeredCountry?: string | undefined;
}

export class CreateBatchEntityDto implements ICreateBatchEntityDto {
    /** The unique ID for a Legal Entity in Fen-X */
    legalEntityId?: string | undefined;
    searchCriteria?: SearchCriteriaDto | undefined;

    constructor(data?: ICreateBatchEntityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.legalEntityId = _data["legalEntityId"];
            this.searchCriteria = _data["searchCriteria"] ? SearchCriteriaDto.fromJS(_data["searchCriteria"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CreateBatchEntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateBatchEntityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["legalEntityId"] = this.legalEntityId;
        data["searchCriteria"] = this.searchCriteria ? this.searchCriteria.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICreateBatchEntityDto {
    /** The unique ID for a Legal Entity in Fen-X */
    legalEntityId?: string | undefined;
    searchCriteria?: SearchCriteriaDto | undefined;
}

export class CreateBatchDto implements ICreateBatchDto {
    /** The list of entities that are included in the batch screening search request */
    entities?: CreateBatchEntityDto[] | undefined;
    /** The unique Fen-X identifier for the journey that the screening relates to */
    journeyId?: string | undefined;

    constructor(data?: ICreateBatchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["entities"])) {
                this.entities = [] as any;
                for (let item of _data["entities"])
                    this.entities!.push(CreateBatchEntityDto.fromJS(item));
            }
            this.journeyId = _data["journeyId"];
        }
    }

    static fromJS(data: any): CreateBatchDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateBatchDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.entities)) {
            data["entities"] = [];
            for (let item of this.entities)
                data["entities"].push(item.toJSON());
        }
        data["journeyId"] = this.journeyId;
        return data; 
    }
}

export interface ICreateBatchDto {
    /** The list of entities that are included in the batch screening search request */
    entities?: CreateBatchEntityDto[] | undefined;
    /** The unique Fen-X identifier for the journey that the screening relates to */
    journeyId?: string | undefined;
}

export class CreateBatchDtoServiceRequest implements ICreateBatchDtoServiceRequest {
    data?: CreateBatchDto | undefined;

    constructor(data?: ICreateBatchDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? CreateBatchDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CreateBatchDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateBatchDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICreateBatchDtoServiceRequest {
    data?: CreateBatchDto | undefined;
}

export class BatchCreatedDto implements IBatchCreatedDto {
    /** The unique ID for the batch of entities to be screened. A batch can contain one or more entities. */
    batchId?: string | undefined;

    constructor(data?: IBatchCreatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.batchId = _data["batchId"];
        }
    }

    static fromJS(data: any): BatchCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new BatchCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["batchId"] = this.batchId;
        return data; 
    }
}

export interface IBatchCreatedDto {
    /** The unique ID for the batch of entities to be screened. A batch can contain one or more entities. */
    batchId?: string | undefined;
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

export class BatchCreatedDtoServiceResponse implements IBatchCreatedDtoServiceResponse {
    data?: BatchCreatedDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IBatchCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? BatchCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BatchCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BatchCreatedDtoServiceResponse();
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

export interface IBatchCreatedDtoServiceResponse {
    data?: BatchCreatedDto | undefined;
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

export class UpdateMatchDto implements IUpdateMatchDto {
    /** The unique ID for the match on a Legal Entity. A single entity can have no matches or more than one match. */
    matchId?: string;
    /** The match status. This will be match/no match/unresolved */
    status?: string | undefined;
    /** Connected to the match status */
    reason?: string | undefined;
    /** Any additional comments */
    comments?: string | undefined;

    constructor(data?: IUpdateMatchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.matchId = _data["matchId"];
            this.status = _data["status"];
            this.reason = _data["reason"];
            this.comments = _data["comments"];
        }
    }

    static fromJS(data: any): UpdateMatchDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateMatchDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["matchId"] = this.matchId;
        data["status"] = this.status;
        data["reason"] = this.reason;
        data["comments"] = this.comments;
        return data; 
    }
}

export interface IUpdateMatchDto {
    /** The unique ID for the match on a Legal Entity. A single entity can have no matches or more than one match. */
    matchId?: string;
    /** The match status. This will be match/no match/unresolved */
    status?: string | undefined;
    /** Connected to the match status */
    reason?: string | undefined;
    /** Any additional comments */
    comments?: string | undefined;
}

export class UpdateEntityMatchesDto implements IUpdateEntityMatchesDto {
    /** The unique Entity ID */
    entityId?: string;
    /** The list of matches */
    matches?: UpdateMatchDto[] | undefined;

    constructor(data?: IUpdateEntityMatchesDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.entityId = _data["entityId"];
            if (Array.isArray(_data["matches"])) {
                this.matches = [] as any;
                for (let item of _data["matches"])
                    this.matches!.push(UpdateMatchDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateEntityMatchesDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateEntityMatchesDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["entityId"] = this.entityId;
        if (Array.isArray(this.matches)) {
            data["matches"] = [];
            for (let item of this.matches)
                data["matches"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IUpdateEntityMatchesDto {
    /** The unique Entity ID */
    entityId?: string;
    /** The list of matches */
    matches?: UpdateMatchDto[] | undefined;
}

export class UpdateEntityMatchesDtoListServiceRequest implements IUpdateEntityMatchesDtoListServiceRequest {
    data?: UpdateEntityMatchesDto[] | undefined;

    constructor(data?: IUpdateEntityMatchesDtoListServiceRequest) {
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
                    this.data!.push(UpdateEntityMatchesDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateEntityMatchesDtoListServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateEntityMatchesDtoListServiceRequest();
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
        return data; 
    }
}

export interface IUpdateEntityMatchesDtoListServiceRequest {
    data?: UpdateEntityMatchesDto[] | undefined;
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
    status?: string | undefined;

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
            this.status = _data["status"];
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
        data["status"] = this.status;
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
    status?: string | undefined;
}

export class CreateConfigurationDto implements ICreateConfigurationDto {
    providers?: ProviderDto[] | undefined;

    constructor(data?: ICreateConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["providers"])) {
                this.providers = [] as any;
                for (let item of _data["providers"])
                    this.providers!.push(ProviderDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CreateConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.providers)) {
            data["providers"] = [];
            for (let item of this.providers)
                data["providers"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ICreateConfigurationDto {
    providers?: ProviderDto[] | undefined;
}

export class CreateConfigurationDtoServiceRequest implements ICreateConfigurationDtoServiceRequest {
    data?: CreateConfigurationDto | undefined;

    constructor(data?: ICreateConfigurationDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? CreateConfigurationDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CreateConfigurationDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateConfigurationDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ICreateConfigurationDtoServiceRequest {
    data?: CreateConfigurationDto | undefined;
}

export class ConfigurationCreatedDto implements IConfigurationCreatedDto {
    configurationId?: string | undefined;

    constructor(data?: IConfigurationCreatedDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.configurationId = _data["configurationId"];
        }
    }

    static fromJS(data: any): ConfigurationCreatedDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigurationCreatedDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["configurationId"] = this.configurationId;
        return data; 
    }
}

export interface IConfigurationCreatedDto {
    configurationId?: string | undefined;
}

export class ConfigurationCreatedDtoServiceResponse implements IConfigurationCreatedDtoServiceResponse {
    data?: ConfigurationCreatedDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;

    constructor(data?: IConfigurationCreatedDtoServiceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? ConfigurationCreatedDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(ServiceResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConfigurationCreatedDtoServiceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigurationCreatedDtoServiceResponse();
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

export interface IConfigurationCreatedDtoServiceResponse {
    data?: ConfigurationCreatedDto | undefined;
    messages?: ServiceResponseMessage[] | undefined;
}

export class ProviderActiveStatusDto implements IProviderActiveStatusDto {
    id?: string | undefined;
    active?: boolean;

    constructor(data?: IProviderActiveStatusDto) {
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

    static fromJS(data: any): ProviderActiveStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderActiveStatusDto();
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

export interface IProviderActiveStatusDto {
    id?: string | undefined;
    active?: boolean;
}

export class ProviderActiveStatusDtoListServiceRequest implements IProviderActiveStatusDtoListServiceRequest {
    data?: ProviderActiveStatusDto[] | undefined;

    constructor(data?: IProviderActiveStatusDtoListServiceRequest) {
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
                    this.data!.push(ProviderActiveStatusDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProviderActiveStatusDtoListServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderActiveStatusDtoListServiceRequest();
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
        return data; 
    }
}

export interface IProviderActiveStatusDtoListServiceRequest {
    data?: ProviderActiveStatusDto[] | undefined;
}

export class AddProviderDto implements IAddProviderDto {
    provider?: ProviderDto | undefined;

    constructor(data?: IAddProviderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.provider = _data["provider"] ? ProviderDto.fromJS(_data["provider"]) : <any>undefined;
        }
    }

    static fromJS(data: any): AddProviderDto {
        data = typeof data === 'object' ? data : {};
        let result = new AddProviderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["provider"] = this.provider ? this.provider.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IAddProviderDto {
    provider?: ProviderDto | undefined;
}

export class AddProviderDtoServiceRequest implements IAddProviderDtoServiceRequest {
    data?: AddProviderDto | undefined;

    constructor(data?: IAddProviderDtoServiceRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"] ? AddProviderDto.fromJS(_data["data"]) : <any>undefined;
        }
    }

    static fromJS(data: any): AddProviderDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddProviderDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IAddProviderDtoServiceRequest {
    data?: AddProviderDto | undefined;
}

export class ProviderDtoServiceRequest implements IProviderDtoServiceRequest {
    data?: ProviderDto | undefined;

    constructor(data?: IProviderDtoServiceRequest) {
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
        }
    }

    static fromJS(data: any): ProviderDtoServiceRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderDtoServiceRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IProviderDtoServiceRequest {
    data?: ProviderDto | undefined;
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