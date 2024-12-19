import Header from "@mui/icons-material/Star";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";

export const Login = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: "1920px",
        height: "1080px",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "513px",
          height: "686px",
          backgroundColor: "#838392",
          position: "absolute",
          top: "197px",
          left: "703px",
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

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            Username
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="Value"
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
            defaultValue="Value"
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#e3e3e3",
            color: "#1e1e1e",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #767676",
          }}
        >
          Sign in
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#2c2c2c",
            color: "white",
            borderRadius: "8px",
            border: "1px solid #2c2c2c",
          }}
        >
          Register
        </Button>
      </Box>

      <Header
        sx={{
          position: "absolute",
          width: "1920px",
          height: "87px",
          top: 0,
          left: 0,
        }}
      />
    </Container>
  );
};
