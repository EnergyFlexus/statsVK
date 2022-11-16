global using System.Text.Json.Nodes;
global using System.Text;

global using VkDB;
global using Api;
global using Bot;

var builder = WebApplication.CreateBuilder(args);

// configuration setup
builder.Configuration.AddJsonFile("config.json");

// long group_id =                 Int32.Parse(builder.Configuration["group_id"]!);
// string confirmation_string =    builder.Configuration["confirmation_string"]!;
// string secret =                 builder.Configuration["secret"]!;
// string access_token =           builder.Configuration["access_token"]!;
// string version =                builder.Configuration["version"]!;
// string url =                    builder.Configuration["url"]!;
// string connection_string =      builder.Configuration["connection_string"]!;


var curr_dir = Directory.GetCurrentDirectory();
var web_root_dir = "wwwroot";

// builder configuration
builder.Environment.WebRootPath = Path.Combine(curr_dir, web_root_dir);
var app = builder.Build();

// redirect to index.html or default.html
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("/api").MapApi();
app.MapGet("/bot", BotExtensions.MapBot);

// redirect fix
app.MapGet("/{**any}", async (context) => {
	await context.Response.SendFileAsync(web_root_dir + "/index.html");
});

app.Run();
