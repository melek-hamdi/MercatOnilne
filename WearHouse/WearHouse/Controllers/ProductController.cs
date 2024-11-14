using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using WearHouse.Models;
using WearHouse.ProductService;
using WearHouse.UserService;

namespace WearHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ProductInterface _productService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(ProductInterface productService, IWebHostEnvironment webHostEnvironment)
        {
            _productService = productService;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpPost]
        public async Task<ActionResult<Product>> Registration(Product product)
        {
           


            var prod = await _productService.AddProduct(product);
            if (prod == null)
            {
                return BadRequest();
            };
            return Ok(prod);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            IEnumerable<Product> products = await _productService.GetProducts();
            if (products == null)
            {
                return NotFound();
            };
            return Ok(products);
        }
        [HttpPost("upload")]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            if (updatedProduct == null || id != updatedProduct.Id)
            {
                return BadRequest("Invalid product data");
            }

            try
            {
                var product = await _productService.UpdateProduct(updatedProduct);
                if (product == null)
                {
                    return NotFound(); 
                }

                return Ok(product); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating product: {ex.Message}");
            }
        }
        [HttpGet]
        [Route("GetProductById/{productId}")]
        public async Task<IActionResult> GetProductById(int productId)
        {
            try
            {
                var product = await _productService.GetProductById(productId);
                if (product == null)
                {
                    return NotFound($"Product with ID {productId} not found.");
                }

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching product: {ex.Message}");
            }
        }
    }
}
