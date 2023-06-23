import { Instance, getParent, types } from 'mobx-state-tree';
import {
  coordinatesToNotation,
  evaluateFormula,
  extractCellRefs,
  getFormula,
} from '../../utils/cells';
import { cellContainsSearchValue } from '../../utils/search';
import { SheetType } from '../sheets/sheet';

export const CellModel = types
  .model('CellModel', {
    row: types.number,
    col: types.number,
    edit: types.boolean,
    value: types.string,
  })
  .views((self) => ({
    get id() {
      return coordinatesToNotation(self.row, self.col);
    },
    get computed() {
      const refCellIds = extractCellRefs(self.value);
      if (self.value.startsWith('=') && refCellIds?.length) {
        const sheet = getParent<SheetType>(self, 3);
        const refValues = refCellIds.map((id) => ({
          id,
          value: sheet.getCellById(id)?.computed,
        }));
        const refValuesMap = refValues.reduce(
          (acc, obj) => acc.set(obj.id, obj.value),
          new Map(),
        );
        const formula = getFormula(self.value, refValuesMap);
        return String(evaluateFormula(formula));
      }
      return self.value;
    },
  }))
  .actions((self) => ({
    setValue(value: string) {
      self.value = value;
      const sheet = getParent<SheetType>(self, 3);
      sheet.saveSheet();
    },
    setEdit(edit?: boolean) {
      self.edit = !!edit;
    },
    containsSearchText(search?: string) {
      if (typeof search == 'string') {
        return cellContainsSearchValue(search, self.computed);
      }
      return false;
    },
  }));

export type CellType = Instance<typeof CellModel>;
