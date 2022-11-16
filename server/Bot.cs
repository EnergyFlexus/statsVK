namespace Bot
{
	public static class BotExtensions
	{
		public static async Task MapBot(HttpContext context)
		{
			// bot code here.
			await Results.Ok().ExecuteAsync(context);
		}
	}
}