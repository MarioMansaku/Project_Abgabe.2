'use client';

import { AppBar, Box, Button, Grid, Paper, Toolbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Carousel } from '../components/carousel';

export const Frontpage = () => {
  const router = useRouter(); // Initialisiere den Router
  const [username, setUsername] = useState<string | null>(null); // State für den Benutzernamen
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State für Admin-Rechte

  useEffect(() => {
    // Überprüfen, ob es das erste Mal nach einem Projektstart ist
    if (typeof window !== 'undefined') {
      const firstVisit = sessionStorage.getItem('firstVisit');
      
      if (!firstVisit) {
        // Wenn es der erste Besuch nach dem Projektstart ist, Token löschen
        sessionStorage.removeItem('authToken');
        setUsername(null);  // Benutzernamen zurücksetzen

        // Flag für den ersten Besuch setzen
        sessionStorage.setItem('firstVisit', 'true');
      } else {
        // Token laden, falls vorhanden und der Benutzer schon eingeloggt ist
        const token = sessionStorage.getItem('authToken');
        if (token) {
          // Token dekodieren, um den Benutzernamen und die Rolle zu extrahieren
          const decoded = JSON.parse(atob(token.split('.')[1])); // Token dekodieren (Base64)
          setUsername(decoded.username); // Benutzernamen setzen
          setIsAdmin(decoded.username === 'admin'); // Überprüfen, ob der Benutzer ein Admin ist
        }
      }
    }
  }, []);

  // Funktion zum Navigieren zur Login-Seite
  const navigateToLogin = () => {
    router.push('/pages/login'); // Navigiere zur Login-Seite
  };

  // Funktion zum Navigieren zur Gallery-Seite
  const navigateToGallery = () => {
    router.push('/pages/gallery'); // Navigiere zur Gallery-Seite
  };

  // Funktion zum Ausloggen (Token löschen und Benutzer zurücksetzen)
  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); // Token löschen
    setUsername(null); // Benutzernamen zurücksetzen
    setIsAdmin(false); // Admin-Rechte zurücksetzen
    router.push('/pages/login'); // Zur Login-Seite navigieren
  };

  // Funktion zum Navigieren zur Add-Seite
  const navigateToAdd = () => {
    router.push('/pages/components/addButton'); // Navigiere zur Add-Seite
  };

  return (
    <Box
      sx={{
        height: '1080px',
        overflow: 'hidden',
      }}
    >
      <AppBar position="static" color="default" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <img
            alt="Block"
            src="https://c.animaapp.com/CBoGUkLi/img/block.svg"
            style={{ marginTop: '-7.75px', marginBottom: '-7.75px' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {username ? (
            <>
              <Button variant="contained" color="inherit" sx={{ marginRight: 2 }}>
                Logged in as: {username}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginRight: 2 }}
                onClick={handleLogout} // Logout Button
              >
                Logout
              </Button>
            </>
          ) : (
            <Button variant="contained" color="inherit" sx={{ marginRight: 2 }} onClick={navigateToLogin}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: '255px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(https://c.animaapp.com/CBoGUkLi/img/hero-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          padding: 4,
        }}
      >
        <Typography variant="h1" color="textPrimary" sx={{ marginBottom: 1 }}>
          Bücher
        </Typography>
        <Typography variant="h2" color="textPrimary" sx={{ marginBottom: 2 }}>
          SWE
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAdmin && (
            <Button variant="contained" color="secondary" onClick={navigateToAdd}>
              Add
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={navigateToGallery}>
            Gallery
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ padding: 4, opacity: 0.8 }}>
        <Grid item xs={6}>
          <Paper sx={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </Grid>
      </Grid>
      <Carousel />
    </Box>
  );
};

export default Frontpage;
