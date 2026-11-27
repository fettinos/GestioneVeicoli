import { useState } from 'react';
import { createPersona } from '../services/api';

const statoIniziale = {
    nome: '',
    cognome: '',
    codiceFiscale: '',
    dataNascita: ''
};

export default function InserisciPersona() {
    const [persona, setPersona] = useState(statoIniziale);
    const [messaggio, setMessaggio] = useState('');
    const [errore, setErrore] = useState('');
    const [salvataggio, setSalvataggio] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setPersona(prev => ({
            ...prev,
            [name]: name === 'codiceFiscale'
                ? value.toUpperCase()
                : value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setErrore('');
        setMessaggio('');
        setSalvataggio(true);

        try {
            await createPersona(persona);

            setMessaggio('Persona inserita correttamente!');
            setPersona(statoIniziale);
        } catch (error) {
            setErrore(error.message);
        } finally {
            setSalvataggio(false);
        }
    }

    return (
        <section>
            <h1>Inserisci persona</h1>
            <p>Registra una nuova persona nel sistema.</p>

            <form className="form-card" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Nome</label>
                    <input
                        name="nome"
                        value={persona.nome}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Cognome</label>
                    <input
                        name="cognome"
                        value={persona.cognome}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Codice fiscale</label>
                    <input
                        name="codiceFiscale"
                        value={persona.codiceFiscale}
                        onChange={handleChange}
                        minLength={16}
                        maxLength={16}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Data di nascita</label>
                    <input
                        type="date"
                        name="dataNascita"
                        value={persona.dataNascita}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="btn-primary"
                    type="submit"
                    disabled={salvataggio}
                >
                    {salvataggio
                        ? 'Salvataggio...'
                        : 'Registra persona'}
                </button>

                {messaggio && (
                    <p className="successo">{messaggio}</p>
                )}

                {errore && (
                    <p className="errore">{errore}</p>
                )}

            </form>
        </section>
    );
}