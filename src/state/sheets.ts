import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICell, ISheet } from "../types/sheet";
import { mockSheet } from "../assets/mock";
import { selectCells } from "../utils/cells";

export interface ISheetsState {
  selectedSheetId: string | null;
  sheets: Record<string, ISheet>;
  updateTitle: (col: number, value: string) => void;
  updateCell: (cell: ICell) => void;
  getReferencedCells: (cell: ICell) => Record<string, ICell>;
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
      getReferencedCells: (cell: ICell) => {
        const s = get();
        const slectedId = s.selectedSheetId;
        if (slectedId && s.sheets[slectedId]) {
          return selectCells(cell, s.sheets[slectedId].data);
        }
        return {};
      },
    })),
    {
      name: "stacking-storage",
    }
  )
);
