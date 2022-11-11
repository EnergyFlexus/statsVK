namespace Api
{
	public static class ApiExtensions
	{
		public static RouteGroupBuilder MapApi(this RouteGroupBuilder group)
		{
			// endpoints here, DI check
			group.MapGet("/", () => "123");
			return group;
		}
	}
}