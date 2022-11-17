import * as React from "react";
import { Section } from "../components/screen/section";
import { ThemeProvider, PrimaryButton, Stack, Text, Modal, IconButton, ITextProps, TooltipHost } from "@fluentui/react";
import { containerStyles } from "../styles/container";
import { messageStyles, titleStyle } from "../styles/container-heading";
import * as uiConfigData from "../config/ui_config.json";
import { colourPalette } from "../styles/theme";
import { rootStackDimensions } from "../styles/root-stack-dimensions";
import { IInputs } from "../generated/ManifestTypes";
import { FenXApi } from "../services/axios/AxiosClient";
import { JourneyList } from "../components/journey/journeyList";
import { Journey } from "../components/journey/journey";
import { buttonStyles } from "../styles/buttons";
import { AppProvider } from "../services/azure/AppContext";
import { IPublicClientApplication, PopupRequest } from "@azure/msal-browser";
import { Login } from "../services/azure/Login";
import { NewRequest } from "../components/newRequest";
import { Dictionary } from "@reduxjs/toolkit";
import { MsalProvider } from "@azure/msal-react";
import { AccessLayerDto, IJourneyInstanceDto } from "../services/Clients/JourneyQueryClient";
import { ConfigManager } from "../components/utility/configManager";
import { ModalContent } from "../components/modal/modalContent";
import { Notification } from "../components/utility/notification";
import { version } from "../../autobuild_version";
import { JourneyLaunch } from "../components/journeyLaunch";
import { IPermission, PermissionModal } from "../components/modal/permissionModal";
import { EntityDraftDto } from "../services/Clients/EntityDataQueryClient";

export interface ILandingPage extends React.PropsWithChildren {
  context: ComponentFramework.Context<IInputs>;
  onChange: (newValue: string | undefined) => void;
  tokenRequest: PopupRequest;
  msalInstance: IPublicClientApplication;
  leId: string | undefined;
  baseURL: string;
}

interface ILandingPageState extends IPermission {
  selectedJourney: IJourneyInstanceDto;
  modalIsOpen: boolean;
  isJourneyListLoading: boolean;
  isJourneyViewLoading: boolean;
  isExpanded: boolean;
  startNewJourneyIsOpen: boolean;
  entity: EntityDraftDto;
}

export class LandingPage extends PermissionModal<ILandingPage> {
  state: ILandingPageState = {
    ...this.state,
    selectedJourney: {} as IJourneyInstanceDto,
    modalIsOpen: false,
    isJourneyListLoading: false,
    isJourneyViewLoading: false,
    isExpanded: true,
    startNewJourneyIsOpen: false,
    entity: {} as EntityDraftDto,
  };

  constructor(props: ILandingPage | Readonly<ILandingPage>) {
    super(props);
  }

  fenXClient = FenXApi.getInstance(this.props.baseURL);
  hasId = this.props.leId ? true : false;
  leId = this.props.leId!;
  timer: NodeJS.Timer;
  timerInterval = 3000;
  journeyListRef = React.createRef<JourneyList>();
  useTokenExchange = sessionStorage.getItem("enable_token_exchange");

