import { CommandBarButton, DefaultButton, DetailsList, DetailsListLayoutMode, IColumn, IconButton, Modal, OverflowSet, PrimaryButton, SelectionMode, Stack, Text, TooltipHost } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { DataGroupVersionDto } from "../../../../services/Clients/PolicyQueryClient";
import { ModalStyle } from "../../../../styles/modal";
import { ModalContent } from "../../../modal/modalContent";
import { DataGroupManager } from "../../../utility/dataGroupManager";
import { Notification } from "../../../utility/notification";
import { DataGroupAddModal } from "./dataGroup/dataGroupAddModal";
import { ISimpleFieldType } from "./simpleFieldType";
import uuid from 'react-native-uuid';
import _ from "lodash";
import { DataGroupEditModal } from "./dataGroup/dataGroupEditModal";
import moment from "moment";
import { FieldValidationMessage } from "./fieldValidationMessage";

export interface IDataGroup extends ISimpleFieldType {
    pageSize?: number;
}

export class DataGroup extends React.Component<IDataGroup> {
    state = { columns: [] as IColumn[], validationMessages: [] as string[], dataGroup: {} as DataGroupVersionDto, currentPage: 1, isAddOpen: false, isEditOpen: false, isDeleteOpen: false, data: [] as Dictionary<any>[], selectedItem: {} as Dictionary<any> }
    fenXClient = FenXApi.getInstance();
    dataGroupManager = new DataGroupManager();
    
    componentDidMount = () => {
        this.dataGroupManager.getDataGroupById(this.props.metadata.dataField?.propertyTypeId!).then((dataGroup) => {
            if(!dataGroup){
                Notification.showError("Data group '" + this.props.metadata.dataField?.propertyTypeId! + "' not found.");
                dataGroup = {} as DataGroupVersionDto;
            }
            let data = [] as Dictionary<any>[];
            for (var key in this.props.data[this.props.metadata.dataField?.propertyName!]) {
                let item = this.props.data[this.props.metadata.dataField?.propertyName!][key];
                item["id"] = key;
                data.push(item);
            }
            if (dataGroup?.primaryDataGroupField) {
                let dgf = dataGroup.dataGroupFields?.filter((f) => f.dataField?.propertyName === dataGroup?.primaryDataGroupField);
                if (dgf?.length) dgf[0].dataField!.propertyType = "multiselect";
            }
            this.setState({ dataGroup: dataGroup, data: data, columns: this.createColumns(dataGroup, data) });
            this.onValidateComponent(dataGroup!, data);
            this.propagateOnChange(data);
        }).catch((error) => Notification.showError("Error fetching data group.", error));
    }

