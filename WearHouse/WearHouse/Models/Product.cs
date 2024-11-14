using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WearHouse.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Name must be 10 characters or less"), MinLength(4, ErrorMessage = "Name must be 4 characters or more")]
        public string Name { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Name must be 10 characters or less"), MinLength(4, ErrorMessage = "Name must be 4 characters or more")]
        public string Brand { get; set; }

        public Boolean Stock { get; set; }
        public decimal Price { get; set; }

        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        [JsonIgnore]
        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

    }
}
