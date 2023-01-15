using Inventory.Data;
using NUnit.Framework.Interfaces;
using NUnit.Framework;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics.Metrics;
using System.Net.NetworkInformation;

namespace Test
{
    public class AgeServiceTest
    {
        private AgeService _age;
        [SetUp]
        public void Setup()
        {
            _age = new AgeService();
        }

        [Test]
        public void StandardAge()
        {
            var item = new Item() { ItemName = "Sword", ItemCategory = "Weapon", SellIn = 50, Quality = 50 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(49));
            Assert.That(item.Quality, Is.EqualTo(49));
        }

        [Test]
        public void StandardDegradesTwiceAsFast()
        {
            // Once the sell by date has passed, Quality degrades twice as fast
            var item = new Item() { ItemName = "Sword", ItemCategory = "Weapon", SellIn = 0, Quality = 50 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(-1));
            Assert.That(item.Quality, Is.EqualTo(48));
        }

        [Test]
        public void StandardQualityNeverNegative()
        {
            // The Quality of an item is never negative
            var item = new Item() { ItemName = "Sword", ItemCategory = "Weapon", SellIn = 2, Quality = 0 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(1));
            Assert.That(item.Quality, Is.EqualTo(0));
        }

        [Test]
        public void AgedBrie()
        {
            //"Aged Brie" actually increases in Quality the older it gets
            var item = new Item() { ItemName = "Aged Brie", ItemCategory = "Weapon", SellIn = 50, Quality = 5 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(49));
            Assert.That(item.Quality, Is.EqualTo(6));
        }

        [Test]
        public void AgedBrieMax()
        {
            //The Quality of an item is never more than 50
            var item = new Item() { ItemName = "Aged Brie", ItemCategory = "Weapon", SellIn = 50, Quality = 50 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(49));
            Assert.That(item.Quality, Is.EqualTo(50));
        }

        [Test]
        public void Sulfuras()
        {
            //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
            //An item can never have its Quality increase above 50, however "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.
            var item = new Item() { ItemName = "Sword", ItemCategory = "Sulfuras", SellIn = 80, Quality = 80 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(80));
            Assert.That(item.Quality, Is.EqualTo(80));
        }

        [TestCase(50, 20, 49, 21, TestName = "BackstagePassesOver10" )]
        [TestCase(11, 20, 10, 22, TestName = "BackstagePasses10")]
        [TestCase(7, 20, 6, 22, TestName = "BackstagePasses6")]
        [TestCase(6, 20, 5, 23, TestName = "BackstagePasses5")]
        [TestCase(1, 20, 0, 23, TestName = "BackstagePasses1")]
        [TestCase(0, 20, -1, 0, TestName = "BackstagePasses1")]
        public void BackstagePasses(int inSell, int inQual, int outSell, int outQual)
        {
            //"Backstage Passes", like aged brie, increases in Quality as it's SellIn value approaches
            var item = new Item() { ItemName = "Sword", ItemCategory = "Backstage Passes", SellIn = inSell, Quality = inQual };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(outSell));
            Assert.That(item.Quality, Is.EqualTo(outQual));
        }

        [Test]
        public void ConjureddAge()
        {

            //"Conjured" items degrade in Quality twice as fast as normal items
            var item = new Item() { ItemName = "Sword", ItemCategory = "Conjured", SellIn = 50, Quality = 50 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(49));
            Assert.That(item.Quality, Is.EqualTo(48));
        }

        [Test]
        public void ConjuredDegradesTwiceAsFast()
        {
            //"Conjured" items degrade in Quality twice as fast as normal items
            var item = new Item() { ItemName = "Sword", ItemCategory = "Conjured", SellIn = 0, Quality = 50 };
            _age.Age(item);

            Assert.That(item.SellIn, Is.EqualTo(-1));
            Assert.That(item.Quality, Is.EqualTo(46));
        }
    }
}