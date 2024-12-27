import React from "react";
import { Frontpage } from "./pages/frontpage/index.js"
import SearchButton from "../components/searchButton";
import AddButton from "../components/addButton";

export default function Home() {
  return (
    <main style={{ padding: '1px', fontFamily: 'Arial, sans-serif' }}>
    <Frontpage />
    <h1>Testing</h1>
    <SearchButton />
    <AddButton />
  </main>
  );
}
