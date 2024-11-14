using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WearHouse.Data;
using WearHouse.Models;
using WearHouse.UserService;

namespace WearHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserInterface _userService;
        private readonly AppDbContext _context;
      
        public UserController(UserInterface authService, AppDbContext context)
        {
            _userService = authService;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            IEnumerable<User> users = await _userService.GetUsers();
            if (users == null)
            {
                return NotFound();
            };
            return Ok(users);
        }
        [HttpPost]
        public async Task<ActionResult<User>> Registration(User user)
        {
            var registeredUser = await _userService.register(user);
            if (registeredUser == null)
            {
                return BadRequest();
            };
            return Ok(registeredUser);
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] WearHouse.Models.LoginRequest loginRequest)
        {
            var registeredUser = await _userService.login(loginRequest.email, loginRequest.password);
            if (registeredUser == null)
            {
                return BadRequest();
            };
            return Ok(registeredUser);
        }
        [HttpPost]
        [Route("PurchaseProducts")]
        public async Task<IActionResult> PurchaseProducts([FromBody] PurchaseRequest request)
        {
            try
            {
                await _userService.PurchaseProducts(request);
                return Ok("Products purchased successfully.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error purchasing products: {ex.Message}");
            }

        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            try
            {
                var user = await _userService.GetUserById(userId);
                if (user == null)
                {
                    return NotFound(); // Return 404 if user is not found
                }

                return Ok(user); // Return user if found
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving user: {ex.Message}");
            }
        }


    }
}
