using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;
using System.Globalization;

namespace Inventory.Data
{
    class CsvLine
    {
        [Index(0)]
        public string? ItemName { get; set; }
        [Index(1)]
        public string? ItemCategory { get; set; }
        [Index(2)]
        public int SellIn { get; set; }
        [Index(3)]
        public int Quality { get; set; }
    }

    public static class DbLoader 
    {
        public static async Task Load(InventoryDbContext dbContext)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = false,
            };

            using (var reader = new StreamReader("inventory.txt"))
            using (var csv = new CsvReader(reader, config))
            {
                var records = csv.GetRecordsAsync<CsvLine>();

                await foreach (var record in records)
                {
                    var item = new Item() { ItemName = record.ItemName, ItemCategory = record.ItemCategory, SellIn = record.SellIn, Quality = record.Quality };

                    dbContext.Add(item);
                    await dbContext.SaveChangesAsync();
                }
            }
        }
    }
}
