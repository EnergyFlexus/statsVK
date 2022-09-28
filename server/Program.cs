// TODO config file

var curr_dir = Directory.GetCurrentDirectory();
var web_root_dir = "wwwroot";

var builder = WebApplication.CreateBuilder(args);

// builder configuration
builder.Environment.WebRootPath = Path.Combine(curr_dir, web_root_dir);
var app = builder.Build();

// redirect to index.html or default.html
app.UseDefaultFiles();

app.UseStaticFiles();

// simple example to request
app.MapGet("/api", () => "Example API");

app.Run();
