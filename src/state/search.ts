import { types } from 'mobx-state-tree';

export const SearchModel = types
  .model({
    searchValue: types.maybe(types.string),
  })
  .actions((self) => ({
    setSearchVal(query: string | undefined) {
      self.searchValue = query;
    },
  }));
