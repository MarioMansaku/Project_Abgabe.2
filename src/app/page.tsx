import React from "react";
// import { Gallery } from "./pages/gallery/indexGallery.js"
// import { Login } from "./pages/login/indexLogin.js";
import { Frontpage } from "./pages/frontpage/index.js"
import SearchButton from "../components/searchButton.js";

export default function Home() {
  return (
    <main style={{ padding: '1px', fontFamily: 'Arial, sans-serif' }}>
    <Frontpage />
    <h1>Testing</h1>
    <SearchButton />
  </main>
  );
}
