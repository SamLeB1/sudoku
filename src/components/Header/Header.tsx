import useAppContext from "../../hooks/useAppContext.tsx";
import useNewGame from "../../hooks/useNewGame.tsx";
import "./Header.css";

export default function Header() {
  const { stateApp } = useAppContext();
  const newGame = useNewGame();

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
}
