using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace GetJourney.Models.Journey
{
    [DataContract]
    public class JourneyInstance
    {
        [DataMember(Name = "data")]
        public List<Instance> data { get; set; }
    }

    public class Instance
    {
        [DataMember(Name = "id")]
        public Guid id { get; set; }

        [DataMember(Name = "type")]
        public string type { get; set; }

        [DataMember(Name = "status")]
        public string status { get; set; }

        [DataMember(Name = "name")]
        public string name { get; set; }
    }
}
