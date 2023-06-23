import { Instance, types } from 'mobx-state-tree';
import { SheetModel } from '../sheets/sheet';
import { getNewSheet } from '../../assets/newSheet';

export const SheetsStateModel = types
  .model('SheetsStateModel', {
    selectedSheetId: types.maybe(types.string),
    sheets: types.map(SheetModel),
  })
  .views((self) => ({
    get selectedSheet() {
      if (!self.selectedSheetId) {
        return undefined;
      }
      return self.sheets.get(self.selectedSheetId);
    },
  }))
  .actions((self) => ({
    setSelectedSheetId(id: string | undefined) {
      self.selectedSheetId = id;
    },
    createNewSheet() {
      const newSheet = SheetModel.create(getNewSheet());
      self.sheets.set(newSheet.id, newSheet);
      return newSheet;
    },
  }));

export type SheetsStateType = Instance<typeof SheetsStateModel>;
