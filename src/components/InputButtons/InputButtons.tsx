import useAppContext from "../../hooks/useAppContext.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import generateSudoku from "../../utils/generateSudoku.ts";
import iconUndo from "../../assets/images/icon-undo.svg";
import iconErase from "../../assets/images/icon-erase.svg";
import iconHint from "../../assets/images/icon-hint.svg";
import "./InputButtons.css";

export default function InputButtons() {
  const { stateApp, setStateApp } = useAppContext();
  const { stateGrid, dispatchGrid } = useGridContext();

  function handleClick(value: number) {
    if (stateGrid.selectedCell?.canModify)
      dispatchGrid({
        type: "INPUT",
        payload: { value, index: stateGrid.selectedCell.index },
      });
  }

  function handleNewGame() {
    const clueCount =
      stateApp.difficulty === "Easy"
        ? 40
        : stateApp.difficulty === "Medium"
        ? 35
        : stateApp.difficulty === "Hard"
        ? 30
        : 26;
    const sudoku = generateSudoku(clueCount);
    dispatchGrid({
      type: "SET",
      payload: { initialGrid: sudoku.sudoku, solvedGrid: sudoku.solution },
    });
    setStateApp((prevState) => ({ ...prevState, resetTime: true }));
  }

  return (
    <div className="input-buttons">
      <div className="action-buttons">
        <div className="btn-action">
          <button
            type="button"
            disabled={stateGrid.isSolved}
            onClick={() => dispatchGrid({ type: "UNDO" })}
          >
            <img src={iconUndo} alt="" />
          </button>
          <p>Undo</p>
        </div>
        <div className="btn-action">
          <button
            type="button"
            disabled={stateGrid.isSolved}
            onClick={() => handleClick(0)}
          >
            <img src={iconErase} alt="" />
          </button>
          <p>Erase</p>
        </div>
        <div className="btn-action">
          <button
            type="button"
            disabled={stateGrid.isSolved}
            onClick={() => dispatchGrid({ type: "HINT" })}
          >
            <img src={iconHint} alt="" />
          </button>
          <p>Hint</p>
        </div>
      </div>
      <div className="number-buttons">
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(1)}
        >
          1
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(2)}
        >
          2
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(3)}
        >
          3
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(4)}
        >
          4
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(5)}
        >
          5
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(6)}
        >
          6
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(7)}
        >
          7
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleClick(8)}
        >
          8
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
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
