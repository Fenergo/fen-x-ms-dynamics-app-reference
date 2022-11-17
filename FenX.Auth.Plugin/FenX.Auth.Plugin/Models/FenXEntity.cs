using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace GetJourney.Models
{
    [DataContract]
    public class FenXEntity
    {
        [DataMember(Name = "data")]
        public Data data { get; set; }
    }

    public class Data
    {
        [DataMember(Name = "type")]
        public string type { get; set; }

        [DataMember(Name = "policyJurisdictions")]
        public List<string> policyJurisdictions { get; set; }

        [DataMember(Name = "properties")]
        public Properties properties { get; set; }

    }

    public class Properties
    {
        [DataMember(Name = "companyType")]
        public PropertyData companyType { get; set; }

        [DataMember(Name = "legalEntityName")]
        public PropertyData legalEntityName { get; set; }

        [DataMember(Name = "countryOfIncorporation")]
        public PropertyData countryOfIncorporation { get; set; }

        [DataMember(Name = "dateOfIncorporation")]
        public PropertyData dateOfIncorporation { get; set; }

        [DataMember(Name = "category")]
        public PropertyData category { get; set; }

    }

    public class PropertyData
    {
        [DefaultValue("Single")]
        [DataMember(Name = "type")]
        public string type { get; set; }

        [DataMember(Name = "value")]
        public string value { get; set; }
    }
}
