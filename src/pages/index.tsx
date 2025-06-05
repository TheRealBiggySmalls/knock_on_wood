
import { Link } from "react-router-dom";
import { useRef } from "react";

const Index = () => {
  //OR FOR VIDEO just have a simple context to togglePausePlay and run it when button is pressed and when exit button is pressed
  //TODO: retain state of play between screens
  const videoRef = useRef<HTMLVideoElement>(null);

  const buttons = [
    { id: 1, name: "Barbossas Peg Leg", image: "/pegleg.png" },
    { id: 2, name: "Hobbit Front Door", image: "/hobbit.png" },
    { id: 3, name: "Gretzky's Twig", image: "/gretsky.png" },
    { id: 4, name: "Bob Dylan's Guitar", image: "/bobdylan.png" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* video bground */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/backvideo.mp4" type="video/mp4" />
      </video>

      {/* dark overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* status bar simulation - delete later */}
      <div className="relative z-10 flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">AT&T LTE</span>
        </div>
        <div>12:09 PM</div>
        <div className="flex items-center gap-1">
          <span>88%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-5 h-2 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

    {/* main stuff */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {buttons.map((button) => (
            <Link key={button.id} to={`/item/${button.id}`}>
              <div className="hover:scale-105 transition-transform duration-200">
                <img
                  src={button.image}
                  alt={button.name}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* music player */}
      <div className="relative z-10 bg-black/80 backdrop-blur-sm text-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          <div className="w-8 h-8 bg-gray-600 rounded"></div>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-[scroll_10s_linear_infinite] text-base font-medium">
              "Rest" by backtothemoney • Now Playing • "Rest" by backtothemoney • Now Playing • Swag Money • One Million Dollars • Swag Money •
            </div>
          </div>
        </div>
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center ml-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Index;



