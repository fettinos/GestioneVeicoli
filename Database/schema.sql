CREATE DATABASE GestioneVeicoli;
GO

USE GestioneVeicoli;
GO

CREATE TABLE dbo.Persone (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(50) NOT NULL,
    Cognome NVARCHAR(50) NOT NULL,
    CodiceFiscale CHAR(16) NOT NULL UNIQUE,
    DataNascita DATE NOT NULL
);

CREATE TABLE dbo.Veicoli (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Targa NVARCHAR(15) NOT NULL UNIQUE,
    Marca NVARCHAR(50) NOT NULL,
    Modello NVARCHAR(50) NOT NULL,
    Anno INT NOT NULL,
    ProprietarioId INT NULL,
    TipoVeicolo NVARCHAR(20) NOT NULL,

    CONSTRAINT FK_Veicoli_Persone
        FOREIGN KEY (ProprietarioId)
        REFERENCES dbo.Persone(Id),

    CONSTRAINT CK_TipoVeicolo
        CHECK (TipoVeicolo IN (
            'Automobile', 'Moto', 'Nave'
        ))
);