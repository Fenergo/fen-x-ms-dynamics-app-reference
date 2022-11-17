import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode, Stack, TooltipHost } from "@fluentui/react";
import moment from "moment";
import React from "react";
import { FenXApi } from "../../services/axios/AxiosClient";
import { AccessLayerDataTypeDto } from "../../services/Clients/AuthorizationQueryClient";
import { AccessLayerDto, IJourneyInstanceDto, JourneyInstanceDto, JourneyInstanceLightDto } from "../../services/Clients/JourneyQueryClient";
import { LoadingSpinner } from "../loader/loader";
import { IPermission, PermissionModal } from "../modal/permissionModal";
import { AccessLevel, UserProfileManager } from "../utility/userProfileManager";
import { Notification } from "../utility/notification";

interface IJourneyList {
    entityId: string;
    onSelectedChanged?: (id:string | null) => void;
    isLoading?: boolean;
}

interface EnhancedJourneyInstanceLightDto extends JourneyInstanceLightDto {
    journeyAccessLevel?: AccessLevel;
}

interface IJourneyListState extends IPermission {
  journeys: IJourneyInstanceDto[];
  columns: IColumn[];
  isLoading: boolean;
}

export class JourneyList extends PermissionModal<IJourneyList> {
    state: IJourneyListState;
    userProfileManager = new UserProfileManager();

    constructor(props: IJourneyList | Readonly<IJourneyList>){
        super(props);
        const columns: IColumn[] = [
            {
                key: 'name',
                name: 'Name',
                ariaLabel: '',
                isIconOnly: false,
                fieldName: 'name',
                minWidth: 140,
                maxWidth: 140,
                isRowHeader: true,
                isResizable: false,
                isSorted: false,
                isSortedDescending: false,
                sortAscendingAriaLabel: 'Sorted A to Z',
                sortDescendingAriaLabel: 'Sorted Z to A',
                onColumnClick: this._onColumnClick,
                onRender: (item: EnhancedJourneyInstanceLightDto) => {
                  if (item.journeyAccessLevel !== "Full Access") {
                    return <TooltipHost content="User is missing one or more required access layers."><span>{item.name}</span></TooltipHost>
                  }
                  return <span>{item.name}</span>
                },
              },{
                key: 'status',
                name: 'Status',
                ariaLabel: '',
                isIconOnly: false,
                fieldName: 'status',
                isRowHeader: false,
                minWidth: 80,
                maxWidth: 100,
                isResizable: false,
                isCollapsible: false,
                isSorted: false,
                onColumnClick: this._onColumnClick,
                onRender: (item: IJourneyInstanceDto) => (
                  <span>{item.status}</span>
                ),
              },{
                key: 'started',
                name: 'Started',
                ariaLabel: '',
                isIconOnly: false,
                fieldName: 'started',
                isRowHeader: false,
                isResizable: false,
                onColumnClick: this._onColumnClick,
                minWidth: 100,
                maxWidth: 100,
                onRender: (item: IJourneyInstanceDto) => (
                  <span>{moment(item.started!).format('yyyy-MM-DD')}</span>
                ),
              }
        ];
        this.state = { ...this.state, journeys: [], columns: columns, isLoading: false } as IJourneyListState;
    }

    fenXClient = FenXApi.getInstance();
    delay = (ms: number) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    componentDidMount = async () => {
      await this.getJourneys(this.props.entityId);
    }

    getJourneys = async (entityId: string) => {
        if (!this.fenXClient) return;
        this.setState({isLoading: true});
        await this.delay(1000);
        await this.executeWithPermissionHandling(this.fenXClient.searchJourneyInstanceByEntityId(entityId)
          .then(async (result) => {
            const updatedResult = await Promise.all((result as EnhancedJourneyInstanceLightDto[]).map(async journey => {
              journey.journeyAccessLevel = await this.userProfileManager.evaluateAccessLayerDto(journey.accessLayers as AccessLayerDto, AccessLayerDataTypeDto.Journey);
              return journey
            }));
            return updatedResult;
          })
          .then((updatedResult) => {
            const filteredResult = updatedResult!.filter(item => item.journeyAccessLevel !== "No Access" );
            return filteredResult;
          })
          .then((filteredUpdatedResult) => {
            this.setState({ journeys: filteredUpdatedResult, columns: this.state.columns, isLoading: false });
          }))
          .catch((error) => { Notification.showError("Error searching for journey instance.", error) });
        this.setState({ isLoading: false }); 
    }

    public refreshList = async () =>{
      await this.getJourneys(this.props.entityId);
    }

    getKey(item: any, index?: number): string {
      return ("journey-" + item.id + "-" + item.started);
    }

    selection = new Selection({
      onSelectionChanged: () => {
        const selected = this.selection.getSelection() as JourneyInstanceDto[];
        var selectedId = (selected.length) ? selected[0].id! : null;
        if(this.props.onSelectedChanged) this.props.onSelectedChanged(selectedId);
      },
      canSelectItem: (item: any, index?) => {
        return (item.journeyAccessLevel === "Full Access");
      }
    })

    render = () => {
        const { columns, journeys, isLoading } = this.state;
        if (isLoading) {
          return (
            <Stack verticalFill={true} verticalAlign="center" horizontalAlign="center">
              <Stack.Item align="center">
                <span><LoadingSpinner/></span>
              </Stack.Item>
            </Stack>
          );
        } else {
        return (
            <>
              <div>
                  <DetailsList 
                      styles={{root:{width: "100%", overflow: "hidden"}, contentWrapper:{width: "100%"}}}
                      selection={this.selection} 
                      selectionPreservedOnEmptyClick={true} 
                      layoutMode={DetailsListLayoutMode.justified} 
                      items={journeys} 
                      columns={columns} 
                      selectionMode={SelectionMode.single} 
                      getKey={this.getKey}></DetailsList>
              </div>
              {this.renderPermissionModal()}
            </>
        );}

    }

    private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void =>  {
        const { columns, journeys } = this.state;
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
          if (newCol === currColumn) {
            currColumn.isSortedDescending = !currColumn.isSortedDescending;
            currColumn.isSorted = true;
          } else {
            newCol.isSorted = false;
            newCol.isSortedDescending = true;
          }
        });
        const newItems = _copyAndSort(journeys, currColumn.fieldName!, currColumn.isSortedDescending);
        this.setState({
          columns: newColumns,
          journeys: newItems
        });
      };
}

  function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  };