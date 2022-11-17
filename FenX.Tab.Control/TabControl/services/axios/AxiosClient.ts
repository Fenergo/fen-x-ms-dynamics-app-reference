import { AxiosRequestConfig } from 'axios';
import { HttpClient } from './AxiosBase';
import configData from "../config/config.json";

import { Client as DocumentManagementCommandClient, CreateSignedUrlToUploadFileRequestServiceRequest, DocumentRequirementRequestDtoServiceRequest, UpdateDocumentDto, UpdateDocumentDtoServiceRequest, UpdateDocumentRequirementDto, UpdateDocumentRequirementDtoServiceRequest } from '../Clients/DocumentManagementCommandClient';
import { Client as DocumentManagementQueryClient } from '../Clients/DocumentManagementQueryClient';
import { Client as EntityDataCommandClient, UpdateDraftAccessLayersDto, UpdateDraftAccessLayersDtoServiceRequest } from '../Clients/EntityDataCommandClient';
import { Client as EntityDataQueryClient, SearchForDuplicatesDto, SearchForDuplicatesDtoServiceRequest } from '../Clients/EntityDataQueryClient';
import { AbortJourneyDtoServiceRequest, Client as JourneyCommandClient, CreateJourneyInstanceDto, CreateJourneyInstanceDtoServiceRequest, ReassignTaskDtoServiceRequest, ResetTaskDtoServiceRequest } from '../Clients/JourneyCommandClient';
import { Client as JourneyLogicEngineClient } from '../Clients/JourneyLogicEngineClient';
import { AccessLayerDto, Client as JourneyQueryClient } from '../Clients/JourneyQueryClient';
import { Client as LookupCommandClient } from '../Clients/LookupCommandClient';
import { Client as LookupQueryClient } from '../Clients/LookupQueryClient';
import { Client as PolicyCommandClient } from '../Clients/PolicyCommandClient';
import { Client as PolicyLogicEngineClient, EvaluateRequirementsRequestV3Dto, EvaluateRequirementsRequestV3DtoServiceRequest, IEvaluateRequirementsRequestV3Dto, IEvaluateRequirementsRequestV3DtoServiceRequest, VersionedJurisdictionDto } from '../Clients/PolicyLogicEngineClient';
import { Client as PolicyLogicEngineClientV2, EvaluateDataGroupFieldsRequestDto, EvaluateDataGroupFieldsRequestDtoServiceRequest } from '../Clients/PolicyLogicEngineClientV2';
import { Client as PolicyQueryClient } from '../Clients/PolicyQueryClient';
import { Client as ScreeningCommandClient } from '../Clients/ScreeningCommandClient';
import { Client as ScreeningQueryClient } from '../Clients/ScreeningQueryClient';
import { Client as AssociationCommandClient } from '../Clients/AssociationCommandClient';
import { Client as AssociationQueryClient } from '../Clients/AssociationQueryClient';
import { Client as TenantQueryClient } from '../Clients/TenantQueryClient';
import { Client as AuthorizationQueryClient } from '../Clients/AuthorizationQueryClient';
import { Client as ExternalDataQueryClient } from '../Clients/ExternalDataQueryClient';
import { Client as ExternalDataCommandClient } from '../Clients/ExternalDataCommandClient';
import store from '../redux/reduxStore';
import { User } from 'oidc-client';

export class FenXApi extends HttpClient {
  private static classInstance?: FenXApi;
  private constructor(baseURL?: string) {
    super(baseURL ? baseURL : configData.apiRoot);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );

