import "../global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { Frontpage } from "./screens/frontpage/indexFrontpage";
import { Gallery } from "./screens/gallery/indexGallery"
//import { ThemeProvider as ThemeFrontpage} from "./theme/frontpage/ThemeProviderFrontpage";
import { ThemeProvider as ThemeGallery } from "./theme/gallery/ThemeProviderGallery";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <ThemeGallery>
      <Gallery />
    </ThemeGallery>
  </StrictMode>,
);