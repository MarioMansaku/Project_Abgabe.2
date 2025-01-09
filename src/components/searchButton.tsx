'use client';

import { useState } from 'react';
import { getBuch } from '../api/read-buch.service.ts';
import log from '../utils/logger.js';

interface SearchButtonProps {
    onSearchResults: (criteria: string, value: string, results?: any) => void;
}

export function SearchButton({ onSearchResults }: SearchButtonProps) {
    const [criteria, setCriteria] = useState('isbn');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSearch = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            log.debug('Suche mit Suchkriterien:', criteria, 'Wert:', value);

            const results = await getBuch(criteria, value);
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
