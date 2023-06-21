
export const getRowCells = (row: number, colCount: number): string[] => {
  let cells: string[] = [];

  for (let col = 0; col < colCount; col++) {
    const colLetter = String.fromCharCode("A".charCodeAt(0) + col);
    const rowNumber = (row + 1).toString();
    cells.push(colLetter + rowNumber);
  }

  return cells;
};
