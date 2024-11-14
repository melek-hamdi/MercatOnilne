using Microsoft.EntityFrameworkCore;
using WearHouse.Data;
using WearHouse.Models;

namespace WearHouse.UserService
{
    public class UserService : UserInterface
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();  
        }
        public async Task<User> register(User user)
        {
             _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> login(string email, string password)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
                if (user == null)
                {
                    throw new Exception("User not found or password incorrect");
                }
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
     
            public async Task<bool> PurchaseProducts(PurchaseRequest request)
            {
                if (request == null || request.UserId <= 0 || request.ProductIds == null || !request.ProductIds.Any())
                {
                    throw new ArgumentException("Invalid purchase request.");
                }

                try
                {
                    var user = await _context.Users.FindAsync(request.UserId);
                    if (user == null)
                    {
                        throw new KeyNotFoundException($"User with ID {request.UserId} not found.");
                    }

                    foreach (var productId in request.ProductIds)
                    {
                        var product = await _context.Products.FindAsync(productId);
                        if (product == null)
                        {
                            throw new KeyNotFoundException($"Product with ID {productId} not found.");
                        }

                        var purchase = new Purchase
                        {
                            UserId = request.UserId,
                            ProductId = productId,
                            PurchaseDate = DateTime.Now,
                           
                        };

                        _context.Purchases.Add(purchase);
                    }

                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    // Log the exception details for debugging
                    Console.Error.WriteLine($"Error purchasing products: {ex.Message}");
                    Console.Error.WriteLine($"Stack Trace: {ex.StackTrace}");

                    throw;
                }

            }
        public async Task<IEnumerable<Purchase>> GetUserById(int userId)
        {
            var purchases = await _context.Purchases
                .Include(p => p.Product)
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return purchases;
        }

    }

   
}
