'use client';

import { AppBar, Box, Button, Grid, Paper, Toolbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Carousel } from '../components/carousel';
import { getUserInfoFromToken } from '@/app/utils/decodeToken';

export const Frontpage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Überprüfe den authToken und den Benutzernamen
    const authToken = sessionStorage.getItem('authToken');
    const storedUsername = sessionStorage.getItem('username'); // Optional: Benutzername speichern
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true'; // Optional: Admin-Status speichern

    if (authToken) {
      setUsername(storedUsername || 'Unknown User');
      setIsAdmin(adminStatus);
    } else {
      setUsername(null);
      setIsAdmin(false);
    }

  }, []);

  const navigateToLogin = () => {
    router.push('/pages/login');
  };

  const navigateToGallery = () => {
    router.push('/pages/gallery');
  };

  const handleLogout = () => {
    // Lösche alle Auth-bezogenen Daten
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');
    setUsername(null);
    setIsAdmin(false);
    router.push('/pages/login');
  };

  const navigateToAdd = () => {
    router.push('/pages/components/addButton');
  };

  return (
    <Box
      sx={{
        height: '900px',
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
                onClick={handleLogout}
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
