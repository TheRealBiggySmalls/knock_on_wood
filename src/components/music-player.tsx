import { useEffect, useState } from "react";
import { music } from "@/constants/assets"; 
import { useOmniContext } from "@/context/omni-context";

let globalAudio: HTMLAudioElement | null = null;
let globalTrackIndex: number | null = null;
let globalSetters: Array<(idx: number) => void> = [];

const MusicPlayer = () => {
	const { isOnline } = useOmniContext();
	useEffect(() => {
		if (!globalAudio) {
			const idx = globalTrackIndex || 0;
			const src = isOnline ? music[idx].song : music[idx].backupSong;
			globalAudio = new Audio(src);
			globalAudio.loop = false;
			globalAudio.volume = 0.1;
			globalAudio.onended = () => {
				const nextIndex = (globalTrackIndex! + 1) % music.length;
				globalTrackIndex = nextIndex;
				const nextSrc = isOnline ? music[nextIndex].song : music[nextIndex].backupSong;
				globalAudio!.src = nextSrc;
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
	}, [isOnline]);

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
				loading="lazy"
				draggable={false}
			/>
		</div>
	);
};

//full profile available in profile popup
const MusicProfileUI = () => {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(() => globalTrackIndex || 0);

	useEffect(() => {
		globalSetters.push(setCurrentTrackIndex);
		return () => {
			globalSetters = globalSetters.filter((fn) => fn !== setCurrentTrackIndex);
		};
	}, []);

	return (
		<div className="z-50 flex items-center justify-center pointer-events-none" style={{ background: "none" }}>
			<img
				src={music[currentTrackIndex].fullImage}
				alt={music[currentTrackIndex].name}
				className="h-32 md:h-48 w-auto object-contain pointer-events-auto"
				style={{ maxWidth: '90vw' }}
				loading="lazy"
				draggable={false}
			/>
		</div>
	);
}

export { MusicPlayer, MusicPlayerUI , MusicProfileUI};
