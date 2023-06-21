import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ISheetsState {
  searchValue: string | null;
  setSearchVal: (query: string | null) => void;
}

export const useSearch = create(
  immer<ISheetsState>(set => ({
    searchValue: null,
    setSearchVal: (query: string | null) => {
      set(s => {
        s.searchValue = query
      });
    }
  }))
)