  onNewRequestClicked = async () => {
    if (!await this.checkUserHasPermission("JourneyCreate")) return;
    this.setState({ modalIsOpen: true }); 
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  onCreateClicked = async (
    data: Dictionary<any>,
    selectedAccessLayers: {
      businessRelatedAccessLayers: string;
      geographicAccessLayers: string;
    }
  ) => {
    if (!this.fenXClient) return;
    let entityType = ConfigManager.getReferenceData("EntityType", this.props.context?.parameters.entityName.raw!);
    this.executeWithPermissionHandling(
      this.fenXClient
        .createEntity({
          data: {
            type: entityType,
            policyJurisdictions: ["Global"],
            properties: data,
            accessLayers: new AccessLayerDto({
              businessRelated: selectedAccessLayers.businessRelatedAccessLayers.split("|"),
              geographic: selectedAccessLayers.geographicAccessLayers.split("|"),
            }),
          },
        })
        .then((result) => {
          Notification.showSuccess("Entity created succesfully!");
          this.hasId = result.data?.id != null && result.data?.id != undefined && result.data?.id != "";
          this.onEntityCreated(result.data?.id!, data, entityType!, selectedAccessLayers);
        })
    ).catch((error) => {
      Notification.showError("Error creating entity.", error);
    });
  };

    onEntityCreated = async (entityId: string, data: Dictionary<any>, entityType: string, selectedAccessLayers: { businessRelatedAccessLayers: string, geographicAccessLayers: string }) => {
        this.setState({ isJourneyListLoading: true });
        this.fenXClient.evaluateJourneySchema({ data: { properties: { ...data, entityType: { type: "Single", value: entityType } } } }, ["Client Onboarding"]).then((response) => {
            response?.forEach(async (schema) => {
                await this.executeWithPermissionHandling(this.fenXClient.createJourneyForEntity(entityId, schema.journeySchemaId!, new AccessLayerDto({ businessRelated: selectedAccessLayers.businessRelatedAccessLayers.split("|"), geographic: selectedAccessLayers.geographicAccessLayers.split("|") })).then(async (journey) => {
                    await this.executeWithPermissionHandling(this.fenXClient.createEntityDraft(entityId, { data: { journeyId: journey?.journeyInstanceId } })
                        .then((entityDraft) => {

                        })).catch((error) => { Notification.showError("Error creating entity draft.", error) });
                })).catch((error) => { Notification.showError("Error starting journey.", error) });
            });

        this.setState({ modalIsOpen: false });
        this.forceUpdate();
        this.props.onChange(entityId);
        this.setState({ isJourneyListLoading: false });
      })
      .catch((error) => {
        Notification.showError("Error fetching journey schemas.", error);
      });
  };

  onRefresh = async () => {
    const { selectedJourney } = this.state;
    await this.fenXClient
      .getJourneyInstanceById(selectedJourney.id!)
      .then((result) => {
        this.setState({ selectedJourney: result });
      })
      .catch((error) => Notification.showError("Error fetching journey details.", error));
  };

  onTaskModalToggle = (isOpen: boolean) => {
    const { selectedJourney } = this.state;
    if (!isOpen && selectedJourney?.id) {
      this.timer = setInterval(async () => {
        await this.onRefresh();
      }, this.timerInterval);
    } else {
      clearInterval(this.timer);
    }
  };

  onJourneySelect = async (journeyId: string | null) => {
    clearInterval(this.timer);
    if (journeyId === null) {
      this.setState({
        selectedJourney: null,
        modalIsOpen: this.state.modalIsOpen,
        isJourneyViewLoading: false,
      });
    }
    if (!this.fenXClient || journeyId == null) return;
    this.setState({ isJourneyViewLoading: true });
    // fetch journey instance
    await this.executeWithPermissionHandling(
      this.fenXClient.getJourneyInstanceById(journeyId!).then(async (journeyResult) => {
        this.timer = setInterval(async () => {
          await this.onRefresh();
        }, this.timerInterval);
        // then fetch entity draft
        await this.executeWithPermissionHandling(
          this.fenXClient.getEntityDraftData(journeyResult!.entityDraftId!, journeyResult!.entityId!).then((entityResult) => {
            this.setState({ selectedJourney: journeyResult, entity: entityResult });
          })
        ).catch((error) => {
          this.setState({ selectedJourney: null });
          Notification.showError("Error fetching entity draft", error);
        });
        this.setState({
          modalIsOpen: this.state.modalIsOpen,
          isJourneyViewLoading: false,
        });
      })
    ).catch((error) => {
      this.setState({ isJourneyViewLoading: false });
      Notification.showError("Error fetching journey details.", error);
    });
  };

  onModalDismiss = async () => {
    this.onTaskModalToggle(false);
    this.setState({
      selectedJourney: this.state.selectedJourney,
      modalIsOpen: false,
      startNewJourneyIsOpen: false,
    });
  };

  onJourneysToggleClick = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  onSubscribeClick = (id: string) => {
    this.props.onChange(id);
    this.hasId = true;
    this.setState({ modalIsOpen: false });
    this.forceUpdate();
  };

  onNewJourneyClick = () => {
    this.onTaskModalToggle(true);
    this.setState({ startNewJourneyIsOpen: true });
  };

  onJourneyListRefresh = () => {
    this.journeyListRef.current?.refreshList();
    this.onModalDismiss();
  };

  render = () => {
    const { selectedJourney, modalIsOpen, isJourneyListLoading, isJourneyViewLoading, isExpanded, startNewJourneyIsOpen, entity } = this.state;

    return (
      <ThemeProvider theme={colourPalette}>
        <AppProvider componentContext={this.props.context} tokenRequest={this.props.tokenRequest}>
          <MsalProvider instance={this.props.msalInstance}>
            <Login instance={this.props.msalInstance} useTokenExchange={Boolean(this.useTokenExchange)}></Login>
            <Stack horizontal {...rootStackDimensions} tokens={{ childrenGap: uiConfigData.stackChildrenGap }}>
              <Stack.Item styles={containerStyles(isExpanded ? uiConfigData.firstColumnWidth : uiConfigData.firstColumnCollapsedWidth, "visible", isExpanded ? 400 : undefined, undefined)}>
                <div>
                  <div style={{ position: "absolute", right: -5, top: -2 }}>
                    <TooltipHost content={isExpanded ? "Collapse Journey List" : "Expand Journey List"}>
                      <IconButton
                        onClick={this.onJourneysToggleClick}
                        styles={{
                          root: {
                            color: "black",
                            backgroundColor: "transparent !important",
                            zIndex: 999,
                          },
                          icon: { fontSize: 12, fontWeight: "normal" },
                        }}
                        iconProps={{
                          iconName: isExpanded ? "ChevronLeft" : "ChevronRight",
                        }}
                      />
                    </TooltipHost>
                  </div>
                  {this.hasId && isExpanded ? (
                    <div style={{ position: "absolute", right: 15, top: -2 }}>
                      <TooltipHost
                        id={"tltNewJourney"}
                        tooltipProps={{
                          onRenderContent: () => <>Launch New Journey</>,
                        }}
                      >
                        <IconButton
                          onClick={this.onNewJourneyClick}
                          styles={{
                            root: {
                              color: "black",
                              backgroundColor: "transparent !important",
                              zIndex: 999,
                            },
                            icon: { fontSize: 12, fontWeight: "normal" },
                          }}
                          iconProps={{ iconName: "Add" }}
                        />
                      </TooltipHost>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div hidden={isExpanded} style={{ textAlign: "center", marginTop: 30 }}>
                  <Text
                    {...{
                      ...titleStyle,
                      ...({
                        styles: { root: { writingMode: "vertical-rl" } },
                      } as ITextProps),
                    }}
                  >
                    Journeys
                  </Text>
                </div>
                <div style={{ height: "100%" }} hidden={!isExpanded}>
                  <Section evaluatedData={{}} isLoading={isJourneyListLoading} title="Journeys" horizontalAlign="center" alignChildren={this.hasId && !isJourneyListLoading ? "stretch" : "center"}>
                    {this.hasId ? (
                      <JourneyList ref={this.journeyListRef} entityId={this.props.leId!} onSelectedChanged={this.onJourneySelect} />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                          justifyContent: "center",
                          verticalAlign: "middle",
                          textAlign: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Stack tokens={{ childrenGap: 2 }}>
                          {sessionStorage.getItem("show_logo") == "true" ?
                          <Stack.Item align="center">
                            <svg width="50" height="50" viewBox="0 0 153 153" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" overflow="hidden">
                              <defs>
                                <clipPath id="clip0">
                                  <rect x="44" y="2263" width="153" height="153" />
                                </clipPath>
                              </defs>
                              <g clipPath="url(#clip0)" transform="translate(-44 -2263)">
                                <path
                                  d="M0 0 93.9999 76.5 0 153C24.3216 119.329 36.4822 93.8293 36.4822 76.5 36.4822 59.1706 24.3216 33.6705 0 0Z"
                                  fill="#0099D8"
                                  fillRule="evenodd"
                                  transform="matrix(-1 1.22465e-16 1.22465e-16 1 197 2263)"
                                />
                                <path d="M44 2263 138 2339.5 44 2416C68.3214 2382.33 80.4822 2356.83 80.4822 2339.5 80.4822 2322.17 68.3214 2296.67 44 2263Z" fill="#285981" fillRule="evenodd" />
                              </g>
                            </svg>
                          </Stack.Item> : ""}
                          <Stack.Item align="center">
                            <Text {...messageStyles} block>
                              &nbsp;
                            </Text>
                          </Stack.Item>
                          <Stack.Item align="center">
                            <Text {...messageStyles} block>
                              No journeys associated with entity.
                            </Text>
                          </Stack.Item>
                          <Stack.Item align="center">
                            <Text {...messageStyles} block>
                              Click "New Request" to launch new journey.
                            </Text>
                          </Stack.Item>
                          <Stack.Item align="center">
                            <Text {...messageStyles} block>
                              &nbsp;
                            </Text>
                          </Stack.Item>
                          <Stack.Item align="center">
                            <PrimaryButton styles={buttonStyles} onClick={this.onNewRequestClicked}>
                              New Request
                            </PrimaryButton>
                          </Stack.Item>
                        </Stack>
                      </div>
                    )}
                  </Section>
                </div>
              </Stack.Item>
              <Stack.Item styles={containerStyles(uiConfigData.secondColumnWidth, "unset", "70%", "2px")}>
                {selectedJourney?.id ? (
                  <Section evaluatedData={{}} isLoading={isJourneyViewLoading} key="screen-journeyInstance" title="Journey Viewer" horizontalAlign={"start"} alignChildren={"stretch"}>
                    <Journey onModalToggle={this.onTaskModalToggle} onRefresh={this.onRefresh} key={"journeyInstance-" + selectedJourney.id} journeyInstance={selectedJourney} entity={entity} />
                  </Section>
                ) : (
                  <Section evaluatedData={{}} isLoading={isJourneyViewLoading} key="screen-noJourneyInstance" title="Journey Viewer" horizontalAlign={"center"} alignChildren={"center"}>
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        verticalAlign: "middle",
                        textAlign: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Text {...messageStyles}>Please select a journey to view.</Text>
                    </div>
                  </Section>
                )}
              </Stack.Item>
            </Stack>
            <div>
              <small style={{ fontStyle: "italic", color: "#aeaeae" }}>
                {sessionStorage.getItem("isDevelopment") == "true" ? " Development" : ""} Build version {version}/{ sessionStorage.getItem("app_version")}
              </small>
            </div>
            <Modal titleAriaId={"id"} isBlocking={true} isOpen={modalIsOpen} onDismiss={this.onModalDismiss}>
              <ModalContent title="New Request" key={"NewRequestModalContent"} onDismissClick={this.onModalDismiss}>
                <NewRequest onSubscribeClick={this.onSubscribeClick} key={"NewRequestContent"} context={this.props.context} onInitiateCancelClick={this.onModalDismiss} onInitiateOnboardingClick={this.onCreateClicked}></NewRequest>
              </ModalContent>
            </Modal>
            <Modal titleAriaId={"id"} isBlocking={true} isOpen={startNewJourneyIsOpen} onDismiss={this.onModalDismiss} key="NewJourneyLaunchModal">
              <ModalContent key="NewJourneyLaunchModalContent" title="Launch new Journey" onDismissClick={this.onModalDismiss}>
                <JourneyLaunch key="NewJourneyLaunchModalContentComponent" onModalDismiss={this.onModalDismiss} onRefresh={this.onJourneyListRefresh} entityId={this.leId} />
              </ModalContent>
            </Modal>
            {this.renderPermissionModal()}
          </MsalProvider>
        </AppProvider>
      </ThemeProvider>
    );
  };
}
