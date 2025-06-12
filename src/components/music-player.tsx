import { useEffect, useRef, useState } from "react";

const music = [
	{
		id: 1,
		name: "Rest",
		artist: "backtothemoney",
		song: "/music/track1.mp3",
		image: "/music/b2mtab.png",
	},
	{
		id: 2,
		name: "Main Theme",
		artist: "Will Alone",
		song: "/music/track2.mp3",
		image: "/music/bywilltab.png",
	},
	{
		id: 3,
		name: "Like a Motion Picture",
		artist: "jgack",
		song: "/music/track3.mp3",
		image: "/music/jgacktab.png",
	},
];

const MusicPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(() => Math.floor(Math.random() * music.length));

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = music[currentTrackIndex].song;
			audioRef.current.play();
		}
	}, [currentTrackIndex]);

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
			<div className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-center pointer-events-none" style={{ background: "none" }}>
				<img
					src={music[currentTrackIndex].image}
					alt={music[currentTrackIndex].name}
					className="h-32 md:h-48 w-auto object-contain pointer-events-auto"
					style={{ maxWidth: '90vw' }}
				/>
			</div>
		</>
	);
};

export default MusicPlayer;
