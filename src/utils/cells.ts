import { ICell } from '../types/sheet';

const cellToCoordinates = (cellRef: string): number[] => {
  const col = cellRef.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(cellRef.slice(1)) - 1;
  return [row, col];
}

export const selectCells = (
  cell: ICell,
  cells: ICell[][]
): Record<string, ICell> => {
  const cellRefs: Record<string, ICell> = {};
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.match(regex);

  matches?.forEach(cellRef => {
    const [row, col] = cellToCoordinates(cellRef);
    if (cells[row][col]) {
      cellRefs[cellRef] = cells[row][col];
    }
  });

  return cellRefs;
}
