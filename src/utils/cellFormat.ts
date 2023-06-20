import { ICell } from '../types/sheet';

export const getCellValue = (cell?: ICell | null) => {
  if (cell && cell.computed) {
    return cell.computed;
  }
  return cell?.value || '';
}
