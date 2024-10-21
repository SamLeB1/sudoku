import useAppContext from "./useAppContext.tsx";
import useGridContext from "./useGridContext.tsx";
import generateSudoku from "../utils/generateSudoku.ts";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

export default function useNewGame() {
  const { setStateApp } = useAppContext();
  const { dispatchGrid } = useGridContext();

  function newGame(difficulty: Difficulty) {
    const clueCount =
      difficulty === "Easy"
        ? 40
        : difficulty === "Medium"
        ? 35
        : difficulty === "Hard"
        ? 30
        : 26;
    const sudoku = generateSudoku(clueCount);
    dispatchGrid({
      type: "SET",
      payload: { initialGrid: sudoku.sudoku, solvedGrid: sudoku.solution },
    });
    setStateApp({ difficulty, resetTime: true, isNotesMode: false });
  }

  return newGame;
}
