import { Index, GridAction } from "../Sudoku/Sudoku.tsx";
import "./Cell.css";

type CellProps = {
  value: number;
  index: Index;
  isSelected: boolean;
  canModify: boolean;
  dispatchGrid: React.Dispatch<GridAction>;
};

export default function Cell({
  value,
  index,
  isSelected,
  canModify,
  dispatchGrid,
}: CellProps) {
  const cellStyle = {
    ...(isSelected && { backgroundColor: "hsl(240, 100%, 95%)" }),
    ...(canModify ? { color: "#808080" } : { fontWeight: "bold" }),
  };

  return (
    <div
      className="cell"
      style={cellStyle}
      onClick={() => {
        if (!isSelected)
          dispatchGrid({ type: "SELECT", payload: { index, canModify } });
      }}
    >
      {value !== 0 && value}
    </div>
  );
}
