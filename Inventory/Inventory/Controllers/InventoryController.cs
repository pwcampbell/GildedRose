using Inventory.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly InventoryDbContext _dbContext;
        private readonly IAgeService _ageService;

        private static bool _hasInit = false;

        public InventoryController(ILogger<InventoryController> logger, InventoryDbContext dbContext, IAgeService ageService)
        {
            _logger = logger;
            _dbContext = dbContext;
            _ageService = ageService;
        }

        [HttpPost("init")]
        public async Task<StatusCodeResult> Init()
        {
            if (!_hasInit)
            {
                await DbLoader.Load(_dbContext);
                _hasInit = true;
            }

            return Ok();
        }

        [HttpGet ("current")]
        public async Task<IEnumerable<Item>> Current()
        {
            return await _dbContext.Inventory.Where(i => i.Quality > 0).ToListAsync();
        }

        [HttpGet ("trash")]
        public async Task<IEnumerable<Item>> Trash()
        {
            return await _dbContext.Inventory.Where(i => i.Quality == 0).ToListAsync();
        }

        [HttpGet ("item")]
        public async Task<Item?> Item([FromQuery] string itemName)
        {
            return await _dbContext.Inventory.Where(i => i.ItemName == itemName).SingleOrDefaultAsync();
        }

        [HttpPost ("nextday")]
        public async Task<StatusCodeResult> NextDay()
        {
            // normally I wouldn't put so much logic in a controller, probably use Mediator
            try
            {
                var items = await _dbContext.Inventory.ToListAsync();
                var trashed = new HashSet<Item>();

                foreach (var item in items)
                {
                    if (item.Quality == 0)
                    {
                        trashed.Add(item);
                        continue;
                    }

                    _ageService.Age(item);
                }

                _dbContext.Inventory.RemoveRange(trashed);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}