using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobPortalTask.Data;

namespace JobPortalTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]

    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            return Ok(_context.Users.ToList());
        }

        [HttpGet("applications")]
        public IActionResult GetApplications()
        {
            return Ok(_context.Applications.ToList());
        }

        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            return Ok(new
            {
                TotalJobs = _context.Jobs.Count(),
                TotalUsers = _context.Users.Count(),
                TotalApplications = _context.Applications.Count()
            });
        }

    }
}