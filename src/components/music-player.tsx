import { useEffect, useState } from "react";

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

let globalAudio: HTMLAudioElement | null = null;
let globalTrackIndex: number | null = null;
let globalSetters: Array<(idx: number) => void> = [];

const MusicPlayer = () => {
	const [, forceRerender] = useState(0); // for UI update
	const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
		if (globalTrackIndex !== null) return globalTrackIndex;
		const idx = Math.floor(Math.random() * music.length);
		globalTrackIndex = idx;
		return idx;
	});

	// Register setter for sync across mounts
	useEffect(() => {
		globalSetters.push(setCurrentTrackIndex);
		return () => {
			globalSetters = globalSetters.filter((fn) => fn !== setCurrentTrackIndex);
		};
	}, []);

	useEffect(() => {
		// Only create audio if not already created
		if (!globalAudio) {
			globalAudio = new Audio(music[currentTrackIndex].song);
			globalAudio.loop = false;
			globalAudio.onended = () => {
				const nextIndex = (globalTrackIndex! + 1) % music.length;
				globalTrackIndex = nextIndex;
				globalAudio!.src = music[nextIndex].song;
				globalAudio!.play();
				globalSetters.forEach((fn) => fn(nextIndex));
			};
			globalAudio.play();
		} else {
			// If audio exists but track index changed (e.g. on reload), sync UI
			if (globalTrackIndex !== currentTrackIndex) {
				setCurrentTrackIndex(globalTrackIndex!);
			}
		}
		// eslint-disable-next-line
	}, []);

	// Keep UI in sync with globalTrackIndex
	useEffect(() => {
		if (currentTrackIndex !== globalTrackIndex) {
			setCurrentTrackIndex(globalTrackIndex!);
		}
	}, [currentTrackIndex]);

	return (
		<div className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-center pointer-events-none" style={{ background: "none" }}>
			<img
				src={music[currentTrackIndex].image}
				alt={music[currentTrackIndex].name}
				className="h-32 md:h-48 w-auto object-contain pointer-events-auto"
				style={{ maxWidth: '90vw' }}
			/>
		</div>
	);
};

export default MusicPlayer;
