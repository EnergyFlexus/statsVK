namespace VkApi
{
	public static class ApiExtensions
	{
		public static RouteGroupBuilder MapApi(this RouteGroupBuilder group)
		{
			group.MapGet("/MessagesAll", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesAll(context, vkDbContext, ord);
			});

			group.MapGet("/MessageById/{id:int}", 
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {

				await api.MessageById(context, vkDbContext, id);
			});

			group.MapGet("/MessagesByChatId/{id:int}", // + order 
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesByChatId(context, vkDbContext, id, ord);
			});

			group.MapGet("/MessagesByUserId/{id:int}", // + order 
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesByUserId(context, vkDbContext, id, ord);
			});

			group.MapGet("/MessagesByIds/{chat_id:int}/{user_id:int}", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api, long chat_id, long user_id) => {
					
					var order = context.Request.Query["order"];
					ApiOrder ord = Api.ParseOrder(order);
					await api.MessagesByIds(context, vkDbContext, chat_id, user_id, ord);
				});

			group.MapGet("/MessagesByChatIdOffset/{chat_id:int}/{count:int}/{start_msg_id:int?}", // + order
				async (HttpContext context, 
				VkDbContext vkDbContext, 
				Api api, 
				long chat_id, 
				long count, 
				long? start_msg_id) => {


				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesByChatIdOffset(context, vkDbContext, chat_id, count, start_msg_id, ord);
			});

			group.MapGet("/MessagesByChatIdDate/{id:int}/{date1:int}/{date2:int?}", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id, long date1, long? date2) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesByChatIdDate(context, vkDbContext, id, date1, date2, ord);
			});

			group.MapGet("/MessagesByChatIdCsv/{id:int}", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {

				await api.MessagesByChatIdCsv(context, vkDbContext, id);
			});

			group.MapGet("/MessagesCount", 
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {
				
				await api.MessagesCount(context, vkDbContext);
			});

			group.MapGet("/MessagesCountsInChatsAll", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {
				
				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesCountsInChatsAll(context, vkDbContext, ord);
			});

			group.MapGet("/MessagesCountsByChatId/{id:int}",
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {
				
				await api.MessagesCountsByChatId(context, vkDbContext, id);
			});

			group.MapGet("/MessagesCountsByChatIdDate/{id:int}/{date1:int}/{date2:int?}", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id, long date1, long? date2) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesCountsByChatIdDate(context, vkDbContext, id, date1, date2);
			});

			group.MapGet("/MessagesCountsByChatIdDateIntervals/{id:int}/{interval:int}/{date1:int}/{date2:int?}",
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id, long interval, long date1, long? date2) => {
					
				await api.MessagesCountsByChatIdDateIntervals(context, vkDbContext, id, interval, date1, date2);
			});

			group.MapGet("/ChatsAll", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.ChatsAll(context, vkDbContext, ord);
			});

			group.MapGet("/ChatById/{id:int}", 
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {

				await api.ChatById(context, vkDbContext, id);
			});

			group.MapGet("/ChatsCount", 
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {

				await api.ChatsCount(context, vkDbContext);
			});

			group.MapGet("/ChatUsersAll", 
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {
				
				await api.ChatUsersAll(context, vkDbContext);
			});

			group.MapGet("/ChatUsersByChatId/{chat_id:int}", // + order 
				async (HttpContext context, VkDbContext vkDbContext, Api api, long chat_id) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.ChatUsersByChatId(context, vkDbContext, chat_id, ord);
			});

			group.MapGet("/ChatUsersByUserId/{user_id:int}", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api, long user_id) => {

				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.ChatUsersByUserId(context, vkDbContext, user_id, ord);
			});

			group.MapGet("/ChatUserByIds/{chat_id:int}/{user_id:int}", 
				async (HttpContext context, VkDbContext vkDbContext, Api api, long chat_id, long user_id) => {
				
				await api.ChatUserByIds(context, vkDbContext, chat_id, user_id);
			});

			group.MapGet("/ChatUsersCount", 
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {

				await api.ChatUsersCount(context, vkDbContext);
			});

			group.MapGet("/vk/UsersInfoByChatId/{id:int}",
				async (HttpContext context, VkDbContext vkDbContext, Api api, long id) => {

				await api.UsersInfoByChatId(context, vkDbContext, id);
			});

			group.MapGet("/vk/ChatInfoById", // + chat_ids in query
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {

				string c_chat_ids = context.Request.Query["chat_ids"]!;
				List<long> peer_ids = new List<long>();
				string[] _ids = c_chat_ids.Split(',');
				foreach(var c in _ids)
				{
					long peer_id = Int32.Parse(c) + VkClient.const_peer_id;
					peer_ids.Add(peer_id);
				}

				await api.ChatInfoById(context, vkDbContext, peer_ids);
			});
			
			return group;
		}
	}
	public enum ApiOrder
	{
		Asc,
		Desc,
		None
	}
	public class Api 
	{
		VkClient vkClient {get; init;}

		public Api(string? access_token, string? version)
		{
			if(access_token is null || version is null)
				vkClient = new VkClient("", "");
			else
				vkClient = new VkClient(access_token, version);
		}
			

		public static ApiOrder ParseOrder(string? order)
		{
			ApiOrder ord;

			if(order is not null && order.ToLower() == "asc") ord = ApiOrder.Asc;
			else if(order is not null && order.ToLower() == "desc") ord = ApiOrder.Desc;
			else ord = ApiOrder.None;

			return ord;
		}

		public async Task MessagesAll(HttpContext context, VkDbContext vkDbContext, ApiOrder order)
		{
			IQueryable<MessageDTO> messages_DTO;

			if(order == ApiOrder.Asc)
				messages_DTO = from m in vkDbContext.messages
					orderby m.message_id ascending
					select new MessageDTO(m);

			else if(order == ApiOrder.Desc)
				messages_DTO = from m in vkDbContext.messages
					orderby m.message_id descending
					select new MessageDTO(m);
			else
				messages_DTO = from m in vkDbContext.messages
					select new MessageDTO(m);
				
			await Results.Json(messages_DTO).ExecuteAsync(context);
		}

		public async Task MessageById(HttpContext context, VkDbContext vkDbContext, long id)
		{
			var message = await vkDbContext.messages.FindAsync(id);

			if(message is null) await Results.Json(null).ExecuteAsync(context);
			else await Results.Json(new MessageDTO(message)).ExecuteAsync(context);
		}

		public async Task MessagesByChatId(HttpContext context, VkDbContext vkDbContext, long id, ApiOrder order)
		{
			IQueryable<Message> messages;
			IQueryable<MessageDTO> messages_DTO;

			messages = from m in vkDbContext.messages
				where m.chat_id == id
				select m;

			if(order == ApiOrder.Asc)
				messages_DTO = from m in messages
					orderby m.message_id ascending
					select new MessageDTO(m);

			else if(order == ApiOrder.Desc)
				messages_DTO = from m in messages
					orderby m.message_id descending
					select new MessageDTO(m);
			else
				messages_DTO = from m in messages
					select new MessageDTO(m);
				
			await Results.Json(messages_DTO).ExecuteAsync(context);
		}
		public async Task MessagesByUserId(HttpContext context, VkDbContext vkDbContext, long id, ApiOrder order)
		{
			IQueryable<Message> messages;
			IQueryable<MessageDTO> messages_DTO;

			messages = from m in vkDbContext.messages
				where m.user_id == id
				select m;

			if(order == ApiOrder.Asc)
				messages_DTO = from m in messages
					orderby m.message_id ascending
					select new MessageDTO(m);

			else if(order == ApiOrder.Desc)
				messages_DTO = from m in messages
					orderby m.message_id descending
					select new MessageDTO(m);
			else
				messages_DTO = from m in messages
					select new MessageDTO(m);
				
			await Results.Json(messages_DTO).ExecuteAsync(context);
		}

		public async Task MessagesByIds
			(HttpContext context, VkDbContext vkDbContext, long chat_id, long user_id, ApiOrder order)
		{
			IQueryable<Message> messages;
			IQueryable<MessageDTO> messages_DTO;

			messages = from m in vkDbContext.messages
				where m.user_id == user_id && m.chat_id == chat_id
				select m;

			if(order == ApiOrder.Asc)
				messages_DTO = from m in messages
					orderby m.message_id ascending
					select new MessageDTO(m);

			else if(order == ApiOrder.Desc)
				messages_DTO = from m in messages
					orderby m.message_id descending
					select new MessageDTO(m);
			else
				messages_DTO = from m in messages
					select new MessageDTO(m);
				
			await Results.Json(messages_DTO).ExecuteAsync(context);
		}
		
		public async Task MessagesByChatIdOffset
			(HttpContext context, VkDbContext vkDbContext, long chat_id, long count, long? start_msg_id, ApiOrder order)
		{
			IQueryable<Message> messages;
			IQueryable<MessageDTO> messages_DTO;

			if(start_msg_id is null || start_msg_id == 0)
				start_msg_id = long.MaxValue;

			messages = from m in vkDbContext.messages
				where m.chat_id == chat_id && m.message_id < start_msg_id
				select m;

			if(order == ApiOrder.Asc)
				messages_DTO = from m in messages
					orderby m.message_id ascending
					select new MessageDTO(m);

			else if(order == ApiOrder.Desc)
				messages_DTO = from m in messages
					orderby m.message_id descending
					select new MessageDTO(m);
			else
				messages_DTO = from m in messages
					select new MessageDTO(m);

			messages_DTO = messages_DTO.Take((int)count);
			await Results.Json(messages_DTO).ExecuteAsync(context);
		}

		public async Task MessagesByChatIdDate
			(HttpContext context, VkDbContext vkDbContext, long id, long date1, long? date2, ApiOrder order)
		{
			IQueryable<Message> messages;
			IQueryable<MessageDTO> messages_DTO;

			if(date2 is null || date2 == 0)
				date2 = long.MaxValue;

			messages = from m in vkDbContext.messages
				where m.chat_id == id && m.date < date2 && m.date >= date1
				select m;

			if(order == ApiOrder.Asc)
				messages_DTO = from m in messages
					orderby m.date ascending
					select new MessageDTO(m);

			else if(order == ApiOrder.Desc)
				messages_DTO = from m in messages
					orderby m.date descending
					select new MessageDTO(m);
			else
				messages_DTO = from m in messages
					select new MessageDTO(m);

			await Results.Json(messages_DTO).ExecuteAsync(context);
		}

		public async Task MessagesByChatIdCsv(HttpContext context, VkDbContext vkDbContext, long id)
		{
			var messages_csv = from m in vkDbContext.messages
				where m.chat_id == id
				orderby m.message_id ascending
				select new {m.user_id, m.date, m.text};

			StringBuilder file_builder = new StringBuilder("user_id\tdate\ttext\n");
			foreach(var m in messages_csv)
			{
				string text = m.text.Replace('\n', ' ');
				file_builder.Append(m.user_id).Append('\t')
					.Append(m.date).Append('\t')
					.Append(text).Append('\n');
			}
			
			await Results.File(Encoding.UTF8.GetBytes(file_builder.ToString()), "text/csv", "messages.csv").ExecuteAsync(context);
		}

		public async Task MessagesCount(HttpContext context, VkDbContext vkDbContext)
		{
			long count = await (from cu in vkDbContext.chat_users
				select cu.messages_count).SumAsync();

			await Results.Json(count).ExecuteAsync(context);
		}

		public async Task MessagesCountsInChatsAll(HttpContext context, VkDbContext vkDbContext, ApiOrder order)
		{
			var messages_counts = vkDbContext.chats.Include(c => c.chat_users)
				.Select(c => new {chat_id = c.chat_id, messages_count = c.chat_users.Sum(u => u.messages_count)});

			if(order == ApiOrder.Asc)
				messages_counts = (from c in messages_counts
					orderby c.messages_count ascending
					select c);
				

			if(order == ApiOrder.Desc)
				messages_counts = (from c in messages_counts
					orderby c.messages_count descending
					select c);

			await Results.Json(messages_counts).ExecuteAsync(context);
		}

		public async Task MessagesCountsByChatId(HttpContext context, VkDbContext vkDbContext, long id)
		{
			var count = await (from m in vkDbContext.messages
				where m.chat_id == id
				select m).LongCountAsync();

			await Results.Json(count).ExecuteAsync(context);
		}

		public async Task MessagesCountsByChatIdDate
			(HttpContext context, VkDbContext vkDbContext, long id, long date1, long? date2)
		{
			if(date2 is null || date2 == 0)
				date2 = long.MaxValue;

			var counts = await (from m in vkDbContext.messages
				where m.date >= date1 && m.date < date2 && m.chat_id == id
				select m).LongCountAsync();

			await Results.Json(counts).ExecuteAsync(context);	
		}

		public async Task MessagesCountsByChatIdDateIntervals
			(HttpContext context, VkDbContext vkDbContext, long id, long interval, long date1, long? date2)
		{
			var chat = await vkDbContext.chats.FindAsync(id);
			if(chat is null)
			{
				await Results.Json(new List<long>()).ExecuteAsync(context);
				return;
			}

			List<long> messages_dates_intervals = new List<long>();

			// 1 November 2022, 0:00:00
			if(date1 < 1667260800)
				date1 = 1667260800;

			// 1 November 2022, 0:00:00
			if(date2 is null || date2 == 0 || date2 > chat.last_message_date)
				date2 = chat.last_message_date;

			var messages_dates = (from m in vkDbContext.messages
				where m.chat_id == id && m.date < date2 && m.date >= date1
				orderby m.date descending
				select m.date).ToList();

			for(long i = date1, j = date1 + interval; i < date2; i += interval, j += interval)
			{
				long messages_count = (from md in messages_dates
					where md >= i && md < j
					select md).LongCount();

				messages_dates_intervals.Add(messages_count);
			}
			await Results.Json(messages_dates_intervals).ExecuteAsync(context);
		}

		public async Task ChatsAll(HttpContext context, VkDbContext vkDbContext, ApiOrder order)
		{
			IQueryable<ChatDTO> chats_DTO;

			if(order == ApiOrder.Asc)
				chats_DTO = from c in vkDbContext.chats
					orderby c.last_message_date ascending
					select new ChatDTO(c);

			else if(order == ApiOrder.Desc)
				chats_DTO = from c in vkDbContext.chats
					orderby c.last_message_date descending
					select new ChatDTO(c);
			else
				chats_DTO = from c in vkDbContext.chats
					select new ChatDTO(c);

			await Results.Json(chats_DTO).ExecuteAsync(context);
		}

		public async Task ChatById(HttpContext context, VkDbContext vkDbContext, long id)
		{
			var chat = await vkDbContext.chats.FindAsync(id);

			if(chat is null) await Results.Json(null).ExecuteAsync(context);
			else await Results.Json(new ChatDTO(chat)).ExecuteAsync(context);
		}

		public async Task ChatsCount(HttpContext context, VkDbContext vkDbContext)
		{
			long count = await vkDbContext.chats.LongCountAsync();
			await Results.Json(count).ExecuteAsync(context);
		}

		public async Task ChatUsersAll(HttpContext context, VkDbContext vkDbContext)
		{
			var chat_users_DTO = from cu in vkDbContext.chat_users
				select new ChatUserDTO(cu);
			
			await Results.Json(chat_users_DTO).ExecuteAsync(context);
		}

		public async Task ChatUsersByChatId(HttpContext context, VkDbContext vkDbContext, long chat_id, ApiOrder order)
		{
			IQueryable<ChatUser> chat_users;
			IQueryable<ChatUserDTO> chat_users_DTO;

			chat_users = from cu in vkDbContext.chat_users
				where cu.chat_id == chat_id
				select cu;

			if(order == ApiOrder.Asc)
				chat_users_DTO = from cu in chat_users
					orderby cu.messages_count ascending
					select new ChatUserDTO(cu);

			else if(order == ApiOrder.Desc)
				chat_users_DTO = from cu in chat_users
					orderby cu.messages_count descending
					select new ChatUserDTO(cu);
			
			else
				chat_users_DTO = from cu in chat_users
					select new ChatUserDTO(cu);
				
			await Results.Json(chat_users_DTO).ExecuteAsync(context);
		}
		public async Task ChatUsersByUserId(HttpContext context, VkDbContext vkDbContext, long user_id, ApiOrder order)
		{
			IQueryable<ChatUser> chat_users;
			IQueryable<ChatUserDTO> chat_users_DTO;

			chat_users = from cu in vkDbContext.chat_users
				where cu.user_id == user_id
				select cu;

			if(order == ApiOrder.Asc)
				chat_users_DTO = from cu in chat_users
					orderby cu.messages_count ascending
					select new ChatUserDTO(cu);

			else if(order == ApiOrder.Desc)
				chat_users_DTO = from cu in chat_users
					orderby cu.messages_count descending
					select new ChatUserDTO(cu);
			
			else
				chat_users_DTO = from cu in chat_users
					select new ChatUserDTO(cu);
				
			await Results.Json(chat_users_DTO).ExecuteAsync(context);
		}

		public async Task ChatUserByIds(HttpContext context, VkDbContext vkDbContext, long chat_id, long user_id)
		{
			var chat_user = await vkDbContext.chat_users.FindAsync(chat_id, user_id);

			if(chat_user is null) await Results.Json(null).ExecuteAsync(context);
			else await Results.Json(new ChatUserDTO(chat_user)).ExecuteAsync(context);
		}

		public async Task ChatUsersCount(HttpContext context, VkDbContext vkDbContext)
		{
			long count = await vkDbContext.chat_users.LongCountAsync();
			await Results.Json(count).ExecuteAsync(context);
		}

		public async Task UsersInfoByChatId(HttpContext context, VkDbContext vkDbContext, long id)
		{
			var result = await vkClient.MessagesGetConversationMembersAsync
				(id + VkClient.const_peer_id, new List<string> {"first_name,last_name,photo_50"});

			if(result is null)
			{
				await Results.Json(null).ExecuteAsync(context);
				return;
			}

			JsonArray arr = (JsonArray)result["response"]!["profiles"]!;
			await Results.Json(arr).ExecuteAsync(context);
		}

		public async Task ChatInfoById(HttpContext context, VkDbContext vkDbContext, List<long> ids)
		{
			var result = await vkClient.MessagesGetConversationsById
				(ids);

			if(result is null)
			{
				await Results.Json(null).ExecuteAsync(context);
				return;
			}

			JsonArray? arr = (JsonArray)result["response"]!["items"]!;
			var res = new List<JsonObject>();

			foreach(JsonObject? a in arr)
			{
				long id = (long)a!["peer"]!["id"]!;
				JsonObject cs = (JsonObject)a!["chat_settings"]!;
				cs.Add(new KeyValuePair<string, JsonNode?>("id", id - VkClient.const_peer_id));
				cs.Remove("admin_ids");
				cs.Remove("is_group_channel");
				cs.Remove("acl");
				res.Add(cs);
			}
			
			await Results.Json(res).ExecuteAsync(context);
		}
	}
}