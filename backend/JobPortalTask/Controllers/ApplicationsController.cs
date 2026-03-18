using JobPortalTask.Data;
using JobPortalTask.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobPortalTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("apply/{jobId}")]
        public IActionResult Apply(int jobId)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            var user = _context.Users.FirstOrDefault(u => u.Email == email);

            var application = new Application
            {
                JobId = jobId,
                UserId = user.UserId,
                Status = "Applied",
                ApplicationDate = DateTime.Now
            };

            _context.Applications.Add(application);
            _context.SaveChanges();

            return Ok(application);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetApplications()
        {
            return Ok(_context.Applications.ToList());
        }

        [HttpGet("my")]
        public IActionResult GetMyApplications()
        {
            var apps = _context.Applications
                .Select(a => new
                {
                    a.Job.JobTitle,
                    a.Job.Company,
                    a.Job.Location,
                    a.Status
                })
                .ToList();

            return Ok(apps);
        }


    }
}
