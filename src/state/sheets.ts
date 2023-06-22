import { types, Instance, SnapshotIn, getParent } from "mobx-state-tree";
import { coordinatesToNotation } from '../utils/cells';
import { cellContainsSearchValue } from '../utils/search';
import { evaluateFormula, extractCellRefs, getFormula, notationToCoordinates } from '../utils/cells';

const CellModel = types
  .model("CellModel", {
    row: types.number,
    col: types.number,
    edit: types.boolean,
    value: types.string,
    error: types.maybe(types.boolean),
    message: types.maybe(types.string),
  })
  .views(self => ({
    get id() {
      return coordinatesToNotation(self.row, self.col);
    },
    get computed() {
      const refCellIds = extractCellRefs(self.value);
      if (self.value.startsWith('=') && refCellIds?.length) {
        const sheet = getParent<SheetType>(self, 3);
        const refValues = refCellIds.map(id => ({
          id,
          value: sheet.getCellById(id).computed,
        }));
        const refValuesMap = refValues.reduce((acc, obj) => acc.set(obj.id, obj.value), new Map());
        const formula = getFormula(self.value, refValuesMap)
        return String(evaluateFormula(formula));
      }
      return self.value;
    },
  }))
  .actions(self => ({
    setValue(value: string) {
      self.value = value;
    },
    setEdit(edit?: boolean) {
      self.edit = !!edit;
    },
    containsSearchText(search?: string) {
      if (typeof search == 'string') {
        return cellContainsSearchValue(search, self.computed)
      }
      return false;
    }
  }));

type CellType = Instance<typeof CellModel>;

const ColHeaderModel = types
  .model("ColHeaderModel", {
    col: types.number,
    value: types.string,
  });

type ColHeaderType = Instance<typeof ColHeaderModel>;

const SyncStatus = types.enumeration('SyncStatus', ['IN_PROGRESS', 'DONE', 'ERROR']);

const SheetModel = types
  .model("SheetModel", {
    id: types.identifier,
    status: types.maybe(SyncStatus),
    serverId: types.maybe(types.string),
    rows: types.number,
    cols: types.number,
    title: types.maybe(types.string),
    colNames: types.array(ColHeaderModel),
    cells: types.array(types.array(CellModel)),
    updatedAt: types.maybe(types.string),
    savedAt: types.maybe(types.string),
  })
  .actions(self => ({
    getCell(row: number, col: number) {
      return self.cells[row]?.[col];
    },
    getCellById(id: string) {
      const [row, col] = notationToCoordinates(id)
      return self.cells[row]?.[col];
    },
    createCell(cell: SnapshotIn<CellType>) {
      const newCell = CellModel.create(cell);
      if (!self.cells[cell.row]) self.cells.push([]);
      self.cells[cell.row][cell.col] = newCell;
      return self.cells[cell.row][cell.col];
    },
    getOrCreateCell(row: number, col: number) {
      if (self.cells[row]?.[col]) {
        return self.cells[row]?.[col];
      }
      return this.createCell({
        row,
        col,
        edit: false,
        value: '',
      });
    },
    getRow(row: number) {
      return self.cells[row];
    },
    addRow() {
      self.rows += 1
    }
  }));

type SheetType = Instance<typeof SheetModel>;

const SheetsStateModel = types
  .model("SheetsStateModel", {
    selectedSheetId: types.maybe(types.string),
    sheets: types.map(SheetModel),
  })
  .views(self => ({
    get selectedSheet() {
      if (!self.selectedSheetId) {
        return null;
      }
      return self.sheets.get(self.selectedSheetId)
    }
  }))
  .actions(self => ({
    setSelectedSheetId(id: string | undefined) {
      self.selectedSheetId = id;
    },
    addSheet(sheet: SheetType) {
      self.sheets.set(sheet.id, sheet);
    },
  }));

type SheetsStateType = Instance<typeof SheetsStateModel>;

export {
  SheetModel,
  ColHeaderModel,
  SheetsStateModel
}
export type {
  CellType,
  SheetType,
  ColHeaderType,
  SheetsStateType,
}

