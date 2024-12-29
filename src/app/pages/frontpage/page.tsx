'use client';
import InfoIcon from "@mui/icons-material/Info";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

export const Frontpage = () => {
  const router = useRouter(); // Initialisiere den Router

  // Funktion zum Navigieren zur Login-Seite
  const navigateToLogin = () => {
    router.push('/pages/login'); // Navigiere zur Login-Seite
  };  

  // Funktion zum Navigieren zur Gallery-Seite
  const navigateToGallery = () => {
    router.push('/pages/gallery'); // Navigiere zur Gallery-Seite
  }; 

  const navigateToAdd = () => {
    router.push('/pages/components/addButton'); // Navigiere zur Gallery-Seite
  }; 

  return (
      <Box
        sx={{
          height: "1080px",
          overflow: "hidden",
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
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" color="inherit" sx={{ marginRight: 2 }} onClick={navigateToLogin}>
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
  
        <Box
          sx={{
            height: "255px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage:
              "url(https://c.animaapp.com/CBoGUkLi/img/hero-image.png)",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            padding: 4,
          }}
        >
          <Typography variant="h1" color="textPrimary" sx={{ marginBottom: 1 }}>
            Bücher
          </Typography>
          <Typography variant="h2" color="textPrimary" sx={{ marginBottom: 2 }}>
            SWE
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={navigateToAdd}>
              Add
            </Button>
            <Button variant="contained" color="primary" onClick={navigateToGallery}>
              Gallery
            </Button>
          </Box>
        </Box>
  
        <Grid container spacing={2} sx={{ padding: 4, opacity: 0.8 }}>
          <Grid item xs={6}>
            <Paper
              sx={{ height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{ height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            />
          </Grid>
        </Grid>
  
        <Container
          sx={{
            width: "930px",
            padding: 4,
            backgroundColor: "rgba(86, 84, 84, 0.2)",
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h3" color="white">
              Heading
            </Typography>
            <Typography variant="subtitle1" color="white">
              Subheading
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <InfoIcon fontSize="large" />
              <Box>
                <Typography variant="h4" color="white">
                  Title
                </Typography>
                <Typography variant="body1" color="white">
                  Body text for whatever you’d like to say. Add main takeaway
                  points, quotes, anecdotes, or even a very very short story.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
  
        <Container
          sx={{
            width: "930px",
            padding: 4,
            backgroundColor: "rgba(188, 32, 32, 0.2)",
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h3" color="white">
              Heading
            </Typography>
            <Typography variant="subtitle1" color="white">
              Subheading
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <InfoIcon fontSize="large" />
              <Box>
                <Typography variant="h4" color="white">
                  Title
                </Typography>
                <Typography variant="body1" color="white">
                  Body text for whatever you’d like to say. Add main takeaway
                  points, quotes, anecdotes, or even a very very short story.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };

export default Frontpage;