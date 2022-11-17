# Dynamics Accelerator PowerApps Component Framework – Enable Token Exchange

<strong>
<span  style="color:red">
1. The Dynamics Package, associated source code and documentation is provided to Fenergo clients free of charge.<br>
2. It is, however, not supported or maintained by Fenergo.<br>
3. It would be for clients to adopt and maintain within their own technology infrastructure processes.<br>
</span></strong>

## Prerequisites

1. Existing Dynamics 365 CRM application
2. Azure Enterprise Application
3. Access to the Plugin Registration Tool
4. Users registered on Fen-X to use with Token Exchange

## CRM Configuration
### Configure the PCF properties:<br>

1. In your existing application, navigate to where the PCF is installed on the entity <br>

2. Open the "Field Properties" (double-click the field or click on "Change Properties") <br>

3. Under Controls, change the value of "Enable_Token_Exchange" to true:<br><br>

![Azure App Registration](./img/install_guide/token_exchange.png)<br><br>


### Configure the Azure Settings Environment Variable:<br>

1. Navigate to: [PowerApps](https://make.powerapps.com)
2. Open the solution: Fenergo Dynamics Accelerator
3. Select the "Azure_Settings" item
4. Fill in the required info:<br><br>

![Azure Connection String](./img/install_guide/azure_settings.png)<br><br>

## Plugin Registration Tool
### Update the connection string
1. Open the Plugin Registration Tool
2. Connect to your organization
3. Find and open the Plugin step: <br><br>
 ![Azure Connection String](./img/install_guide/prt_find_step.png)<br><br>
4. Add the connection string into the "Secure Configuration" section:<br><br>
 ![Azure Connection String](./img/install_guide/prt_update_step.png)<br><br>
5. Note the format of the connection string should be as follows:<br>
5.1 %20 to be used for spaces<br>
5.2 & added between categories<br>
**scope=openid%20tenant%20fenx.all&client_secret=**