    propagateOnChange = (data: Dictionary<any>[], initialCollection?: Dictionary<any>) => {
        if (this.props.onChange) {
            let collections = initialCollection ?? {} as Dictionary<any>;
            data.forEach((row) => {
                const id = row["id"];
                collections[id] = { properties: row.properties };
            });

            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                type: "Collection",
                collections: collections,
                dataGroupId: this.props.metadata.dataField?.propertyTypeId
            });
        }
    }

    onValidateComponent = (dataGroupInfo?: DataGroupVersionDto, newData?: Dictionary<any>[]) => {
        let { data, dataGroup } = this.state;
        if (!this.props.onValidate) return;
        data = newData ?? data;
        dataGroup = dataGroupInfo ?? dataGroup;
        let isValid = true;
        var messages = [];
        if (this.props.metadata.validationRule?.validationData?.isMandatory?.active && data.length === 0) {
            isValid = false;
            messages.push(this.props.metadata.validationRule?.validationData?.isMandatory?.message);
        }

        //Minimum cardinality
        if (this.props.metadata.validationRule?.validationData?.collectionMinimumCount?.active) {
            if (this.props.metadata.validationRule?.validationData?.collectionMinimumCount?.requiredTypesMinCount) {
                for (var key in this.props.metadata.validationRule?.validationData?.collectionMinimumCount?.requiredTypesMinCount) {
                    var items = data.filter((i) => { return i.properties[dataGroup.primaryDataGroupField!] === key });
                    if (items.length < this.props.metadata.validationRule?.validationData?.collectionMinimumCount?.requiredTypesMinCount[key]) {
                        isValid = false;
                        messages.push(key + ": " + this.props.metadata.validationRule?.validationData?.collectionMinimumCount.message);
                    }
                }
            }

            if (data.length < this.props.metadata.validationRule?.validationData?.collectionMinimumCount?.overallMinimumCount!) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.collectionMinimumCount.message);
            }
        }

        //Maximum cardinality
        if (this.props.metadata.validationRule?.validationData?.collectionMaximumCount?.active) {
            if (this.props.metadata.validationRule?.validationData?.collectionMaximumCount?.requiredTypesMaxCount) {
                for (var key in this.props.metadata.validationRule?.validationData?.collectionMaximumCount?.requiredTypesMaxCount) {
                    var items = data.filter((i) => { return i.properties[dataGroup.primaryDataGroupField!] === key });
                    if (items.length > this.props.metadata.validationRule?.validationData?.collectionMaximumCount?.requiredTypesMaxCount[key]) {
                        isValid = false;
                        messages.push(key + ": " + this.props.metadata.validationRule?.validationData?.collectionMaximumCount.message);
                    }
                }
            }

            if (data.length > this.props.metadata.validationRule?.validationData?.collectionMaximumCount?.overallMaximumCount!) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.collectionMaximumCount?.message);
            }
        }

        if(this.props.metadata.isReadOnly || this.props.isReadOnly) isValid=true;
        this.setState({isValid: isValid, validationMessages: messages});
        this.props.onValidate({
            field: this.props.metadata.dataField?.propertyName!,
            isValid: isValid
        });
    }

    render = () => {
        const { columns, dataGroup, currentPage, isAddOpen, isEditOpen, data, isDeleteOpen, selectedItem, validationMessages } = this.state;
        const pageSize = this.props.pageSize ?? 5;
        const dataLength = data?.length ?? 0;
        const pageCount = Math.ceil(dataLength / pageSize);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize > dataLength ? dataLength : start + pageSize;
        let pageData = data?.slice(start, end);

        return (
            <Stack key={"DataGroupStack" + this.props.metadata.id} verticalFill={true} styles={{ root: { position: "relative", width: "100%" } }}>
                {(this.props.isReadOnly || this.props.metadata.isReadOnly) ? ('') : (
                    <div style={{ position: "absolute", right: 45, top: -32, fontSize: 12 }}>
                        <TooltipHost tooltipProps={{ onRenderContent: () => (<Text>Add {dataGroup.name}</Text>) }}>
                            <IconButton onClick={this.onAddClick} iconProps={{ iconName: "Add" }} styles={{ root: { zIndex: 999, height: 23 }, icon: { color: "#666", fontSize: 10 } }} />
                        </TooltipHost>
                    </div>)}
                <Stack key={"DataGroupStack2" + this.props.metadata.id} styles={{ root: { width: "100%" } }}>
                    <Stack.Item>
                        <FieldValidationMessage key={"fvm-" + this.props.metadata.id} messages={validationMessages} />
                    </Stack.Item>
                    <Stack.Item>
                        {(dataGroup?.dataGroupFields) ? (
                            <DetailsList
                                key={"DataGroupGrid-" + this.props.metadata.id}
                                columns={columns}
                                items={data.length ? pageData : [{}]}
                                isHeaderVisible={data.length > 0}
                                selectionMode={SelectionMode.none}
                                layoutMode={DetailsListLayoutMode.justified}
                                styles={{ root: { width: "100%" }, headerWrapper: { ".ms-FocusZone": { paddingTop: "0 !important" } }, contentWrapper: { selectors: { ".ms-DetailsRow-fields": { backgroundColor: "white !important" } } } }}
                            />) : ('')}
                    </Stack.Item>
                    <Stack.Item>
                        <Stack key={"DataGroupStack3" + this.props.metadata.id} horizontal>
                            <Stack.Item styles={{ root: { width: "50%", fontSize: 12, display: "flex", alignItems: "center" } }}>{dataLength ? start + 1 : dataLength} - {end} of {dataLength}</Stack.Item>
                            <Stack.Item styles={{ root: { width: "50%", justifyContent: "end", alignContent: "end", textAlign: "right", fontSize: 12, display: "flex", alignItems: "center" } }}>
                                <IconButton onClick={() => { this.setState({ currentPage: 1 }) }} disabled={currentPage === 1 || dataLength === 0} styles={{ root: { color: "#666", fontSize: 10, selectors: { ":disabled": { backgroundColor: "white" } } } }} iconProps={{ iconName: "Previous" }} />
                                <IconButton onClick={() => { this.setState({ currentPage: currentPage - 1 }) }} disabled={currentPage === 1 || dataLength === 0} styles={{ root: { color: "#666", fontSize: 10, selectors: { ":disabled": { backgroundColor: "white" } } } }} iconProps={{ iconName: "DecreaseIndentArrow" }} />
                                Page {currentPage}
                                <IconButton onClick={() => { this.setState({ currentPage: currentPage + 1 }) }} disabled={currentPage >= pageCount} styles={{ root: { color: "#666", fontSize: 10, selectors: { ":disabled": { backgroundColor: "white" } } } }} iconProps={{ iconName: "IncreaseIndentArrow" }} />
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                </Stack>
                <Modal key={"dataGroupAddModal" + this.props.metadata.id} titleAriaId={"id"}
                    isBlocking={true}
                    isOpen={isAddOpen}
                    onDismiss={this.onModalDismiss}>
                    <ModalContent key={"dataGroupAddModalContent" + this.props.metadata.id} title={"Add " + dataGroup.name} onDismissClick={this.onModalDismiss}>
                        <DataGroupAddModal onAddAnotherClick={this.onAddModalAddAnotherClick} onSaveClick={this.onAddModalSaveClick} dataGroup={dataGroup} />
                    </ModalContent>
                </Modal>
                <Modal key={"dataGroupDeleteModal" + this.props.metadata.id} titleAriaId={"id"}
                    isBlocking={true}
                    isOpen={isDeleteOpen}
                    onDismiss={this.onModalDismiss}>
                    <ModalContent width={350} key={"dataGroupDeleteModalContent" + this.props.metadata.id} title="Confirm Deletion" onDismissClick={this.onModalDismiss}>
                        <div style={{ padding: "0 10px 0 10px" }}>
                            <Text>Are you sure you want to permanently remove this row?</Text>
                        </div>
                        <div style={{ padding: "20px 10px 35px 0px", textAlign: "right", marginTop: 20 }}>
                            <DefaultButton key="btnDeleteCancel" style={{ marginRight: 10 }} onClick={this.onModalDismiss}>Cancel</DefaultButton>
                            <PrimaryButton key="btnDeleteConfirm" onClick={this.onConfirmDelete}>Confirm</PrimaryButton>
                        </div>
                    </ModalContent>
                </Modal>
                <Modal key={"dataGroupEditeModal" + this.props.metadata.id} titleAriaId={"id"}
                    isBlocking={true}
                    isOpen={isEditOpen}
                    onDismiss={this.onModalDismiss}>
                    <ModalContent key={"dataGroupEditeModalContent" + this.props.metadata.id} title={"Edit " + dataGroup.name} onDismissClick={this.onModalDismiss}>
                        <DataGroupEditModal currentData={selectedItem.properties} onSaveClick={this.onEditModalSaveClick} dataGroup={dataGroup} />
                    </ModalContent>
                </Modal>
            </Stack>
        );

    }

    onEditModalSaveClick = (item: Dictionary<any>) => {
        const { selectedItem, data } = this.state;
        const index = data.indexOf(selectedItem);
        if (index > -1) {
            data[index].properties = _.cloneDeep(item);
        }
        this.setState({ data: data, isEditOpen: false, selectedItem: {} });
        this.onValidateComponent();
        this.propagateOnChange(data);
    }

    onEditDataGroupItem = (item: Dictionary<any>) => {
        this.setState({ isEditOpen: true, selectedItem: item });
    }

    onDeleteDataGroupItem = (item: Dictionary<any>) => {
        this.setState({ isDeleteOpen: true, selectedItem: item });
    }

    onConfirmDelete = () => {
        const { selectedItem, data, dataGroup } = this.state;
        const index = data.indexOf(selectedItem);
        if (index > -1) {
            data.splice(index, 1);
        }
        this.setState({ data: data, isDeleteOpen: false, selectedItem: {}, columns: this.createColumns(dataGroup, data) });
        this.onValidateComponent();
        this.propagateOnChange(data);
    }

    onCopyDataGroupItem = (item: Dictionary<any>) => {
        const newItem = _.cloneDeep(item.properties);
        this.addNewDataGroupItem(newItem);
    }

    onAddModalSaveClick = (item: Dictionary<any>) => {
        const { dataGroup } = this.state;
        if (dataGroup.primaryDataGroupField) {
            var values = item[dataGroup.primaryDataGroupField] as string;
            values.split("|").forEach((val) => {
                let newItem = _.cloneDeep(item);
                newItem[dataGroup.primaryDataGroupField!] = val;
                this.addNewDataGroupItem(newItem);
            });
        }
        else {
            this.addNewDataGroupItem(item);
        }
        this.onModalDismiss();
    }

    onAddModalAddAnotherClick = (item: Dictionary<any>) => {
        this.onAddModalSaveClick(item);
        this.setState({ isAddOpen: true });
    }

    addNewDataGroupItem = (item: Dictionary<any>) => {
        const { data, dataGroup } = this.state;
        const itemId = uuid.v4().toString();

        let collections = {} as Dictionary<any>;
        collections[itemId] = { properties: _.cloneDeep(item) };
        this.propagateOnChange(data, collections);
        item["id"] = itemId;
        data.push({ id: itemId, properties: item });
        this.setState({ data: data, columns: this.createColumns(dataGroup, data) });
        this.onValidateComponent();
    }

    onAddClick = () => {
        this.setState({ isAddOpen: true });
    }

    onModalDismiss = () => {
        this.setState({ isAddOpen: false, isEditOpen: false, isDeleteOpen: false });
    }

    createColumns = (dataGroup: DataGroupVersionDto | null, data: Dictionary<any>[]) => {
        const modalWidth = ModalStyle.width - 48;
        const columnWidth = modalWidth / (dataGroup?.dataGroupFields?.length ?? 4);
    
        const columns = data.length ? (dataGroup?.dataGroupFields?.sort((df1, df2) => { return (df1.order ?? 0) - (df2.order ?? 0) }).map((dgf, i) => {
            return {
                key: dgf.dataField?.propertyName,
                name: dgf.name,
                minWidth: columnWidth - 50,
                maxWidth: columnWidth,
                currentWidth: columnWidth,
                isRowHeader: i === 0,
                isResizable: false,
                data: dgf,
                isSortedDescending: false,
                isSorted: false,
                onColumnClick: this._onColumnClick,
                onRender: (item: any, index, column) => (
                    <Text>{(column?.data.dataField?.propertyType === "date" && item.properties[dgf.dataField?.propertyName!]) ? moment(item.properties[dgf.dataField?.propertyName!]).format("YYYY-MM-DD") : item.properties[dgf.dataField?.propertyName!]}</Text>
                ),
            } as IColumn;
        }) ?? []) : [{
            key: "emptyMessage", onRender: (item: any) => (<div style={{ color: "#666", textAlign: "center", justifyContent: "center" }}><b>No data available</b></div>)
        } as IColumn];
    
        if (data.length && !(this.props.isReadOnly || this.props.metadata.isReadOnly)) {
            columns.push({
                key: "actions",
                name: "",
                minWidth: 20,
                maxWidth: 20,
                currentWidth: 20,
                isRowHeader: false,
                isResizable: false,
                onRender: (item: any) => (
                    <>
                        <OverflowSet
                            onRenderItem={(item) => {
                                return (<CommandBarButton
                                    aria-label={item.name}
                                    iconProps={{ iconName: item.icon }}
                                    onClick={item.onClick}
                                />)
                            }}
                            onRenderOverflowButton={(overflowItems) => {
                                return (<CommandBarButton
                                    styles={{ root: { height: "100%" } }}
                                    menuIconProps={{ iconName: 'MoreVertical' }}
                                    menuProps={{ items: overflowItems! }}
                                />)
                            }}
                            overflowItems={[
                                {
                                    key: 'edit',
                                    icon: 'Edit',
                                    name: 'Edit',
                                    title: 'Edit',
                                    onClick: () => { this.onEditDataGroupItem(item); }
                                },
                                {
                                    key: 'copy',
                                    icon: 'Copy',
                                    name: 'Copy',
                                    title: 'Copy',
                                    onClick: () => { this.onCopyDataGroupItem(item); }
                                },
                                {
                                    key: 'delete',
                                    icon: 'Delete',
                                    name: 'Delete',
                                    title: 'Delete',
                                    onClick: () => { this.onDeleteDataGroupItem(item); }
                                }
                            ]}
                        />
                    </>
                ),
            } as IColumn)
        }
        return columns;
    }

    _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void =>  {
        const { columns, data } = this.state;

        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => currCol.key === column.key)[0];
        newColumns.forEach((column: IColumn) => {
            if (column === currColumn) {
                currColumn.isSorted = true;
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
            } else {
                column.isSorted = false;
                column.isSortedDescending = true;
            }
        });
        const newData = this._copyAndSort(data, currColumn.key!, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            data: newData
        });
    };
    
    _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
        const key = columnKey as keyof T;
        return items.slice().sort((a: any, b: any) => ((isSortedDescending ? a.properties[key] < b.properties[key] : a.properties[key] > b.properties[key]) ? 1 : -1));
    }
}