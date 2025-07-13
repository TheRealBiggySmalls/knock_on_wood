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
    sound: ["https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2FaltWoodChopped.mp3?alt=media&token=0eaa9e53-08d9-460b-bcf6-9534605fc362"],
    backupSound: ["/sounds/altWoodChopped.mp3"]
  },
  "3": { 
    name: "ryanDunn", 
    image: "/expanded/screen3.png",
    sound: [
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc1.mp3?alt=media&token=8c26db71-a247-4aff-9c0d-8e013f2c0ced",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc2.mp3?alt=media&token=a4ba9a15-fe35-4344-82ad-95c79fb88bda",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc3.mp3?alt=media&token=08525e67-6397-43d4-a32e-e790c16da452",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc4.mp3?alt=media&token=82a10580-e4d5-4205-8f98-649206fbdd07",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc5.mp3?alt=media&token=007ec791-59bc-45d0-be55-dda497d9dcc6",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc6.mp3?alt=media&token=75e1b4bd-15d9-42bb-b07c-6e9d83e196e7",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc7.mp3?alt=media&token=77200a7b-ebfb-42ce-ac6e-eb722030c16b",
        "https://firebasestorage.googleapis.com/v0/b/knock-on-wood-69261.firebasestorage.app/o/sounds%2Fnpc8.mp3?alt=media&token=6b3474d2-a155-4d79-82a1-c66f85d3f4c7"
    ],
    backupSound: ["/sounds/npc1.mp3", "/sounds/npc2.mp3", "/sounds/npc3.mp3", "/sounds/npc4.mp3", "/sounds/npc5.mp3", "/sounds/npc6.mp3", "/sounds/npc7.mp3", "/sounds/npc8.mp3"]
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