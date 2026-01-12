import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WeatherProvider } from "./contexts/WeatherContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

/* ---------------- Leaflet Setup (FIX MARKER ISSUE) ---------------- */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
/* ------------------------------------------------------------------ */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WeatherProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WeatherProvider>
    </BrowserRouter>
  </StrictMode>
);
