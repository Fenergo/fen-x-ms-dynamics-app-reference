import * as React from "react";
import { IconButton, Link, Modal, PrimaryButton, Stack, Text } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import { IJourneyInstanceDto, PolicyTask, Task } from "../../../../services/Clients/JourneyQueryClient";
import { Requirement } from "../../../../services/Clients/PolicyQueryClient";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { ISinglePropertyDto } from "../../../../services/Clients/EntityDataQueryClient";
import { inaccessibleStyle } from "../../../../styles/task-link";
import { RequirementScreen } from "../../../screen/screen";
import { TaskScreen } from "../../taskScreen/taskScreen";
import { ModalContent } from "../../../modal/modalContent";
import { IPermission, PermissionModal } from "../../../modal/permissionModal";


export interface ITaskName extends React.PropsWithChildren {
  metadata?: Task;
  isAccessible?: boolean;
  isAssignedTo?: boolean;
  journeyInstance: IJourneyInstanceDto;
  onRefresh?: () => void; 
  onModalToggle?: (isOpen:boolean) => void;
}

interface ITaskNameState extends IPermission {
  modalIsOpen: boolean;
}

export class TaskName extends PermissionModal<ITaskName> {
  state: ITaskNameState = { ...this.state, modalIsOpen: false};

  onClick = async (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    // if completed, check if user has permissions
    if (this.props.metadata?.isCompleted && !(await this.checkUserHasPermission("JourneyCompletedTaskAccess"))) return;
    if (this.props.onModalToggle) this.props.onModalToggle(true);
    this.setState({ modalIsOpen: true });
  }

  render = () => {
    const { modalIsOpen } = this.state;

    return (
      <>
        <Link onClick={this.onClick} disabled={!this.props.isAccessible}>{this.props.children}</Link>
        <Modal
          titleAriaId={"id"}
          isBlocking={true}
          isOpen={modalIsOpen}
          onDismiss={() => { this.setState({ modalIsOpen: false}); if(this.props.onModalToggle) this.props.onModalToggle(false); }}
        >
          <ModalContent title={this.props.metadata?.name!} key={"ModalCotnent-" + this.props.metadata?.id} onDismissClick={() => { this.setState({ modalIsOpen: false }); if(this.props.onModalToggle) this.props.onModalToggle(false); }}>
            <TaskScreen onRefresh={this.props.onRefresh} key={"TaskScreen-" + this.props.metadata?.id} onCloseCallback={() => { this.setState({ modalIsOpen: false }); if(this.props.onModalToggle) this.props.onModalToggle(false); }} metadata={this.props.metadata} journeyInstance={this.props.journeyInstance} isAssignedTo={this.props.isAssignedTo}/>
          </ModalContent>
        </Modal>
        {this.renderPermissionModal()}
      </>
    )
  }
};
