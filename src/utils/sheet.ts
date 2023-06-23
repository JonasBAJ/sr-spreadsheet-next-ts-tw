import { Api, IApiRes } from '../apis/api';
import { SheetType } from '../state/sheets/sheet';
import { sheetToCsv } from './csv';

export const getRowCells = (row: number, colCount: number): string[] => {
  let cells: string[] = [];

  for (let col = 0; col < colCount; col++) {
    const colLetter = String.fromCharCode('A'.charCodeAt(0) + col);
    const rowNumber = (row + 1).toString();
    cells.push(colLetter + rowNumber);
  }

  return cells;
};

export function* runSaveCsvTask(
  colNames: SheetType['colNames'],
  cells: SheetType['cells'],
) {
  try {
    const csv = sheetToCsv(colNames, cells);
    const res1: IApiRes = yield Api.saveCsvSheet(csv);

    if (res1.status === 'IN_PROGRESS' && res1.done_at) {
      const now = new Date();
      const doneAt = new Date(res1.done_at);
      const waitFor = doneAt.getTime() - now.getTime() + 1000;
      console.log(`checking status in: ${waitFor}ms`);
      yield new Promise((resolve) => setTimeout(resolve, waitFor));
      const res2: IApiRes = yield Api.getStaus(res1.id || '');
      return {
        ...res1,
        ...res2,
      };
    }
    return res1;
  } catch {
    return null;
  }
}

export function* runCheckStatus(serverId: string) {
  try {
    const res1: IApiRes = yield Api.getStaus(serverId);

    if (res1.status === 'IN_PROGRESS' && res1.done_at) {
      const now = new Date();
      const doneAt = new Date(res1.done_at);
      const waitFor = doneAt.getTime() - now.getTime() + 1000;
      console.log(`checking status in: ${waitFor}ms`);
      yield new Promise((resolve) => setTimeout(resolve, waitFor));
      const res2: IApiRes = yield Api.getStaus(res1.id || '');
      return {
        ...res1,
        ...res2,
      };
    }
    return res1;
  } catch {
    return null;
  }
}
