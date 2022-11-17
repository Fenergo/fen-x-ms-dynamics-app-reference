using System.Runtime.Serialization;

namespace GetJourney.Models
{
    [DataContract]
    public class TokenRequest
    {
        [DataMember(Name = "scope")]
        public string scope { get; set; }

        [DataMember(Name = "client_secret")]
        public string client_secret { get; set; }

        [DataMember(Name = "client_id")]
        public string client_id { get; set; }

        [DataMember(Name = "grant_type")]
        public string grant_type { get; set; }

        [DataMember(Name = "username")]
        public string username { get; set; }


    }
}
