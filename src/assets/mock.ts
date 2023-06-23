import { SnapshotIn } from 'mobx-state-tree';
import { SheetsStateModel } from '../state/sheets';
import { SheetModel } from '../state/sheets/sheet';

export const mockSheet: SnapshotIn<typeof SheetModel> = {
  id: "sh_demo",
  cols: 3,
  rows: 2,
  title: 'Your Personal Staking Calculator',
  colNames: [
    {
      col: 0,
      value: "Price",
    },
    {
      col: 1,
      value: "Reward Rate",
    },
    {
      col: 2,
      value: "Annual Reward in $",
    },
  ],
  cells: [
    [
      { row: 1, col: 1, edit: false, value: "1000" },
      { row: 1, col: 2, edit: false, value: "15" },
      { row: 1, col: 3, edit: false, value: "=A1*B1" },
    ],
    [
      { row: 2, col: 1, edit: false, value: "1000" },
      { row: 2, col: 2, edit: false, value: "15" },
      { row: 2, col: 3, edit: false, value: "=A1*B1" },
    ],
  ],
};

export const initialState: SnapshotIn<typeof SheetsStateModel> = {
  selectedSheetId: 'sh_demo',
  sheets: {
    'sh_demo': mockSheet
  },
};
