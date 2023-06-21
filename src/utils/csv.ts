import { ISheet } from '../types/sheet';
import { coordinatesToNotation } from './cells';

export const sheetToCsv = (sheet?: ISheet | null) => {
  if (!sheet) return '';
  const lines: string[] = [
    sheet.colNames.map(col => col.value).join(','),
  ];

  for (let row = 0; row < sheet.rows; row++) {
    let lineValues: string[] = [];
    for (let col = 0; col < sheet.cols; col++) {
      const cellId = coordinatesToNotation(row, col);
      const value = sheet.data[cellId]?.value || '';
      lineValues.push(value);
    }
    lines.push(lineValues.join(','));
  }

  return lines.join('\n');
}
