import { Backpack } from "lucide-react";

export const expandedWoods = {
  "1": { 
    name: "ogWood", 
    image: "/expanded/screen1.png",
    sound: ["https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FogWoodNew.mp3?alt=media&token=44b61a64-5a60-4f9a-889c-61d30766adfe"],
    backupSound: ["/sounds/ogWoodNew.mp3"]
  },
  "2": { 
    name: "frodoDoor", 
    image: "/expanded/screen2.png",
    sound: ["https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Faltwood.mp3?alt=media&token=023d90cc-3a74-4ba1-8f2a-8c4667c7d55f"],
    backupSound: ["/sounds/altwood.mp3"]
  },
  "3": { 
    name: "ryanDunn", 
    image: "/expanded/screen3.png",
    sound: [
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn.mp3?alt=media&token=efbd6b32-4d04-43b2-8610-3cee8e633539",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn2.mp3?alt=media&token=21494f61-5e32-4c62-ac12-6ff9435f4234",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn3.mp3?alt=media&token=f1b56994-8883-4ca8-84d0-5afe16ac88d5",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn4.mp3?alt=media&token=036bf253-0c95-49a6-9738-86c2a4384b68",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn5.mp3?alt=media&token=bd4e16df-24cf-4574-bdea-317343426eb2",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn6.mp3?alt=media&token=bec6330c-7ccf-4ce6-9dd2-2efe6fd205d2",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn7.mp3?alt=media&token=b733085c-adeb-426a-878d-c1ce714867e5",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FryanDunn8.mp3?alt=media&token=1e34a5a2-b81e-4fa8-bcc3-ddfc4de82194",
    ],
    backupSound: ["/sounds/ryanDunn1.mp3", "/sounds/ryanDunn2.mp3", "/sounds/ryanDunn3.mp3", "/sounds/ryanDunn4.mp3", "/sounds/ryanDunn5.mp3", "/sounds/ryanDunn6.mp3", "/sounds/ryanDunn7.mp3", "/sounds/ryanDunn8.mp3"]
  },
  "4": { 
    name: "charlieTree", 
    image: "/expanded/screen4.png",
    sound: ["https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fcbrown.mp3?alt=media&token=f1922642-3943-41b8-a5b2-491fdc3a47fd"],
    backupSound: ["/sounds/cbrown.mp3"]
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
		song: "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/songs%2Frest.mp3?alt=media&token=d19ab62a-27d9-4ba5-b4d3-8bbf585e8f4c",
		backupSong: "/music/rest.mp3",
    image: "/music/b2mtab.png",
        fullImage: "/music/b2mProfile.png",
	},
	{
		id: 2,
		name: "Main Theme",
		artist: "Will Alone",
		song: "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/songs%2Fmain-theme.mp3?alt=media&token=84658e63-62f3-4bc6-a34e-fd227dd530ad",
		backupSong: "/music/main-theme.mp3",
    image: "/music/bywilltab.png",
        fullImage: "/music/bywillaloneProfile.png",
	},
	{
		id: 3,
		name: "Like a Motion Picture",
		artist: "jgack",
		song: "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/songs%2Flike-a-motion-picture.mp3?alt=media&token=0d4211aa-13a4-4390-bbc4-59ff712aed5c",
		backupSong: "/music/like-a-motion-picture.mp3",
    image: "/music/jgacktab.png",
        fullImage: "/music/JgackPorfile.png",
	},
];

export const forecastLabels = [
  { label: "Low", pct: 0.2, color: "#DCA1A1" }, // dusty rose
  { label: "Mild", pct: 0.4, color: "#FFD3AC" }, //peach
  { label: "Lucky", pct: 0.6, color: "#ADEBB3" }, // mint
  { label: "Very Lucky", pct: 0.8, color: "#50C878" }, // emerald
  { label: "Extremely Lucky", pct: 0.9, color: "#2E8B57" }, // sea
  { label: "Golden Eternal Luck Radiance", pct: 1.0, color: "radial-gradient(circle at 60% 40%, #fffbe6 0%, #ffe066 40%, #ffd700 80%, #fffbe6 100%)" } // radiant gold
];