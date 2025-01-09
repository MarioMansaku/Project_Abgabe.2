'use client';

import {
    AppBar,
    Box,
    Button,
    Container,
    TextField,
    Toolbar,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { operations } from '../../../../api/api.ts';
import { WriteServiceBuch } from '../../../../api/write-buch.service.ts';

type PostPayload =
    operations['BuchWriteController_post']['requestBody']['content']['application/json'];

export function AdminAddBook() {
    const writeService = new WriteServiceBuch();
    const [bookData, setBookData] = useState<Partial<PostPayload>>({});
    const [status, setStatus] = useState<string>('');
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    const [, setIsAdmin] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            setAccessDenied(true);
            setTimeout(() => {
                router.push('/pages/login');
            }, 3000);
        } else {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            if (
                decoded.resource_access &&
                decoded.resource_access['nest-client'] &&
                decoded.resource_access['nest-client'].roles.includes('admin')
            ) {
                setIsAdmin(true);
            } else {
                setAccessDenied(true);
                setTimeout(() => {
                    router.push('/');
                }, 3000);
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
            // Handle type conversion for fields that need it
            if (key === 'rating' || key === 'preis' || key === 'rabatt') {
                value = parseFloat(value);
            }

            if (key === 'lieferbar') {
                value = value === 'true';
            }

            setBookData((prev) => ({
                ...prev,
                [key as keyof PostPayload]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        console.log('Detailed Post Payload:');
        console.table(bookData); // Log every attribute in a table format
        try {
            await writeService.postBuch(bookData as PostPayload);
            setStatus('Book added successfully!');
        } catch (error: any) {
            console.error('Error posting book:', error);
            setStatus(`Error: ${error.message}`);
        }
    };

    const fields: (keyof PostPayload | string)[] = [
        'isbn',
        'rating',
        'art',
        'preis',
        'rabatt',
        'lieferbar',
        'datum',
        'homepage',
        'schlagwoerter',
    ];

    const exampleValues: Record<string, string> = {
        isbn: 'Enter ISBN, e.g., 978-0-007-00644-1',
        rating: 'Enter rating (1-5)',
        art: 'Enter Art (EPUB, paperback, hardcover)',
        preis: 'Enter Preis in Euro, e.g., 1',
        rabatt: 'Enter Rabatt in %, e.g., 0.1',
        lieferbar: 'Enter lieferbar (true, false)',
        datum: 'Enter Datum, e.g., 2021-01-31',
        homepage: 'Enter homepage, e.g., https://test.de/',
        schlagwoerter: 'Enter Schlagwörter (e.g., JAVASCRIPT, TYPESCRIPT)',
    };

 const handleAbbildungChange = (
        key: keyof PostPayload['abbildungen'][0],
        value: any,
    ) => {
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
                    You do not have sufficient permissions to access this page.
                    You will be redirected shortly.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Redirecting in 3 seconds...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ height: 'relative', overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Toolbar>
                    <img
                        alt="Block"
                        src="https://c.animaapp.com/CBoGUkLi/img/block.svg"
                        style={{
                            marginTop: '-7.75px',
                            marginBottom: '-7.75px',
                        }}
                        onClick={navigateToFrontpage}
                    />
                </Toolbar>
            </AppBar>
            <Container>
                <div>
                    <h2>Admin Input Table</h2>
                    <table
                        border={1}
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: '20px',
                        }}
                    >
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
                                        {field === 'lieferbar' ? (
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Lieferbar</InputLabel>
                                                <Select
                                                    label="Lieferbar"
                                                    value={bookData.lieferbar?.toString() || ''}
                                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                                >
                                                    <MenuItem value="true">Yes</MenuItem>
                                                    <MenuItem value="false">No</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : field === 'datum' ? (
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder={exampleValues[field] || `Enter ${field}`}
                                                value={bookData.datum || ''}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                            />
                                        ) : field === 'rating' || field === 'preis' || field === 'rabatt' ? (
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="number"
                                                value={bookData[field as keyof PostPayload] || ''}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                            />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder={exampleValues[field] || `Enter ${field}`}
                                                value={bookData[field as keyof PostPayload] || ''}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Titel
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Titel"
                                fullWidth
                                variant="outlined"
                                value={bookData.titel?.titel || ''}
                                onChange={(e) => handleInputChange('titel.titel', e.target.value)}
                            />
                            <TextField
                                label="Untertitel"
                                fullWidth
                                variant="outlined"
                                value={bookData.titel?.untertitel || ''}
                                onChange={(e) => handleInputChange('titel.untertitel', e.target.value)}
                            />
                        </Box>
                    </Box>

                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Abbildungen
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Beschriftung"
                                fullWidth
                                variant="outlined"
                                value={bookData.abbildungen?.[0]?.beschriftung || ''}
                                onChange={(e) => handleAbbildungChange('beschriftung', e.target.value)}
                            />
                            <TextField
                                label="Content Type"
                                fullWidth
                                variant="outlined"
                                value={bookData.abbildungen?.[0]?.contentType || ''}
                                onChange={(e) => handleAbbildungChange('contentType', e.target.value)}
                            />
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        style={{ marginTop: 20, marginRight: 20 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: 20, marginRight: 20 }}
                        onClick={navigateToGallery}
                    >
                        Gallery
                    </Button>
                    <p>{status}</p>
                </div>
            </Container>
        </Box>
    );
}

export default AdminAddBook;
