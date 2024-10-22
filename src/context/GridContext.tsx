import { createContext, useReducer } from "react";
import { Index, SelectedCell } from "../components/Sudoku/Sudoku.tsx";
import generateSudoku from "../utils/generateSudoku.ts";

type GridState = {
  grid: number[][];
  initialGrid: number[][];
  solvedGrid: number[][];
  notes: number[][][];
  selectedCell: SelectedCell | null;
  undoInputs: GridInputAction["payload"][];
  hintCount: number;
  isSolved: boolean;
};

type GridSetAction = {
  type: "SET";
  payload: {
    initialGrid: number[][];
    solvedGrid: number[][];
  };
};

type GridInputAction = {
  type: "INPUT";
  payload: {
    value: number;
    index: Index;
  };
};

type GridNoteAction = {
  type: "NOTE";
  payload: {
    value: number;
    index: Index;
  };
};

type GridEraseAction = {
  type: "ERASE";
  payload: Index;
};

type GridUndoAction = { type: "UNDO" };

type GridHintAction = { type: "HINT" };

type GridSelectAction = {
  type: "SELECT";
  payload: SelectedCell;
};

type GridAction =
  | GridSetAction
  | GridInputAction
  | GridNoteAction
  | GridEraseAction
  | GridUndoAction
  | GridHintAction
  | GridSelectAction;

type GridContextValue = {
  stateGrid: GridState;
  dispatchGrid: React.Dispatch<GridAction>;
};

const sudoku = generateSudoku(40);

const initNotes: number[][][] = [
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
];

export const GridContext = createContext<GridContextValue | null>(null);

function isEqualSudoku(sudoku1: number[][], sudoku2: number[][]) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (sudoku1[i][j] !== sudoku2[i][j]) return false;
  return true;
}

function reducerGrid(state: GridState, action: GridAction) {
  switch (action.type) {
    case "SET":
      const { initialGrid, solvedGrid } = action.payload;
      return {
        grid: initialGrid,
        initialGrid,
        solvedGrid,
        notes: initNotes,
        selectedCell: null,
        undoInputs: [],
        hintCount: 0,
        isSolved: false,
      };
    case "INPUT": {
      const {
        value,
        index: { indexRow, indexCol },
      } = action.payload;

      let grid = JSON.parse(JSON.stringify(state.grid));
      grid[indexRow][indexCol] = value;

      let undoInputs = JSON.parse(JSON.stringify(state.undoInputs));
      undoInputs.unshift({
        value: state.grid[indexRow][indexCol],
        index: { indexRow, indexCol },
      });

      const selectedCell = { ...action.payload, canModify: true };
      const isSolved = isEqualSudoku(grid, state.solvedGrid);
      return { ...state, grid, selectedCell, undoInputs, isSolved };
    }
    case "NOTE": {
      const {
        value,
        index: { indexRow, indexCol },
      } = action.payload;
      if (state.notes[indexRow][indexCol].includes(value)) return state;

      let notes = JSON.parse(JSON.stringify(state.notes));
      notes[indexRow][indexCol].push(value);
      const selectedCell = {
        value: 0,
        index: { indexRow, indexCol },
        canModify: true,
      };
      if (state.grid[indexRow][indexCol] === 0)
        return { ...state, notes, selectedCell };

      let grid = JSON.parse(JSON.stringify(state.grid));
      grid[indexRow][indexCol] = 0;
      let undoInputs = JSON.parse(JSON.stringify(state.undoInputs));
      undoInputs.unshift({
        value: state.grid[indexRow][indexCol],
        index: { indexRow, indexCol },
      });
      return { ...state, grid, notes, selectedCell, undoInputs };
    }
    case "ERASE": {
      const { indexRow, indexCol } = action.payload;
      let grid = JSON.parse(JSON.stringify(state.grid));
      let notes = JSON.parse(JSON.stringify(state.notes));
      grid[indexRow][indexCol] = 0;
      notes[indexRow][indexCol] = [];
      const selectedCell = {
        value: 0,
        index: { indexRow, indexCol },
        canModify: true,
      };
      if (state.grid[indexRow][indexCol] === 0)
        return { ...state, grid, notes, selectedCell };

      let undoInputs = JSON.parse(JSON.stringify(state.undoInputs));
      undoInputs.unshift({
        value: state.grid[indexRow][indexCol],
        index: { indexRow, indexCol },
      });
      return { ...state, grid, notes, selectedCell, undoInputs };
    }
    case "UNDO": {
      if (state.undoInputs.length === 0) return state;
      const {
        value,
        index: { indexRow, indexCol },
      } = state.undoInputs[0];

      let grid = JSON.parse(JSON.stringify(state.grid));
      grid[indexRow][indexCol] = value;

      let undoInputs = JSON.parse(JSON.stringify(state.undoInputs));
      undoInputs.shift();

      const selectedCell = { ...state.undoInputs[0], canModify: true };
      const isSolved = isEqualSudoku(grid, state.solvedGrid);
      return { ...state, grid, selectedCell, undoInputs, isSolved };
    }
    case "HINT": {
      let hints: GridInputAction["payload"][] = [];
      for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
          if (state.grid[i][j] !== state.solvedGrid[i][j])
            hints.push({
              value: state.solvedGrid[i][j],
              index: { indexRow: i, indexCol: j },
            });
      if (hints.length === 0) return state;
      const i = Math.floor(Math.random() * hints.length);
      const {
        value,
        index: { indexRow, indexCol },
      } = hints[i];

      let grid = JSON.parse(JSON.stringify(state.grid));
      let initialGrid = JSON.parse(JSON.stringify(state.initialGrid));
      grid[indexRow][indexCol] = value;
      initialGrid[indexRow][indexCol] = value;

      const undoInputs = state.undoInputs.filter((undoInput) => {
        return (
          undoInput.index.indexRow !== indexRow ||
          undoInput.index.indexCol !== indexCol
        );
      });

      const selectedCell = { ...hints[i], canModify: false };
      const hintCount = state.hintCount + 1;
      const isSolved = isEqualSudoku(grid, state.solvedGrid);
      return {
        ...state,
        grid,
        initialGrid,
        selectedCell,
        undoInputs,
        hintCount,
        isSolved,
      };
    }
    case "SELECT":
      return { ...state, selectedCell: action.payload };
    default:
      return state;
  }
}

export function GridContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stateGrid, dispatchGrid] = useReducer(reducerGrid, {
    grid: sudoku.sudoku,
    initialGrid: sudoku.sudoku,
    solvedGrid: sudoku.solution,
    notes: initNotes,
    selectedCell: null,
    undoInputs: [],
    hintCount: 0,
    isSolved: false,
  });

  return (
    <GridContext.Provider value={{ stateGrid, dispatchGrid }}>
      {children}
    </GridContext.Provider>
  );
}
