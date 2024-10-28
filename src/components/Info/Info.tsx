import "./Info.css";

export default function Info() {
  return (
    <div className="info">
      <div className="info-card">
        <h2>What's Sudoku?</h2>
        <p>
          Sudoku is a logic-based puzzle originating from Japan. It gained
          widespread popularity after appearing in <i>The Times</i> (London) in
          2004 and is still loved to this day!
        </p>
      </div>
      <div className="info-card">
        <h2>How to Play</h2>
        <p>
          The goal of Sudoku is to fill the grid so that each row, column, and
          3x3 square contains every number from 1 to 9 exactly once.
        </p>
      </div>
      <div className="info-card">
        <h2>Quick Tips</h2>
        <ul>
          <li>
            There's no guessing involved; each number can be deduced with logic.
          </li>
          <li>Look at the areas that contain the most numbers.</li>
          <li>Use notes to mark squares that only have two possibilities.</li>
        </ul>
      </div>
    </div>
  );
}
