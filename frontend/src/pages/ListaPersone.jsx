import { useState, useEffect } from 'react';
import { getPersone, getVeicoli } from '../services/api';

export default function ListaPersone() {
    const [persone, setPersone] = useState([]);
    const [veicoli, setVeicoli] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errore, setErrore] = useState('');

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

    function contaVeicoli(personaId) {
        return veicoli.filter(
            v => v.proprietarioId === personaId
        ).length;
    }

    if (loading) return <p>Caricamento...</p>;

    if (errore) return <p className="errore">{errore}</p>;

    return (
        <section>
            <h1>Lista persone</h1>
            <p>Visualizza tutte le persone registrate.</p>

            <div className="statistiche">
                <div className="stat-card">
                    <span>Persone registrate</span>
                    <h2>{persone.length}</h2>
                </div>

                <div className="stat-card">
                    <span>Con veicoli</span>
                    <h2>
                        {persone.filter(p =>
                            contaVeicoli(p.id) > 0
                        ).length}
                    </h2>
                </div>

                <div className="stat-card">
                    <span>Senza veicoli</span>
                    <h2>
                        {persone.filter(p =>
                            contaVeicoli(p.id) === 0
                        ).length}
                    </h2>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Codice fiscale</th>
                            <th>Data di nascita</th>
                            <th>Veicoli posseduti</th>
                        </tr>
                    </thead>

                    <tbody>
                        {persone.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.cognome}</td>
                                <td>{p.codiceFiscale}</td>
                                <td>
                                    {p.dataNascita
                                        .split('-')
                                        .reverse()
                                        .join('/')}
                                </td>
                                <td>{contaVeicoli(p.id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}