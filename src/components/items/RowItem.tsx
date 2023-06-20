import { FC } from "react";
import { CellItem } from './CellItem';
import { ISheetsState, useSheets } from '../../state/sheets';
import { coordinatesToNotation } from '../../utils/cells';
import { Cell } from '../../models/Cell';

interface Props {
  row: number;
}

const selector = (row: number) => (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;
  const cellIds = Array(sheet?.cols || 0)
    .fill(0)
    .map((_, i) => coordinatesToNotation(row, i));
  const cells = cellIds.map(id => sheet?.data[id]);
  return {
    cells,
    rowOnEdit: cells?.some(c => c?.edit),
    rowOnError: cells?.some(c => c?.error)
  };
};

export const RowItem: FC<Props> = ({ row }) => {
  const { cells, rowOnEdit, rowOnError } = useSheets(selector(row));
  const gridTemplateColumns = "1fr ".repeat(cells.length || 0);
  const errorStyle = rowOnError ? 'shadow-lg border-[1px] border-error-border' : '';

  return (
    <div
      style={{ gridTemplateColumns }}
      className={`w-full grid justify-items-center items-center rounded-lg ${errorStyle}`}
    >
      {cells.map((cell, i) => {
        const finalCell = cell || new Cell(
          coordinatesToNotation(row, i), ''
        ).toPlainObject();
        return (
          <CellItem
            cell={finalCell}
            key={finalCell?.id}
            rowOnEdit={rowOnEdit}
            last={i === cells.length - 1}
          />
        )
      })}
    </div>
  );
};
