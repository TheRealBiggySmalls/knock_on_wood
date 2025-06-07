import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./main-screen"; // Ensure this path is correct and the file exports default

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen />} />
      {/* other routes can go here */}
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
