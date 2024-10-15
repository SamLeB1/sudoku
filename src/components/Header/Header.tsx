import useAppContext from "../../hooks/useAppContext.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import generateSudoku from "../../utils/generateSudoku.ts";
import "./Header.css";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

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
            ...(stateApp.difficulty === "Easy" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("Easy", 40)}
        >
          Easy
        </button>
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "Medium" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("Medium", 35)}
        >
          Medium
        </button>
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "Hard" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("Hard", 30)}
        >
          Hard
        </button>
        <button
          className="btn-difficulty"
          type="button"
          style={{
            ...(stateApp.difficulty === "Expert" && { color: "#3f72af" }),
          }}
          onClick={() => handleSetDifficulty("Expert", 26)}
        >
          Expert
        </button>
      </div>
    </header>
  );
}
