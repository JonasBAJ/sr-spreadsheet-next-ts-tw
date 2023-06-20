import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICell, ISheet } from "../types/sheet";
import { mockSheet } from "../assets/mock";
import { getComputedValue } from "../utils/cells";
import { Cell } from '../models/Cell';

export interface ISheetsState {
  selectedSheetId: string | null;
  sheets: Record<string, ISheet>;
  updateTitle: (col: number, value: string) => void;
  updateCell: (cell: ICell) => void;
  getComputedCell: (row: number, cell: number) => ICell | null;
}

export const useSheets = create(
  persist(
    immer<ISheetsState>((set, get) => ({
      selectedSheetId: mockSheet.id,
      sheets: {
        [mockSheet.id]: mockSheet,
      },
      updateTitle: (col: number, value: string) => {
        set((s) => {
          const slectedId = s.selectedSheetId;
          if (slectedId && s.sheets[slectedId]) {
            s.sheets[slectedId].colNames[col].value = value;
          }
        });
      },
      updateCell: (cell: ICell) => {
        set((s) => {
          const slectedId = s.selectedSheetId;
          if (slectedId && s.sheets[slectedId]) {
            const sheet = s.sheets[slectedId];
            const { col, row } = cell;
            if (!sheet.data[row]) sheet.data[row] = [];
            sheet.data[row][col] = cell;
          }
        });
      },
      getComputedCell: (row: number, cell: number) => {
        const s = get();
        const selectedSheetId = s.selectedSheetId;
        if (selectedSheetId && s.sheets[selectedSheetId]) {
          const cells = s.sheets[selectedSheetId].data;
          if (cells[row]?.[cell]) {
            return getComputedValue(
              cells[row][cell],
              cells
            );
          } else {
            if (!s.sheets[selectedSheetId].data[row]) s.sheets[selectedSheetId].data[row] = [];
            const newEmptyCell = new Cell(row, cell).toPlainObject();
            s.sheets[selectedSheetId].data[row][cell] = newEmptyCell;
            return newEmptyCell;
          }
        }
        return null;
      }
    })),
    {
      name: "stacking-storage",
    }
  )
);
