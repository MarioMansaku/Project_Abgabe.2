import React from "react";
// import { Gallery } from "./screens/gallery/indexGallery.js"
// import { Login } from "./screens/login/indexLogin.js";
import { Frontpage } from "./screens/frontpage/indexFrontpage.js"
import SearchButton from "../components/searchButton.js";

export default function Home() {
  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <Frontpage />
    <h1>Testing</h1>
    <SearchButton />
  </main>
  );
}
