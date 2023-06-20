import { evaluate } from 'mathjs';
import { ICell } from '../types/sheet';

const hasReferences = (cell: ICell) => {
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.toUpperCase().match(regex);
  return matches && matches?.length > 0;
}

const cellToCoordinates = (cellRef: string): number[] => {
  const col = cellRef.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(cellRef.slice(1)) - 1;
  return [row, col];
}

const selectCells = (
  cell: ICell,
  cells: ICell[][]
): Record<string, ICell> => {
  const cellRefs: Record<string, ICell> = {};
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.toUpperCase().match(regex);

  matches?.forEach(cellRef => {
    const [row, col] = cellToCoordinates(cellRef);
    if (cells[row]?.[col]) {
      cellRefs[cellRef] = cells[row][col];
    }
  });

  return cellRefs;
}

const getFormulaWithValues = (cell: ICell, referencedCells: Record<string, ICell>) => {
  const regex = /[A-Z]+\d+/g;
  const formula = cell.value.toUpperCase();
  return formula.replace(regex, (match) => {
    const cell = referencedCells[match];
    return cell ? cell?.computed || cell.value : NaN.toString(); // replace with '0' if the cell does not exist
  }).replace('=', '');
}

const evaluateFormula = (formula: string): { computed: string, error?: boolean } => {
  const cleanFormula = formula.replace('=', '');
  try {
    const result = evaluate(cleanFormula);
    return {
      computed: String(result),
      error: false,
    };
  } catch (error) {
    console.error(`Invalid formula: ${formula}`);
    return {
      computed: cleanFormula,
      error: true,
    };
  }
}

export const getComputedValue = (
  cell: ICell,
  cells: ICell[][]
) => {
  if (!cell.value.startsWith('=')) {
    return {
      ...cell,
      computed: undefined,
    };
  } else if (!hasReferences(cell)) {
    return {
      ...cell,
      ...evaluateFormula(cell.value),
    }
  }

  const formulaCells = selectCells(cell, cells);
  const finalFormula = getFormulaWithValues(cell, formulaCells);

  return {
    ...cell,
    ...evaluateFormula(finalFormula),
  }
}
