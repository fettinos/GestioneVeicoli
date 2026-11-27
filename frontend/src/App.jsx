import { BrowserRouter, Routes, Route } from 'react-router';

import Navbar from './components/Navbar';
import ListaVeicoli from './pages/ListaVeicoli';
import InserisciVeicolo from './pages/InserisciVeicolo';
import ListaPersone from './pages/ListaPersone';
import InserisciPersona from './pages/InserisciPersona';
import AssociaVeicolo from './pages/AssociaVeicolo';

import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main className="container">
                <Routes>
                    <Route
                        path="/"
                        element={<ListaVeicoli />}
                    />

                    <Route
                        path="/inserisci-veicolo"
                        element={<InserisciVeicolo />}
                    />

                    <Route
                        path="/persone"
                        element={<ListaPersone />}
                    />

                    <Route
                        path="/inserisci-persona"
                        element={<InserisciPersona />}
                    />

                    <Route
                        path="/associa-veicolo"
                        element={<AssociaVeicolo />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}