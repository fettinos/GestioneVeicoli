//DTO significa Data Transfer Object, ovvero un oggetto utilizzato per trasferire dati tra le diverse componenti dell'applicazione
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class CreatePersonaDto
{
    [Required]
    [StringLength(50)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Cognome { get; set; } = string.Empty;

    [Required]
    [StringLength(16, MinimumLength = 16)]
    public string CodiceFiscale { get; set; } = string.Empty;

    [Required]
    public DateOnly? DataNascita { get; set; }
}