import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICell, ISheet } from "../types/sheet";
import { mockSheet } from "../assets/mock";
import { getComputedValue } from "../utils/cells";

export interface ISheetsState {
  selectedSheetId: string | null;
  sheets: Record<string, ISheet>;
  updateTitle: (col: number, value: string) => void;
  updateCell: (cell: ICell) => void;
  getComputedCell: (cell: ICell) => ICell;
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
      getComputedCell: (cell: ICell) => {
        const s = get();
        const selectedSheetId = s.selectedSheetId;
        if (selectedSheetId && s.sheets[selectedSheetId]) {
          return getComputedValue(cell, s.sheets[selectedSheetId].data);
        }
        return cell;
      }
    })),
    {
      name: "stacking-storage",
    }
  )
);
