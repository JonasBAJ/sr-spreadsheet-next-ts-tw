import { evaluate } from "mathjs";

export const coordinatesToNotation = (row: number, col: number): string => {
  const colLetter = String.fromCharCode("A".charCodeAt(0) + col);
  const rowNumber = (row + 1).toString();
  return colLetter + rowNumber;
};

export const notationToCoordinates = (notation: string): number[] => {
  const col = notation.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(notation.slice(1)) - 1;
  return [row, col];
}

export const extractCellRefs = (value: string) => {
  const regex = /[A-Z]+\d+/g;
  const matches = value.toUpperCase().match(regex);
  return matches;
};

export const getFormula = (
  cellFormula: string,
  formulaValues: Map<string, string>
) => {
  const regex = /[A-Z]+\d+/g;
  const formula = cellFormula.toUpperCase();
  return formula
    .replace(regex, (match) => formulaValues.get(match) || '')
    .replace("=", "");
};

const validateFormula = (formula: string) => {
  const regex = /^[0-9+\-*/\s.()]*$/;
  return regex.test(formula);
}

export const evaluateFormula = (formula: string) => {
  if (validateFormula(formula)) {
    return evaluate(formula)
  }
  return '#VALUE!'
};
