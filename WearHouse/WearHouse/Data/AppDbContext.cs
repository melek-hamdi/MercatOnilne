using Microsoft.EntityFrameworkCore;
using WearHouse.Models;

namespace WearHouse.Data

{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Purchase>()
            .HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Purchase>()
                .HasOne(p => p.Product)
                .WithMany()
                .HasForeignKey(p => p.ProductId);

            modelBuilder.Entity<Product>()
               .HasOne(p => p.User)
               .WithMany(u => u.Products)
               .HasForeignKey(p => p.UserId);
            modelBuilder.Entity<User>()
               .Property(e => e.DateCreated)
               .HasDefaultValue(DateTime.Now); // Set default value for DateCreated
            modelBuilder.Entity<User>()
                .Property(e => e.Role)
                .HasDefaultValue(Roles.Customer)
                .HasConversion(
                    v => v.ToString(), // Convert enum to string for storing
                    v => (Roles)Enum.Parse(typeof(Roles), v)
                ); // Convert string to enum for reading
                
            
            base.OnModelCreating(modelBuilder);
        }
        public DbSet <User> Users { get; set; }
        public DbSet <Product> Products { get; set; }
        public DbSet<Purchase> Purchases { get; set; }

    }
}
