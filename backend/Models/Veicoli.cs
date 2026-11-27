using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Veicoli
{
    public int Id { get; set; }

    public string Targa { get; set; } = null!;

    public string Marca { get; set; } = null!;

    public string Modello { get; set; } = null!;

    public int Anno { get; set; }

    public int? ProprietarioId { get; set; }

    public string TipoVeicolo { get; set; } = null!;

    public virtual Persone? Proprietario { get; set; }
}
