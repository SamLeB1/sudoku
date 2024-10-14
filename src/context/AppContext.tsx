import { createContext, useState } from "react";

type AppState = {
  difficulty: "easy" | "medium" | "hard" | "expert";
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
  const [stateApp, setStateApp] = useState<AppState>({ difficulty: "easy" });

  return (
    <AppContext.Provider value={{ stateApp, setStateApp }}>
      {children}
    </AppContext.Provider>
  );
}
