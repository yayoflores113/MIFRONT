import "./lib/axios";
import React from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
);
