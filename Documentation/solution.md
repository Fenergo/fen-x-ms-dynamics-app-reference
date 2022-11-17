# Solution Overview

<strong>
<span style="color:red">
1. The Dynamics Package, associated source code and documentation is provided to Fenergo clients free of charge.<br>
2. It is, however, not supported or maintained by Fenergo.<br>
3. It would be for clients to adopt and maintain within their own technology infrastructure processes.<br>
</span></strong>

## Summary
Application is MS Dynamics PCF Field Control that can be configured as an editor for FenergoEntityId field added to Dynamics Entity.
## Tech Stack
- PowerApps Component Framework (PCF)
- React
- Fluent UI
- Dynamics Plugin (.Net Framework 4.6.2)
- Axios (FenX Connector)
- NSwag (Generated Axios clients from OpenAPI Specification)
## Architecture
![Overall Solution Diagram](./img/Dynamics%20Fen-X%20App%20-%20Solution%20Diagram.png)
## Authentication
The solution uses Auth 2.0 Token Exchange authentication.
![Authentication](./img/Dynamics%20Fen-X%20App%20-%20Token%20Exchange.png)
## PCF/React Component Diagram
![PCF/React Component Diagram](./img/Dynamics%20Fen-X%20App%20-%20PCF%20Field%20Component.png)
## Dynamics Plug-in
![Plug-in](./img/Dynamics%20Plug-in%20Solution%20Overview.png)
## Accelerator Package Overview
![Plug-in](./img/Dynamics%20Accelerator%20Package%20Overview.png)