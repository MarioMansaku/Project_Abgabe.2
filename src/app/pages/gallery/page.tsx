
'use client';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchButton from "@/components/searchButton";
import BookItem from "@/components/BookItem";
import { Book } from "@/app/pages/types/types";
import axios from "axios";

export const Gallery = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({ criteria: "isbn", value: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Fehlermeldung

  useEffect(() => {
    fetchBooks();

    if (typeof window !== 'undefined') {
      const firstVisit = sessionStorage.getItem('firstVisit');
      if (!firstVisit) {
        sessionStorage.removeItem('authToken');
        sessionStorage.setItem('firstVisit', 'true');
      }

      const token = sessionStorage.getItem('authToken');
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUsername(decoded.username);
        setIsAdmin(decoded.username === 'admin');
      }
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`https://localhost:3000/rest`, {
        headers: { Accept: "application/hal+json" },
      });
      const data = await res.data;
      setBooks(data._embedded.buecher);
      setFilteredBooks(data._embedded.buecher);
    } catch (error) {
      console.error(error);
      setErrorMessage("Fehler beim Laden der Bücher. Bitte versuchen Sie es später erneut.");
    }
  };

  const filterBooks = (criteria: string, value: string) => {
    if (!value) {
      setFilteredBooks(books);
      setErrorMessage(null); // Keine Fehlermeldung, wenn der Wert leer ist
    } else {
      const filtered = books.filter((book) =>
        book[criteria]?.toString().toLowerCase().includes(value.toLowerCase())
      );
      if (filtered.length === 0) {
        setErrorMessage("Keine Bücher gefunden, die den Suchkriterien entsprechen.");
      } else {
        setErrorMessage(null); // Fehler zurücksetzen, wenn es Ergebnisse gibt
      }
      setFilteredBooks(filtered);
    }
  };

  const handleSearchResults = (criteria: string, value: string) => {
    setFilterCriteria({ criteria, value });
    filterBooks(criteria, value);
  };

  const navigateToLogin = () => router.push("/pages/login");
  const navigateToFrontpage = () => router.push("/");
  const navigateToAdd = () => router.push("/pages/components/addButton");
  const navigateToUpdate = () => router.push("/pages/components/updateButton");

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setUsername(null);
    setIsAdmin(false);
    router.push("/pages/login");
  };

  return (
    <Box sx={{ display: "flex", overflow: "hidden", flexDirection: "column", height: "relative", backgroundColor: "background.default" }}>
      <AppBar position="static" color="default" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar>
          <img alt="Block" src="https://c.animaapp.com/CBoGUkLi/img/block.svg" style={{ marginTop: "-7.75px", marginBottom: "-7.75px" }} onClick={navigateToFrontpage} />
          <Box sx={{ flexGrow: 1 }} />
          {username ? (
            <>
              <Button variant="contained" color="inherit" sx={{ marginRight: 2 }}>
                Logged in as: {username}
              </Button>
              <Button variant="contained" color="secondary" sx={{ marginRight: 2 }} onClick={handleLogout}>
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

      <Box sx={{ height: '255px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(https://c.animaapp.com/CBoGUkLi/img/hero-image.png)', backgroundSize: 'cover', backgroundPosition: '50% 50%', padding: 4, gap: 2 }}>
        <Typography variant="h1" color="#151547" sx={{ textAlign: "center" }}>
          Gallery
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAdmin && (
            <>
              <Button variant="contained" color="secondary" onClick={navigateToAdd}>
                Add
              </Button>
              <Button variant="contained" color="warning" onClick={navigateToUpdate}>
                Update
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Container>
        <SearchButton onSearchResults={handleSearchResults}/>
      </Container>

      <Container>
        <Typography variant="h4" sx={{ my: 4 }}>Dynamic Gallery</Typography>
        {/* Fehlermeldung */}
        {errorMessage && <Typography color="error" variant="h6" sx={{ my: 2 }}>{errorMessage}</Typography>}
        
        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
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
