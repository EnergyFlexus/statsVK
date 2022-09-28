var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
	// folder with content
	WebRootPath = "wwwroot"
});
var app = builder.Build();


app.UseStaticFiles();

// redirect to index.html or default.html
app.UseDefaultFiles();

// simple example to request
app.MapGet("/api", () => "Example API");

app.Run();
