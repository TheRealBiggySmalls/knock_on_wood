import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MessageThread = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate("/")}
          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Message Thread</h1>
    </div>
  );
};

export default MessageThread;
