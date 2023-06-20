import { evaluate } from 'mathjs';
import { ICell } from '../types/sheet';

const hasReferences = (cell: ICell) => {
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.match(regex);
  return matches && matches?.length > 0;
}

const cellToCoordinates = (cellRef: string): number[] => {
  const col = cellRef.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(cellRef.slice(1)) - 1;
  return [row, col];
}

const evaluateFormula = (formula: string): number | null => {
  try {
    const result = evaluate(formula);
    return result;
  } catch (error) {
    console.error(`Invalid formula: ${formula}`);
    return null;
  }
}

const selectCells = (
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

const replaceReferencesWithValues = (cell: ICell, referencedCells: Record<string, ICell>) => {
  const regex = /[A-Z]+\d+/g;
  const formula = cell.value;
  return formula.replace(regex, (match) => {
    const cell = referencedCells[match];
    return cell ? cell.value : NaN.toString(); // replace with '0' if the cell does not exist
  }).replace('=', '');
}

export const getComputedValue = (
  cell: ICell,
  cells: ICell[][]
) => {
  if (cell.value.startsWith('=') && hasReferences(cell)) {
    const formulaCells = selectCells(cell, cells);
    const finalFormula = replaceReferencesWithValues(cell, formulaCells);

    return {
      ...cell,
      computed: evaluateFormula(finalFormula)?.toString(),
    }
  } else if (cell.value.startsWith('=')) {
    return {
      ...cell,
      computed: evaluateFormula(cell.value)?.toString(),
    }
  }
  return cell;
}
