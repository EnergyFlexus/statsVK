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

			group.MapGet("/MessagesByChatIdOffset/{chat_id:int}/{count:int}/{start_id:int}", // + order
				async (HttpContext context, 
				VkDbContext vkDbContext, 
				Api api, 
				long chat_id, 
				long count, 
				long start_id)=> {


				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesByChatIdOffset(context, vkDbContext, chat_id, count, start_id, ord);
			});

			group.MapGet("/MessagesCountsInChatsAll", // + order
				async (HttpContext context, VkDbContext vkDbContext, Api api) => {
				
				var order = context.Request.Query["order"];
				ApiOrder ord = Api.ParseOrder(order);
				await api.MessagesCountsInChatsAll(context, vkDbContext, ord);
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
		// vkClient here

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
		
		public async Task MessagesByChatIdOffset
			(HttpContext context, VkDbContext vkDbContext, long chat_id, long count, long start_id, ApiOrder order)
		{
			IQueryable<Message> messages;
			IQueryable<MessageDTO> messages_DTO;

			if(start_id == 0)
				start_id = long.MaxValue;

			messages = from m in vkDbContext.messages
				where m.chat_id == chat_id && m.message_id < start_id
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
	}
}