global using System.Text.Json;
global using System.Text.Json.Serialization;

namespace VkTypes
{
    [Serializable]
    public class VkUpdate
    {
        public const string message_new = "message_new";

        public string? type {get; set;}
        public long event_id {get; set;} = 0;
        public long group_id {get; set;} = 0;
        public string? secret {get; set;}

        [JsonPropertyName("object")]
        public JsonNode? obj {get; set;}
    }

    [Serializable]
    public class VkMessageNewObject
    {
        public VkMessage? message {get; set;}
        public JsonNode? client_info {get; set;}

        public static implicit operator VkMessageNewObject(JsonNode? obj) => JsonSerializer.Deserialize<VkMessageNewObject>(obj)!;
    }

    [Serializable]
    public class VkAction
    {
        public const string chat_invite_user = "chat_invite_user";
        public const string chat_invite_user_by_link = "chat_invite_user_by_link";

        public string? type {get; set;}
        public long member_id {get; set;} = 0;
        public string? text {get; set;}
        public string? email {get; set;}
        public JsonNode? photo {get; set;}
    }

    [Serializable]
    public class VkMessage
    {
        public long id {get; set;} = 0;
        public long date {get; set;} = 0;
        public long from_id {get; set;} = 0;
        public long peer_id {get; set;} = 0;
        public long conversation_message_id {get; set;} = 0;
        public long random_id {get; set;} = 0;
        [JsonPropertyName("out")] public long out_ {get; set;} = 0;

        public string? text {get; set;}

        public bool important {get; set;} = false;
        public bool is_hidden {get; set;} = false;

        public VkMessage? reply_message {get; set;}

        public JsonArray? attachments {get; set;}
        public JsonNode? geo {get; set;}
        public JsonNode? keyboard {get; set;}
        public JsonNode? fwd_messages {get; set;}
        public VkAction? action {get; set;}
    }
}