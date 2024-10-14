import useAppContext from "../../hooks/useAppContext.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import generateSudoku from "../../utils/generateSudoku.ts";
import "./Header.css";

type Difficulty = "easy" | "medium" | "hard" | "expert";

export default function Header() {
  const { stateApp, setStateApp } = useAppContext();
  const { dispatchGrid } = useGridContext();

  function handleSetDifficulty(difficulty: Difficulty, clueCount: number) {
    setStateApp({ difficulty });
    dispatchGrid({ type: "SET", payload: generateSudoku(clueCount).sudoku });
  }

  return (
    <header>
      <div className="logo">Sudoku</div>
      <div className="difficulty">
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "easy" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("easy", 40)}
        >
          Easy
        </button>
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "medium" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("medium", 35)}
        >
          Medium
        </button>
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "hard" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("hard", 30)}
        >
          Hard
        </button>
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "expert" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("expert", 26)}
        >
          Expert
        </button>
      </div>
    </header>
  );
}
