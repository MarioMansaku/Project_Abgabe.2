'use client';

import { useState } from 'react';
import { getBuch } from '../api/read-buch.service.ts';
import log from '../utils/logger.js';

// Definiert die Eigenschaften, die die SearchButton-Komponente erwartet
interface SearchButtonProps {
    // onSearchResults ist eine Callback-Funktion, um Suchergebnisse an die Elternkomponente weiterzugeben
    onSearchResults: (criteria: string, value: string, results?: any) => void;
}

export function SearchButton({ onSearchResults }: SearchButtonProps) {
    const [criteria, setCriteria] = useState('isbn');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Funktion, die beim Klick auf den Such-Button aufgerufen wird
    const handleSearch = async () => {
        // Setzt den Ladezustand auf true
        setLoading(true);
        // Zurücksetzen einer evtl. vorherigen Fehlermeldung
        setErrorMessage(null);
        try {
            log.debug('Suche mit Suchkriterien:', criteria, 'Wert:', value);

            // Ruft die getBuch-Funktion auf, um Daten anhand von Kriterien und Wert zu erhalten
            const results = await getBuch(criteria, value);
            // Übergibt die Ergebnisse (results) an die Elternkomponente
            onSearchResults(criteria, value, results);
        } catch (error) {
            console.error('Fehler bei der Suche:', error);
            setErrorMessage('Fehler bei der Suche!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Suchkriterien auswählen</h1>
            <label>
                Suche nach:
                <select
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                >
                    <option value="isbn">ISBN</option>
                    <option value="rating">Rating</option>
                    <option value="titel">Titel</option>
                    <option value="art">Art</option>
                </select>
            </label>

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${criteria}`}
                disabled={loading}
            />

            <button onClick={handleSearch} disabled={loading || !value.trim()}>
                {loading ? 'Loading...' : 'Search'}
            </button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default SearchButton;
