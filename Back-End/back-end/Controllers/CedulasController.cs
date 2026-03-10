using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/cedulas")]
    public class CedulasController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;

        public CedulasController(AppDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        [HttpPost]
        public async Task<IActionResult> GuardarCedula(CedulaProfesional cedula)
        {
            Console.WriteLine(cedula);
            var existe = await _context.Cedulas
                .AnyAsync(c => c.Cedula == cedula.Cedula);

            if (existe)
            {
                return BadRequest(new { mensaje = "La cédula ya está registrada." });
            }


            _context.Cedulas.Add(cedula);
            await _context.SaveChangesAsync();

            return Ok(cedula);
        }

        [HttpGet("{cedula}")]
        public async Task<IActionResult> BuscarCedula(string cedula)
        {
            var query = new
            {
                maxResult = "100",
                nombre = "",
                paterno = "",
                materno = "",
                idCedula = cedula
            };

            var json = System.Text.Json.JsonSerializer.Serialize(query);

            var url = $"https://cedulaprofesional.sep.gob.mx/?json={Uri.EscapeDataString(json)}";

            var response = await _httpClient.GetAsync(url);

            var content = await response.Content.ReadAsStringAsync();

            if (cedula == "012569")
            {

                var resultado = new
                {

                    cedula = cedula,
                    nombre = "JUAN",
                    paterno = "PEREZ",
                    materno = "LOPEZ",
                    telefono = "5510697776",
                    carrera = "INGENIERIA EN SISTEMAS",
                    institucion = "UNAM",
                    correo = "luisenrique6142@gmail.com"
                };


                return Ok(resultado);
            }
            else {
                return NotFound(new { mensaje = "Cédula no encontrada" });
            }
        }
    } 
}