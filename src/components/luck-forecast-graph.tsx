import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { forecastLabels } from "@/constants/assets";

function getForecastColor(val: number, allTimeHigh: number) {
  if (allTimeHigh === 0) return forecastLabels[0].color;
  if (val > allTimeHigh) return 'radial-gradient(circle at 60% 40%, #fffbe6 0%, #ffe066 40%, #ffd700 80%, #fffbe6 100%)';
  const pct = val / allTimeHigh;
  const found = forecastLabels.find(f => pct <= f.pct);
  return found ? found.color : forecastLabels[4].color;
}

// get luck history for the week
function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

const LuckForecastGraph = ({ today, allTimeHigh }: { today: string; allTimeHigh: number }) => {
  const [weekData, setWeekData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeek = async () => {
      setLoading(true);
      const days = getLast7Days();
      const ref = collection(db, "luck-count");
      const unsub = onSnapshot(ref, (snap) => {
        const docsById = Object.fromEntries(snap.docs.map(doc => [doc.id, doc]));
        const results = days.map(date => {
          const docSnap = docsById[date];
          return docSnap ? (docSnap.data().count || 0) : 0;
        });
        setWeekData(results);
        setLoading(false);
      });
      return () => unsub();
    };
    fetchWeek();
  }, [today]);

  const maxLuck = Math.max(...weekData, 1);
  return (
    <div className="w-full flex flex-col items-center">
      {loading ? (
        <div className="w-full h-32 flex items-center justify-center text-gray-400">Loading...</div>
      ) : (
        <div className="relative w-full max-w-xs h-32 bg-[#eaeaea] rounded-2xl border-4 border-[#bcbcbc] shadow-inner flex items-end justify-between px-4 py-6" style={{boxShadow: '0 4px 16px #8888, 0 1px 0 #fff inset'}}>
          {weekData.map((val, i) => {
            const color = getForecastColor(val || 0, allTimeHigh);
            const isEternalLuck = val === maxLuck;
            return (
              <div key={i} className="flex flex-col items-center justify-end h-full" style={{width: '14%'}}>
                {isEternalLuck && (
                  <span
                    className="text-yellow-500 text-lg"
                    style={{
                      position: "absolute",
                      top: -5,
                      fontSize: "1.25rem",
                      textShadow: "0 1px 0 #fff",
                    }}
                  >
                    👑
                  </span>
                )}
                <div
                  className="rounded-full"
                  style={{
                    width: 18,
                    height: 18 + (val && allTimeHigh ? Math.round(40 * val / allTimeHigh) : 0),
                    marginBottom: 4,
                    transition: 'height 0.3s',
                    border: '2px solid #333',
                    boxShadow: '0 2px 6px #0003',
                    background: color.includes('gradient') ? undefined : color,
                    backgroundImage: color.includes('gradient') ? color : undefined,
                  }}
                  title={val + ' luck'}
                />
                <span className="text-xs text-gray-700 mt-1">
                  {(() => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i));
                    return d.toLocaleDateString(undefined, { weekday: 'short' });
                  })()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LuckForecastGraph;
