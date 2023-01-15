using Microsoft.EntityFrameworkCore;

namespace Inventory.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Item> Inventory { get; set; }
    }
}
