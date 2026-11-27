import { useState, useEffect } from 'react';
import { getTipiVeicolo, createVeicolo } from '../services/api';

const statoIniziale = {
    targa: '',
    marca: '',
    modello: '',
    anno: '',
    tipoVeicolo: ''
};

export default function InserisciVeicolo() {
    const [veicolo, setVeicolo] = useState(statoIniziale);
    const [tipi, setTipi] = useState([]);
    const [messaggio, setMessaggio] = useState('');
    const [errore, setErrore] = useState('');
    const [salvataggio, setSalvataggio] = useState(false);

    useEffect(() => {
        getTipiVeicolo()
            .then(setTipi)
            .catch(error => setErrore(error.message));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setVeicolo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setErrore('');
        setMessaggio('');
        setSalvataggio(true);

        try {
            await createVeicolo({
                ...veicolo,
                anno: Number(veicolo.anno)
            });

            setMessaggio('Veicolo inserito correttamente!');
            setVeicolo(statoIniziale);
        } catch (error) {
            setErrore(error.message);
        } finally {
            setSalvataggio(false);
        }
    }

    return (
        <section>
            <h1>Inserisci veicolo</h1>
            <p>Registra un nuovo veicolo nel sistema.</p>

            <form className="form-card" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Tipo di veicolo</label>

                    <select
                        name="tipoVeicolo"
                        value={veicolo.tipoVeicolo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Seleziona un tipo
                        </option>

                        {tipi.map(tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        {veicolo.tipoVeicolo === 'Nave'
                            ? 'Identificativo registrazione'
                            : 'Targa'}
                    </label>

                    <input
                        name="targa"
                        value={veicolo.targa}
                        onChange={handleChange}
                        maxLength={15}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Marca</label>
                    <input
                        name="marca"
                        value={veicolo.marca}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Modello</label>
                    <input
                        name="modello"
                        value={veicolo.modello}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Anno di produzione</label>
                    <input
                        type="number"
                        name="anno"
                        value={veicolo.anno}
                        onChange={handleChange}
                        min="1800"
                        max="2100"
                        required
                    />
                </div>

                <button
                    className="btn-primary"
                    type="submit"
                    disabled={salvataggio || tipi.length === 0}
                >
                    {salvataggio
                        ? 'Salvataggio...'
                        : 'Registra veicolo'}
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