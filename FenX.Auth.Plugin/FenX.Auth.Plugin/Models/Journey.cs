using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace GetJourney.Models.Journey
{
    [DataContract]
    public class Journey
    {
        [DataMember(Name = "data")]
        public Data data { get; set; }
    }

    public class Data
    {
        [DataMember(Name = "id")]
        public Guid id { get; set; }

        [DataMember(Name = "name")]
        public string name { get; set; }

        [DataMember(Name = "status")]
        public string status { get; set; }

    }
}
