import { ICell } from '../types/sheet';

const getCellValue = (cell: ICell) => {
  if (cell.computed) {
    return cell.computed;
  }
  return cell.value;
}

export const formatCellValue = (cell?: ICell | null) => {
  if (!cell) return '';

  const value = getCellValue(cell);
  switch (cell.format) {
    case '$':
      return `${cell.format}${value}`;
    case '%':
      return `${value}${cell.format}`;
    default:
      return value;
  }
}
