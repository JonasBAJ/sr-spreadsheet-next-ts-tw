import { SnapshotIn } from 'mobx-state-tree';
import { SheetModel } from '../state/sheets/sheet';

export const getNewSheet = (): SnapshotIn<typeof SheetModel> => ({
  id: crypto.randomUUID(),
  cols: 3,
  rows: 0,
  title: 'New sheet',
  colNames: [
    {
      col: 0,
      value: 'Price',
    },
    {
      col: 1,
      value: 'Reward Rate',
    },
    {
      col: 2,
      value: 'Annual Reward in $',
    },
  ],
  cells: [],
});
