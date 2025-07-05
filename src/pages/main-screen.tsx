import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { MusicPlayerUI, MusicProfileUI } from "@/components/music-player";
import { useOmniContext } from "@/context/omni-context";
import { mainScreenButtons, entryPageItems} from "@/constants/assets";

const MainScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { hasSeenEntry, setHasSeenEntry } = useOmniContext();
  const [fadeOut, setFadeOut] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

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

  return (
    <>
      {/* entry screen - fixed, covers everything when active */}
      {!hasSeenEntry && (
        <div
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity ease-linear ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          onClick={handleEntryClick}
          onTransitionEnd={handleTransitionEnd}
        >
          <img
            src={entryPageItems[entryIndex].image}
            alt={entryPageItems[entryIndex].name}
            className="absolute inset-0 w-full h-full object-contain bg-black"
            style={{ maxWidth: '100vw', maxHeight: '100vh', minWidth: '100vw', minHeight: '100vh' }}
          />
        </div>
      )}

      {/* video background - fixed, always behind */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-0"
        style={{ minWidth: '100vw', minHeight: '100vh', width: '100vw', height: '100vh', objectFit: 'cover' }}
      >
        <source src="/backgrounds/backvideo.mp4" type="video/mp4" />
      </video>

      {/* dark overlay - fixed, above video */}
      <div className="fixed inset-0 w-screen h-screen bg-black/30 z-10" style={{ minWidth: '100vw', minHeight: '100vh' }} />

      {/* user icon - always top right */}
      <button
        className="fixed top-4 right-4 z-30 flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/40 transition-colors border border-white/40 overflow-hidden p-0 rounded-full shadow-lg"
        style={{ backdropFilter: 'blur(2px)' }}
        onClick={() => setShowProfileModal(true)}
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 object-cover p-0 m-0 rounded-full"
            style={{ aspectRatio: '1 / 1', borderRadius: '50%', padding: 0, margin: 0 }}
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
          </svg>
        )}
      </button>

      {/* profile modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-80 max-w-[90vw] flex flex-col gap-4 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setShowProfileModal(false)}>&times;</button>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="profile-pic" className="cursor-pointer">
                <img
                  src={profilePic || "/placeholder.svg"}
                  alt="Profile"
                  className="w-20 h-20 object-cover border border-gray-300 p-0 m-0 rounded-none"
                  style={{ aspectRatio: '1 / 1', borderRadius: 0, padding: 0, margin: 0 }}
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
                className="mt-2 bg-black text-white rounded px-4 py-2 hover:bg-gray-800"
                onClick={handleProfileSave}
              >Save</button>
              {/* luck and chat navigation */}
              <div className="flex w-full gap-4 mt-4">
                <Link to="/luck-forecast" className="flex-1 flex flex-col items-center justify-center">
                  <img src="/buttons/clovernew2.png" className="w-12 h-12" />
                </Link>
                <Link to="/message-thread" className="flex-1 flex flex-col items-center justify-center">
                  <img src="/buttons/chat2.png" className="w-12 h-12" />
                </Link>
              </div>
              <div className="mt-4">
                <MusicProfileUI/>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* main content - relative, above backgrounds */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4 sm:p-8 w-full min-h-[60vh]">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-xs sm:max-w-sm aspect-square">
          {mainScreenButtons.map((button) => (
            <Link key={button.id} to={`/item/${button.id}`} className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full aspect-square hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center">
                <img
                  src={button.image}
                  alt={button.name}
                  className="w-full h-full object-contain rounded-lg select-none"
                  draggable={false}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full max-w-xs sm:max-w-sm mt-6">
          <MusicPlayerUI />
        </div>
      </div>

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
    </>
  );
};

export default MainScreen;