import { Instance, types } from 'mobx-state-tree';
import { createContext } from 'react';
import {SheetsStateModel} from './sheets';
import { initialState } from '../assets/mock1';

export const rootStore = types
  .model({
    sheets: SheetsStateModel,
  })
  .create({
    sheets: initialState,
  });


export const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);
export const StoreProvider = RootStoreContext.Provider;


