using System;
using System.Collections.Generic;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public partial class GestioneVeicoliContext : DbContext
{
    public GestioneVeicoliContext(DbContextOptions<GestioneVeicoliContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Persone> Persone { get; set; }

    public virtual DbSet<Veicoli> Veicoli { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Persone>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Persone__3214EC07555BB25B");

            entity.HasIndex(e => e.CodiceFiscale, "UQ__Persone__86E1BBF7FA110B9E").IsUnique();

            entity.Property(e => e.CodiceFiscale)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Cognome).HasMaxLength(50);
            entity.Property(e => e.Nome).HasMaxLength(50);
        });

        modelBuilder.Entity<Veicoli>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Veicoli__3214EC07F96B90FC");

            entity.HasIndex(e => e.Targa, "UQ__Veicoli__6C5E0D6B648F2020").IsUnique();

            entity.Property(e => e.Marca).HasMaxLength(50);
            entity.Property(e => e.Modello).HasMaxLength(50);
            entity.Property(e => e.Targa).HasMaxLength(15);
            entity.Property(e => e.TipoVeicolo).HasMaxLength(20);

            entity.HasOne(d => d.Proprietario).WithMany(p => p.Veicoli)
                .HasForeignKey(d => d.ProprietarioId)
                .HasConstraintName("FK_Veicoli_Persone");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
