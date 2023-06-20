import { ICell } from '../types/sheet';

export const getCellValue = (cell?: ICell | null) => {
  if (cell && cell.computed) {
    return cell.computed;
  }
  return cell?.value || '';
}

export const formatValue = (cell?: ICell | null) => {
  const value = getCellValue(cell);
  // TODO: better formatting for floats if value has a big decimal part
  // const parsed = parseFloat(value);
  // return isNaN(parsed) ? value : parsed.toFixed(2);
  return value;
}
