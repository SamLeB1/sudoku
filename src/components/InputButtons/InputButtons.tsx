import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import useNewGame from "../../hooks/useNewGame.tsx";
import iconUndo from "../../assets/images/icon-undo.svg";
import iconErase from "../../assets/images/icon-erase.svg";
import iconHint from "../../assets/images/icon-hint.svg";
import "./InputButtons.css";

export default function InputButtons() {
  const { stateApp } = useAppContext();
  const { stateGrid, dispatchGrid } = useGridContext();
  const newGame = useNewGame();

  function handleNumberInput(value: number) {
    if (stateGrid.selectedCell?.canModify) {
      if (stateApp.isNotesMode)
        dispatchGrid({
          type: "NOTE",
          payload: { value, index: stateGrid.selectedCell.index },
        });
      else
        dispatchGrid({
          type: "INPUT",
          payload: { value, index: stateGrid.selectedCell.index },
        });
    }
  }

  function handleErase() {
    if (stateGrid.selectedCell?.canModify)
      dispatchGrid({ type: "ERASE", payload: stateGrid.selectedCell.index });
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (stateGrid.isSolved) return;
    if (e.key === "1") handleNumberInput(1);
    else if (e.key === "2") handleNumberInput(2);
    else if (e.key === "3") handleNumberInput(3);
    else if (e.key === "4") handleNumberInput(4);
    else if (e.key === "5") handleNumberInput(5);
    else if (e.key === "6") handleNumberInput(6);
    else if (e.key === "7") handleNumberInput(7);
    else if (e.key === "8") handleNumberInput(8);
    else if (e.key === "9") handleNumberInput(9);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [stateApp, stateGrid]);

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
            onClick={handleErase}
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
          onClick={() => handleNumberInput(1)}
        >
          1
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(2)}
        >
          2
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(3)}
        >
          3
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(4)}
        >
          4
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(5)}
        >
          5
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(6)}
        >
          6
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(7)}
        >
          7
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(8)}
        >
          8
        </button>
        <button
          className="btn-number"
          type="button"
          disabled={stateGrid.isSolved}
          onClick={() => handleNumberInput(9)}
        >
          9
        </button>
      </div>
      <button
        className="btn-new-game"
        type="button"
        onClick={() => newGame(stateApp.difficulty)}
      >
        New Game
      </button>
    </div>
  );
}
