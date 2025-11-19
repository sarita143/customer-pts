import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { DataProvider } from "./context/DataContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DataProvider>
      <CssBaseline />
      <App />
    </DataProvider>
  </BrowserRouter>
);
