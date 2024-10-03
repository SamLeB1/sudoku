import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside.tsx";
import Cell from "../Cell/Cell.tsx";
import "./Sudoku.css";

type Index = {
  indexRow: number;
  indexCol: number;
};

export default function Sudoku() {
  const [grid, setGrid] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);
  const [selectedCell, setSelectedCell] = useState<Index | null>(null);
  const blocks = getBlocks();
  const sudokuRef = useRef(null);
  useClickOutside(sudokuRef, () => setSelectedCell(null));

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
    <div ref={sudokuRef} className="sudoku">
      {blocks.map((block, i) => (
        <div key={i} className="block">
          {block.map((blockRow, j) => (
            <div key={j} className="block-row">
              {blockRow.map((cell, k) => (
                <Cell
                  key={k}
                  value={cell}
                  index={blockToGridIndex(i, { indexRow: j, indexCol: k })}
                  setSelectedCell={setSelectedCell}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
