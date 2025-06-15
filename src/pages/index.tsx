import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./main-screen";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen />} />
    </Routes>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
