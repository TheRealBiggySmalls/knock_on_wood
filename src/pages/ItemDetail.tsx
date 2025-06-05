
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ItemDetail = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const items = {
    "1": { 
      name: "Barbossas Peg Leg", 
      image: "/pegleg.png",
      sound: "wood-tap-1"
    },
    "2": { 
      name: "Hobbit Front Door", 
      image: "/hobbit.png",
      sound: "wood-tap-2"
    },
    "3": { 
      name: "Gretzky's Twig", 
      image: "/gretsky.png",
      sound: "wood-tap-3"
    },
    "4": { 
      name: "Bob Dylan's Guitar", 
      image: "/bobdylan.png",
      sound: "wood-tap-4"
    }
  };

  const item = items[id as keyof typeof items];

  const playWoodSound = () => {
    setIsPlaying(true);
    
    // create and play audio
    const audio = new Audio();
    
    //TODO
    audio.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGUgBCWB0fPRgS0FNnzE8+OFQQAO";
    
    audio.play().catch(console.error);
    
    // reset playing state after a short time
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
          className="w-full h-full object-cover"
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

export default ItemDetail;



