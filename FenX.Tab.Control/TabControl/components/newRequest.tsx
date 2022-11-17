import { PrimaryButton, DefaultButton, DetailsList, IColumn, Text, SelectionMode, Stack, IconButton, Modal, TooltipHost } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";
import { FenXApi } from "../services/axios/AxiosClient";
import { AccessLayerDataTypeDto } from "../services/Clients/AuthorizationQueryClient";
import { AccessLayerDto } from "../services/Clients/DocumentManagementCommandClient";
import { EntityDto, SinglePropertyDto } from "../services/Clients/EntityDataQueryClient";
import { DataRequirement, Requirement, VersionedJurisdictionDto } from "../services/Clients/PolicyQueryClient";
import { ModalStyle } from "../styles/modal";
import { colourPalette } from "../styles/theme";
import { ModalContent } from "./modal/modalContent";
import { IPermission, PermissionModal } from "./modal/permissionModal";
import { NewRequestAccessLayers } from "./newRequestAccessLayers";
import { FieldChangeEvent } from "./screen/field/field";
import { RequirementScreen } from "./screen/screen";
import { ConfigManager } from "./utility/configManager";
import { Notification } from "./utility/notification";
import { UserProfileManager } from "./utility/userProfileManager";

export interface INewRequest {
    onSubscribeClick: (id: string) => void,
    onInitiateOnboardingClick: (data: {}, selectedAccessLayers: { businessRelatedAccessLayers: string, geographicAccessLayers: string }) => void,
    onInitiateCancelClick: () => void,
    context: ComponentFramework.Context<IInputs>
}

interface EnhancedEntityDto extends EntityDto {
    isAccessible?: boolean;
}

interface INewRequestState extends IPermission {
    metadata: Requirement[];
    initialData: Dictionary<any>;
    data: Dictionary<any>;
    isValid: boolean;
    isAccessLayerValid: boolean;
    isLoading: boolean;
    fieldValidation: Dictionary<boolean>;
    isSearchComplete: boolean;
    entityType: string;
    searchResults: EnhancedEntityDto[];
    currentPage: number;
    accessLayerModalIsOpen: boolean;
}

export class NewRequest extends PermissionModal<INewRequest> {
    state: INewRequestState = {
        ...this.state,
        metadata: [] as Requirement[],
        initialData: {} as Dictionary<any>,
        data: {} as Dictionary<any>,
        isValid: false as boolean,
        isAccessLayerValid: false,
        isLoading: false as boolean,
        fieldValidation: {} as Dictionary<boolean>,
        isSearchComplete: false,
        entityType: "",
        searchResults: [] as EnhancedEntityDto[],
        currentPage: 1,
        accessLayerModalIsOpen: false
    };

    entityName = this.props.context?.parameters.entityName.raw!;
    fenXClient = FenXApi.getInstance();
    userProfileManager = new UserProfileManager();

    componentDidMount = async () => {
        await this.getRequirements(this.getDynamicsData);
    }

    getRequirements = async (callback: (metadata: Requirement[]) => void) => {
        this.setState({ isLoading: true });
        let entityType = ConfigManager.getReferenceData("EntityType", this.props.context?.parameters.entityName.raw!);
        await this.executeWithPermissionHandling(this.fenXClient.getRequirementsInScope({ data: { category: ["Basic Details"], jurisdictions: [{ jurisdiction: "Global" }], type: "Data", entityType: entityType } })
            .then((result) => {
                callback(result!);
                this.setState({ isLoading: false, entityType: entityType });
            }))
            .catch((error) => { Notification.showError("Error fetching requirements in scope.", error); this.setState({ isLoading: false }); })
    }

    getDynamicsData = async (metadata: Requirement[]) => {
        try {
            Xrm.WebApi.retrieveRecord(this.entityName, this.props.context?.parameters.entityId.raw!)
                .then((result) => {
                    const entityData = (result as Dictionary<any>);
                    const entityName = this.entityName;
                    let initialData = {} as Dictionary<any>;
                    metadata.filter((item) => { return item.type === "Data" }).forEach((item) => {
                        let req = item as DataRequirement;
                        let mappedKey = ConfigManager.getDynamicsProperty(entityName, req.dataField?.propertyName!);
                        if (mappedKey) {
                            initialData[req.dataField?.propertyName!] = entityData[mappedKey];
                        }
                    });
                    this.setState({ initialData: initialData, metadata: metadata });
                });
        } catch (error) { this.setState({ metadata: metadata }); console.log(error); }
    }

