import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { expandedWoods } from "@/constants/assets"; 

//EAMON: this page is what pops up when you click on an item in the main screen.
//it shows a full screen image of the item and plays a sound when you tap it.
//it also has a back button to return to the main screen.
const ExpandedWood = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const item = expandedWoods[id as keyof typeof expandedWoods];

  const playWoodSound = () => {
    setIsPlaying(true);

    //list of sounds for each item. If they have one just play the first sound
    const soundToPlay = item.sound.length === 1 
      ? item.sound[0] 
      : item.sound[Math.floor(Math.random() * item.sound.length)];

    const audio = new Audio(soundToPlay);
    audio.play().catch(console.error);

    setTimeout(() => setIsPlaying(false), 300);
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white">Item not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-black">
      {/* back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors">
          <ArrowLeft size={24} />
        </Link>
      </div>

      {/* full screen image */}
      <div 
        className={`fixed inset-0 w-screen h-screen cursor-pointer transition-transform duration-200 ${isPlaying ? 'scale-95' : 'scale-100'} z-0`}
        onClick={playWoodSound}
        style={{ minWidth: '100vw', minHeight: '100vh', width: '100vw', height: '100vh', objectFit: 'cover' }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover bg-black"
          style={{ minWidth: '100vw', minHeight: '100vh', width: '100vw', height: '100vh', objectFit: 'cover' }}
        />
      </div>

      {/* tap instruction overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 text-white text-sm font-medium z-10">
        Tap anywhere to play wood sound
      </div>

      {/* visual feedback when playing */}
      {isPlaying && (
        <div className="fixed inset-0 w-screen h-screen bg-white/20 pointer-events-none animate-pulse z-10" />
      )}
    </div>
  );
};

export default ExpandedWood;



