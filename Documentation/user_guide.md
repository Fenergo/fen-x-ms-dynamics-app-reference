# User Guide
## Fen-X App Tab
In the Dynamics Demo environments, the Fen-X app has been placed in the 'KYC' tab. Note that this is configurable in Dynamics and can have whatever name the client desires.

## New Request
When there is no Fen-X Entity ID linked to the Dynamics entity, a New Request button will appear in the Journeys list.

### New Request Button
![New Request Button](./img/Dynamics%20Fen-X%20App%20-%20KYC%20Tab.png)

When a user clicks on the New Request button, the New Request modal flow will start (see image below). In this flow, fields that have been mapped from the Dynamics entity to the Fen-X entity in the config will be pulled through to populate the New Request fields on the modal. The New Request fields are pulled from Fen-X policy.

![New Request Modal](./img/Dynamics%20Fen-X%20App%20-%20New%20Request%20Modal.png)

Once the mandatory data has been filled in and all validation conditions are met, the Search button will be selectable. 

### Search, Subscribe or Create
Selecting the Search button will do a search on Fen-X to find similar entities. The user can either select "Continue" if they would like to create a new entity in Fen-X or can subscribe to an existing entity (see interface below).

![Search and Subscribe](./img/Dynamics%20Fen-X%20App%20-%20Search%20and%20Subscribe.png)

When subscribing to an entity or when creating a new entity, the Fen-X entity ID will be linked to the entity in Dynamics. This can be seen in the Account Summary in the Dynamics Dev environment (see example below), but the placement of this field is configurable in Dynamics according to the Client's needs.

![FenX Entity ID](./img/Dynamics%20Fen-X%20App%20-%20FenX%20Entity%20ID.png)

## Journey List
Once the a Fen-X entity ID has been linked to the Dynamics entity, all the journeys associated with the Fen-X entity will show in the Journey list (see example below).

![Journey List](./img/Dynamics%20Fen-X%20App%20-%20Journey%20List.png)

## Journey Viewer
Selecting a journey in the Journeys list will display it in the Journey Viewer

![Journey Viewer](./img/Dynamics%20Fen-X%20App%20-%20Journey%20Viewer.png)


### Stage and Task Status
Within the Journey Viewer, the status of each stage is shown on the business process graphic at the top of the journey viewer (see example below). The status of each task is shown by means of the colour of the task icons (see example below).

![Journey Viewer](./img/Dynamics%20Fen-X%20App%20-%20Journey%20Viewer%20Statuses.png)

### Task Reassign
The user can reassign tasks to other users by using the context menu next to each task in the Journey Viewer as shown below.

![Task Reassign](./img/Dynamics%20Fen-X%20App%20-%20Task%20Reassign.png)

### Task Reopen
Users can reopen a task that has already been completed as shown below.

![Task Reassign](./img/Dynamics%20Fen-X%20App%20-%20Task%20Reopen.png)

## Task Screens

### Opening a Task
To open a task, the user can click on a navigable task name (see example below). If the task is not navigable, the task name is greyed out.

![Open Task](./img/Dynamics%20Fen-X%20App%20-%20Open%20Task.png)

### Task Interaction
Selecting a navigable task name will open a Task Modal as seen in the example below. 

![Open Task](./img/Dynamics%20Fen-X%20App%20-%20Open%20Task%20Modal.png)

#### Mandatory Fields and Validation
Mandatory fields are indicated with an asterisk symbol. The Save and Complete buttons are disabled until all mandatory fields are captured and all validation conditions are met.

#### Save and Complete Buttons
The Save button is selectable on all tasks that are open (Not Started or In Progress status, if validation conditions have been met), whereas the Complete button is only selectable if the task is in Progress (and all validation conditions have been met). Selecting Complete will complete the task, whereas selecting Save just saves the data captured in the task without completing the task.