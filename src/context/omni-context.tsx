import React, { createContext, useContext, useState } from "react";

interface OmniContextType {
  hasSeenEntry: boolean;
  setHasSeenEntry: (seen: boolean) => void;
}

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

