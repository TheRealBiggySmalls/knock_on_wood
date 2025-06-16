import { useEffect, useState } from "react";
import { music } from "@/constants/assets"; 

let globalAudio: HTMLAudioElement | null = null;
let globalTrackIndex: number | null = null;
let globalSetters: Array<(idx: number) => void> = [];

const MusicPlayer = () => {
	useEffect(() => {
		if (!globalAudio) {
			globalAudio = new Audio(music[globalTrackIndex || 0].song);
			globalAudio.loop = false;
			globalAudio.volume = 0.1;
			globalAudio.onended = () => {
				const nextIndex = (globalTrackIndex! + 1) % music.length;
				globalTrackIndex = nextIndex;
				globalAudio!.src = music[nextIndex].song;
				globalAudio!.play();
				globalSetters.forEach((fn) => fn(nextIndex));
			};
			globalAudio.play();
		}
		return () => {
			if (globalAudio) {
				globalAudio.pause();
				globalAudio.currentTime = 0;
				globalAudio = null;
				globalTrackIndex = null;
			}
		};
	}, []);

	return null;
};

const MusicPlayerUI = () => {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(() => globalTrackIndex || 0);

	useEffect(() => {
		globalSetters.push(setCurrentTrackIndex);
		return () => {
			globalSetters = globalSetters.filter((fn) => fn !== setCurrentTrackIndex);
		};
	}, []);

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

export { MusicPlayer, MusicPlayerUI };
