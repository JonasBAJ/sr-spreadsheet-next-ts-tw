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
      onSnapshot(store, (newSnapshot) => {
        localStorage.setItem("store", JSON.stringify(newSnapshot.sheets));
      });
    }
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  } else if (typeof window !== "undefined") {
    // Try to get state from local storage, but only on the client side
    const savedStore = localStorage.getItem("store");
    if (savedStore) {
      applySnapshot(store.sheets, JSON.parse(savedStore));
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

export const Provider: FC<{ Component: ComponentType }> = ({
  Component,
  ...rest
}) => {
  const store =
    typeof window !== "undefined"
      ? initializeStore(window.__INITIAL_STATE__)
      : initializeStore();

  return (
    <StoreProvider value={store}>
      <Component {...rest} />
    </StoreProvider>
  );
};
