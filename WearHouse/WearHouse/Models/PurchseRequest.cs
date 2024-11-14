namespace WearHouse.Models
{
    public class PurchaseRequest
    {
        public int UserId { get; set; }
        public List<int> ProductIds { get; set; }
    }
}
