import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { expandedWoods } from "@/constants/assets";

const ExpandedWood = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const item = expandedWoods[id as keyof typeof expandedWoods];

  const playWoodSound = () => {
    setIsPlaying(true);

    // list of sounds for each item. if they have one just play the first
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
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="block">
          <img 
            src="/random/back-button-icon-11.png" 
            alt="Back" 
            className="w-20 h-20" 
          />
        </Link>
      </div>

      {/* full screen image */}
      <div
        className={`absolute inset-0 cursor-pointer transition-transform duration-200 ${
          isPlaying ? 'scale-95' : 'scale-100'
        }`}
        onClick={playWoodSound}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* visual feedback when playing */}
      {isPlaying && (
        <div className="absolute inset-0 bg-white/20 pointer-events-none animate-pulse z-10" />
      )}
    </div>
  );
};

export default ExpandedWood;