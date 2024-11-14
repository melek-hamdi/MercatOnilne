using WearHouse.Models;

namespace WearHouse.ProductService
{
    public interface ProductInterface
    {
        public Task<Product> AddProduct(Product product);
        public  Task<IEnumerable<Product>> GetProducts();
        public Task<Product> UpdateProduct(Product updatedProduct);
        public  Task<Product> GetProductById(int productId);
    }
}
