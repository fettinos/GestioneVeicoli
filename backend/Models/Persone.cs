using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Persone
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public string CodiceFiscale { get; set; } = null!;

    public DateOnly DataNascita { get; set; }

    public virtual ICollection<Veicoli> Veicoli { get; set; } = new List<Veicoli>();
}
