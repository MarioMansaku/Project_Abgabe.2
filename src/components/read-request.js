"use client"

import React, {useState} from "react";

export function SearchButton() {
    const [buchid, setBuchid] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null); 

    const handleSearch = async() => {
        try {
            setError(null); // Vorherige Fehler löschen
            setResponse(null); // Vorherige Ergebnisse löschen

            const response = await fetch(`https://localhost:3000/rest/${buchid}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/hal+json',
                },
            });

            if(response.status === 404) {
                throw new Error('Buch nicht gefunden');
            }

            const data = await response.json();
            console.log(`Buch mit ID: ${buchid}`, data);
            setResponse(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
          <h1>Suche mit der Buch-ID</h1>
          <input
            type="text"
            value={buchid}
            onChange={(e) => setBuchid(e.target.value)}
            placeholder="Enter book ID"
          />
          <button onClick={handleSearch}>Search</button>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
    
          {response && (
            <div>
              <h2>Buch Details</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    };

export default SearchButton;