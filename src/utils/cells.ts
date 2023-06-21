import { evaluate } from "mathjs";
import { ICell } from "../types/sheet";

const hasReferences = (cell: ICell) => {
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.toUpperCase().match(regex);
  return matches && matches?.length > 0;
};

export const coordinatesToNotation = (row: number, col: number): string => {
  const colLetter = String.fromCharCode("A".charCodeAt(0) + col);
  const rowNumber = (row + 1).toString();
  return colLetter + rowNumber;
};

const selectInputCells = (
  cell: ICell,
  cells: Record<string, ICell>
): Record<string, ICell> => {
  const inputCells: Record<string, ICell> = {};
  const regex = /[A-Z]+\d+/g;
  const matches = cell.value.toUpperCase().match(regex);

  matches?.forEach((cellRef) => {
    if (cells[cellRef]) {
      inputCells[cellRef] = cells[cellRef];
    }
  });

  return inputCells;
};

const getFormulaWithValues = (
  cell: ICell,
  referencedCells: Record<string, ICell>
) => {
  const regex = /[A-Z]+\d+/g;
  const formula = cell.value.toUpperCase();
  return formula
    .replace(regex, (match) => {
      const cell = referencedCells[match];
      return cell ? cell?.computed || cell.value : NaN.toString(); // replace with '0' if the cell does not exist
    })
    .replace("=", "");
};

const evaluateFormula = (
  formula: string
): { computed: string; error?: boolean; message?: string } => {
  const cleanFormula = formula.replace("=", "");
  try {
    const result = evaluate(cleanFormula);
    if (isNaN(result)) throw new Error("Invalid formula");

    return {
      computed: String(result),
      error: false,
      message: undefined,
    };
  } catch {
    return {
      computed: cleanFormula,
      error: true,
      message: `Invalid input: =${cleanFormula}`,
    };
  }
};

export const computeCell = (cell: ICell, cells: Record<string, ICell>) => {
  if (cell.value.includes(cell?.id)) {
    return {
      inputCellRefsToRemove: [],
      computed: {
        ...cell,
        error: true,
        message: 'Cell can not reference itself!',
        computed: undefined,
        inputCells: {},
      },
    };
  } else if (!cell.value.startsWith("=")) {
    return {
      inputCellRefsToRemove: Object.keys(cell.inputCells),
      computed: {
        ...cell,
        error: false,
        message: undefined,
        computed: undefined,
        inputCells: {},
      },
    };
  } else if (!hasReferences(cell)) {
    return {
      inputCellRefsToRemove: Object.keys(cell.inputCells),
      computed: {
        ...cell,
        ...evaluateFormula(cell.value),
        inputCells: {},
      },
    };
  }

  const inputCells = selectInputCells(cell, cells);
  const finalFormula = getFormulaWithValues(cell, inputCells);
  const inputCellIds = Object.keys(inputCells).filter((id) => id !== cell.id);
  const newInputRefObj = inputCellIds.reduce(
    (pv, cv) => ({
      ...pv,
      [cv]: true,
    }),
    {} as Record<string, boolean>
  );

  const inputCellRefsToRemove = Object.keys(cell.inputCells).filter(
    (k) => !newInputRefObj[k]
  );

  return {
    inputCellRefsToRemove,
    computed: {
      ...cell,
      ...evaluateFormula(finalFormula),
      inputCells: newInputRefObj,
    },
  };
};
