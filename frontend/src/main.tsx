import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
// @ts-expect-error — no type declarations for font side-effect import
import "@fontsource/inter";
import App from "./App";

import ThemeProvider from "./theme/ThemeProvider";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
