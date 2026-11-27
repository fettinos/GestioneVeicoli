import { useState, useEffect } from 'react';
import { getVeicoli, getPersone } from '../services/api';

export default function ListaVeicoli() {
    const [veicoli, setVeicoli] = useState([]);
    const [persone, setPersone] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errore, setErrore] = useState('');

    useEffect(() => {
        async function caricaDati() {
            try {
                const [listaVeicoli, listaPersone] =
                    await Promise.all([
                        getVeicoli(),
                        getPersone()
                    ]);

                setVeicoli(listaVeicoli);
                setPersone(listaPersone);
            } catch (error) {
                setErrore(error.message);
            } finally {
                setLoading(false);
            }
        }

        caricaDati();
    }, []);

    function getProprietario(id) {
        if (id === null) return 'Non assegnato';

        const persona = persone.find(p => p.id === id);

        return persona
            ? `${persona.nome} ${persona.cognome}`
            : 'Sconosciuto';
    }

    if (loading) return <p>Caricamento...</p>;

    if (errore) return <p className="errore">{errore}</p>;

    return (
        <section>
            <h1>Lista veicoli</h1>
            <p>Visualizza tutti i veicoli registrati.</p>

            <div className="statistiche">
                <div className="stat-card">
                    <span>Veicoli totali</span>
                    <h2>{veicoli.length}</h2>
                </div>

                <div className="stat-card">
                    <span>Assegnati</span>
                    <h2>
                        {veicoli.filter(v =>
                            v.proprietarioId !== null
                        ).length}
                    </h2>
                </div>

                <div className="stat-card">
                    <span>Disponibili</span>
                    <h2>
                        {veicoli.filter(v =>
                            v.proprietarioId === null
                        ).length}
                    </h2>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Targa</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Modello</th>
                            <th>Anno</th>
                            <th>Proprietario</th>
                        </tr>
                    </thead>

                    <tbody>
                        {veicoli.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.targa}</td>
                                <td>
                                    <span className={
                                        `tipo ${v.tipoVeicolo.toLowerCase()}`
                                    }>
                                        {v.tipoVeicolo}
                                    </span>
                                </td>
                                <td>{v.marca}</td>
                                <td>{v.modello}</td>
                                <td>{v.anno}</td>
                                <td>
                                    {getProprietario(v.proprietarioId)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}