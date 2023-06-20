import { FC } from "react";
import { CellItem } from './CellItem';
import { ISheetsState, useSheets } from '../../state/sheets';

interface Props {
  row: number;
}

const selector = (row: number) => (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;
  return {
    cellCount: sheet?.cols,
    rowOnEdit: sheet?.data[row]?.some(c => c.edit),
  };
};

export const RowItem: FC<Props> = ({ row }) => {
  const { cellCount, rowOnEdit } = useSheets(selector(row));
  const gridTemplateColumns = "1fr ".repeat(cellCount || 0);
  const cells = Array(cellCount).fill(0);

  return (
    <div
      style={{ gridTemplateColumns }}
      className="w-full grid justify-items-center items-center pr-12"
    >
      {cells.map((_, i) => (
        <CellItem
          key={i}
          cell={i}
          row={row}
          rowOnEdit={rowOnEdit}
          last={i === cells.length - 1}
        />
      ))}
    </div>
  );
};
