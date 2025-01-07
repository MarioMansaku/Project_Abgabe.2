'use client'

import React, { useState, useEffect } from "react";
import { WriteServiceBuch } from '../../../../api/write-buch.service.ts';
import { operations } from '../../../../api/api.ts';
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Button, Typography, Box, Container, TextField } from "@mui/material";

type PostPayload = operations["BuchWriteController_post"]["requestBody"]["content"]["application/json"];

export function AdminAddBook() {
    const writeService = new WriteServiceBuch();
    const [bookData, setBookData] = useState<Partial<Record<keyof PostPayload, any>>>({});
    const [status, setStatus] = useState<string>("");
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    
    const router = useRouter();

    useEffect(() => {
        const token = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMTjJBRnQ4TzEyeVVPS1hmSElQUmlVeEloREZMLTFkQmJnc2psZjNiancwIn0.eyJleHAiOjE3MzYyODkzMzYsImlhdCI6MTczNjI4NzUzNiwianRpIjoiOTFkZDlhMTctM2ZkMS00ZWEyLTk0MjQtOGZkNTc1ZmQzMzRlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4ODgwL3JlYWxtcy9uZXN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjgyYWJkNTNkLTAyMzktNDY2Yi05ZTZkLWE2YTg3MjIzNmNjMiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im5lc3QtY2xpZW50Iiwic2lkIjoiZGRlMDUyMWMtMjAxNC00ODgxLTkzN2UtYjgyMzllYzQxMDdmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2xvY2FsaG9zdDozMDAwIiwiaHR0cHM6Ly9vYXV0aC5wc3Rtbi5pbyIsImh0dHBzOi8vYnVjaDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1uZXN0Il19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibmVzdC1jbGllbnQiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik5lc3QgQWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJOZXN0IiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWNtZS5jb20ifQ.HMhV_8uUOR7iJySxQQHVToJctR9tjdSl_ENUDPlGrXNJFFtHaQopnxVESvk23cSwdzqakzrLLdO8X9M36mj3mOmv_tjyIXl-B6IOL9oZzV1JppUPaqo8pIZbKqtmopyF8UtSUX2yojh9UIYPUbsqIlZ2ivoMGEajzyOslUyEYMFVQ2oJyfVmlo-22zw_UoYeplsF22B49I9I0bKAjNetaw7o-OJ6j5ZWFJBnGcu2qtHl0WiUsVwcUOap4xAtWci-YNFtJkptB442sz2boShhe3pI6qzgK7nVG51GazqNTpKOcqdXi6FT-1ovVUOopOS2HkLhxG8cjaOsDjg9eVo_vw`;
        if (!token) {
            // setAccessDenied(true);

            setTimeout(() => {
                router.push('/pages/login');
            }, 3000);
        } else {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            if (decoded.username !== 'admin') {                
                // setAccessDenied(true);

                // setTimeout(() => {
                //     router.push('/');
                // }, 3000);
            }
        }
    }, [router]);

    const handleInputChange = (key: string, value: any) => {
        const [mainKey, subKey] = key.split('.');

        if (subKey) {
            setBookData((prev) => ({
                ...prev,
                [mainKey as keyof PostPayload]: {
                    ...(prev[mainKey as keyof PostPayload] || {}),
                    [subKey]: value,
                },
            }));
        } else {
            setBookData((prev) => ({
                ...prev,
                [key as keyof PostPayload]: value,
            }));
        }
    };

    const handleAbbildungChange = (key: keyof PostPayload["abbildungen"][0], value: any) => {
        setBookData((prev) => ({
            ...prev,
            abbildungen: [
                {
                    ...(prev.abbildungen?.[0] || {}),
                    [key]: value,
                },
            ],
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

    const fields: (keyof PostPayload | string)[] = [
        "isbn",
        "rating",
        "art",
        "preis",
        "rabatt",
        "lieferbar",
        "datum",
        "homepage",
        "schlagwoerter",
    ];

    const navigateToGallery = () => {
        router.push('/pages/gallery');
    };

    const navigateToFrontpage = () => {
        router.push('/');
    };

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
        <Box sx={{ height: 'relative', overflow: 'hidden' }}>
            <AppBar position="static" color="default" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Toolbar>
                    <img
                        alt="Block"
                        src="https://c.animaapp.com/CBoGUkLi/img/block.svg"
                        style={{ marginTop: '-7.75px', marginBottom: '-7.75px' }}
                        onClick={navigateToFrontpage}
                    />
                </Toolbar>
            </AppBar>
            <Container>
                <div>
                    <h2>Admin Input Table</h2>
                    <table border={1} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <th>Field Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field) => (
                                <tr key={field}>
                                    <td>{field}</td>
                                    <td>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder={`Enter ${field}`}
                                            value={bookData[field as keyof PostPayload] || ""}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Titel Section */}
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Titel
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Titel"
                                fullWidth
                                variant="outlined"
                                value={bookData.titel?.titel || ""}
                                onChange={(e) => handleInputChange("titel.titel", e.target.value)}
                            />
                            <TextField
                                label="Untertitel"
                                fullWidth
                                variant="outlined"
                                value={bookData.titel?.untertitel || ""}
                                onChange={(e) => handleInputChange("titel.untertitel", e.target.value)}
                            />
                        </Box>
                    </Box>

                    {/* Abbildungen Section */}
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Abbildungen
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Beschriftung"
                                fullWidth
                                variant="outlined"
                                value={bookData.abbildungen?.[0]?.beschriftung || ""}
                                onChange={(e) => handleAbbildungChange("beschriftung", e.target.value)}
                            />
                            <TextField
                                label="Content Type"
                                fullWidth
                                variant="outlined"
                                value={bookData.abbildungen?.[0]?.contentType || ""}
                                onChange={(e) => handleAbbildungChange("contentType", e.target.value)}
                            />
                        </Box>
                    </Box>

                    <Button variant="contained" style={{ marginTop: 20, marginRight: 20 }} onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 20 }} onClick={navigateToGallery}>
                        Gallery
                    </Button>
                    <p>{status}</p>
                </div>
            </Container>
        </Box>
    );
};

export default AdminAddBook;
