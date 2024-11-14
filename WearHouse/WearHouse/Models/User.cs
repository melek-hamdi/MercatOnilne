using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using System.Text.Json.Serialization;

namespace WearHouse.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Name must be 10 characters or less"), MinLength(4, ErrorMessage = "Name must be 4 characters or more")]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "Password must be 8 characters or more")]
        public string Password { get; set; }
        public Roles? Role { get; set; } 

        public DateTime? DateCreated { get; set; }
        public string ImageUrl { get; set; }
        [JsonIgnore]
        [ForeignKey("UserId")]
        public ICollection<Product>? Products { get; set; }

    }
}
