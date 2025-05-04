using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Q1WebAPI.Models
{
    public class LibraryManagementContext : DbContext
    {
        public LibraryManagementContext(DbContextOptions<LibraryManagementContext> options) : base(options) { }
        public DbSet<Book> Book { get; set; }
    }
}
