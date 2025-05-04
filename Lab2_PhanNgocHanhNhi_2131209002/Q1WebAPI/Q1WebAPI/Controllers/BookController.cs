using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Q1WebAPI.Models;

namespace Q1WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : Controller
    {
        private readonly LibraryManagementContext _context;
        
        public BookController(LibraryManagementContext context)
        {
            _context = context;
        }


        [HttpGet("getList")]
        public async Task<IActionResult> GetListAllowance()
        {
            var books = _context.Book.ToList();          
            return Ok(books);
        }
    }
}
