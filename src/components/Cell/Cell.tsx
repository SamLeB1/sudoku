import { Index, SelectedCell } from "../Sudoku/Sudoku.tsx";
import "./Cell.css";

type CellProps = {
  value: number;
  index: Index;
  setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell | null>>;
  isSelected: boolean;
  canModify: boolean;
};

export default function Cell({
  value,
  index,
  setSelectedCell,
  isSelected,
  canModify,
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
        if (!isSelected) setSelectedCell({ index, canModify });
      }}
    >
      {value !== 0 && value}
    </div>
  );
}
