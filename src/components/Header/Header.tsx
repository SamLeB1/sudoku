import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext.tsx";
import useNewGame from "../../hooks/useNewGame.tsx";
import "./Header.css";

export default function Header() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { stateApp } = useAppContext();
  const newGame = useNewGame();

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
  }, []);

  if (screenWidth > 420)
    return (
      <header>
        <div className="logo">Sudoku</div>
        <div className="difficulty">
          <button
            className="btn-difficulty"
            type="button"
            style={{
              ...(stateApp.difficulty === "Easy" && { color: "#3f72af" }),
            }}
            onClick={() => newGame("Easy")}
          >
            Easy
          </button>
          <button
            className="btn-difficulty"
            type="button"
            style={{
              ...(stateApp.difficulty === "Medium" && { color: "#3f72af" }),
            }}
            onClick={() => newGame("Medium")}
          >
            Medium
          </button>
          <button
            className="btn-difficulty"
            type="button"
            style={{
              ...(stateApp.difficulty === "Hard" && { color: "#3f72af" }),
            }}
            onClick={() => newGame("Hard")}
          >
            Hard
          </button>
          <button
            className="btn-difficulty"
            type="button"
            style={{
              ...(stateApp.difficulty === "Expert" && { color: "#3f72af" }),
            }}
            onClick={() => newGame("Expert")}
          >
            Expert
          </button>
        </div>
      </header>
    );
  else
    return (
      <header>
        <div className="logo">Sudoku</div>
        <select
          className="difficulty-select"
          id="difficulty-select"
          defaultValue={stateApp.difficulty}
          onChange={(e) =>
            newGame(e.target.value as "Easy" | "Medium" | "Hard" | "Expert")
          }
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Expert">Expert</option>
        </select>
      </header>
    );
}
