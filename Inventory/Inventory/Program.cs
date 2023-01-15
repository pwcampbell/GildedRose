using Inventory.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Inventory
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<InventoryDbContext>(options =>
            {
                options.UseInMemoryDatabase("gildedrose");
            });

            builder.Services.AddSingleton<IAgeService, AgeService>();


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Gilded Rose API",
                    Description = "Inventory managment system",
                });
                var filePath = Path.Combine(System.AppContext.BaseDirectory, "SwaggerApi.XML");
                options.IncludeXmlComments(filePath);
            });

            builder.Services.AddControllersWithViews();

            var app = builder.Build();
            app.UseSwagger();
            app.UseSwaggerUI();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}