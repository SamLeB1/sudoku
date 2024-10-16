import useAppContext from "../../hooks/useAppContext.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import generateSudoku from "../../utils/generateSudoku.ts";
import "./InputButtons.css";

export default function InputButtons() {
  const { stateApp } = useAppContext();
  const { stateGrid, dispatchGrid } = useGridContext();

  function handleClick(value: number) {
    if (stateGrid.selectedCell?.canModify)
      dispatchGrid({
        type: "INPUT",
        payload: { value, index: stateGrid.selectedCell.index },
      });
  }

  function handleNewGame() {
    switch (stateApp.difficulty) {
      case "Easy":
        dispatchGrid({ type: "SET", payload: generateSudoku(40).sudoku });
        return;
      case "Medium":
        dispatchGrid({ type: "SET", payload: generateSudoku(35).sudoku });
        return;
      case "Hard":
        dispatchGrid({ type: "SET", payload: generateSudoku(30).sudoku });
        return;
      case "Expert":
        dispatchGrid({ type: "SET", payload: generateSudoku(26).sudoku });
        return;
      default:
        console.error("Invalid difficulty.");
    }
  }

  return (
    <div className="input-buttons">
      <div className="action-buttons">
        <div className="btn-action">
          <button
            type="button"
            onClick={() => dispatchGrid({ type: "UNDO" })}
          />
          <p>Undo</p>
        </div>
        <div className="btn-action">
          <button type="button" onClick={() => handleClick(0)} />
          <p>Erase</p>
        </div>
        <div className="btn-action">
          <button type="button" />
          <p>Hint</p>
        </div>
      </div>
      <div className="number-buttons">
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(1)}
        >
          1
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(2)}
        >
          2
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(3)}
        >
          3
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(4)}
        >
          4
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(5)}
        >
          5
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(6)}
        >
          6
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(7)}
        >
          7
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(8)}
        >
          8
        </button>
        <button
          className="btn-number"
          type="button"
          onClick={() => handleClick(9)}
        >
          9
        </button>
      </div>
      <button className="btn-new-game" type="button" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}