    onFieldUpdate = async (e: FieldChangeEvent) => {
        const { data } = this.state;
        data[e.key] = { value: e.value, type: e.type };
        this.setState({ data: data });
    }

    onInitiateClick = (selectedAccessLayers: Dictionary<any>) => {
        const { data } = this.state;
        this.setState({ isLoading: true, accessLayerModalIsOpen:false });
        this.props.onInitiateOnboardingClick(data, selectedAccessLayers as { businessRelatedAccessLayers: string, geographicAccessLayers: string });
    }
    
    onScreenValidate = (valid: boolean) => {
        this.setState({ isValid: valid });
    }

    onSearchClick = () => {
        const { entityType, data } = this.state;
        this.setState({ isLoading: true });
        let properties = {} as Dictionary<any>;
        for (var key in data) { properties[key] = data[key].value; }
        this.executeWithPermissionHandling(this.fenXClient.searchForDuplicatesEntity(entityType, properties).then(async (response) => {
            const updatedResponse = await Promise.all((response as EnhancedEntityDto[]).map(async (entity) => {
                const accessLevel = await this.userProfileManager.evaluateAccessLayerDto(entity.accessLayers as AccessLayerDto, AccessLayerDataTypeDto.Entity)
                entity.isAccessible = accessLevel === "Full Access";
                return entity;
            }));
            this.setState({ isLoading: false, searchResults: updatedResponse, isSearchComplete: true });
        })).catch((err) => { Notification.showError("Error searching for legal entity", err); this.setState({ isLoading: false }); });
    }

    getSearchParameters = (metadata: Requirement[], currentPage: number, searchResults: EnhancedEntityDto[]) => {
        const modalWidth = ModalStyle.width - 83;
        const buttonWidth = 125;
        let columnMetadata = _.cloneDeep(metadata)
            .filter((r: DataRequirement) => { return r.isIndexable; })
            .sort((r1: DataRequirement, r2: DataRequirement) => { return (r1.order ?? 0) - (r2.order ?? 0) });
        const columnWidth = (modalWidth - buttonWidth) / (columnMetadata?.length ?? 4);
        let columns = columnMetadata.map((req: DataRequirement) => {
            return {
                name: req.name,
                key: req.dataField?.propertyName,
                data: req,
                onRender(item?: EntityDto, index?, column?) {
                    var property = Object.entries(item?.properties!).length ? item?.properties![column!.key] as SinglePropertyDto : { value: "" };
                    return (<Text>{(column?.data.dataField?.propertyType === "date" && property?.value) ? moment(property?.value).format("YYYY-MM-DD") : property?.value}</Text>);
                },
                minWidth: columnWidth - 50,
                maxWidth: columnWidth,
                currentWidth: columnWidth
            } as IColumn
        });

        const onSubscribeClick = this.props.onSubscribeClick;
        columns.push({
            name: "",
            key: "actions",
            onRender(item?, index?, column?) {
                const buttonStyles = item.isAccessible ? {} : { root: {border: "1px solid rgb(138, 136, 134) !important"}}
                return (
                <TooltipHost content={item?.isAccessible ? undefined : <><div style={{textAlign: "center"}}>You do not have the relevant permissions to view this page.</div><div style={{textAlign: "center"}}>Please contact your User Access Administrator.</div></>}>
                    <DefaultButton onClick={() => { onSubscribeClick(item.id); }} disabled={!item.isAccessible} styles={{ ...buttonStyles}}>Subscribe</DefaultButton>
                </TooltipHost>
            )},
            minWidth: buttonWidth - 10,
            maxWidth: buttonWidth,
            currentWidth: buttonWidth
        });

        const pageSize = 5;
        const dataLength = searchResults?.length ?? 0;
        const pageCount = Math.ceil(dataLength / pageSize);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize > dataLength ? dataLength : start + pageSize;
        let pageData = searchResults?.slice(start, end);

        return {
            columns: columns,
            data: pageData,
            pageCount: pageCount,
            isFirst: start === 0,
            isLast: end === dataLength - 1,
            startIndex: start,
            endIndex: end,
            total: searchResults?.length ?? 0
        }

    }

    onModalDismiss = () => {
        this.setState({ accessLayerModalIsOpen: false });
    }

    onCancelAccessLayerClick = () => {
        this.setState({accessLayerModalIsOpen: false});
    }

