"use client"

import React, { useState } from "react";
import { WriteServiceBuch } from '../../../../api/write-buch.service.ts';
import { operations } from '../../../../api/api.ts';

type PostPayload = operations["BuchWriteController_post"]["requestBody"]["content"]["application/json"];

export function AdminAddBook() {
    const writeService = new WriteServiceBuch();
    const [bookData, setBookData] = useState<Partial<Record<keyof PostPayload, any>>>({});
    const [status, setStatus] = useState<string>("");

    const handleInputChange = (key: keyof PostPayload, value: any) => {
        setBookData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await writeService.postBuch(bookData as PostPayload);
            setStatus("Book added successfully!");
        } catch (error: any) {
            setStatus(`Error: ${error.message}`);
        }
    };

    const fields: (keyof PostPayload)[] = [
        "isbn",
        "rating",
        "art",
        "preis",
        "rabatt",
        "lieferbar",
        "datum",
        "homepage",
        "schlagwoerter",
        "titel",
    ];

    return (
        <div>
            <h2>Admin Input Table</h2>

            {/* Table Displaying Input Fields and Values */}
            <table border={1} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field as string}>
                            <td>{field}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder={`Enter ${field}`}
                                    value={bookData[field] || ""}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button style={{ marginTop: "20px" }} onClick={handleSubmit}>
                Submit
            </button>
            <p>{status}</p>
        </div>
    );
}

export default AdminAddBook;