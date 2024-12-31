'use client';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchButton from "@/components/searchButton";

export const Gallery = () => {
  const router = useRouter(); // Initialisiere den Router
  const [username, setUsername] = useState<string | null>(null); // State für den Benutzernamen
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State für Admin-Rechte

  // Laden des Benutzernamens und der Rolle aus dem localStorage, wenn der Benutzer eingeloggt ist
  useEffect(() => {
    // Überprüfen, ob es das erste Mal ist, dass die Seite geladen wird
    if (typeof window !== 'undefined') {
      const firstVisit = localStorage.getItem('firstVisit');

      if (!firstVisit) {
        // Wenn es der erste Besuch ist, Token löschen und Flag setzen
        localStorage.removeItem('authToken');
        localStorage.setItem('firstVisit', 'true');
      }

      // Lade das JWT-Token aus dem localStorage, wenn vorhanden
      const token = localStorage.getItem('authToken');
      if (token) {
        // Token dekodieren, um den Benutzernamen und die Rolle zu extrahieren
        const decoded = JSON.parse(atob(token.split('.')[1])); // Token dekodieren (Base64)
        setUsername(decoded.username); // Benutzernamen setzen
        setIsAdmin(decoded.username === 'admin'); // Überprüfen, ob der Benutzer ein Admin ist
      }
    }
  }, []);

  // Funktion zum Navigieren zur Login-Seite
  const navigateToLogin = () => {
    router.push("/pages/login"); // Navigiere zur Login-Seite
  };

  // Funktion zum Navigieren zur Frontpage-Seite
  const navigateToFrontpage = () => {
    router.push("/"); // Navigiere zur Frontpage-Seite
  };

  const navigateToAdd = () => {
    router.push("/pages/components/addButton"); // Navigiere zur Gallery-Seite
  };

  // Funktion zum Ausloggen (Token löschen und Benutzer zurücksetzen)
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Token löschen
    setUsername(null); // Benutzernamen zurücksetzen
    setIsAdmin(false); // Admin-Rechte zurücksetzen
    router.push("/pages/login"); // Zur Login-Seite navigieren
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        height: "relative",
        backgroundColor: "background.default",
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
          display: "flex",
          flexDirection: "column",
          height: "255px",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 4,
          width: "100%",
          backgroundColor: "background.utilitiesScrim",
          backgroundImage:
            "url(https://c.animaapp.com/dwkKemiH/img/hero-image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h1" color="#151547" sx={{ textAlign: "center" }}>
          Gallery
        </Typography>
        {isAdmin && (
          <Button variant="contained" color="secondary" onClick={navigateToAdd}>
            Add
          </Button>
        )}
      </Box>

      <SearchButton />

      <Container>
        {[{ title: "Titel (Alpha)", image: "https://i.ibb.co/VHr3s01/Alpha.png" },
          { title: "Titel (Beta)", image: "https://i.ibb.co/y67qW95/Beta.png" },
          { title: "Titel (Gamma)", image: "https://i.ibb.co/9pz0HCb/Gamma.png" },
          { title: "Titel (Delta)", image: "https://i.ibb.co/hmynPQz/Delta.png" },
          { title: "Titel (Epsilon)", image: "https://i.ibb.co/xMDBC09/Epsilon.png" },
          { title: "Titel (Phi)", image: "https://i.ibb.co/W0hVrvf/Phi.png" }]
          .map((item, index) => (
            <Grid container spacing={3} key={index} sx={{ py: 4, alignItems: "center" }}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: "850px",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="h5" color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    ISBN
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    id;titel;untertitel;buch_id
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    id;version;isbn;rating;art;preis;rabatt;lieferbar;datum;homepage;schlagwoerter;erzeugt;aktualisiert
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
      </Container>
    </Box>
  );
};

export default Gallery;
