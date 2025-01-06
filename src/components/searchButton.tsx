"use client";

import React, { useState } from "react";
import { getBuch } from '../api/read-buch.service.ts';
import log from '../utils/logger.js';

interface SearchButtonProps {
  onSearchResults: (criteria: string, value: string) => void;
}

export function SearchButton({ onSearchResults }: SearchButtonProps) {
  const [criteria, setCriteria] = useState("isbn");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Fehlermeldung

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage(null); // Fehler zurücksetzen
    try {
      log.debug("Suche mit Suchkriterien:", criteria, "Wert:", value);
      onSearchResults(criteria, value);
    } catch (err: any) {
      console.error("Fehler bei der Suche:", err.message);
      setErrorMessage("Es gab ein Problem mit der Suche. Bitte versuchen Sie es später erneut.");
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

      {/* Fehlermeldung */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default SearchButton;
