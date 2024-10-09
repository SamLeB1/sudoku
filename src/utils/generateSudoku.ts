function getShuffledNumbers() {
  let numbers: number[] = [];
  let n;
  while (numbers.length < 9) {
    n = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }
  return numbers;
}

function canPlaceNumber(sudoku: number[][], y: number, x: number, n: number) {
  for (let i = 0; i < 9; i++) if (sudoku[y][i] === n) return false;
  for (let i = 0; i < 9; i++) if (sudoku[i][x] === n) return false;
  const offset_y = Math.floor(y / 3) * 3;
  const offset_x = Math.floor(x / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (sudoku[i + offset_y][j + offset_x] === n) return false;
  return true;
}

function isFilledSudoku(sudoku: number[][]) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) if (sudoku[i][j] === 0) return false;
  return true;
}

function fillSudoku(sudoku: number[][]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        const numbers = getShuffledNumbers();
        for (let k = 0; k < 9; k++) {
          if (canPlaceNumber(sudoku, i, j, numbers[k])) {
            sudoku[i][j] = numbers[k];
            fillSudoku(sudoku);
            if (isFilledSudoku(sudoku)) return;
            else sudoku[i][j] = 0;
          }
        }
        return;
      }
    }
  }
  return;
}

function getFilledSudoku() {
  let sudoku = [
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
  fillSudoku(sudoku);
  return sudoku;
}
