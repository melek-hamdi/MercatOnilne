using Microsoft.EntityFrameworkCore;
using WearHouse.Data;
using WearHouse.Models;

namespace WearHouse.ProductService
{
    public class ProductService :ProductInterface
    {
        private readonly AppDbContext _context;
        public ProductService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Product> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }
        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _context.Products.Where(p => p.Stock).ToListAsync();
            return products;
        }
        public async Task<Product> UpdateProduct(Product updatedProduct)
        {
            try
            {
                var existingProduct = await _context.Products.FindAsync(updatedProduct.Id);

                if (existingProduct == null)
                {
                    throw new InvalidOperationException("Product not found");
                }

                existingProduct.Quantity = updatedProduct.Quantity;
                existingProduct.Stock = updatedProduct.Stock;

                await _context.SaveChangesAsync();

                return existingProduct;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update product", ex);
            }
        }
        public async Task<Product> GetProductById(int productId)
        {
            try
            {
                return await _context.Products.FindAsync(productId);
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging
                Console.Error.WriteLine($"Error fetching product with ID {productId}: {ex.Message}");
                Console.Error.WriteLine($"Stack Trace: {ex.StackTrace}");

                throw; // Rethrow the exception to propagate it up the call stack
            }
        }
    }

}
