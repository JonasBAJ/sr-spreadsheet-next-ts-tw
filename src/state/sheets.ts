import { notationToCoordinates } from '../utils/cells';
import { types, Instance, IAnyModelType } from "mobx-state-tree";
import { coordinatesToNotation } from '../utils/cells';
import { cellContainsSearchValue } from '../utils/search';

const CellModel = types
  .model("Cell", {
    row: types.number,
    col: types.number,
    edit: types.boolean,
    value: types.string,
    error: types.maybe(types.boolean),
    message: types.maybe(types.string),
    inputCells: types.maybe(types.array(types.late((): IAnyModelType => CellModel))),
  })
  .views(self => ({
    get id() {
      return coordinatesToNotation(self.row, self.col);
    },
    get computed() {
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
    containsSearchText(search?: string | null) {
      if (typeof search == 'string') {
        return cellContainsSearchValue(search, self.value, self.computed)
      }
      return false;
    }
  }));

type CellType = Instance<typeof CellModel>;

const ColHeaderModel = types
  .model("ColHeader", {
    col: types.number,
    value: types.string,
  });

type ColHeaderType = Instance<typeof ColHeaderModel>;

const SyncStatus = types.enumeration('SyncStatus', ['IN_PROGRESS', 'DONE', 'ERROR']);

const SheetModel = types
  .model("Sheet", {
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
    getRow(row: number) {
      return self.cells[row];
    }
  }));

type SheetType = Instance<typeof SheetModel>;

const SheetsStateModel = types
  .model("SheetsState", {
    selectedSheetId: types.maybeNull(types.string),
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
    setSelectedSheetId(id: string | null) {
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

