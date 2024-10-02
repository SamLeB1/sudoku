import "./Cell.css";

type Index = {
  indexRow: number;
  indexCol: number;
};

type CellProps = {
  value: number;
  index: Index;
  setSelectedCell: React.Dispatch<React.SetStateAction<Index | null>>;
};

export default function Cell({ value, index, setSelectedCell }: CellProps) {
  return (
    <div className="cell" onClick={() => setSelectedCell(index)}>
      {value !== 0 && value}
    </div>
  );
}
