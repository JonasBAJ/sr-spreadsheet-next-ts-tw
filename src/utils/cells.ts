import { evaluate } from 'mathjs';
import { ICell } from '../types/sheet';

const hasReferences = (cell: ICell) => {
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.toUpperCase().match(regex);
  return matches && matches?.length > 0;
}

export const coordinatesToNotation = (row: number, col: number): string => {
  const colLetter = String.fromCharCode('A'.charCodeAt(0) + col);
  const rowNumber = (row + 1).toString();
  return colLetter + rowNumber;
}

const notationToCoordinates = (cellRef: string): number[] => {
  const col = cellRef.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(cellRef.slice(1)) - 1;
  return [row, col];
}

const selectInputCells = (
  cell: ICell,
  cells: Record<string, ICell>
): Record<string, ICell> => {
  const inputCells: Record<string, ICell> = {};
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.toUpperCase().match(regex);

  matches?.forEach(cellRef => {
    if (cells[cellRef]) {
      inputCells[cellRef] = cells[cellRef];
    }
  });

  return inputCells;
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

export const computeCell = (
  cell: ICell,
  cells: Record<string, ICell>
): ICell => {
  if (!cell.value.startsWith('=')) {
    return {
      ...cell,
      computed: undefined,
      inputCells: {},
    };
  } else if (!hasReferences(cell)) {
    return {
      ...cell,
      ...evaluateFormula(cell.value),
      inputCells: {},
    }
  }

  const inputCells = selectInputCells(cell, cells);
  const finalFormula = getFormulaWithValues(cell, inputCells);
  const inputCellIds =  Object.keys(inputCells).filter(id => id !== cell.id);

  return {
    ...cell,
    ...evaluateFormula(finalFormula),
    inputCells: inputCellIds.reduce((pv, cv) => ({
      ...pv,
      [cv]: true,
    }), {})
  }
}
