'use client';

import {
    AppBar,
    Box,
    Button,
    Container,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            setIsAlreadyLoggedIn(true);
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isAlreadyLoggedIn) {
            setError('You are already logged in.');
            return;
        }

        try {
            const response = await fetch('https://localhost:3000/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const { access_token, refresh_token, expires_in } = data;

                sessionStorage.setItem('authToken', access_token);
                sessionStorage.setItem('refreshToken', refresh_token);
                sessionStorage.setItem('expiresIn', expires_in);

                router.push('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Bücher:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                height: '1080px',
                backgroundColor: 'white',
                position: 'relative',
            }}
        >
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
                        onClick={() => router.push('/')}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    width: '33%',
                    height: '60%',
                    backgroundColor: '#e1ccff',
                    position: 'relative',
                    top: '10%',
                    left: '33%',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        color: '#151547',
                        fontSize: '7rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '40px',
                    }}
                >
                    Sign in
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: '8px' }}
                        >
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>

                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: '8px' }}
                        >
                            Password
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>

                    {error && (
                        <Typography
                            color="error"
                            sx={{ textAlign: 'center', marginBottom: '20px' }}
                        >
                            {'Invalid username or password'}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#e3e3e3',
                            color: '#1e1e1e',
                            marginTop: '50px',
                            marginBottom: '20px',
                            borderRadius: '8px',
                            border: '1px solid #767676',
                        }}
                        type="submit"
                    >
                        Sign in
                    </Button>
                </form>

            </Box>
        </Container>
    );
};

export default Login;
