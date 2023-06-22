import { SyncStatusType } from '../state/sheets/sheet';

export const getReadableStatus = (status?: SyncStatusType) => {
  if (!status) return 'Unsaved';
  return {
    IN_PROGRESS: 'Syncing',
    DONE: 'Saved',
  }[status];
}
