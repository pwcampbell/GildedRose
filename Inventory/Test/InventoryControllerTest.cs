using Inventory.Data;
using NUnit.Framework.Interfaces;
using NUnit.Framework;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics.Metrics;
using System.Net.NetworkInformation;
using Inventory.Controllers;
using Microsoft.EntityFrameworkCore;

namespace TestController
{
    public class InventoryControllerTest
    {
        private InventoryController _controller;
        [SetUp]
        public void Setup()
        {
            // Normally I would pick mock framework and mock away the db and age service
            var options = new DbContextOptionsBuilder();
            options.UseInMemoryDatabase(Guid.NewGuid().ToString());
            var db = new InventoryDbContext(options.Options);

            db.Add(new Item() { ItemName = "Sword", ItemCategory = "Weapon", SellIn = 50, Quality = 50 });
            db.Add(new Item() { ItemName = "Shield", ItemCategory = "Weapon", SellIn = 50, Quality = 50 });
            db.Add(new Item() { ItemName = "OldSword", ItemCategory = "Weapon", SellIn = 10, Quality = 0 });
            db.SaveChanges();

            _controller = new InventoryController(null, db, new AgeService());
        }

        [Test]
        public void GetInventory()
        {
            var res = _controller.Current().Result;
            Assert.NotNull(res);
            Assert.That(res.Count(), Is.EqualTo(2));
        }

        [Test]
        public void GetTrash()
        {
            var res = _controller.Trash().Result;
            Assert.NotNull(res);
            Assert.That(res.Count(), Is.EqualTo(1));
        }

        [Test]
        public void GetSingle()
        {
            var res = _controller.Item("Sword").Result;
            Assert.NotNull(res);
            Assert.That(res.ItemName, Is.EqualTo("Sword"));
        }


        [Test]
        public void Age()
        {
            _ = _controller.NextDay().Result;

            var res = _controller.Current().Result;
            Assert.NotNull(res);
            Assert.That(res.Count(), Is.EqualTo(2));

            var trash = _controller.Trash().Result;
            Assert.NotNull(trash);
            Assert.That(trash.Count(), Is.EqualTo(0));
        }
    }

}