    render = () => {
        const { metadata, initialData, isLoading, isSearchComplete, searchResults, data, currentPage, accessLayerModalIsOpen, isAccessLayerValid: isAcceeLayerValid } = this.state;
        let currentData = _.cloneDeep(initialData);
        for (var key in data) { currentData[key] = data[key].value; }
        const searchData = this.getSearchParameters(metadata, currentPage, searchResults);

        return (
            <>
                <div style={{ padding: "5px 20px", margin: "0px 30px" }}>
                    <RequirementScreen
                        jurisdictions={[{ jurisdiction: "Global" } as VersionedJurisdictionDto]}
                        policyCategories={["Basic Details"]}
                        policyRequirementType="Data"
                        key={"RequirementScreen-NewRequest"}
                        hideSectionLabel
                        id={"NewRequestScreen"}
                        isLoading={isLoading}
                        initialData={currentData}
                        metadata={metadata}
                        onScreenValidate={this.onScreenValidate}
                        onFieldUpdate={this.onFieldUpdate}>
                        <div key="SearchButtonWrapper" style={{ padding: "20px 0px 35px 0px", textAlign: "right", marginTop: 20 }}>
                            <PrimaryButton key="btnNewRequestSearch" disabled={!this.state.isValid} styles={{ root: { marginRight: 10 } }} onClick={this.onSearchClick}>Search</PrimaryButton>
                        </div>
                        <div key="SearchResultsWrapper" hidden={!isSearchComplete} style={{ padding: "0px 0px 35px 0px", textAlign: "right" }}>
                            <DetailsList selectionMode={SelectionMode.none} items={searchData.data} columns={searchData.columns} />
                            <Stack horizontal>
                                <Stack.Item styles={{ root: { width: "50%", fontSize: 12, display: "flex", alignItems: "center" } }}>{searchData.total ? searchData.startIndex + 1 : 0} - {searchData.endIndex} of {searchData.total}</Stack.Item>
                                <Stack.Item styles={{ root: { width: "50%", justifyContent: "end", alignContent: "end", textAlign: "right", fontSize: 12, display: "flex", alignItems: "center" } }}>
                                    <IconButton onClick={() => { this.setState({ currentPage: 1 }) }} disabled={searchData.isFirst || !searchData.total} styles={{ root: { color: "#666", fontSize: 10, selectors: { ":disabled": { backgroundColor: "white" } } } }} iconProps={{ iconName: "Previous" }} />
                                    <IconButton onClick={() => { this.setState({ currentPage: currentPage - 1 }) }} disabled={searchData.isFirst || !searchData.total} styles={{ root: { color: "#666", fontSize: 10, selectors: { ":disabled": { backgroundColor: "white" } } } }} iconProps={{ iconName: "DecreaseIndentArrow" }} />
                                    Page {currentPage}
                                    <IconButton onClick={() => { this.setState({ currentPage: currentPage + 1 }) }} disabled={currentPage >= searchData.pageCount} styles={{ root: { color: "#666", fontSize: 10, selectors: { ":disabled": { backgroundColor: "white" } } } }} iconProps={{ iconName: "IncreaseIndentArrow" }} />
                                </Stack.Item>
                            </Stack>
                        </div>
                        <div key="NewRequestButtonsWrapper" hidden={!isSearchComplete} style={{ padding: "20px 0px 35px 0px", textAlign: "right", marginTop: 20 }}>
                            <PrimaryButton key="btnNewRequestContinue" disabled={!this.state.isValid} styles={{ root: { marginRight: 10 } }} onClick={() => { this.setState({ accessLayerModalIsOpen: true }) }}>Continue</PrimaryButton>
                            <DefaultButton key="btnNewRequestCancel" onClick={this.props.onInitiateCancelClick}>Cancel</DefaultButton>
                        </div>
                    </RequirementScreen>
                    <Modal titleAriaId={"id"}
                        isBlocking={true}
                        isOpen={accessLayerModalIsOpen}
                        onDismiss={this.onModalDismiss}>
                        <ModalContent key={"NewRequestAccessLayersModalContent"} title={"Select access layers"} onDismissClick={this.onModalDismiss}>
                            <NewRequestAccessLayers onInitiateOnboardingClick={this.onInitiateClick} onModalDismiss={this.onModalDismiss}  />
                        </ModalContent>
                    </Modal>
                </div>
                {this.renderPermissionModal()}
            </>
        );
    }
}
