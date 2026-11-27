using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class AssegnaProprietarioDto
{
    [Range(1, int.MaxValue)]
    public int PersonaId { get; set; }
}