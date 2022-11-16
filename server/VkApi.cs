namespace VkApi
{
	public static class ApiExtensions
	{
		public static RouteGroupBuilder MapApi(this RouteGroupBuilder group)
		{
			// todo DTO classes
			group.MapGet("/messagesAll", async (HttpContext context, VkDbContext vkDbContext) => {
				var messages = await vkDbContext.messages.ToListAsync();
				await Results.Json(messages).ExecuteAsync(context);
			});

			group.MapGet("/messageById/{id:int}", async (HttpContext context, VkDbContext vkDbContext, long id) => {
				var message = await vkDbContext.messages.FindAsync(id);
				await Results.Json(message).ExecuteAsync(context);
			});
			
			return group;
		}
	}
}