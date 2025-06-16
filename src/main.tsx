import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OmniContextProvider } from "@/context/omni-context";
import { MusicPlayer } from "@/components/music-player";

createRoot(document.getElementById("root")!).render(
  <OmniContextProvider>
    <App />
    <MusicPlayer />
  </OmniContextProvider>
);
