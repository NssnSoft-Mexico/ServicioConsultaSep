using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models
{
    [Table("cedulas")]
    public class CedulaProfesional {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("cedula")]
        public string Cedula { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; }

        [Column("primer_apellido")]
        public string paterno { get; set; }

        [Column("segundo_apellido")]
        public string materno { get; set; }

        [Column("institucion")]
        public string Institucion { get; set; }

        [Column("carrera")]
        public string Carrera { get; set; }

        [Column("correo")]
        public string Correo { get; set; }

        [Column("telefono")]
        public string Telefono { get; set; }
    }
}