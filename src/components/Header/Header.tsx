import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="logo">Sudoku</div>
      <div className="difficulty">
        <button className="btn-difficulty" type="button">
          Easy
        </button>
        <button className="btn-difficulty" type="button">
          Medium
        </button>
        <button className="btn-difficulty" type="button">
          Hard
        </button>
        <button className="btn-difficulty" type="button">
          Expert
        </button>
      </div>
    </header>
  );
}
