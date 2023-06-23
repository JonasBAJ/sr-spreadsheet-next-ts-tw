import { SheetType } from '../state/sheets/sheet';

export const sheetToCsv = (
  colNames: SheetType['colNames'],
  cells: SheetType['cells'],
) => {
  const lines: string[] = [colNames.map((col) => col.value).join(',')];

  cells.forEach((row) => {
    let lineValues: string[] = [];
    row.forEach((col) => {
      lineValues.push(col.computed);
    });
    lines.push(lineValues.join(','));
  });

  return lines.join('\n');
};
