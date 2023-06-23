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
import { UiModel } from './ui';

export const RootStore = types.model({
  ui: UiModel,
  search: SearchModel,
  sheets: SheetsStateModel,
});

export type AppState = Instance<typeof RootStore>;

let store: AppState | undefined;
export const initializeStore = (snapshot?: SnapshotIn<AppState>): AppState => {
  if (!store) {
    store = RootStore.create({
      ui: { asideOpen: false },
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
  Component: ComponentType;
  storeSnaptchot: string | null;
}> = ({
  Component,
  storeSnaptchot,
  ...rest
}) => {
  const store = storeSnaptchot
    ? initializeStore(JSON.parse(storeSnaptchot))
    : initializeStore();

  return (
    <StoreProvider value={store}>
      <Component {...rest} />
    </StoreProvider>
  );
};
