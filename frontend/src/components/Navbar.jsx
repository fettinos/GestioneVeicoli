import { NavLink } from 'react-router';

export default function Navbar() {
    return (
        <nav className="navbar">
            <h2>Gestione Veicoli</h2>

            <div className="nav-links">
                <NavLink to="/" end>
                    Lista veicoli
                </NavLink>

                <NavLink to="/inserisci-veicolo">
                    Inserisci veicolo
                </NavLink>

                <NavLink to="/persone">
                    Lista persone
                </NavLink>

                <NavLink to="/inserisci-persona">
                    Inserisci persona
                </NavLink>

                <NavLink to="/associa-veicolo">
                    Associa veicolo
                </NavLink>
            </div>
        </nav>
    );
}