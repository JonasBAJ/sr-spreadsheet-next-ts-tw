import { Instance, types } from 'mobx-state-tree';
import { SheetModel, SheetType } from '../sheets';

export const SheetsStateModel = types
  .model("SheetsStateModel", {
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
    addSheet(sheet: SheetType) {
      self.sheets.set(sheet.id, sheet);
    },
  }));

export type SheetsStateType = Instance<typeof SheetsStateModel>;
