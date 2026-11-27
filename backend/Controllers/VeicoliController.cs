using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers;

[ApiController]
[Route("api/veicoli")]
public class VeicoliController : ControllerBase
{
    private readonly GestioneVeicoliContext _context;

    public VeicoliController(GestioneVeicoliContext context)
    {
        _context = context;
    }

    // GET: Lista completa dei veicoli
    [HttpGet]
    public async Task<IActionResult> GetVeicoli()
    {
        var veicoli = await _context.Veicoli
            .AsNoTracking()
            .Select(v => new
            {
                v.Id,
                v.Targa,
                v.Marca,
                v.Modello,
                v.Anno,
                v.TipoVeicolo,
                v.ProprietarioId
            })
            .ToListAsync();

        return Ok(veicoli);
    }

    // GET: Tipi di veicolo
    [HttpGet("tipi")]
    public IActionResult GetTipiVeicolo()
    {
        return Ok(Enum.GetNames<TipoVeicolo>());
    }

    // POST: Inserimento nuovo veicolo
    [HttpPost]
    public async Task<IActionResult> CreateVeicolo(
        CreateVeicoloDto dto)
    {
        if (!Enum.GetNames<TipoVeicolo>()
            .Contains(dto.TipoVeicolo))
        {
            return BadRequest("Tipo di veicolo non valido.");
        }

        var veicolo = new Veicoli
        {
            Targa = dto.Targa.Trim().ToUpperInvariant(),
            Marca = dto.Marca.Trim(),
            Modello = dto.Modello.Trim(),
            Anno = dto.Anno,
            TipoVeicolo = dto.TipoVeicolo,
            ProprietarioId = null
        };

        _context.Veicoli.Add(veicolo);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
            when (ex.InnerException is SqlException sqlEx
                  && (sqlEx.Number == 2601 ||
                      sqlEx.Number == 2627))
        {
            return Conflict("Targa già presente.");
        }

        return StatusCode(201, new
        {
            veicolo.Id,
            veicolo.Targa,
            veicolo.Marca,
            veicolo.Modello,
            veicolo.Anno,
            veicolo.TipoVeicolo,
            veicolo.ProprietarioId
        });
    }
    [HttpPut("{id}/proprietario")]
public async Task<IActionResult> AssegnaProprietario(
    int id, AssegnaProprietarioDto dto)
{
    var personaEsiste = await _context.Persone
        .AnyAsync(p => p.Id == dto.PersonaId);

    if (!personaEsiste)
    {
        return NotFound("Persona non trovata.");
    }

    var veicolo = await _context.Veicoli
        .FindAsync(id);

    if (veicolo == null)
    {
        return NotFound("Veicolo non trovato.");
    }

    if (veicolo.ProprietarioId != null &&
        veicolo.ProprietarioId != dto.PersonaId)
    {
        return Conflict("Il veicolo ha già un proprietario.");
    }

    var aggiornati = await _context.Veicoli
        .Where(v => v.Id == id &&
            (v.ProprietarioId == null ||
             v.ProprietarioId == dto.PersonaId))
        .ExecuteUpdateAsync(setters => setters
            .SetProperty(v => v.ProprietarioId,
                         (int?)dto.PersonaId));

    if (aggiornati == 0)
    {
        return Conflict("Impossibile assegnare il proprietario.");
    }

    return Ok(new
    {
        messaggio = "Proprietario assegnato correttamente.",
        veicoloId = id,
        proprietarioId = dto.PersonaId
    });
}
}