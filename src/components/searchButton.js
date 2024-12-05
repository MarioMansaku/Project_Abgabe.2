"use client"

import React, {useState} from "react";
import { getBuch } from '../api/readService.js';
import log from '../utils/logger.js';

export function SearchButton() {
    const [criteria, setCriteria] = useState("isbn");
    const [value, setValue] = useState("")
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false);

    const handleSearch = async() => {
        try {
            log.debug("Suche mit Suchkriterien: ISBN, Rating, Art")
            const query = `${criteria}=${encodeURIComponent(value)}`;
            const data = await getBuch(query); 
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    return (
      <div>
      <h1>Suche mit Suchkriterien</h1>

      {/* Dropdown für Suchkriterien */}
      <label>
          Suche nach:
          <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
              <option value="isbn">ISBN</option>
              <option value="rating">Rating</option>
              <option value="art">Art</option>
          </select>
      </label>

      {/* Eingabefeld für die Eingabe des Wertes */}
      <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${criteria}`}
          disabled={loading}
      />

      {/* Suche button */}
      <button onClick={handleSearch} disabled={loading || !value.trim()}>
          {loading ? "Loading..." : "Search"}
      </button>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Response */}
      {response && (
          <div>
              <h2>Suchergebnisse</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
      )}
  </div>
      );
    };

export default SearchButton;