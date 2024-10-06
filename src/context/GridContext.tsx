import { createContext, useReducer } from "react";
import { Index, SelectedCell } from "../components/Sudoku/Sudoku.tsx";

type GridState = {
  grid: number[][];
  initialGrid: number[][];
  selectedCell: SelectedCell | null;
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

type GridSelectAction = {
  type: "SELECT";
  payload: SelectedCell;
};

type GridAction = GridSetAction | GridInputAction | GridSelectAction;

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
      };
    case "INPUT":
      const {
        value,
        index: { indexRow, indexCol },
      } = action.payload;
      let grid = JSON.parse(JSON.stringify(state.grid));
      grid[indexRow][indexCol] = value;
      return { ...state, grid };
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
  });

  return (
    <GridContext.Provider value={{ stateGrid, dispatchGrid }}>
      {children}
    </GridContext.Provider>
  );
}
