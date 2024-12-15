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

export const ExamplesLanding = () => {
  return (
    <Box
      sx={{
        height: "1080px",
        overflow: "hidden",
        border: 1,
        borderColor: "black",
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
          <Button variant="contained" color="inherit" sx={{ marginRight: 2 }}>
            Sign in
          </Button>
          <Button variant="contained" color="primary">
            Register
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
          <Button variant="contained" color="inherit">
            Add
          </Button>
          <Button variant="contained" color="primary">
            Button
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
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h3" color="textPrimary">
            Heading
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Subheading
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <InfoIcon fontSize="large" />
            <Box>
              <Typography variant="h4" color="textPrimary">
                Title
              </Typography>
              <Typography variant="body1" color="textSecondary">
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
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h3" color="textPrimary">
            Heading
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Subheading
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <InfoIcon fontSize="large" />
            <Box>
              <Typography variant="h4" color="textPrimary">
                Title
              </Typography>
              <Typography variant="body1" color="textSecondary">
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
