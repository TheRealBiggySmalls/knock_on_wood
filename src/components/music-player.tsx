import { useEffect, useRef, useState } from "react";

const music = [
  { id: 1, name: "Track1", artist: "Artist1", song: "/src1.mp3" },
  { id: 2, name: "Track2", artist: "Artist2", song: "/src2.mp3" },
  { id: 3, name: "Track3", artist: "Artist3", song: "/src3.mp3" },
];

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = music[currentTrackIndex].song;
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  // On mount, pick a random track to start
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * music.length);
    setCurrentTrackIndex(randomIndex);
  }, []);

  // When the current track ends, go to the next (loop forever)
  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % music.length);
  };

  return (
    <>
      <audio
        ref={audioRef}
        className="hidden"
        onEnded={handleEnded}
      />
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm text-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          <div className="w-8 h-8 bg-gray-600 rounded"></div>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-[scroll_10s_linear_infinite] text-base font-medium">
              "{music[currentTrackIndex].name}" by {music[currentTrackIndex].artist} • Now Playing • "{music[currentTrackIndex].name}" by {music[currentTrackIndex].artist} • Now Playing •
            </div>
          </div>
        </div>
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center ml-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
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

export default MusicPlayer;