    this.instance.interceptors.response.use(undefined, async (err) => {
      const { config, message } = err;

      const retryCount = Number(sessionStorage.getItem("api_retry_count")) > 5 ? 5 : Number(sessionStorage.getItem("api_retry_count"));

      if (!config || config.__isRetryRequest) {
        if (config.__retryCount > retryCount) {
          return Promise.reject(err);
        }
      }
      if(err.response.status !== 401) {
        return Promise.reject(err);
      }
      
      err.config.__isRetryRequest = true;
      if (!err.config.__retryCount)
        err.config.__retryCount = 0;

      if (err.config.__retryCount >= 1)
        await this.delay(1500);

      err.config.__retryCount = err.config.__retryCount + 1;

      if (!sessionStorage.getItem("isDevelopment") || sessionStorage.getItem("isDevelopment") == "false") {        
        await this.CallAuthPlugin();
      }
      else {
        await this.callFenXAuth();
      }
      return this.instance(config);
    });
  }

  delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  private _handleRequest = (config: AxiosRequestConfig) => {
    const user: User = store.getState()["oidc"]["user"]!;
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Authorization'] = sessionStorage.getItem("fen_token");
    return config;
  };


  // This whole section still requires refactoring
    public static async createInstance(baseURL?: string) {
      this.classInstance = new FenXApi(baseURL);
      if(!sessionStorage.getItem("isDevelopment") || sessionStorage.getItem("isDevelopment") == "false") {
        await this.classInstance.CallAuthPlugin().then(() => {return this.classInstance;});
      } else {
        await this.classInstance.callFenXAuth();
      }
      return this.classInstance;
    }

    public static getInstance(baseURL?: string) {
      if (!this.classInstance) {
        this.classInstance = new FenXApi(baseURL);
        this.createInstance().then(() => {return this.classInstance;});
      }

      return this.classInstance;
    }
  /////

  getEntityQueryClient(): EntityDataQueryClient {
    return new EntityDataQueryClient(
      undefined, this.instance
    );
  }

  getEntityDataCommandClient(): EntityDataCommandClient {
    return new EntityDataCommandClient(
      undefined, this.instance
    );
  }

  getDocumentManagementCommandClient(): DocumentManagementCommandClient {
    return new DocumentManagementCommandClient(
      undefined, this.instance
    );
  }

  getDocumentManagementQueryClient(): DocumentManagementQueryClient {
    return new DocumentManagementQueryClient(
      undefined, this.instance
    );
  }

  getJourneyQueryClient(): JourneyQueryClient {
    return new JourneyQueryClient(
      undefined, this.instance
    );
  }

  getJourneyCommandClient(): JourneyCommandClient {
    return new JourneyCommandClient(
      undefined, this.instance
    );
  }

  getJourneyLogicEngineClient(): JourneyLogicEngineClient {
    return new JourneyLogicEngineClient(
      undefined, this.instance
    );
  }

  getLookupCommandClient(): LookupCommandClient {
    return new LookupCommandClient(
      undefined, this.instance
    );
  }

  getLookupQueryClient(): LookupQueryClient {
    return new LookupQueryClient(
      undefined, this.instance
    );
  }

  getPolicyCommandClient(): PolicyCommandClient {
    return new PolicyCommandClient(
      undefined, this.instance
    );
  }

  getPolicyLogicEngineClientV3(): PolicyLogicEngineClient {
    return new PolicyLogicEngineClient(
      undefined, this.instance
    );
  }

  getPolicyLogicEngineClientV2(): PolicyLogicEngineClientV2 {
    return new PolicyLogicEngineClientV2(
      undefined, this.instance
    );
  }

  getPolicyQueryClient(): PolicyQueryClient {
    return new PolicyQueryClient(
      undefined, this.instance
    );
  }

  getScreeningQueryClient(): ScreeningQueryClient {
    return new ScreeningQueryClient(
      undefined, this.instance
    );
  }

  getScreeningCommandClient(): ScreeningCommandClient {
    return new ScreeningCommandClient(
      undefined, this.instance
    );
  }

  getAssociationQueryClient(): AssociationQueryClient {
    return new AssociationQueryClient(
      undefined, this.instance
    );
  }

  getAssociationCommandClient(): AssociationCommandClient {
    return new AssociationCommandClient(
      undefined, this.instance
    );
  }

  getTenantQueryClient(): TenantQueryClient {
    return new TenantQueryClient(
      undefined, this.instance
    );
  }

  getAuthorizationQueryClient(): AuthorizationQueryClient {
    return new AuthorizationQueryClient(
      undefined, this.instance
    );
  }


  getExternalDataQueryClient(): ExternalDataQueryClient {
    return new ExternalDataQueryClient(
      undefined, this.instance
    );
  }

  getExternalDataCommandClient(): ExternalDataCommandClient {
    return new ExternalDataCommandClient(
      undefined, this.instance
    );
  }

  // public async getTenantsForUser(): Promise<string[]> {
  //   const url = `${configData.identityProviderUrl}/connect/userinfo`;
  //   const user: User = store.getState()["oidc"]["user"]!;
  //   if (!user)
  //     return [];

  //   return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${user.access_token}`
  //     }
  //   })
  //     .then(res => res.status >= 400 ? res.json().then(data => Promise.reject(data)) : res.json())
  //     .then((json) => {
  //       const { tenant } = json;
  //       let tenantsForUser = tenant;
  //       return tenantsForUser;
  //     })
  //     .catch(data => {
  //       const error = data.error || 'There was a network error.';
  //       return Promise.reject([error]);
  //     });
  // }

  //Journey Query API
  public getJourneyInstanceById = async (id: string) => this.getJourneyQueryClient().getJourneyInstanceById(id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public searchJourneyInstanceByEntityId = async (entityId: string) => this.getJourneyQueryClient().getInstancesByEntityId(entityId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getJourneyLifecycle = async (entityId: string) => this.getJourneyQueryClient().getLifecycleStatusByEntityId(entityId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then((response) => { return response.data });
  //Journey Command API
  public createJourneyForEntity = async (eId: string, jsId: string, accessLayers: AccessLayerDto) => this.getJourneyCommandClient().createJourney(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, { data: new CreateJourneyInstanceDto({ entityId: eId, journeySchemaId: jsId, accessLayers: accessLayers })} as CreateJourneyInstanceDtoServiceRequest).then(response => { return response.data });
  public cancelJourneyInstance = async (journeyInstanceId: string, requestObj: AbortJourneyDtoServiceRequest | undefined) => this.getJourneyCommandClient().abortJourneyInstance(journeyInstanceId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj);
  public completeTaskInJourney = async (journeyInstanceId: string, taskId: string) => this.getJourneyCommandClient().completeTask(taskId, journeyInstanceId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId);;
  public reassignTaskInJourney = async (journeyInstanceId: string, taskId: string, requestObj: ReassignTaskDtoServiceRequest) => this.getJourneyCommandClient().reassignTask(journeyInstanceId, taskId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj);;
  public reopenTaskInJourney = async (journeyInstanceId: string, taskId: string, requestObj: ResetTaskDtoServiceRequest) => this.getJourneyCommandClient().resetTask(journeyInstanceId, taskId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj);;
  public finishDataReviewTask = async (journeyInstanceId: string, taskId: string, requestObj: any) => this.getJourneyCommandClient().saveReviewOutcome(journeyInstanceId, taskId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj);
  //Entity Query API
  public getEntityDraft = async (id: string) => this.getEntityQueryClient().getEntityDrafts(id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });;
  public getEntityDraftData = async (id: string, entityId: string) => this.getEntityQueryClient().getEntityDraftById(id, entityId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });;
  public getEntityData = async (id: string) => this.getEntityQueryClient().getEntityById(id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });;

  public getEntitiesList = async (requestObj: any) => this.getEntityQueryClient().getEntitiesList(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj).then(response => { return response.data });
  public getEntitiesPagedList = async (requestObj: any) => this.getEntityQueryClient().getEntitiesPagedList(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj).then(response => { return response.data });
  public searchForDuplicatesEntity = async (type: string, properties: any) => this.getEntityQueryClient().searchForDuplicates(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, { data: new SearchForDuplicatesDto({ type: type, properties: properties }) } as SearchForDuplicatesDtoServiceRequest).then(response => { return response.data });
  public searchEntityByName = async (requestObj: any) => this.getEntityQueryClient().searchByName(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj).then(response => { return response.data });
  //Entity Command API
  public createEntity = async (properties: any) => this.getEntityDataCommandClient().createEntity(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, properties);
  public createEntityDraft = async (entityId: string, properties: any) => this.getEntityDataCommandClient().createEntityDraft(entityId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, properties);
  public updateEntityDraft = async (entityId: string, id: string, formData: any) => this.getEntityDataCommandClient().updateEntityDraftRecordV2(entityId, id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, formData);
  //Policy Query API  
  public getAllRequirementSets = async (includeRequirements: boolean | undefined) => this.getPolicyQueryClient().getAllRequirementSets(includeRequirements, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getRequirementsInScope = async (properties: any) => this.getPolicyQueryClient().getRequirementsInScopeV2(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, properties).then(response => { return response.data });
  public getDataGroups = async (onlyPublishedAndArchived: boolean | undefined) => this.getPolicyQueryClient().getAllDataGroups(onlyPublishedAndArchived, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getDataGroup = async (dataGroupId: string) => this.getPolicyQueryClient().getDataGroupById(dataGroupId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public evaluateRequirementsInScope = async (properties: any) => this.getPolicyQueryClient().evaluateRequirementsInScope(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, properties).then(response => { return response.data });
  // Policy Logic Engine
  public evaluateRequirements = async (jurisdictions: Array<VersionedJurisdictionDto>, requirementType: string, categories: string[], properties: any, targetEntity?: string) => this.getPolicyLogicEngineClientV3().evaluateV3(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, { data: { jurisdictions: jurisdictions, requirementTypes: [requirementType], properties: properties, targetEntity: targetEntity, categories: categories } as EvaluateRequirementsRequestV3Dto } as EvaluateRequirementsRequestV3DtoServiceRequest).then(response => { return response.data });
  public evaluateRequirementSets = async (properties: any) => this.getPolicyLogicEngineClientV3().evaluateRequirementSetsV3(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, properties).then(response => { return response.data });
  public evaluateDataGroupFields = async (data: EvaluateDataGroupFieldsRequestDto) => this.getPolicyLogicEngineClientV2().evaluateDataGroupFields(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, { data: data } as EvaluateDataGroupFieldsRequestDtoServiceRequest).then((response) => { return response.data });
  //Lookup Query API  
  public getAllLookups = async () => this.getLookupQueryClient().getAllLookups(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  public getAllLookupsLite = async () => this.getLookupQueryClient().getAllLookupsLite(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  public getAllLinkLookups = async () => this.getLookupQueryClient().getAllActiveLinkLookups(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  public getAllLinkLookupsLite = async () => this.getLookupQueryClient().getAllLinkLookupsLite(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  public getLookupVersionById = async (lookupId: string, versionNumber: number) => this.getLookupQueryClient().getLookupVersionById(lookupId, versionNumber, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getLinkLookupVersionById = async (lookupId: string, versionNumber: number) => this.getLookupQueryClient().getLinkLookupVersionById(lookupId, versionNumber, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  //JourneyLogicEngine API
  public evaluateJourneySchema = async (data: any, journeyTypeFilter?: string[]) => this.getJourneyLogicEngineClient().evaluateJourneySchemaV2(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, journeyTypeFilter, data).then(response => { return response.data });
  // Document Management API
  public getJourneyDocuments = async (journeyId: string) => this.getDocumentManagementQueryClient().getAllDocumentsByJourneyId(journeyId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getJourneyDocumentsByEntityId = async (entityId: string) => this.getDocumentManagementQueryClient().getAllDocumentsByEntityId(entityId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getJourneyDocumentsByJourneyId = async (journeyId: string) => this.getDocumentManagementQueryClient().getAllDocumentsByJourneyId(journeyId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getJourneyDocumentModelssByEntityIdAndJourneyId = async (entityId: string, journeyId: string) => this.getDocumentManagementQueryClient().getAllRequirementModelsByEntityIdAndJourneyId(entityId, journeyId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getDocumentUrl = async (documentId: string) => this.getDocumentManagementQueryClient().getSignedUrl(documentId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public uploadDocument = async (requestObj: CreateSignedUrlToUploadFileRequestServiceRequest) => this.getDocumentManagementCommandClient().createDocumentModel(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj).then(response => { return response.data });
  public removeDocument = async (documentId: string) => this.getDocumentManagementCommandClient().deleteDocumentModel(documentId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId);
  public updateDocumentRequirement = async (id: string, body: UpdateDocumentRequirementDtoServiceRequest) => this.getDocumentManagementCommandClient().updateDocumentRequirement(id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, body);
  public updateDocumentModel = async (id: string, data: UpdateDocumentDto) => this.getDocumentManagementCommandClient().updateDocument(id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, { data: data } as UpdateDocumentDtoServiceRequest)
  public updateDocumentAccessLayers = async (id:string, data: UpdateDraftAccessLayersDto) => this.getDocumentManagementCommandClient().updateDocumentAccessLayers(id, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, { data: data } as UpdateDraftAccessLayersDtoServiceRequest)
  public getAllowedMimeTypesForDocument = async () => this.getDocumentManagementQueryClient().mimeTypesAllowed(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public createDocRequirement = async (requestObj: DocumentRequirementRequestDtoServiceRequest) => this.getDocumentManagementCommandClient().createDocumentRequirement(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj).then(response => { return response.data });
  //Screening Query API
  public getScreeningBatchByJourneyId = async (journeyId: string) => this.getScreeningQueryClient().getBatchByJourneyId(journeyId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getScreeningResultsByBatchId = async (batchId: string) => this.getScreeningQueryClient().getEntitiesByBatchId(batchId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getEntityByBatchIdAndEntityId = async (batchId: string, entityId: string) => this.getScreeningQueryClient().getMatchesByEntityId(entityId, batchId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  //Screening Command API
  public updateMatchesForScreeningEntity = async (batchId: string, properties: any) => this.getScreeningCommandClient().updateMatches(batchId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, properties).then(response => { return response });
  //Tenenat Query API
  public getTenantsInfoForUser = async (tenantList: string) => this.getTenantQueryClient().getTenants(tenantList).then(response => { return response.data });
  public getBaseTenant = async (tenantList: string) => this.getTenantQueryClient().getBaseTenants(tenantList).then(response => { return response.data });
  // Association Command API
  public createAssociation = async (requestObj: any) => this.getAssociationCommandClient().createAssociation(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, requestObj).then(response => { return response.data });
  public getJourneyAssociations = async (journeyId: string, entityId: string) => this.getAssociationQueryClient().getAssociations(entityId, journeyId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getEntityAssociations = async (entityId: string) => this.getAssociationQueryClient().getVerifiedAssociations(entityId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  // Authorization Query API
  public getTeamById = async (teamId: string) => this.getAuthorizationQueryClient().getTeam(teamId, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getAllTeams = async () => this.getAuthorizationQueryClient().getAllTeams(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getAllAccessLayers = async () => this.getAuthorizationQueryClient().getAllAccessLayers(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getCurrentUserAuthProfile = async () => this.getAuthorizationQueryClient().getCurrentUserAuthorizationProfile(true, true, sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  public getAllUsers = async () => this.getAuthorizationQueryClient().getAllUsers(sessionStorage.getItem('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response.data });
  //External Data Query API
  public getSearchResultsByJourneyId = async (journeyId: string) => this.getExternalDataQueryClient().getSearchResultsByJourneyId(journeyId, ('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  public getImportedDataByJourneyIdAndExternalId = async (journeyId: string, externalId: string) => this.getExternalDataQueryClient().getImportedDataByJourneyIdAndExternalId(journeyId, externalId, ('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  public getConfiguration = async () => this.getExternalDataQueryClient().getConfiguration(('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  // public getImportIdentifierOfLatestImport = async (journeyId: string) => this.getImportIdentifierOfLatestImport(journeyId).then((response: string) => { return response });


  public getExternalDataConfigurationSimplified = async () => this.getExternalDataQueryClient().getSimplifiedConfiguration(('FenXPiortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId).then(response => { return response });
  //External Data Command API
  public publish = async (request: any) => this.getExternalDataCommandClient().publish(('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, request).then(response => { return response });
  public import = async (request: any) => this.getExternalDataCommandClient().import(('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, request).then(response => { return response });
  public saveDeduplicationResults = async (request: any) => this.getExternalDataCommandClient().saveDeduplicationResults(('FenXPortal_TenantId') ? sessionStorage.getItem('FenXPortal_TenantId') as string : configData.fenxTenantId, request).then(response => { return response });
}