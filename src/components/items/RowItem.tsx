import { FC } from "react";
import { ICell } from "../../types/sheet";
import { CellItem } from './CellItem';

interface Props {
  cols: number;
  cells: ICell[];
}

export const RowItem: FC<Props> = ({ cols, cells }) => {
  const gridTemplateColumns = "1fr ".repeat(cols || 0);
  const rowOnEdit = cells.some(c => c.edit);

  return (
    <div
      style={{ gridTemplateColumns }}
      className="w-full grid justify-items-center items-center pr-12"
    >
      {Array(cols).fill(0).map((_, i) => (
        <CellItem
          key={i}
          cell={cells[i]}
          last={i === cols-1}
          rowOnEdit={rowOnEdit}
        />
      ))}
    </div>
  );
};
