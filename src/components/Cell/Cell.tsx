import { Index } from "../Sudoku/Sudoku.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import "./Cell.css";

type CellProps = {
  value: number;
  index: Index;
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
    ...(canModify ? { color: "#3f72af" } : { fontWeight: "bold" }),
  };

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
