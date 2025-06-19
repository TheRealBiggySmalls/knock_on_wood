import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { expandedWoods } from "@/constants/assets"; 

//AIDAN: this page is what pops up when you click on an item in the main screen.
//it shows a full screen image of the item and plays a sound when you tap it.
//it also has a back button to return to the main screen.
const ExpandedWood = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  //we have a list of audio players to allow spamming

  const item = expandedWoods[id as keyof typeof expandedWoods];

  const playWoodSound = () => {
    setIsPlaying(true);

    //in constants ryanDunn default is ryanDunn1.mp3
    let soundToPlay = item.sound;
    if (item.name === "ryanDunn") {
      const randomIndex = Math.floor(Math.random() * 8) + 1; //random ryanDunn sound
      soundToPlay = `/sounds/ryanDunn${randomIndex}.mp3`;
    }

    const audio = new Audio(soundToPlay);
    audio.play().catch(console.error);

    setTimeout(() => setIsPlaying(false), 300);
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Item not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors">
          <ArrowLeft size={24} />
        </Link>
      </div>

      {/* full screen image */}
      <div 
        className={`w-full h-full cursor-pointer transition-transform duration-200 ${isPlaying ? 'scale-95' : 'scale-100'}`}
        onClick={playWoodSound}
      >
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          style={{ maxWidth: '100vw', maxHeight: '100vh', minWidth: '100vw', minHeight: '100vh' }}
        />
      </div>

      {/* tap instruction overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 text-white text-sm font-medium">
        Tap anywhere to play wood sound
      </div>

      {/* visual feedback when playing */}
      {isPlaying && (
        <div className="absolute inset-0 bg-white/20 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};

export default ExpandedWood;



