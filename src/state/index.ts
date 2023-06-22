import { Instance, types } from 'mobx-state-tree';
import { createContext } from 'react';
import {SheetsStateModel} from './sheets';
import { initialState } from '../assets/mock';
import { SearchModel } from './search';

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


