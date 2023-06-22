import { Instance, types } from 'mobx-state-tree';
import { createContext } from 'react';
import { initialState } from '../assets/mock';
import { SearchModel } from './search';
import { SheetsStateModel } from './sheets';

export const rootStore = types
  .model({
    search: SearchModel,
    sheets: SheetsStateModel,
  })
  .create({
    search: {},
    sheets: initialState,
  });

export const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);
export const StoreProvider = RootStoreContext.Provider;


