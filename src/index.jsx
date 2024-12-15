import "../global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ExamplesLanding } from "./screens/ExamplesLanding/ExamplesLanding";
import { ThemeProvider } from "./theme/ThemeProvider";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <ThemeProvider>
      <ExamplesLanding />
    </ThemeProvider>
  </StrictMode>,
);
