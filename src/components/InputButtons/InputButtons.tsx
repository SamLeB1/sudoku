import useGridContext from "../../hooks/useGridContext.tsx";
import "./InputButtons.css";

export default function InputButtons() {
  const { stateGrid, dispatchGrid } = useGridContext();

  function handleClick(value: number) {
    if (stateGrid.selectedCell?.canModify)
      dispatchGrid({
        type: "INPUT",
        payload: { value, index: stateGrid.selectedCell.index },
      });
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
