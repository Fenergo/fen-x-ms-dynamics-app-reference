using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using FakeItEasy;
using FakeXrmEasy;
using Microsoft.Xrm.Sdk;

namespace GetJourney
{
    public class PluginTest
    {
        /// <summary>
        /// Example of a test using FakeXrmEasy
        /// We create a new account and change its name
        /// We update the entity within the context
        /// We assert the name
        /// </summary>
        [Fact]
        public void NewAccountCreated()
        {
            var context = new XrmFakedContext();
            var account = new Entity("account") { Id = Guid.NewGuid() }; 
            account["name"] = "Account Name";

            context.Initialize(new List<Entity>() {
                account
            });

            var service = context.GetOrganizationService();

            var accountToUpdate = new Entity("account") { Id = account.Id };
            accountToUpdate["name"] = "Updated Account Name";

            service.Update(accountToUpdate);

            var updatedAccountName = context.CreateQuery("account")
                                    .Where(e => e.Id == account.Id)
                                    .Select(a => a["name"])
                                    .FirstOrDefault();
            Assert.Equal("Updated Account Name", updatedAccountName);
        }
    }
}
