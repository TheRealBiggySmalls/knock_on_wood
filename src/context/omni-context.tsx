import React, { createContext, useContext, useState, useEffect } from "react";

interface OmniContextType {
  hasSeenEntry: boolean;
  setHasSeenEntry: (seen: boolean) => void;
  hasPostedToday: boolean;
  setHasPostedToday: (posted: boolean) => void;
  isOnline: boolean;
}

//Aidan: this file is kind of tricky, it basically manages states and information across the app
//For example, when we first enter the main page we show an intro screen, so when we click on
//a button and go somewhere else we need the app to remember that we've seen the entry screen
//already so it isn't show again. That's basically what this guy does - shares information
//across the whole app rather than just a single page.
const OmniContext = createContext<OmniContextType | undefined>(undefined);

interface OmniContextProviderProps {
  children: React.ReactNode;
}

export const OmniContextProvider = ({
  children
}: OmniContextProviderProps) => {
  const [hasSeenEntry, setHasSeenEntry] = useState(false);
  // remember if user has posted today
  const today = new Date().toISOString().slice(0, 10);
  const [hasPostedToday, setHasPostedTodayState] = useState(() => {
    return localStorage.getItem("hasPosted") === today;
  });

  // play sounds based on connection status
  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // keep localStorage in sync when setHasPostedToday is called
  const setHasPostedToday = (posted: boolean) => {
    setHasPostedTodayState(posted);
    if (posted) {
      localStorage.setItem("hasPosted", today);
    } else {
      localStorage.removeItem("hasPosted");
    }
  };

  // reset when day changes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 10);
      if (now !== today) {
        setHasPostedTodayState(false);
        localStorage.removeItem("hasPosted");
      }
    }, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [today]);

  return (
    <OmniContext.Provider 
      value={{ 
        hasSeenEntry, 
        setHasSeenEntry,
        hasPostedToday,
        setHasPostedToday,
        isOnline
      }}
    >
      {children}
    </OmniContext.Provider>
  );
};

export const useOmniContext = () => {
  const context = useContext(OmniContext);
  if (!context) throw new Error("OmniContext must be used within OmniContextProvider");
  return context;
};
