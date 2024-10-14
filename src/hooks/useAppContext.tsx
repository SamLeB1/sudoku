import { useContext } from "react";
import { AppContext } from "../context/AppContext.tsx";

export default function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw Error("useAppContext must be used inside an AppContextProvider.");
  return context;
}
