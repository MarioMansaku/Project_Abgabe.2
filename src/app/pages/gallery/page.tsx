'use client';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchButton from "@/components/searchButton";
import BookItem from "@/components/BookItem";
import { Book}  from "@/app/pages/types/types";
import axios from "axios";

export const Gallery = () => {
  const router = useRouter(); // Initialisiere den Router
  const [username, setUsername] = useState<string | null>(null); // State für den Benutzernamen
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State für Admin-Rechte
  const [books, setBooks] = useState<Book[]>([]);

  // Laden des Benutzernamens und der Rolle aus dem sessionStorage, wenn der Benutzer eingeloggt ist
  useEffect(() => {
    fetchBooks();

    // Überprüfen, ob es das erste Mal ist, dass die Seite geladen wird
    if (typeof window !== 'undefined') {
      const firstVisit = sessionStorage.getItem('firstVisit');

      if (!firstVisit) {
        // Wenn es der erste Besuch ist, Token löschen und Flag setzen
        sessionStorage.removeItem('authToken');
        sessionStorage.setItem('firstVisit', 'true');
      }

      // Lade das JWT-Token aus dem sessionStorage, wenn vorhanden
      const token = sessionStorage.getItem('authToken');
      if (token) {
        // Token dekodieren, um den Benutzernamen und die Rolle zu extrahieren
        const decoded = JSON.parse(atob(token.split('.')[1])); // Token dekodieren (Base64)
        setUsername(decoded.username); // Benutzernamen setzen
        setIsAdmin(decoded.username === 'admin'); // Überprüfen, ob der Benutzer ein Admin ist
      }
    }
  }, []);


  // TODO Refactor 
  // FIX Is types and bookitem correctly placed in directory?
  const fetchBooks = async () => {
    try {
      // HTTP GET-Anfrage an die API
      const res = await axios.get(`https://localhost:3000/rest`, {
          headers: {
              Accept: "application/hal+json", // Setze den Accept-Header für die API
          },
      });
      const data = await res.data;
      console.debug('getBuch: Erfolgreich');
      setBooks(data._embedded.buecher);
  } catch (error: unknown) {
      // Überprüfen, ob es sich um eine Antwort mit Fehlerstatus handelt
      if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 404) {
              const message = "Kein Buch entspricht den eingegebenen Suchkriterien.";
              console.error(`API Error: ${message} (Status Code: ${status})`);
              throw new Error(message);
          } else if (status !== undefined && status >= 500) {
              const message = "Es ist ein Fehler auf unserer Seite aufgetreten. Bitte versuchen Sie es später erneut.";
              console.error(`API Error: ${message} (Status Code: ${status})`);
              throw new Error(message);
          }
      }
  }
  
  };
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

  const navigateToUpdate = () => {
    router.push("/pages/components/updateButton");
  }

  // Funktion zum Ausloggen (Token löschen und Benutzer zurücksetzen)
  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); // Token löschen
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
          height: '255px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(https://c.animaapp.com/CBoGUkLi/img/hero-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          padding: 4,
          gap: 2
        }}
      >
        <Typography variant="h1" color="#151547" sx={{ textAlign: "center" }}>
          Gallery
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
        {isAdmin && (
          <><Button variant="contained" color="secondary" onClick={navigateToAdd}>
              Add
            </Button>
            <Button variant="contained" color="warning" onClick={navigateToUpdate}>
                Update
              </Button></>
        )}
        </Box>
      </Box>

      <SearchButton />

{/* Dynamic Gallery from Books basis */}
<Container>
        <Typography variant="h4" sx={{ my: 4 }}>Dynamic Gallery</Typography>
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.isbn}>
              <BookItem book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery;
