namespace Inventory.Data
{
    public class Item
    {
        public int Id { get; set; }
        public string? ItemName { get; set; }
        public string? ItemCategory { get; set; }
        public int SellIn { get; set; }
        public int Quality { get; set; }

    }
}
