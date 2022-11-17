using System.Runtime.Serialization;

namespace GetJourney.Models
{
    [DataContract]
    public class TokenResponse
    {
        [DataMember(Name = "access_token")]
        public string access_token { get; set; }

        [DataMember(Name = "expires_in")]
        public string expires_in { get; set; }

        [DataMember(Name = "token_type")]
        public string token_type { get; set; }

        [DataMember(Name = "scope")]
        public string scope { get; set; }

    }
}
