import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GridContextProvider } from "./context/GridContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GridContextProvider>
      <App />
    </GridContextProvider>
  </StrictMode>
);
