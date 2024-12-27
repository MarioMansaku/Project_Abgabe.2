<<<<<<< HEAD
import SearchButton from "../components/searchButton";
import AddButton from "../components/addButton";
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
=======
>>>>>>> e6ab530c681f653ea2c5b3e8b1ad40ae7253fb3d
import React from "react";
// import { Gallery } from "./pages/gallery/indexGallery.js"
// import { Login } from "./pages/login/indexLogin.js";
import { Frontpage } from "./pages/frontpage/index.js"
import SearchButton from "../components/searchButton.js";

export default function Home() {
  return (
    <main style={{ padding: '1px', fontFamily: 'Arial, sans-serif' }}>
    <main style={{ padding: '1px', fontFamily: 'Arial, sans-serif' }}>
    <Frontpage />
    <h1>Testing</h1>
    <SearchButton />
    <AddButton />
  </main>
  );
}
