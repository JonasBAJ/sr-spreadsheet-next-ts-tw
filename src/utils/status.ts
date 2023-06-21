import { SyncStatus } from '../types/sheet';

export const getReadableStatus = (status?: SyncStatus) => {
  if (!status) return 'Unsaved';
  return {
    IN_PROGRESS: 'Syncing',
    DONE: 'Saved',
    ERROR: 'Error'
  }[status];
}
