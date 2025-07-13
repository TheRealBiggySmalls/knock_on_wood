import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { MusicPlayerUI, MusicProfileUI } from "@/components/music-player";
import { useOmniContext } from "@/context/omni-context";
import { mainScreenButtons, entryPageItems, expandedWoods } from "@/constants/assets";

{/*NOTE: expanded wood is rendered here locally instead of routed as a new page for better performance of mounting/unmounting video/image components */}
const MainScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { hasSeenEntry, setHasSeenEntry, isOnline } = useOmniContext();
  const [fadeOut, setFadeOut] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [expandedWoodId, setExpandedWoodId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageCache, setImageCache] = useState<{[key: string]: boolean}>({});

  // load local profile
  useEffect(() => {
    const name = localStorage.getItem("profileName");
    const pic = localStorage.getItem("profilePic");
    const city = localStorage.getItem("profileCity");
    if (name) setProfileName(name);
    if (city) setProfileCity(city);
    if (pic) setProfilePic(pic);
  }, []);

  // transition fade out entry page
  const handleEntryClick = () => {
    setFadeOut(true);
  };

  const handleTransitionEnd = () => {
    if (fadeOut) {
      setHasSeenEntry(true);
    }
  };

  const handleProfileSave = () => {
    localStorage.setItem("profileName", profileName);
    localStorage.setItem("profileCity", profileCity);
    if (profilePic) localStorage.setItem("profilePic", profilePic);
    setShowProfileModal(false);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfilePic(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const [entryIndex] = useState(() => Math.floor(Math.random() * entryPageItems.length));

  // preload and cache expanded wood images on mount
  useEffect(() => {
    const cache: {[key: string]: boolean} = {};
    Object.entries(expandedWoods).forEach(([id, item]) => {
      const img = new window.Image();
      img.src = item.image;
      img.onload = () => {
        cache[id] = true;
        setImageCache(prev => ({ ...prev, [id]: true }));
      };
    });
  }, []);

  // expanded wood modal logic
  const expandedWoodItem = useMemo(() => expandedWoodId ? expandedWoods[expandedWoodId as keyof typeof expandedWoods] : null, [expandedWoodId]);

  // Allow sound spamming and keep visual feedback with low latency
  const [isPlaying, setIsPlaying] = useState(false);
  // Audio pool for each sound, keyed by wood id and online/offline state
  const audioPools = useRef<{ [key: string]: HTMLAudioElement[] }>({});
  const POOL_SIZE = 6;

  // Helper to get pool key per wood and online state
  const getPoolKey = (woodId: string | null, online: boolean) => {
    return woodId ? `${woodId}_${online ? 'online' : 'offline'}` : '';
  };

  // Preload audio pool for all sounds on mount or when expandedWoodId or isOnline changes
  useEffect(() => {
    if (!expandedWoodId || !expandedWoodItem) return;
    const useRemote = isOnline;
    const soundArr = useRemote ? expandedWoodItem.sound : expandedWoodItem.backupSound;
    const poolKey = getPoolKey(expandedWoodId, useRemote);
    // Clear out any previous pool for this wood
    audioPools.current[poolKey] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      // For every pool slot, create a new Audio for a random sound (even if only one sound)
      const src = soundArr[Math.floor(Math.random() * soundArr.length)];
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioPools.current[poolKey].push(audio);
    }
    // Optionally, clean up pools for other woods to save memory
    Object.keys(audioPools.current).forEach(key => {
      if (key !== poolKey) delete audioPools.current[key];
    });
  }, [expandedWoodId, expandedWoodItem, isOnline]);

  const playWoodSound = useCallback(() => {
    if (!expandedWoodId || !expandedWoodItem) return;
    setIsPlaying(true);
    const useRemote = isOnline;
    const soundArr = useRemote ? expandedWoodItem.sound : expandedWoodItem.backupSound;
    const poolKey = getPoolKey(expandedWoodId, useRemote);
    const pool = audioPools.current[poolKey] || [];
    // Always pick a random sound for each click
    const src = soundArr[Math.floor(Math.random() * soundArr.length)];
    // Find a free audio object in the pool (paused or ended)
    let audio = pool.find(a => (a.paused || a.ended));
    if (!audio) {
      // If all are busy, reuse a random one
      audio = pool[Math.floor(Math.random() * pool.length)] || new Audio(src);
    }
    // Always set src to the chosen sound (even for single-sound woods)
    if (audio.src !== src && !audio.src.endsWith(src)) {
      audio.src = src;
    }
    audio.currentTime = 0;
    audio.play().catch(console.error);
    setTimeout(() => setIsPlaying(false), 200); // short feedback for each click
  }, [expandedWoodId, expandedWoodItem, isOnline]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* entry screen overlay */}
      {!hasSeenEntry && (
        <div
          className={`absolute inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-300 ease-linear ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={fadeOut ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onClick={handleEntryClick}
          onTransitionEnd={handleTransitionEnd}
        >
          <img
            src={entryPageItems[entryIndex].image}
            alt={entryPageItems[entryIndex].name}
            className="w-full h-full object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      )}

      {/* background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/backgrounds/backvideo.mp4" type="video/mp4" />
        </video>
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* user icon */}
      <button
        className="fixed top-10 right-5 z-30 flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/40 transition-colors border border-white/40 rounded-full shadow-lg backdrop-blur-sm overflow-hidden"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        onClick={() => setShowProfileModal(true)}
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
          </svg>
        )}
      </button>

      {/* profile modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl p-6 w-80 max-w-full flex flex-col gap-4 relative">
            <button 
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black text-2xl leading-none" 
              onClick={() => setShowProfileModal(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="profile-pic" className="cursor-pointer">
                <img
                  src={profilePic || "/placeholder.svg"}
                  alt="Profile"
                  className="w-20 h-20 object-cover border border-gray-300 rounded-none"
                  loading="lazy"
                  draggable={false}
                />
                <input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-full text-center"
                placeholder="Enter your name"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
              />
              <input
                type="text"
                className="border rounded px-2 py-1 w-full text-center"
                placeholder="Enter your city"
                value={profileCity}
                onChange={e => setProfileCity(e.target.value)}
              />
              <button
                className="mt-2 bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition-colors"
                onClick={handleProfileSave}
              >
                Save
              </button>
              {/* luck and chat navigation */}
              <div className="flex w-full gap-4 mt-4">
                <Link to="/luck-forecast" className="flex-1 flex flex-col items-center justify-center">
                  <img src="/buttons/clovernew2.png" alt="Luck Forecast" className="w-12 h-12" loading="lazy" draggable={false} />
                </Link>
                <Link to="/message-thread" className="flex-1 flex flex-col items-center justify-center">
                  <img src="/buttons/chat2.png" alt="Messages" className="w-12 h-12" loading="lazy" draggable={false} />
                </Link>
              </div>
              <div className="mt-4">
                <MusicProfileUI />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* expanded Wood Modal Overlay */}
      {expandedWoodItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90">
          {/* back button */}
          <button
            className="absolute top-4 left-4 z-20 bg-transparent p-0 m-0"
            onClick={() => setExpandedWoodId(null)}
            aria-label="Back"
          >
            <img src="/random/back2.png" alt="Back" className="w-40 h-25" loading="lazy" draggable={false} />
          </button>
          {/* full screen image */}
          <div
            className={`absolute inset-0 cursor-pointer transition-transform duration-200 ${isPlaying ? 'scale-95' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onClick={playWoodSound}
          >
            <img
              src={expandedWoodItem.image}
              alt={expandedWoodItem.name}
              className="w-full h-full object-cover"
              onLoad={handleImageLoad}
              style={imageCache[expandedWoodId || ''] ? { filter: 'none' } : { filter: 'blur(2px)' }}
              loading="lazy"
              draggable={false}
            />
          </div>
          {/* visual feedback when playing */}
          {isPlaying && (
            <div className="absolute inset-0 bg-white/20 pointer-events-none animate-pulse z-10" />
          )}
        </div>
      )}

      {/* main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-xs sm:max-w-sm aspect-square">
          {mainScreenButtons.map((button) => (
            <button
              key={button.id}
              className="w-full h-full flex items-center justify-center bg-transparent border-none p-0 m-0"
              onClick={() => {
                setExpandedWoodId(String(button.id));
                setImageLoaded(false);
              }}
              aria-label={button.name}
            >
              <div className="w-full h-full aspect-square hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center">
                <img
                  src={button.image}
                  alt={button.name}
                  className="w-full h-full object-contain rounded-lg select-none"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>
          <MusicPlayerUI />
      </div>
    </div>
  );
};

export default MainScreen;