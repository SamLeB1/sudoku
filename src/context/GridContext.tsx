import { createContext, useReducer } from "react";
import { Index, SelectedCell } from "../components/Sudoku/Sudoku.tsx";

type GridState = {
  grid: number[][];
  initialGrid: number[][];
  selectedCell: SelectedCell | null;
  undoInputs: GridInputAction["payload"][];
};

type GridSetAction = {
  type: "SET";
  payload: number[][];
};

type GridInputAction = {
  type: "INPUT";
  payload: {
    value: number;
    index: Index;
  };
};

type GridUndoAction = { type: "UNDO" };

type GridSelectAction = {
  type: "SELECT";
  payload: SelectedCell;
};

type GridAction =
  | GridSetAction
  | GridInputAction
  | GridUndoAction
  | GridSelectAction;

type GridContextValue = {
  stateGrid: GridState;
  dispatchGrid: React.Dispatch<GridAction>;
};

const initialGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const GridContext = createContext<GridContextValue | null>(null);

function reducerGrid(state: GridState, action: GridAction) {
  switch (action.type) {
    case "SET":
      return {
        grid: action.payload,
        initialGrid: action.payload,
        selectedCell: null,
        undoInputs: [],
      };
    case "INPUT": {
      const {
        value,
        index: { indexRow, indexCol },
      } = action.payload;

      let grid = JSON.parse(JSON.stringify(state.grid));
      grid[indexRow][indexCol] = value;

      let selectedCell = { ...action.payload, canModify: true };

      let undoInputs = JSON.parse(JSON.stringify(state.undoInputs));
      undoInputs.unshift({
        value: state.grid[indexRow][indexCol],
        index: { indexRow, indexCol },
      });
      return { ...state, grid, selectedCell, undoInputs };
    }
    case "UNDO": {
      if (state.undoInputs.length === 0) return state;
      const {
        value,
        index: { indexRow, indexCol },
      } = state.undoInputs[0];

      let grid = JSON.parse(JSON.stringify(state.grid));
      grid[indexRow][indexCol] = value;

      let selectedCell = { ...state.undoInputs[0], canModify: true };

      let undoInputs = JSON.parse(JSON.stringify(state.undoInputs));
      undoInputs.shift();
      return { ...state, grid, selectedCell, undoInputs };
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
    grid: initialGrid,
    initialGrid,
    selectedCell: null,
    undoInputs: [],
  });

  return (
    <GridContext.Provider value={{ stateGrid, dispatchGrid }}>
      {children}
    </GridContext.Provider>
  );
}
