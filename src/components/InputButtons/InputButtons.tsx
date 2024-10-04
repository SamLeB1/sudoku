import { Index, GridAction } from "../Sudoku/Sudoku.tsx";
import "./InputButtons.css";

type InputButtonsProps = {
  selectedCell: Index | null;
  dispatch: React.Dispatch<GridAction>;
};

export default function InputButtons({
  selectedCell,
  dispatch,
}: InputButtonsProps) {
  function handleClick(value: number) {
    if (selectedCell)
      dispatch({ type: "INPUT", payload: { value, index: selectedCell } });
  }

  return (
    <div className="input-buttons">
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
      <button
        className="btn-erase"
        type="button"
        onClick={() => handleClick(0)}
      >
        Erase
      </button>
    </div>
  );
}
