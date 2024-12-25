'use client';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

export const Gallery = () => {
  const router = useRouter(); // Initialisiere den Router
  
    // Funktion zum Navigieren zur Login-Seite
    const navigateToLogin = () => {
      router.push('/pages/login'); // Navigiere zur Login-Seite
    }; 

    // Funktion zum Navigieren zur Frontpage-Seite
    const navigateToFrontpage = () => {
      router.push('/pages/frontpage'); // Navigiere zur Frontpage-Seite
    }; 

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        height: "relative",
        backgroundColor: "background.default",
        border: "1px solid black",
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
            <Button variant="contained" color="inherit" sx={{ marginRight: 2 }} onClick={navigateToLogin}>
              Sign in
            </Button>
            <Button variant="contained" color="primary">
              Register
            </Button>
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
      </Box>

      <Container sx={{ opacity: 0.8 }}>
        {[
          {
            title: "Titel (Alpha)",
            image: "https://media.istockphoto.com/id/937170838/de/vektor/fernsehen-test-muster-aus-streifen.jpg?s=612x612&w=0&k=20&c=7UB3mSLlGW73opaNA05lUyOs_I-h4q-MbZoSycFG-9k=",
          },
          {
            title: "Titel (Beta)",
            image: "https://c.animaapp.com/dwkKemiH/img/image-1.svg",
          },
          {
            title: "Titel (Gamma)",
            image: "https://c.animaapp.com/dwkKemiH/img/image-2.svg",
          },
          {
            title: "Titel (Delta)",
            image: "https://c.animaapp.com/dwkKemiH/img/image-3.svg",
          },
          {
            title: "Titel (Epsilon)",
            image: "https://c.animaapp.com/dwkKemiH/img/image-4.svg",
          },
          {
            title: "Titel (Phi)",
            image: "https://c.animaapp.com/dwkKemiH/img/image-5.svg",
          },
        ].map((item, index) => (
          <Grid
            container
            spacing={3}
            key={index}
            sx={{ py: 4, alignItems: "center" }}
          >
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "350px",
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