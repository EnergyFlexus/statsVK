global using System.Text;

namespace VkBot
{
    public class VkClient
    {
        public const long const_peer_id = 2000000000;
        private readonly HttpClient _client = new HttpClient();
        private readonly string _api = "https://api.vk.com/method/";

        public string access_token {get; init;}
        public string version {get; init;}

        public VkClient(string access_token, string version)
        {
            this.access_token = access_token;
            this.version = version;
        }

        private static string DictToQuery(Dictionary<string, string> dict)
        {
            var builder = new StringBuilder("?");
            foreach (var item in dict)
            {
                builder.
                Append(item.Key).Append('=').
                Append(item.Value).Append('&');
            }
            return builder.Remove(builder.Length - 1, 1).ToString();
        }

        private static string ListToQueryValue<T>(List<T> list)
        {
            var builder = new StringBuilder();
            foreach (var id in list)
            {
                builder.Append(id?.ToString());
                builder.Append(",");
            }
            return builder.ToString();
        }

        public async Task<JsonNode?> GetMethodAsync(string method, Dictionary<string, string> query)
        {
            // query string build
            query.Add("access_token", access_token);
            query.Add("v", version!);

            // uri build
            var builder = new UriBuilder(_api);
            builder.Path += method;
            builder.Query = DictToQuery(query);
            var uri = builder.Uri;

            // Get response 
            JsonNode? response = await _client.GetFromJsonAsync<JsonNode>(uri);
            return response;
        }

        /// <summary>
        /// messages.send
        /// </summary>
        public async Task<JsonNode?> MessagesSendAsync 
            (long peer_id, 
            string? message, 
            string? forward = null,
            string? attachment = null,
            long disable_mentions = 1, 
            long random_id = 0)
        {
            if(random_id == 0) random_id = new Random().Next();
            
            // query build
            var query = new Dictionary<string, string>();
            query.Add("peer_id", peer_id.ToString());

            if(message is not null) query.Add("message", message);
            if(forward is not null) query.Add("forward", forward);
            if(attachment is not null) query.Add("attachment", attachment);

            query.Add("disable_mentions", disable_mentions.ToString());
            query.Add("random_id", random_id.ToString());
            
            // set method name
            string method = "messages.send";

            // Get response 
            var response = await GetMethodAsync(method, query);
            return response;          
        }
    
        /// <summary>
        /// messages.getChat
        /// </summary>
        public async Task<JsonNode?> MessagesGetConversationMembersAsync 
			(long peer_id, List<string> fileds)
        {
            // query build
            var query = new Dictionary<string, string>();
            query.Add("peer_id", peer_id.ToString());
			query.Add("fields", ListToQueryValue(fileds));

            // set method name
            string method = "messages.getConversationMembers";

            // Get response 
            var response = await GetMethodAsync(method, query);
            return response;
        }
    }
}
