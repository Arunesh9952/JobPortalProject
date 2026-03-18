using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortalTask.Models
{
    public class Application
    {
        [Key]
        public int ApplicationId { get; set; }
        [ForeignKey("Job")]
        public int JobId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime ApplicationDate { get; set; }

        public string Status { get; set; }

        public User User { get; set; }
        public Job Job { get; set; }
    }
}
