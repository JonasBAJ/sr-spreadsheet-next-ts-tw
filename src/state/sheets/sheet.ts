import { flow } from 'mobx';
import { Instance, types } from 'mobx-state-tree';
import { CancellablePromise } from 'mobx/dist/internal';
import { IApiRes } from '../../apis/api';
import { notationToCoordinates } from '../../utils/cells';
import { CellModel } from '../sheets/cell';
import { runCheckStatus, runSaveCsvTask } from '../../utils/sheet';
import toast from 'react-hot-toast';

const ColHeaderModel = types.model('ColHeaderModel', {
  col: types.number,
  value: types.string,
});

const SyncStatus = types.enumeration('SyncStatus', ['IN_PROGRESS', 'DONE']);

export type SyncStatusType = Instance<typeof SyncStatus>;

export const SheetModel = types
  .model('SheetModel', {
    id: types.identifier,
    status: types.maybe(SyncStatus),
    serverId: types.maybe(types.string),
    rows: types.number,
    cols: types.number,
    title: types.maybe(types.string),
    colNames: types.array(ColHeaderModel),
    cells: types.array(types.array(CellModel)),
    savedAt: types.maybe(types.string),
  })
  .actions((self) => {
    let saveTask: CancellablePromise<IApiRes | null>;
    let checkStatusTask: CancellablePromise<IApiRes | null>;

    return {
      getCell(row: number, col: number) {
        return self.cells[row]?.[col];
      },
      getCellById(id: string) {
        const [row, col] = notationToCoordinates(id);
        return self.cells[row]?.[col];
      },
      getRow(row: number) {
        return self.cells[row];
      },
      setMeta(status: SyncStatusType, serverId?: string, savedAt?: string) {
        self.status = status;
        if (savedAt) self.savedAt = savedAt;
        if (serverId) self.serverId = serverId;
      },
      setTitle(title: string) {
        self.title = title;
      },
      addRow() {
        self.rows += 1;
        const newRow = Array(self.cols)
          .fill(0)
          .map((_, i) =>
            CellModel.create({
              col: i,
              row: self.rows - 1,
              edit: false,
              value: '',
            }),
          );
        self.cells.push(newRow);
        this.saveSheet();
      },
      saveSheet() {
        if (saveTask) {
          saveTask.cancel();
        }
        self.status = 'IN_PROGRESS';
        saveTask = flow(runSaveCsvTask)(self.colNames, self.cells);
        saveTask.then((res) => {
          if (res) {
            this.setMeta(res.status, res.id, res.done_at);
          } else {
            toast.error('Error saving data... Retrying now!');
            this.saveSheet();
          }
        });
      },
      checkStatus() {
        if (self.serverId) {
          checkStatusTask = flow(runCheckStatus)(self.serverId);
          checkStatusTask.then((res) => {
            if (res) {
              this.setMeta(res.status, res.id, res.done_at);
            } else {
              toast.error('Error checking status... Retrying now!');
              this.checkStatus();
            }
          });
        } else {
          this.saveSheet();
        }
      },
    };
  });

export type SheetType = Instance<typeof SheetModel>;
