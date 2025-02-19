import { useState, useEffect } from "react";
import useAppContext from "../../hooks/useAppContext.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import "./Stopwatch.css";

export default function Stopwatch() {
  const { stateApp, setStateApp } = useAppContext();
  const { stateGrid } = useGridContext();
  const [time, setTime] = useState(0);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    let intervalId: number;
    if (!stateGrid.isSolved)
      intervalId = setInterval(() => setTime(time + 1), 1000);
    if (stateApp.resetTime) {
      setTime(0);
      setStateApp((prevState) => ({ ...prevState, resetTime: false }));
    }
    return () => clearInterval(intervalId);
  }, [time, stateApp.resetTime, stateGrid.isSolved]);

  return (
    <div className="stopwatch">
      Time: {hours > 0 && `${hours}:`}
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
