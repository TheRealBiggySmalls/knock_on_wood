import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, setDoc, increment, getDoc, collection, getDocs } from "firebase/firestore";
import LuckForecastGraph from "@/components/luck-forecast-graph";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const forecastLabels = [
  { label: "Low", pct: 0.2, color: "#e53935" }, // red
  { label: "Mild", pct: 0.4, color: "#fb8c00" }, // orange
  { label: "Lucky", pct: 0.6, color: "#fbc02d" }, // yellow
  { label: "Very Lucky", pct: 0.8, color: "#43a047" }, // green
  { label: "Extremely Lucky", pct: 0.99, color: "#00796b" }, // deep green
  { label: "Golden Eternal Radiance", pct: 1.0, color: "linear-gradient(90deg, #ffe066 0%, #ffd700 50%, #fffbe6 100%)" } // radiant gold
];

const LuckForecast = () => {
  const navigate = useNavigate();
  const [luckCount, setLuckCount] = useState<number | null>(null);
  const [addingLuck, setAddingLuck] = useState(false);
  const [allTimeHigh, setAllTimeHigh] = useState(1);
  const [today, setToday] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const fetchLuck = async () => {
      const ref = doc(db, "luck-count", today);
      const snap = await getDoc(ref);
      setLuckCount(snap.exists() ? snap.data().count || 0 : 0);
    };
    fetchLuck();
  }, [today]);

  useEffect(() => {
    const fetchAllTimeHigh = async () => {
      const ref = collection(db, "luck-count");
      const snap = await getDocs(ref);
      let max = 1;
      snap.forEach(doc => {
        const c = doc.data().count || 0;
        if (c > max) max = c;
      });
      setAllTimeHigh(max);
    };
    fetchAllTimeHigh();
  }, [luckCount]);

  const handleAddLuck = async () => {
    setAddingLuck(true);
    const ref = doc(db, "luck-count", today);
    await setDoc(ref, { count: 0 }, { merge: true });
    await updateDoc(ref, { count: increment(1) });
    const snap = await getDoc(ref);
    setLuckCount(snap.data().count || 0);
    setAddingLuck(false);
  };

  // get forecast label and color
  let forecast = "...";
  let forecastColor = "#888";
  if (luckCount !== null && allTimeHigh > 0) {
    if (luckCount > allTimeHigh) {
      forecast = "Golden Eternal Radiance";
      forecastColor = forecastLabels[5].color;
    } else {
      const pct = luckCount / allTimeHigh;
      const found = forecastLabels.find(f => pct <= f.pct);
      forecast = found ? found.label : "Extremely Lucky";
      forecastColor = found ? found.color : forecastLabels[4].color;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate("/")}
          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <button
        onClick={handleAddLuck}
        disabled={addingLuck}
        className="text-3xl px-6 py-2 rounded-full bg-green-200 hover:bg-green-300 active:scale-95 transition-all shadow-lg select-none"
        style={{ pointerEvents: addingLuck ? 'none' : 'auto' }}
      >
        🍀
      </button>
      <div className="mt-2 text-base text-gray-800 font-medium">
        Luck forecast is: <span
          className="font-bold"
          style={forecast === "Golden Eternal Radiance"
            ? { background: forecastColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
            : { color: forecastColor }}
        >{forecast}</span> ({luckCount !== null ? luckCount : '...'})
      </div>
      <div className="mt-8 w-full flex justify-center">
        <LuckForecastGraph today={today} allTimeHigh={allTimeHigh} />
      </div>
      <div className="mt-2 text-xs text-gray-400 text-center">Feeling lucky?</div>
    </div>
  );
};

export default LuckForecast;
