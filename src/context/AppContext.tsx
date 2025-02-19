import { createContext, useState } from "react";

type AppState = {
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  resetTime: boolean;
  isNotesMode: boolean;
};

type AppContextValue = {
  stateApp: AppState;
  setStateApp: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stateApp, setStateApp] = useState<AppState>({
    difficulty: "Easy",
    resetTime: false,
    isNotesMode: false,
  });

  return (
    <AppContext.Provider value={{ stateApp, setStateApp }}>
      {children}
    </AppContext.Provider>
  );
}
