import {
  Instance,
  types,
  applySnapshot,
  onSnapshot,
  SnapshotIn,
} from "mobx-state-tree";
import { ComponentType, FC, createContext } from "react";
import { initialState } from "../assets/mock";
import { SearchModel } from "./search";
import { SheetsStateModel } from "./sheets";
import { setCookie } from 'cookies-next';

export const RootStore = types.model({
  search: SearchModel,
  sheets: SheetsStateModel,
});

export type AppState = Instance<typeof RootStore>;

let store: AppState | undefined;
export const initializeStore = (snapshot?: SnapshotIn<AppState>): AppState => {
  if (!store) {
    store = RootStore.create({
      search: {},
      sheets: initialState,
    });

    if (typeof window !== "undefined") {
      // Persist state on change
      onSnapshot(store, snap => {
        setCookie('store', JSON.stringify(snap));
      });
    }
  }

  if (snapshot) {
    if (Object.keys(snapshot.sheets).length > 0) {
      applySnapshot(store.sheets, snapshot.sheets);
    }
  }

  if (typeof window === "undefined") {
    return store;
  }

  if (!window.__STORE__) {
    window.__STORE__ = store;
  }

  return window.__STORE__;
};

export const RootStoreContext = createContext<null | Instance<
  typeof RootStore
>>(null);
export const StoreProvider = RootStoreContext.Provider;

export const Provider: FC<{
  Component: ComponentType
  storeSnaptchot?: string
}> = ({
  Component,
  storeSnaptchot,
  ...rest
}) => {
  const store = initializeStore(JSON.parse(storeSnaptchot || ''));

  return (
    <StoreProvider value={store}>
      <Component {...rest} />
    </StoreProvider>
  );
};
