import "./Cell.css";

type CellProps = {
  value: number;
};

export default function Cell({ value }: CellProps) {
  return <div className="cell">{value !== 0 && value}</div>;
}
