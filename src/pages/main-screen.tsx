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
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // load local profile
  useEffect(() => {
    const name = localStorage.getItem("profileName");
    const pic = localStorage.getItem("profilePic");
    if (name) setProfileName(name);
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
    <div className="min-h-screen relative overflow-hidden">
      {/* entry screen */}
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

      {/* video bground */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/backgrounds/backvideo.mp4" type="video/mp4" />
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
        {/* user icon */}
        <button
          className="ml-4 flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/40 transition-colors border border-white/40 overflow-hidden p-0 rounded-none"
          onClick={() => setShowProfileModal(true)}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-8 h-8 object-cover p-0 m-0 rounded-none"
              style={{ aspectRatio: '1 / 1', borderRadius: 0, padding: 0, margin: 0 }}
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
            </svg>
          )}
        </button>
      </div>

      {/* profile modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-80 flex flex-col gap-4 relative">
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

    {/* main stuff */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          {mainScreenButtons.map((button) => (
            <Link key={button.id} to={`/item/${button.id}`}>
              <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                <img
                  src={button.image}
                  alt={button.name}
                  className="w-full h-auto object-contain rounded-lg select-none"
                  draggable={false}
                />
              </div>
            </Link>
          ))}
        </div>

        <MusicPlayerUI />
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
    </div>
  );
};

export default MainScreen;