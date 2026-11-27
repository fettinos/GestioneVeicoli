import { useState, useEffect } from 'react';
import {
    getPersone,
    getVeicoli,
    assegnaProprietario
} from '../services/api';

export default function AssociaVeicolo() {
    const [persone, setPersone] = useState([]);
    const [veicoli, setVeicoli] = useState([]);

    const [personaId, setPersonaId] = useState('');
    const [veicoloId, setVeicoloId] = useState('');

    const [messaggio, setMessaggio] = useState('');
    const [errore, setErrore] = useState('');
    const [loading, setLoading] = useState(true);
    const [salvataggio, setSalvataggio] = useState(false);

    useEffect(() => {
        async function caricaDati() {
            try {
                const [listaPersone, listaVeicoli] =
                    await Promise.all([
                        getPersone(),
                        getVeicoli()
                    ]);

                setPersone(listaPersone);
                setVeicoli(listaVeicoli);
            } catch (error) {
                setErrore(error.message);
            } finally {
                setLoading(false);
            }
        }

        caricaDati();
    }, []);

    const veicoliDisponibili = veicoli.filter(
        v => v.proprietarioId === null
    );

    async function handleSubmit(e) {
        e.preventDefault();

        setErrore('');
        setMessaggio('');
        setSalvataggio(true);

        try {
            await assegnaProprietario(
                Number(veicoloId),
                Number(personaId)
            );

            setVeicoli(prev => prev.map(v =>
                v.id === Number(veicoloId)
                    ? {
                        ...v,
                        proprietarioId: Number(personaId)
                    }
                    : v
            ));

            setMessaggio('Proprietario associato correttamente!');
            setPersonaId('');
            setVeicoloId('');

        } catch (error) {
            setErrore(error.message);
        } finally {
            setSalvataggio(false);
        }
    }

    if (loading) return <p>Caricamento...</p>;

    return (
        <section>
            <h1>Associa veicolo</h1>
            <p>Assegna un veicolo disponibile a una persona.</p>

            <form className="form-card" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="persona">
                        Seleziona persona
                    </label>

                    <select
                        id="persona"
                        value={personaId}
                        onChange={e => setPersonaId(e.target.value)}
                        required
                    >
                        <option value="">
                            Seleziona una persona
                        </option>

                        {persone.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nome} {p.cognome}
                                {' - '}{p.codiceFiscale}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="veicolo">
                        Seleziona veicolo disponibile
                    </label>

                    <select
                        id="veicolo"
                        value={veicoloId}
                        onChange={e => setVeicoloId(e.target.value)}
                        required
                    >
                        <option value="">
                            Seleziona un veicolo
                        </option>

                        {veicoliDisponibili.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.marca} {v.modello}
                                {' - '}{v.targa}
                                {' - '}{v.tipoVeicolo}
                            </option>
                        ))}
                    </select>
                </div>

                {veicoliDisponibili.length === 0 && (
                    <p>Non ci sono veicoli disponibili.</p>
                )}

                <button
                    className="btn-primary"
                    type="submit"
                    disabled={
                        salvataggio ||
                        !personaId ||
                        !veicoloId
                    }
                >
                    {salvataggio
                        ? 'Associazione in corso...'
                        : 'Associa proprietario'}
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