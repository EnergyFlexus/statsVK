namespace VkBot
{
	public static class BotExtensions
	{
		public static async Task MapBot(HttpContext context, VkDbContext vkDbContext, Bot bot, ILogger<Bot> logger)
		{
			await bot.GetUpdateAsync(context, vkDbContext, logger);
		}
	}

	public class Bot
	{
		public long group_id {get; init;} = 0;
		public string confirmation_string {get; init;} = "";
		public string secret {get; init;} = "";
		public string version {get; init;} = "";

		public const long const_peer_id = 2000000000;

		public Bot(long group_id, 
			string confirmation_string, 
			string secret, 
			string version)
		{
			this.group_id = group_id;
			this.confirmation_string = confirmation_string;
			this.secret = secret;
			this.version = version;
		}

		public Bot(IConfiguration configuration)
		{
			if(configuration["group_id"] is not null) 
				this.group_id = Int32.Parse(configuration["group_id"]!);

			if(configuration["confirmation_string"] is not null) 
				this.confirmation_string = configuration["confirmation_string"]!;

			if(configuration["secret"] is not null) 
				this.secret = configuration["secret"]!;

			if(configuration["version"] is not null) 
				this.version = configuration["version"]!;
		}

		public async Task GetUpdateAsync(HttpContext context, VkDbContext vkDbContext, ILogger<Bot> logger)
		{
			// no json at all
            if(!context.Request.HasJsonContentType())
            {
                logger.LogError("data isn't json");
				await Results.NotFound().ExecuteAsync(context);
                return;
            }

            // takes json
            JsonNode? node = await context.Request.ReadFromJsonAsync<JsonNode>();

            // is null?
            if (node is null)
            {
                logger.LogError("Request is null");
				await Results.NotFound().ExecuteAsync(context);
                return;
            }

            // log it
            logger.LogInformation(node.ToString());

			VkUpdate vkUpdate = new VkUpdate();

            // fill vkUpdate
            vkUpdate.type = (string)node["type"]!;
            vkUpdate.group_id = (long)node["group_id"]!;
            vkUpdate.secret = (string)node["secret"]!;
            vkUpdate.obj = node["object"];

            // is secret equals?
            if (vkUpdate!.secret != secret)
            {
                logger.LogError("secrets aren't equal");
				await Results.NotFound().ExecuteAsync(context);
                return;
            }

            // is groups equal?
            if(vkUpdate.group_id != group_id)
            {
                logger.LogError("group_ids aren't equal");
				await Results.NotFound().ExecuteAsync(context);
                return;
            }

			context.Response.StatusCode = 200;
			await context.Response.WriteAsync("ok");

            // it isnt first try
            if(context.Request.Headers.ContainsKey("X-Retry-Counter"))
                return;

			// проверяем тип
            if(vkUpdate.type == "confirmation")
            {
				context.Response.StatusCode = 200;
            	await context.Response.WriteAsync(confirmation_string);
                return;
            }

			// types check
            if(vkUpdate.type != VkUpdate.message_new) 
                return;

            var msg_obj = (VkMessageNewObject)vkUpdate.obj;
            var msg = msg_obj.message;

            if(msg is null) 
                return;

            long peer_id = msg!.peer_id;
            long user_id = msg.from_id;

            // is msg from group?
            if(user_id < 0)
                return;

            if(peer_id < const_peer_id)
                return;

			long chat_id = peer_id - const_peer_id;

			Chat? chat = await vkDbContext.chats.FindAsync(chat_id);
			if(chat is null)
			{
				chat = new Chat(chat_id);
				await vkDbContext.chats.AddAsync(chat);
			}
			chat.last_message_date = msg.date;

			ChatUser? chat_user = await vkDbContext.chat_users.FindAsync(chat_id, user_id);
			if(chat_user is null)
			{
				chat_user = new ChatUser(chat_id, user_id);
				await vkDbContext.chat_users.AddAsync(chat_user);
			}
			chat_user.messages_count += 1;

			if(msg.text is not null)
			{
				Message message = new Message();
				message.chat_user = chat_user;
				message.text = msg.text;
				message.date = msg.date;
				await vkDbContext.messages.AddAsync(message);
			}
			await vkDbContext.SaveChangesAsync();            
		}
	}
}