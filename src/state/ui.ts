import { Instance, types } from 'mobx-state-tree';

export const UiModel = types.model({
  asideOpen: types.maybe(types.boolean)
})
.actions(self => ({
  toggleAsside() {
    self.asideOpen = !self.asideOpen;
  }
}));

export type UiModelType = Instance<typeof UiModel>;
