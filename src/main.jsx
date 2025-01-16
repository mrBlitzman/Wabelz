import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../Views/Pages/App.jsx";
import "../Views/Assets/Styles/App.scss";
import "../Views/Assets/Styles/margin.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")).render(
  <div className="app-root">
    <Analytics />
    <SpeedInsights />
    <App />
  </div>
);
