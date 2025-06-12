import React, { createContext, useContext, useState } from "react";

interface OmniContextType {
  hasSeenEntry: boolean;
  setHasSeenEntry: (seen: boolean) => void;
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
  
  return (
    <OmniContext.Provider 
      value={{ 
        hasSeenEntry, 
        setHasSeenEntry 
      }}
    >
      {" "}
      {children}
    </OmniContext.Provider>
  );
};

export const useOmniContext = () => {
  const context = useContext(OmniContext);
  if (!context) throw new Error("OmniContext must be used within OmniContextProvider");
  return context;
};

