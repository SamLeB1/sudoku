import { Index } from "../Sudoku/Sudoku.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import "./Cell.css";

type CellProps = {
  value: number;
  index: Index;
  notes: number[];
  highlights: {
    isSameSection: boolean;
    isSameNumber: boolean;
  };
  isSelected: boolean;
  canModify: boolean;
};

export default function Cell({
  value,
  index,
  notes,
  highlights,
  isSelected,
  canModify,
}: CellProps) {
  const { dispatchGrid } = useGridContext();
  const cellStyle = {
    ...(highlights.isSameSection && { backgroundColor: "hsl(240, 100%, 95%)" }),
    ...(highlights.isSameNumber &&
      value !== 0 && { backgroundColor: "hsl(60, 100%, 90%)" }),
    ...(isSelected && { backgroundColor: "hsl(240, 100%, 90%)" }),
    ...(canModify && value !== 0 && { color: "#3f72af", fontStyle: "italic" }),
  };

  if (notes.length > 0)
    return (
      <div
        className="cell-notes"
        style={cellStyle}
        onClick={() => {
          if (!isSelected)
            dispatchGrid({
              type: "SELECT",
              payload: { value, index, canModify },
            });
        }}
      >
        <div className="number-note">{notes[0]}</div>
        <div className="number-note">{notes.length > 1 && notes[1]}</div>
        <div className="number-note">{notes.length > 2 && notes[2]}</div>
        <div className="number-note">{notes.length > 3 && notes[3]}</div>
        <div className="number-note">{notes.length > 4 && notes[4]}</div>
        <div className="number-note">{notes.length > 5 && notes[5]}</div>
        <div className="number-note">{notes.length > 6 && notes[6]}</div>
        <div className="number-note">{notes.length > 7 && notes[7]}</div>
        <div className="number-note">{notes.length > 8 && notes[8]}</div>
      </div>
    );
  else
    return (
      <div
        className="cell"
        style={cellStyle}
        onClick={() => {
          if (!isSelected)
            dispatchGrid({
              type: "SELECT",
              payload: { value, index, canModify },
            });
        }}
      >
        {value !== 0 && value}
      </div>
    );
}
