import { ICell } from '../types/sheet';

export const formatCellValue = (cell?: ICell) => {
  if (!cell) return '';
  switch (cell.format) {
    case '$':
      return `${cell.format}${cell.value}`;
    case '%':
      return `${cell.value}${cell.format}`;
    default:
      return cell.value;
  }
}
