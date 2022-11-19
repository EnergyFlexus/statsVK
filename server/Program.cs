global using System.Text.Json.Nodes;

global using VkDb;
global using VkApi;
global using VkBot;
global using VkTypes;

var builder = WebApplication.CreateBuilder(args);

// configuration setup
builder.Configuration.AddJsonFile("config.json");

string url =                    builder.Configuration["url"]!;
string connection_string =      builder.Configuration["connection_string"]!;

builder.Services.AddDbContextPool<VkDbContext>(options => {
    options.UseMySql(connection_string, ServerVersion.AutoDetect(connection_string));});

builder.Services.AddSingleton<Bot>(new Bot(builder.Configuration));
builder.Services.AddSingleton<Api>(new Api( /*vk client here */));

var curr_dir = Directory.GetCurrentDirectory();
var web_root_dir = "wwwroot";

builder.Environment.WebRootPath = Path.Combine(curr_dir, web_root_dir);
var app = builder.Build();

app.Urls.Add(url);

// redirect to index.html
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.MapGroup("/api").MapApi();
app.Map("/bot", BotExtensions.MapBot);

// react routing fix
app.Map("/{*any}", async (context) => {
	context.Response.StatusCode = 200;
	await context.Response.SendFileAsync(Path.Combine(web_root_dir, "index.html"));
});

app.Run();
