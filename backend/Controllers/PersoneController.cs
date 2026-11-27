using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers;

[ApiController]
[Route("api/persone")]
public class PersoneController : ControllerBase
{
    private readonly GestioneVeicoliContext _context;

    public PersoneController(GestioneVeicoliContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetPersone()
    {
        var persone = await _context.Persone
            .AsNoTracking()
            .Select(p => new
            {
                p.Id,
                p.Nome,
                p.Cognome,
                p.CodiceFiscale,
                p.DataNascita
            })
            .ToListAsync();

        return Ok(persone);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePersona(
        CreatePersonaDto dto)
    {
        if (dto.DataNascita == null ||
            dto.DataNascita > DateOnly.FromDateTime(DateTime.Today))
        {
            return BadRequest("Data di nascita non valida.");
        }

        var persona = new Persone
        {
            Nome = dto.Nome.Trim(),
            Cognome = dto.Cognome.Trim(),
            CodiceFiscale = dto.CodiceFiscale.Trim().ToUpperInvariant(),
            DataNascita = dto.DataNascita.Value
        };

        _context.Persone.Add(persona);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
            when (ex.InnerException is SqlException sqlEx
                  && (sqlEx.Number == 2601 ||
                      sqlEx.Number == 2627))
        {
            return Conflict("Codice fiscale già presente.");
        }

        return StatusCode(201, new
        {
            persona.Id,
            persona.Nome,
            persona.Cognome,
            persona.CodiceFiscale,
            persona.DataNascita
        });
    }
}