import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  lastUrl: string;
  setLastUrl: (url: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [lastUrl, setLastUrl] = useState("/");

  return (
    <AppContext.Provider value={{ lastUrl, setLastUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export const useLastUrl = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useLastUrl must be used within a LastUrlProvider");
  }
  return context;
};
