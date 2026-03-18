using JobPortalTask.Data;
using JobPortalTask.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobPortalTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetJobs()
        {
            return Ok(_context.Jobs.ToList());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult CreateJob(Job job)
        {
            job.PostedDate = DateTime.Now;

            _context.Jobs.Add(job);

            _context.SaveChanges();

            return Ok(job);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        
        public IActionResult DeleteJob(int id)
        {
            var job = _context.Jobs.Find(id);

            if (job == null)
                return NotFound();

            _context.Jobs.Remove(job);
            _context.SaveChanges();

            return Ok(new { message = "Job deleted successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJob(int id, Job job)
        {
            var existingJob = _context.Jobs.Find(id);

            if (existingJob == null)
            {
                return NotFound();
            }

            existingJob.JobTitle = job.JobTitle;
            existingJob.Company = job.Company;
            existingJob.Description = job.Description;
            existingJob.Location = job.Location;
            existingJob.SalaryRange = job.SalaryRange;

            _context.SaveChanges();

            return Ok(new { message = "Job updated successfully" });
        }



    }
}
