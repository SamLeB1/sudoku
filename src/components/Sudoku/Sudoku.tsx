import { useState } from "react";
import Cell from "../Cell/Cell.tsx";
import "./Sudoku.css";

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

  return (
    <div className="sudoku">
      {blocks.map((block, i) => (
        <div key={i} className="block">
          {block.map((blockRow, j) => (
            <div key={j} className="block-row">
              {blockRow.map((cell, k) => (
                <Cell key={k} value={cell} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
