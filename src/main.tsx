import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OmniContextProvider } from "@/context/omni-context";

createRoot(document.getElementById("root")!).render(
  <OmniContextProvider>
    <App />
  </OmniContextProvider>
);
