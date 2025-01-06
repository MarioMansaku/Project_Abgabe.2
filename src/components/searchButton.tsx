"use client";

import React, { useState } from "react";
import { getBuch } from '../api/read-buch.service.ts';
import log from '../utils/logger.js';

interface SearchButtonProps {
  onSearchResults: (criteria: string, value: string) => void; // Callback von der Gallery-Komponente
}

export function SearchButton({ onSearchResults }: SearchButtonProps) {
  const [criteria, setCriteria] = useState("isbn");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      log.debug("Suche mit Suchkriterien:", criteria, "Wert:", value);
      onSearchResults(criteria, value); // Übergibt die Kriterien an Gallery
    } catch (err: any) {
      console.error("Fehler bei der Suche:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Suche mit Suchkriterien</h1>
      <label>
        Suche nach:
        <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
          <option value="isbn">ISBN</option>
          <option value="rating">Rating</option>
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
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}

export default SearchButton;
