const BASE_URL = '/api';

async function request(endpoint, options = {}) {
    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        options
    );

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Errore HTTP ${response.status}`);
    }

    return response.json();
}

export const getVeicoli = () => request('/veicoli');

export const getPersone = () => request('/persone');

export const getTipiVeicolo = () => request('/veicoli/tipi');

export const createVeicolo = (veicolo) =>
    request('/veicoli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(veicolo)
    });

export const createPersona = (persona) =>
    request('/persone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona)
    });

export const assegnaProprietario = (veicoloId, personaId) =>
    request(`/veicoli/${veicoloId}/proprietario`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId })
    });