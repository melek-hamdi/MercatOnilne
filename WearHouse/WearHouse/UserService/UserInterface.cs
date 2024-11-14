using WearHouse.Models;

namespace WearHouse.UserService
{
    public interface UserInterface
    {
        public Task<IEnumerable<User>> GetUsers();
        public Task<User> register(User user);
        public  Task<User> login(string email, string password);
        public Task<bool> PurchaseProducts(PurchaseRequest request);
        public  Task<IEnumerable<Purchase>> GetUserById(int userId);

    }
}
