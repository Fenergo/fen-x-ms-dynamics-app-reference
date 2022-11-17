import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { Stack, IStackTokens, CommandBarButton, Modal, TooltipHost } from "@fluentui/react";
import { TaskIcon } from "./taskCard/icon/taskIcon";
import { TaskName } from "./taskCard/card/taskName";
import { IJourneyInstanceDto, Task as TaskDto } from "../../services/Clients/JourneyQueryClient";
import { taskDiv, teamStyle } from "../../styles/task-link";
import { TeamsManager } from "../utility/teamsManager";
import { UserManager } from "../utility/userManager";
import { UserProfileManager } from "../utility/userProfileManager";
import { ModalContent } from "../modal/modalContent";
import { ReassignTaskModal } from "./taskCard/modal/reassignTask";
import { FenXApi } from "../../services/axios/AxiosClient";
import { Dictionary } from "@reduxjs/toolkit";
import { ReopenTaskModal } from "./taskCard/modal/reopenTask";
import { TeamDto, UserAuthorizationProfileDto, UserDto } from "../../services/Clients/AuthorizationQueryClient";

export interface ITaskComponent extends React.PropsWithChildren {
  metadata?: TaskDto;
  journeyInstance: IJourneyInstanceDto;
  onRefresh?: () => void;
  onModalToggle?: (isOpen: boolean) => void;
}

const iconStack: IStackTokens = {
  padding: 3,
}

const taskNameStack: IStackTokens = {
  padding: 10,
}

export class TaskComponent extends React.Component<ITaskComponent> {
  state = { allTeams: [] as TeamDto[], allUsers: [] as UserDto[], userProfile: {} as UserAuthorizationProfileDto, isReassignTaskOpen: false as boolean, isReopenTaskOpen: false as boolean, isTeamAccessible: false, isAssignedTo: false }
  
  teamsManager = new TeamsManager();
  userManager = new UserManager();
  userProfileManager = new UserProfileManager();
  fenXClient = FenXApi.getInstance();
  userIdToName: Dictionary<string> = {};
  
  componentDidMount = async () => {
    const teams = await this.teamsManager.getAllTeams();
    if (teams) this.setState({ allTeams: teams });

    const users = await this.userManager.getAllUsers();
    if (users) this.setState({ allUsers: users });

    const userProfile = await this.userProfileManager.getUserProfile();
    if (userProfile) this.setState({ userProfile: userProfile})

    const isTeamAccessible = this.props.metadata?.teamId ? await this.userProfileManager.evaluateTeamAccess(this.props.metadata?.teamId) : true;
    const isAssignedTo = this.props.metadata?.assignedTo ? await this.userProfileManager.evaluateUserAccess(this.props.metadata?.assignedTo) : true;
    this.setState({ isTeamAccessible: isTeamAccessible, isAssignedTo: isAssignedTo })
  }

  onModalDismiss = () => {
    this.setState({ isReassignTaskOpen: false, isReopenTaskOpen: false });
    this.props.onModalToggle!(false);
  }

  onReassignTaskClick = () => {
    this.setState({ isReassignTaskOpen: true });
    this.props.onModalToggle!(true);
  }

  onReopenTaskClick = () => {
    this.setState({ isReopenTaskOpen: true });
    this.props.onModalToggle!(true);
  }

