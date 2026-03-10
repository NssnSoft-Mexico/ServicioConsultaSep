using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registros>>> Get() 
        {
            return await _context.Registros.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Registros>> Post(Registros registros) 
        {

            var errores = new Dictionary<string, bool>();

            if (!Regex.IsMatch(registros.correo, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                errores["correo"] = true;
            }

            if (!Regex.IsMatch(registros.telefono, @"^\d{10}$"))
            {
                errores["telefono"] = true;
            }

            if (!Regex.IsMatch(registros.compania, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
            {
                errores["compania"] = true;
            }

            if (!Regex.IsMatch(registros.persona, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
            {
                errores["persona"] = true;
            }

            if (errores.Count > 0)
            {
                return Ok(new
                {
                    mensaje = "Hay errores en el registro capturado",
                    errores
                });
            }

            _context.Registros.Add(registros);
            await _context.SaveChangesAsync();
            return Ok(registros);
        }
    }
}
