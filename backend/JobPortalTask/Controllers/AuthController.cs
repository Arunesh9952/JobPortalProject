using JobPortalTask.Data;
using JobPortalTask.DTO;
using JobPortalTask.Models;
using JobPortalTask.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobPortalTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // REGISTER USER
        [HttpPost("register")]
       
        public IActionResult Register([FromBody] User user)
        {
            // prevent id injection
            user.UserId = 0;

            // optional validation
            if (string.IsNullOrEmpty(user.Role))
            {
                return BadRequest("Role is required (Admin or User)");
            }

            if (user.Role != "Admin" && user.Role != "User")
            {
                return BadRequest("Role must be Admin or User");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        // LOGIN USER
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (user == null || user.Password != dto.Password)
            {
                return Unauthorized("Invalid email or password");
            }

            var token = _tokenService.GenerateToken(user.Email, user.Role);

            return Ok(new
            {
                token = token,
                role = user.Role
            });
        }
    }
}