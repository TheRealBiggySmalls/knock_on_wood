
export const expandedWoods = {
  "1": { 
    name: "ogWood", 
    image: "/expanded/screen1.png",
    sound: "/sounds/Wood_dig1.ogg"
  },
  "2": { 
    name: "frodoDoor", 
    image: "/expanded/screen2.png",
    sound: "/sounds/wood-tap-1.wav"
  },
  "3": { 
    name: "ryanDunn", 
    image: "/expanded/screen3.png",
    sound: "/sounds/ryanDunn.mp3"
  },
  "4": { 
    name: "charlieTree", 
    image: "/expanded/screen4.png",
    sound: "/sounds/wood-tap-1.wav"
  }
};

export const mainScreenButtons = [
  { id: 1, name: "Og Wood", image: "/buttons/ogWood.png" },
  { id: 2, name: "Frodo Door", image: "/buttons/frodoDoor.png" },
  { id: 3, name: "Ryan Dunn", image: "/buttons/ryanDunn.png" },
  { id: 4, name: "Charlie Tree", image: "/buttons/charlieTree.png" }
];

export const entryPageItems = [
  { name: "intro2", image: "/intros/intro1.png" },
  { name: "intro2", image: "/intros/intro2.png" },
  { name: "intro3", image: "/intros/intro3.png" },
];

export const music = [
	{
		id: 1,
		name: "Rest",
		artist: "backtothemoney",
		song: "/music/rest.mp3",
		image: "/music/b2mtab.png",
	},
	{
		id: 2,
		name: "Main Theme",
		artist: "Will Alone",
		song: "/music/main-theme.mp3",
		image: "/music/bywilltab.png",
	},
	{
		id: 3,
		name: "Like a Motion Picture",
		artist: "jgack",
		song: "/music/like-a-motion-picture.mp3",
		image: "/music/jgacktab.png",
	},
];

export const forecastLabels = [
  { label: "Low", pct: 0.2, color: "#e53935" }, // red
  { label: "Mild", pct: 0.4, color: "#fb8c00" }, // orange
  { label: "Lucky", pct: 0.6, color: "#fbc02d" }, // yellow
  { label: "Very Lucky", pct: 0.8, color: "#43a047" }, // green
  { label: "Extremely Lucky", pct: 0.99, color: "#00796b" }, // deep green
  { label: "Golden Eternal Luck Radiance", pct: 1.0, color: "linear-gradient(90deg, #ffe066 0%, #ffd700 50%, #fffbe6 100%)" } // radiant gold
];
