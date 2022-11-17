using System;
using System.Runtime.Serialization;

namespace GetJourney.Models
{
    [DataContract]
    public class Account
    {
        [DataMember(Name = "Id")]
        public Guid Id { get; set; }

        [DataMember(Name = "Name")]
        public string Name { get; set; }
    }

}
