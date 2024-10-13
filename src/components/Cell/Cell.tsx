import { Index } from "../Sudoku/Sudoku.tsx";
import useGridContext from "../../hooks/useGridContext.tsx";
import "./Cell.css";

type CellProps = {
  value: number;
  index: Index;
  isSelected: boolean;
  canModify: boolean;
};

export default function Cell({
  value,
  index,
  isSelected,
  canModify,
}: CellProps) {
  const { dispatchGrid } = useGridContext();
  const cellStyle = {
    ...(isSelected && { backgroundColor: "hsl(240, 100%, 95%)" }),
    ...(canModify ? { color: "#3f72af" } : { fontWeight: "bold" }),
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
