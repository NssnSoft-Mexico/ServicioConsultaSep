namespace back_end.Models
{
    public class Registros
    {
        public int id { get; set; }
        public required string compania { get; set; } = string.Empty;
        public required string persona { get; set; } = string.Empty;
        public required string correo { get; set; } = string.Empty;
        public required string telefono { get; set; } = string.Empty;
    }
}
