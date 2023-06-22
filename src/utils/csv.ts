import toast from 'react-hot-toast';
import { Api, IApiRes } from '../apis/api';
import { SheetType } from '../state/sheets/sheet';

export const sheetToCsv = (
  colNames: SheetType['colNames'],
  cells: SheetType['cells']
) => {
  const lines: string[] = [
    colNames.map(col => col.value).join(','),
  ];

  cells.forEach(row => {
    let lineValues: string[] = [];
    row.forEach(col => {
      lineValues.push(col.computed);
    });
    lines.push(lineValues.join(','));
  });

  return lines.join('\n');
}


export function* runSaveCsvTask(
  colNames: SheetType['colNames'],
  cells: SheetType['cells']
) {
  try {
    const csv = sheetToCsv(colNames, cells);
    const res1: IApiRes = yield Api.saveCsvSheet(csv);

    if (res1.status === 'IN_PROGRESS' && res1.done_at) {
      const now = new Date();
      const doneAt = new Date(res1.done_at);
      const waitFor = doneAt.getTime() - now.getTime() + 1000;
      console.log('waiting', waitFor);
      yield new Promise((resolve) => setTimeout(resolve, waitFor));
      const res2: IApiRes = yield Api.getStaus(res1.id || '');
      return {
        ...res1,
        ...res2,
      }
    }
    return res1;
  } catch (e) {
    toast.error('Error saving data... Retrying now!')
  }
}
