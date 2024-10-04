import { useState, useReducer } from "react";
import Cell from "../Cell/Cell.tsx";
import InputButtons from "../InputButtons/InputButtons.tsx";
import "./Sudoku.css";

export type Index = {
  indexRow: number;
  indexCol: number;
};

export type SelectedCell = {
  index: Index;
  canModify: boolean;
};

export type GridAction = {
  type: string;
  payload: {
    value: number;
    index: Index;
  };
};

function reducer(state: number[][], action: GridAction) {
  switch (action.type) {
    case "INPUT":
      const {
        value,
        index: { indexRow, indexCol },
      } = action.payload;
      let grid = [...state];
      grid[indexRow][indexCol] = value;
      return grid;
    default:
      return state;
  }
}

export default function Sudoku() {
  const initialGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];
  const [grid, dispatch] = useReducer(reducer, initialGrid);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const blocks = getBlocks();

  function getBlocks() {
    let blockRow = [];
    let block = [];
    let blocks = [];
    let offsetRow = 0;
    let offsetCol = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = offsetRow; j < offsetRow + 3; j++) {
        for (let k = offsetCol; k < offsetCol + 3; k++) {
          blockRow.push(grid[j][k]);
        }
        block.push(blockRow);
        blockRow = [];
      }
      blocks.push(block);
      block = [];
      if (offsetCol === 6) {
        offsetCol = 0;
        offsetRow += 3;
      } else offsetCol += 3;
    }
    return blocks;
  }

  // Converts cell index relative to block to cell index relative to grid.
  function blockToGridIndex(blockIndex: number, cellIndex: Index): Index {
    switch (blockIndex) {
      case 0:
        return cellIndex;
      case 1:
        return {
          indexRow: cellIndex.indexRow,
          indexCol: cellIndex.indexCol + 3,
        };
      case 2:
        return {
          indexRow: cellIndex.indexRow,
          indexCol: cellIndex.indexCol + 6,
        };
      case 3:
        return {
          indexRow: cellIndex.indexRow + 3,
          indexCol: cellIndex.indexCol,
        };
      case 4:
        return {
          indexRow: cellIndex.indexRow + 3,
          indexCol: cellIndex.indexCol + 3,
        };
      case 5:
        return {
          indexRow: cellIndex.indexRow + 3,
          indexCol: cellIndex.indexCol + 6,
        };
      case 6:
        return {
          indexRow: cellIndex.indexRow + 6,
          indexCol: cellIndex.indexCol,
        };
      case 7:
        return {
          indexRow: cellIndex.indexRow + 6,
          indexCol: cellIndex.indexCol + 3,
        };
      case 8:
        return {
          indexRow: cellIndex.indexRow + 6,
          indexCol: cellIndex.indexCol + 6,
        };
      default:
        console.error("Invalid block index.");
        return cellIndex;
    }
  }

  return (
    <>
      <div className="sudoku">
        {blocks.map((block, i) => (
          <div key={i} className="block">
            {block.map((blockRow, j) => (
              <div key={j} className="block-row">
                {blockRow.map((cell, k) => {
                  const indexGrid = blockToGridIndex(i, {
                    indexRow: j,
                    indexCol: k,
                  });
                  return (
                    <Cell
                      key={k}
                      value={cell}
                      index={indexGrid}
                      setSelectedCell={setSelectedCell}
                      isSelected={
                        JSON.stringify(indexGrid) ===
                        JSON.stringify(selectedCell?.index)
                      }
                      canModify={
                        initialGrid[indexGrid.indexRow][indexGrid.indexCol] ===
                        0
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
      <InputButtons selectedCell={selectedCell} dispatch={dispatch} />
    </>
  );
}
