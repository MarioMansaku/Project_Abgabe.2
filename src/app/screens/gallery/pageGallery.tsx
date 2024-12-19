import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";

export const Gallery = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "4300px",
        backgroundColor: "background.default",
        border: "1px solid black",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          height: "87px",
          alignItems: "center",
          gap: 2,
          p: 2,
          width: "100%",
          backgroundColor: "background.default",
          borderBottom: "1px solid",
          borderColor: "border.default",
        }}
      >
        <Box
          sx={{ display: "flex", width: "178px", alignItems: "center", gap: 1 }}
        >
          <Button
            variant="contained"
            sx={{
              flex: 1,
              backgroundColor: "background.neutralTertiary",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "border.neutralSecondary",
            }}
          >
            <Typography variant="body1" color="text.primary">
              Sign in
            </Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              backgroundColor: "background.brandDefault",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "border.brandDefault",
            }}
          >
            <Typography variant="body1" color="text.brandOnBrand">
              Register
            </Typography>
          </Button>
        </Box>
      </Box>

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
            image: "https://c.animaapp.com/dwkKemiH/img/image.svg",
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
