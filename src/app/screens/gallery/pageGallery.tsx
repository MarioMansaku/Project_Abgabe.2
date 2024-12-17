import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

export const Gallery = () => {
  return (
    <Box
      sx={{
        height: "1080px",
        bgcolor: "background.default",
        border: 1,
        borderColor: "black",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", padding: 2 }}>
          <img
            alt="Block"
            src="https://c.animaapp.com/YQvkVNPL/img/block.svg"
            style={{ marginTop: "-7.75px", marginBottom: "-7.75px" }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                bgcolor: "background.neutralTertiary",
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
                bgcolor: "background.brandDefault",
                borderColor: "border.brandDefault",
              }}
            >
              <Typography variant="body1" color="text.brandOnBrand">
                Register
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: "255px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.utilitiesScrim",
          backgroundImage:
            "url(https://c.animaapp.com/YQvkVNPL/img/hero-image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 4,
        }}
      >
        <Typography variant="h1" color="text.primary" sx={{ mt: -1, mb: -1 }}>
          Gallery
        </Typography>
      </Box>
    </Box>
  );
};
    