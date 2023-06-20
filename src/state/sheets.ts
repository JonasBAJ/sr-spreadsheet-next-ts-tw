import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICell, ISheet } from "../types/sheet";
import { mockSheet } from "../assets/mock";
import { computeCell } from "../utils/cells";

export interface ISheetsState {
  selectedSheetId: string | null;
  sheets: Record<string, ISheet>;
  updateTitle: (col: number, value: string) => void;
  updateCell: (cell: ICell) => void;
}

export const useSheets = create(
  persist(
    immer<ISheetsState>(set => ({
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
            const { id } = cell;
            const cells = s.sheets[slectedId].data;
            const { computed, inputCellRefsToRemove } = computeCell(cell, cells);
            s.sheets[slectedId].data[id] = computed;

            // Add cell references to input cells
            Object.keys(computed.inputCells).forEach(cellId => {
              s.sheets[slectedId].data[cellId].outputCells[id] = true;
            });
            // Remove cell reference from no longed dependeant cells
            inputCellRefsToRemove.forEach(cellId => {
              delete s.sheets[slectedId].data[cellId].outputCells[id];
            });
            // Recalculate depending cells
            Object.keys(computed.outputCells).forEach(cellId => {
              const { computed } = computeCell(s.sheets[slectedId].data[cellId], cells);
              s.sheets[slectedId].data[cellId] = computed;
            });
          }
        });
      },
    })),
    {
      name: "stacking-storage",
    }
  )
);
