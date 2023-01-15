namespace Inventory.Data
{
    public interface IAgeService
    {
        void Age(Item item);
    }

    public class AgeService : IAgeService
    {
        public void Age(Item item)
        {
            if (item.ItemName == "Aged Brie")
            {
                AgedBrie(item);
            }
            else if (item.ItemCategory == "Sulfuras")
            {
                return;
            }
            else if (item.ItemCategory == "Backstage Passes")
            {
                BackstagePasses(item);
            }
            else if (item.ItemCategory == "Conjured")
            {
                Conjured(item);
            }
            else
            {
                Standard(item);
            }

            if (item.Quality < 0)
            {
                item.Quality = 0;
            }

            if (item.Quality > 50)
            {
                item.Quality = 50;
            }
        }

        public void Standard(Item item)
        {
            item.SellIn -= 1;

            if (item.SellIn >= 0)
            {
                item.Quality -= 1;
            }
            else
            {
                item.Quality -= 2;
            }
        }

        private void AgedBrie(Item item)
        {
            item.SellIn -= 1;
            item.Quality += 1;
        }

        private void BackstagePasses(Item item)
        {
            item.SellIn -= 1;

            if (item.SellIn < 0)
            {
                item.Quality = 0;
                return;
            }

            if (item.SellIn > 10)
            {
                // over 10 days outs
                item.Quality += 1;
            }
            else if (item.SellIn > 5)
            {
                // 10 to 6 days out
                item.Quality += 2;
            }
            else
            {
                // 5 to 0 days out
                item.Quality += 3;
            }
        }

        private void Conjured(Item item)
        {
            // twice as fast meaning 4 times as fast after sell in?
            item.SellIn -= 1;

            if (item.SellIn >= 0)
            {
                item.Quality -= 2;
            }
            else
            {
                item.Quality -= 4;
            }
        }
    }
}
