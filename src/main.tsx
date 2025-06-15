import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OmniContextProvider } from "@/context/omni-context";
import MusicPlayer from "@/components/music-player.tsx";

createRoot(document.getElementById("root")!).render(
  <OmniContextProvider>
    <App />
    {/*music player code can be found in components/music-player*/}
    {/* we put it here so it plays on every page */}
    <MusicPlayer/>
  </OmniContextProvider>
);
