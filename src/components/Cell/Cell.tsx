import "./Cell.css";

type Index = {
  indexRow: number;
  indexCol: number;
};

type CellProps = {
  value: number;
  index: Index;
  setSelectedCell: React.Dispatch<React.SetStateAction<Index | null>>;
  isSelected: boolean;
};

export default function Cell({
  value,
  index,
  setSelectedCell,
  isSelected,
}: CellProps) {
  if (isSelected)
    return <div className="cell-selected">{value !== 0 && value}</div>;
  else
    return (
      <div className="cell" onClick={() => setSelectedCell(index)}>
        {value !== 0 && value}
      </div>
    );
}
