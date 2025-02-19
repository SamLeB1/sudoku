import useGridContext from "../../hooks/useGridContext.tsx";
import Cell from "../Cell/Cell.tsx";
import "./Sudoku.css";

export type Index = {
  indexRow: number;
  indexCol: number;
};

export type SelectedCell = {
  value: number;
  index: Index;
  canModify: boolean;
};

export default function Sudoku() {
  const { stateGrid } = useGridContext();
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
          blockRow.push(stateGrid.grid[j][k]);
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

  // Check if indexes are in same row, column, or block.
  function isSameSection(index1: Index, index2: Index) {
    if (
      index1.indexRow === index2.indexRow ||
      index1.indexCol === index2.indexCol ||
      (Math.floor(index1.indexRow / 3) === Math.floor(index2.indexRow / 3) &&
        Math.floor(index1.indexCol / 3) === Math.floor(index2.indexCol / 3))
    )
      return true;
    return false;
  }

  return (
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
                    notes={
                      stateGrid.notes[indexGrid.indexRow][indexGrid.indexCol]
                    }
                    highlights={{
                      ...(stateGrid.selectedCell
                        ? {
                            isSameSection: isSameSection(
                              indexGrid,
                              stateGrid.selectedCell.index
                            ),
                            isSameNumber: cell === stateGrid.selectedCell.value,
                          }
                        : { isSameSection: false, isSameNumber: false }),
                    }}
                    isSelected={
                      JSON.stringify(indexGrid) ===
                      JSON.stringify(stateGrid.selectedCell?.index)
                    }
                    canModify={
                      stateGrid.initialGrid[indexGrid.indexRow][
                        indexGrid.indexCol
                      ] === 0
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