  render = () => {
    const { allTeams, allUsers, userProfile, isReassignTaskOpen, isReopenTaskOpen, isTeamAccessible, isAssignedTo } = this.state;

    const userName = (this.props.metadata?.assignedTo) ? allUsers.filter(user => { return user.id === this.props.metadata?.assignedTo })[0]?.username : "";
    const teamName = (this.props.metadata?.teamId) ? allTeams.filter(team => { return team.id === this.props.metadata?.teamId })[0]?.name : "";

    let commandBarOption;
    if (this.props.metadata?.taskType !== "ServiceTask") {
      commandBarOption = (this.props.metadata?.isCompleted) ?
        { items: [{ key: 'reopen', name: 'Reopen', title: 'Reopen', onClick: () => this.onReopenTaskClick() }] } :
        { items: [{ key: 'reassign', name: 'Reassign', title: 'Reassign', onClick: () => this.onReassignTaskClick() }] }
    }
    
    const isAccessible = this.props.metadata?.taskType !== "ServiceTask" && isTeamAccessible;
    const isTaskCancelled = this.props.metadata?.status === "Cancelled";
    const isJourneyCancelled = this.props.journeyInstance.status === "Cancelled";

    return (
      <div style={taskDiv}>
        <TooltipHost styles={{ root: { width: "100%" } }} tooltipProps={{ onRenderContent: () => (<>Status: {this.props.metadata?.status}</>) }}>
          <Stack key={"Stack1Task-" + this.props.metadata?.id} horizontal horizontalAlign="space-between" verticalFill={true} styles={{ root: { width: "100%" } }}>
            <Stack.Item>
              <Stack key={"Stack2Task-" + this.props.metadata?.id} horizontal>
                <Stack key={"Stack3Task-" + this.props.metadata?.id} verticalAlign="center" horizontalAlign="center" tokens={iconStack}>
                  <TaskIcon metadata={this.props.metadata!} />
                </Stack>
                <Stack key={"Stack4Task-" + this.props.metadata?.id} verticalAlign="center" tokens={taskNameStack}>
                  <Stack.Item align="start">
                    <TaskName onModalToggle={this.props.onModalToggle} onRefresh={this.props.onRefresh} journeyInstance={this.props.journeyInstance} metadata={this.props.metadata} isAccessible={isAccessible} isAssignedTo={isAssignedTo}>{this.props.metadata?.name!}</TaskName>
                  </Stack.Item>
                  {isTaskCancelled ? <Stack.Item align="start"><Text styles={{ root: { fontWeight: 700, color: "#777777" } }}>Cancelled</Text></Stack.Item> : <></>}
                  <Stack.Item align="start">
                    <Text {...teamStyle}>{userName}</Text>
                  </Stack.Item>
                  <Stack.Item align="start">
                    <Text {...teamStyle}>{teamName}</Text>
                  </Stack.Item>
                </Stack>
              </Stack>
            </Stack.Item>
            {(isAccessible && !isJourneyCancelled) ? (
              <Stack.Item align="center">
                <Stack key={"Stack5Task-" + this.props.metadata?.id} verticalAlign="center" horizontalAlign="end">
                  <Stack.Item>
                    <CommandBarButton menuIconProps={{ iconName: "MoreVertical" }} menuProps={commandBarOption} style={{ minWidth: "0px", padding: "0px 0px" }} />
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            ) : ("")}
          </Stack>
        </TooltipHost>
        <Modal key={"reassignTaskModal" + this.props.metadata?.id} titleAriaId={"id"}
          isBlocking={true}
          isOpen={isReassignTaskOpen}>
          <ModalContent key={"reassignTaskModalContent" + this.props.metadata?.id} title={"Reassign Task"} onDismissClick={this.onModalDismiss}>
            <ReassignTaskModal journeyInstance={this.props.journeyInstance} metadata={this.props.metadata} onModalDismiss={this.onModalDismiss} onRefresh={this.props.onRefresh} />
          </ModalContent>
        </Modal>
        <Modal key={"reopenTaskModal" + this.props.metadata?.id} titleAriaId={"id"}
          isBlocking={true}
          isOpen={isReopenTaskOpen}>
          <ModalContent key={"reassignTaskModalContent" + this.props.metadata?.id} title={"Reopen Task"} onDismissClick={this.onModalDismiss}>
            <ReopenTaskModal journeyInstance={this.props.journeyInstance} metadata={this.props.metadata} onModalDismiss={this.onModalDismiss} onRefresh={this.props.onRefresh} />
          </ModalContent>
        </Modal>
      </div>
    )
  }
}