import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import MusicPlayer from "@/components/music-player";
import { useOmniContext } from "@/context/omni-context";

const MainScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { hasSeenEntry, setHasSeenEntry } = useOmniContext();
  const [fadeOut, setFadeOut] = useState(false);

  // Use onTransitionEnd to remove overlay after fade
  const handleEntryClick = () => {
    setFadeOut(true);
  };

  const handleTransitionEnd = () => {
    if (fadeOut) {
      setHasSeenEntry(true);
    }
  };

  const buttons = [
    { id: 1, name: "Barbossas Peg Leg", image: "/pegleg.png" },
    { id: 2, name: "Hobbit Front Door", image: "/hobbit.png" },
    { id: 3, name: "Gretzky's Twig", image: "/gretsky.png" },
    { id: 4, name: "Bob Dylan's Guitar", image: "/bobdylan.png" }
  ];

  const entryPageItems = [
    { name: "entry1", image: "/image.png" },
    { name: "entry2", image: "/image.png" },
    { name: "entry3", image: "/image.png" },
    { name: "entry4", image: "/image.png" },
  ];
  const [entryIndex] = useState(() => Math.floor(Math.random() * entryPageItems.length));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Entry Screen Overlay */}
      {!hasSeenEntry && (
        <div
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-[2500ms] ease-linear ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          onClick={handleEntryClick}
          onTransitionEnd={handleTransitionEnd}
        >
          <img
            src={entryPageItems[entryIndex].image}
            alt={entryPageItems[entryIndex].name}
            className="w-full h-full object-cover"
            style={{ maxWidth: '100vw', maxHeight: '100vh', transition: 'opacity 2.5s linear' }}
          />
        </div>
      )}

      {/* video bground */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/backvideo.mp4" type="video/mp4" />
      </video>

      {/* dark overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* status bar simulation - delete */}
      <div className="relative z-10 flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">AT&T LTE</span>
        </div>
        <div>12:09 PM</div>
        <div className="flex items-center gap-1">
          <span>88%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-5 h-2 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

    {/* main stuff */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {buttons.map((button) => (
            <Link key={button.id} to={`/item/${button.id}`}>
              <div className="hover:scale-105 transition-transform duration-200">
                <img
                  src={button.image}
                  alt={button.name}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/*Music Player*/}
      <MusicPlayer/>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MainScreen;