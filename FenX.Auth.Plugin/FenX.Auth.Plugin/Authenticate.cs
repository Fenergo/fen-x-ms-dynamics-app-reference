using System;
using System.IO;
using System.Net;
using System.Text;
using GetJourney.Models;
using System.Runtime.Serialization.Json;
using SF365.Plugins;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System.Collections.Generic;

namespace FenX.Auth.Plugin
{
    public class Authenticate : PluginBase
    {
        public string access_token { get; set; }
        public string app_version { get; set; }
        private readonly string _x_idp_url;
        private readonly string _xConnectionString;

        public Authenticate(string unsecureString, string secureString) : base(typeof(Authenticate))
        {
            if (!String.IsNullOrWhiteSpace(secureString))
            {
                _xConnectionString = secureString;
            }
            if (!String.IsNullOrWhiteSpace(unsecureString))
            {
                _x_idp_url = unsecureString;
            }
        }

        protected override void ExecuteCrmPlugin(LocalPluginContext localcontext, IServiceProvider serviceProvider)
        {
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(localcontext.PluginExecutionContext.UserId);

            tracingService.Trace($"Executing Authenticate Plugin: {DateTime.Now.ToShortTimeString()}");

            app_version = (string)localcontext.PluginExecutionContext.InputParameters["AppVersion"];

            try
            {
                var azureToken = (string)localcontext.PluginExecutionContext.InputParameters["AzureToken"];

                if (string.IsNullOrEmpty(azureToken))
                {
                    tracingService.Trace($"Auth Plugin {app_version}: Azure token is null or empty");
                }

                if (!string.IsNullOrEmpty(_xConnectionString))
                {
                    tracingService.Trace($"Auth Plugin {app_version}: found connection string from secure config");
                    GetToken(azureToken, tracingService, _xConnectionString);
                    localcontext.PluginExecutionContext.OutputParameters["FenXToken"] = access_token;
                }
                else
                {
                    throw new KeyNotFoundException($"Auth Plugin {app_version} Error: Connection string value cannot be null or empty");
                }
            }
            catch (KeyNotFoundException ex)
            {
                tracingService.Trace($"Auth Plugin {app_version} Error: {ex.Message}");
                localcontext.PluginExecutionContext.OutputParameters["HttpResponseCode"] = "500";
            }
            catch (Exception ex)
            {
                tracingService.Trace($"Auth Plugin {app_version} Error: {ex}");
                localcontext.PluginExecutionContext.OutputParameters["HttpResponseCode"] = "500";
            }
        }

        public void GetToken(string azureToken, ITracingService tracingService, string connectionString)
        {
            tracingService.Trace($"Auth Plugin {app_version}: XIDP: {_x_idp_url}");

            var request = (HttpWebRequest)WebRequest.Create($"https://{_x_idp_url}/connect/token");

            request.Method = "POST";
            request.Host = _x_idp_url;
            request.ContentType = "application/x-www-form-urlencoded";
            request.Headers.Add("Authorization", "");

            var stringData = connectionString;

            if (!string.IsNullOrEmpty(azureToken))
            {
                stringData += "&external_token=" + azureToken;
            }

            var data = Encoding.Default.GetBytes(stringData);

            request.ContentLength = data.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            using (var response = (HttpWebResponse)request.GetResponse()) // This breaks when Debugging, possible issue with the Plugin Registration Tool
            {
                try
                {
                    var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();

                    TokenResponse token = JSONDesrilize(responseString);

                    double.TryParse(token.expires_in, out double expiresIn);

                    access_token = "Bearer " + token.access_token;
                }
                catch (Exception ex)
                {
                    tracingService.Trace($"Auth Plugin {app_version} Error: {ex}");
                }

            }
        }

        private TokenResponse JSONDesrilize(string obj)
        {
            DataContractJsonSerializer jsonSer = new DataContractJsonSerializer(typeof(TokenResponse));
            MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(obj));
            return (TokenResponse)jsonSer.ReadObject(stream);
        }
    }

}
