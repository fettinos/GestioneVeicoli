using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class CreateVeicoloDto
{
    [Required]
    [StringLength(15)]
    public string Targa { get; set; } = string.Empty; //Permette di leggere e modificare una proprietà

    [Required]
    [StringLength(50)]
    public string Marca { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Modello { get; set; } = string.Empty;

    [Range(1800, 2100)]
    public int Anno { get; set; }

    [Required]
    public string TipoVeicolo { get; set; } = string.Empty;
}