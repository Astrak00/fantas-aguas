import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Player from "./Player";
import Admin from "./Admin";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

// Light/dark is a shared setting so the admin can flip the TV screen remotely.
function Theme() {
  const light = useQuery(api.settings.get)?.light ?? false;
  document.body.classList.toggle("light", light);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <Theme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>,
);
