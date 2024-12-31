'use client';
import { AppBar, Box, Button, Container, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export const Login = () => {
  const router = useRouter(); // Initialisiere den Router
    
    // Funktion zum Navigieren zur Frontpage-Seite
    const navigateToFrontpage = () => {
      router.push('/'); // Navigiere zur Frontpage-Seite
    };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Funktion zum Abfragen der Login-Daten
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('api/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the JWT token in localStorage or cookies
      localStorage.setItem('authToken', data.token);
      router.push('/pages/dashboard'); // Redirect to a protected page
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "1080px",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <AppBar
        position="static"
        color="default"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar>
          <img
            alt="Block"
            src="https://c.animaapp.com/CBoGUkLi/img/block.svg"
            style={{ marginTop: "-7.75px", marginBottom: "-7.75px" }}
            onClick={navigateToFrontpage}
          />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "513px",
          height: "686px",
          backgroundColor: "#e1ccff",
          position: "relative",
          top: "20%",
          left: "32%",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#151547",
            fontSize: "7rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Sign in
        </Typography>

        <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            Username
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="username"
            value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
        </Box>

        {error && (
            <Typography color="error" sx={{ textAlign: "center", marginBottom: "20px" }}>
              {error}
            </Typography>
          )}

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#e3e3e3",
            color: "#1e1e1e",
            marginTop: "50px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #767676",
          }}
          type="submit"
        >
          Sign in
          </Button>
        </form>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#2c2c2c",
            color: "white",
            borderRadius: "8px",
            border: "1px solid #2c2c2c",
          }}
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;