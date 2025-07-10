import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, serverTimestamp, limit, onSnapshot } from "firebase/firestore";
import { useOmniContext } from "@/context/omni-context";
import "./starry-background.css";

const today = new Date().toISOString().slice(0, 10);

const MessageThread = () => {
  const navigate = useNavigate();
  const { hasPostedToday, setHasPostedToday } = useOmniContext();
  const [messages, setMessages] = useState<{username: string, city: string, text: string, type: string, timestamp: unknown}[]>([]);
  const [input, setInput] = useState("");
  const [selectedType, setSelectedType] = useState<"need" | "lucky" | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const username = localStorage.getItem("profileName") || "Anonymous";
  const city = localStorage.getItem("profileCity") || "";

  // fetch today's messages in real time
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "messages", today, "thread"),
      orderBy("timestamp"),
      limit(50)
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username || "Unknown", 
          city: doc.data().city || "",
          text: doc.data().text || "",
          type: doc.data().type || "text",
          timestamp: doc.data().timestamp || null,
        }))
      );
      setLoading(false);
    });
    return () => unsub();
  }, [submitting]);

  // scroll to bottom when messages change
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  // submit message
  const handleSubmit = async () => {
    if (!input.trim() || hasPostedToday || !selectedType) return;
    setSubmitting(true);
    await addDoc(collection(db, "messages", today, "thread"), {
      username,
      city,
      text: input.trim(),
      type: selectedType,
      timestamp: serverTimestamp(),
    });
    setHasPostedToday(true);
    setInput("");
    setSelectedType(null);
    setSubmitting(false);
  };

  return (
    <div className="starry-background flex flex-col items-center justify-center min-h-screen bg-[#e6e6e6] relative">
      <div className="absolute top-4 left-4 z-20">
        {/* back button
          <button
            className="absolute top-4 left-4 z-20 bg-transparent p-0 m-0"
            onClick={() => setExpandedWoodId(null)}
            aria-label="Back"
          >
            <img src="/random/back2.png" alt="Back" className="w-40 h-25" />
          </button> */}
        <button
          onClick={() => navigate("/")}
          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="w-full max-w-md flex flex-col rounded-2xl shadow-lg border-4 border-[#bcbcbc] bg-[#f7f7f7] mt-10 mb-10 flex-1 overflow-hidden" style={{height: '70vh'}}>
        <div className="flex items-center justify-center py-2 bg-[#d1d5db] border-b-2 border-[#bcbcbc] text-lg font-bold tracking-wide text-[#222]" style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', letterSpacing: 1}}>
          <span>💬 Feeling Lucky?</span>
        </div>
        <div ref={threadRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-[#f7f7f7]" style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>
          {loading ? (
            <div className="text-center text-gray-400 mt-8">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">No messages yet today.</div>
          ) : (
            messages.map((msg, i) => {
              let prompt = "";
              if (msg.type === 'need') {
                prompt = "needs some luck today ";
              } else if (msg.type === 'lucky') {
                prompt = "is feeling lucky because ";
              }
              return (
                <div key={i} className={`rounded-lg px-3 py-2 flex flex-col shadow-sm ${msg.type === 'need' ? 'bg-[#fff3e0] border border-[#ffcc80]' : 'bg-[#e0ffe0] border border-[#a5d6a7]'}`}
                  style={{maxWidth: '90%', alignSelf: msg.username === username ? 'flex-end' : 'flex-start'}}>
                  <span className="text-xs text-gray-500 mb-1" style={{fontFamily: 'monospace'}}>
                    {msg.username}{msg.city ? ` (${msg.city})` : ""}
                  </span>
                  <span className="text-sm text-[#222]" style={{wordBreak: 'break-word'}}>
                    <em>{prompt}</em>{msg.text}
                  </span>
                </div>
              );
            })
          )}
        </div>
        {/* input area */}
        <div className="flex flex-col gap-2 p-3 bg-[#e6e6e6] border-t-2 border-[#bcbcbc]">
          <div className="flex gap-2">
            <button
              className="flex-1 bg-[#fff3e0] border border-[#ffcc80] rounded-lg px-2 py-1 text-xs text-[#b26a00] font-semibold shadow-sm disabled:opacity-50"
              disabled={hasPostedToday || submitting}
              onClick={() => setSelectedType('need')}
            >
              I'm need some luck today...
            </button>
            <button
              className="flex-1 bg-[#e0ffe0] border border-[#a5d6a7] rounded-lg px-2 py-1 text-xs text-[#1b5e20] font-semibold shadow-sm disabled:opacity-50"
              disabled={hasPostedToday || submitting}
              onClick={() => setSelectedType('lucky')}
            >
              Today I'm feeling lucky because...
            </button>
          </div>
          {selectedType && !hasPostedToday && (
            <div className="flex gap-2 mt-2 items-end">
              <input
                type="text"
                className="flex-1 rounded-lg border px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder={selectedType === 'need' ? 'I need some luck today...' : "I'm feeling lucky because..."}
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={submitting}
                maxLength={120}
                autoFocus
              />
              <button
                className="ml-2 px-4 py-1 rounded bg-blue-500 text-white text-xs font-bold shadow hover:bg-blue-600 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={submitting || !input.trim()}
              >
                Submit
              </button>
            </div>
          )}
          {hasPostedToday && (
            <div className="text-xs text-center text-gray-400 mt-1">You can only post one message per day.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
