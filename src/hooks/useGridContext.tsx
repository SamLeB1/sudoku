import { useContext } from "react";
import { GridContext } from "../context/GridContext.tsx";

export default function useGridContext() {
  const context = useContext(GridContext);
  if (!context)
    throw Error("useGridContext must be used inside a GridContextProvider.");
  return context;
}
