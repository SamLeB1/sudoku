import useAppContext from "./hooks/useAppContext.tsx";
import useGridContext from "./hooks/useGridContext.tsx";
import Header from "./components/Header/Header.tsx";
import Stopwatch from "./components/Stopwatch/Stopwatch.tsx";
import Sudoku from "./components/Sudoku/Sudoku.tsx";
import InputButtons from "./components/InputButtons/InputButtons.tsx";
import "./App.css";

export default function App() {
  const { stateApp } = useAppContext();
  const { stateGrid } = useGridContext();

  return (
    <div className="App">
      <Header />
      {stateGrid.isSolved && (
        <div className="win-msg">Well done! Sudoku complete.</div>
      )}
      <div className="game">
        <div className="game-info">
          <div className="info-difficulty">
            Difficulty: {stateApp.difficulty}
          </div>
          <div className="info-hints">Hints Used: {stateGrid.hintCount}</div>
          <Stopwatch />
        </div>
        <div className="game-display">
          <Sudoku />
          <InputButtons />
        </div>
      </div>
    </div>
  );
}
