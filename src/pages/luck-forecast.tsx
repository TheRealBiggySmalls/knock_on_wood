import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, setDoc, increment, collection, getDocs, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import LuckForecastGraph from "@/components/luck-forecast-graph";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { forecastLabels } from "@/constants/assets";

const LuckForecast = () => {
  const navigate = useNavigate();
  const [luckCount, setLuckCount] = useState<number | null>(null);
  const [addingLuck, setAddingLuck] = useState(false);
  const [allTimeHigh, setAllTimeHigh] = useState(1);
  const [today, setToday] = useState(() => new Date().toISOString().slice(0, 10));
  //these track animations
  const [clovers, setClovers] = useState<{id:number, left:number}[]>([]);
  const cloverId = useRef(0);

  // track last known good value to prevent flicker
  const lastLuckCount = useRef<number>(0);

  useEffect(() => {
    const ref = doc(db, "luck-count", today);
    // real time baby
    const unsub = onSnapshot(ref, (snap) => {
      const count = snap.exists() ? snap.data().count || 0 : null;
      // update to 0 if the document truly doesn't exist (new day)
      if (count === 0 && lastLuckCount.current > 0 && snap.exists()) {
        // prevent firestore race condition making ui glitchhy
        return;
      }
      if (typeof count === 'number' && count >= 0) {
        lastLuckCount.current = count;
      }
      setLuckCount(count);
    });
    return () => unsub();
  }, [today]);

  useEffect(() => {
    const fetchAllTimeHigh = async () => {
      const ref = collection(db, "luck-count");
      // get all time high
      const q = query(ref, orderBy("count", "desc"), limit(1));
      const snap = await getDocs(q);
      let max = 1;
      if (!snap.empty) {
        max = snap.docs[0].data().count || 1;
      }
      setAllTimeHigh(max);
    };
    fetchAllTimeHigh();
  }, [luckCount]);

  const handleAddLuck = async () => {
    // floating clover animation (always instant)
    const left = 35 + Math.random() * 30; // randomize horizontal position (vw)
    const id = cloverId.current++;
    setClovers((prev) => [...prev, {id, left}]);
    setTimeout(() => {
      setClovers((prev) => prev.filter(c => c.id !== id));
    }, 1400); // match animation duration
    
    try {
      const ref = doc(db, "luck-count", today);
      await updateDoc(ref, { count: increment(1) });
    } catch (e) {  
      if (e instanceof FirebaseError) {
        // if doc doesn't exist, create it
        if (e.code === "not-found" || e.message?.includes("No document to update")) {
          await setDoc(doc(db, "luck-count", today), { count: 1 });
        } else {
          // should probably show something useful here LOL
        }
      } else {
        console.error("Unexpected error:", e);
      }
    }
  };

  // get forecast label and color
  let forecast = "...";
  let forecastColor = "#888";
  if (luckCount !== null && allTimeHigh > 0) {
    if (luckCount > allTimeHigh) {
      forecast = "Golden Eternal Luck Radiance";
      forecastColor = forecastLabels[5].color;
    } else {
      const pct = luckCount / allTimeHigh;
      const found = forecastLabels.find(f => pct <= f.pct);
      forecast = found ? found.label : "Extremely Lucky";
      forecastColor = found ? found.color : forecastLabels[4].color;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 overflow-hidden">
      {/* emoji animations */}
      <div style={{ pointerEvents: 'none', position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 50 }}>
        {clovers.map(({id, left}) => (
          <span
            key={id}
            style={{
              position: 'absolute',
              left: `${left}vw`,
              bottom: '100px',
              fontSize: '2.5rem',
              pointerEvents: 'none',
              zIndex: 50,
              animation: 'clover-float 1.4s cubic-bezier(.4,1.6,.6,1) forwards'
            }}
          >🍀</span>
        ))}
      </div>
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
          style={forecast === "Golden Eternal Luck Radiance"
            ? { background: forecastColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
            : { color: forecastColor }}
        >{forecast != "..." ? forecast : "Low"}</span> ({luckCount !== null ? luckCount : 0})
      </div>
      <div className="mt-8 w-full flex justify-center">
        <LuckForecastGraph today={today} allTimeHigh={allTimeHigh} />
      </div>
      <div className="mt-2 text-xs text-gray-400 text-center">Feeling lucky?</div>
      <style>{`
        @keyframes clover-float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(-10deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-120px) scale(1.2) rotate(8deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-220px) scale(0.8) rotate(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LuckForecast;
