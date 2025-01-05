'use client'

import React, { useState, useEffect } from "react";
import { WriteServiceBuch } from '../../../../api/write-buch.service.ts';
import { operations } from '../../../../api/api.ts';
import { useRouter } from "next/navigation";
import { Button, Typography, Box } from "@mui/material";

type PostPayload = operations["BuchWriteController_post"]["requestBody"]["content"]["application/json"];

export function AdminAddBook() {
    const writeService = new WriteServiceBuch();
    const [bookData, setBookData] = useState<Partial<Record<keyof PostPayload, any>>>({});
    const [status, setStatus] = useState<string>("");
    const [accessDenied, setAccessDenied] = useState<boolean>(false); // State für Zugriff verweigert
    
    const router = useRouter();

    // Überprüfen, ob der Benutzer eingeloggt ist und Admin ist
    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            // Wenn kein Token vorhanden ist, Zugang verweigern und weiterleiten
            setAccessDenied(true);

            setTimeout(() => {
                router.push('/pages/login');
            }, 3000);
        } else {
            // Token dekodieren, um den Benutzernamen zu überprüfen

            const decoded = JSON.parse(atob(token.split('.')[1]));
            if (decoded.username !== 'admin') {                
                setAccessDenied(true);

                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        }
    }, [router]);

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

    const navigateToGallery = () => {
        router.push('/pages/gallery'); // Navigiere zur Gallery-Seite
    };

    // Wenn der Benutzer nicht eingeloggt ist oder nicht admin ist, eine Meldung anzeigen
    if (accessDenied) {
        return (
            <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                <Typography variant="h4" color="error">
                    Access Denied
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    You do not have sufficient permissions to access this page. You will be redirected shortly.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Redirecting in 3 seconds...
                </Typography>
            </Box>
        );
    }
    
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
    
            <Button variant="contained" style={{ marginTop: 20, marginRight: 20 }} onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 20 }} onClick={navigateToGallery}>
                Gallery
            </Button>
            <p>{status}</p>
        </div>
    )};
    
export default AdminAddBook;
    