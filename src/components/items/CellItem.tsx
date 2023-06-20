import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from 'react';
import { Pencil } from '../svg/Pencil';
import { ISheetsState, useSheets } from '../../state/sheets';
import { produce } from 'immer';
import { formatCellValue } from '../../utils/cellFormat';

const selector = (row: number, cell: number) => (s: ISheetsState) => ({
  cellData: s.getComputedCell(row, cell),
  updateCell: s.updateCell,
})

interface Props {
  row: number;
  cell: number;
  last?: boolean;
  rowOnEdit?: boolean;
}

export const CellItem: FC<Props> = ({
  row,
  cell,
  last,
  rowOnEdit,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { cellData, updateCell } = useSheets(selector(row, cell));
  const separator = last ? '' : 'border-r border-black/30';
  const bgStyle = rowOnEdit ? 'bg-input-edit' : '';
  const editStyle = cellData?.edit ? 'scale-y-105 z-10 rounded-sm shadow-lg' : '';

  useEffect(() => {
    if (cellData?.edit && ref.current) {
      ref.current.focus();
    }
  }, [cellData?.edit, ref.current])


  const updateCellValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newCell = produce(cellData, draft => {
      if (draft) {
        draft.value = newValue;
      }
    });
    if (newCell) {
      updateCell(newCell);
    }
  }

  const toggleEdit = () => {
    const newCell = produce(cellData, draft => {
      if (draft) {
        draft.edit = !draft.edit;
      }

    })
    if (newCell) {
      updateCell(newCell);
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toggleEdit();
    }
  }

  return (
    <div className={`cell ${bgStyle} ${editStyle}`}>
      <div className={`w-full h-full py-2.5 ${separator}`}>
        {rowOnEdit ? (
          <input
            ref={ref}
            value={cellData?.value}
            onKeyDown={onKeyDown}
            className='cell-input'
            onChange={updateCellValue}
          />
        ) : (
          <p>{formatCellValue(cellData) || "N/A"}</p>
        )}
      </div>
      <button onClick={toggleEdit} className='absolute bottom-1 right-0 py-1 px-2'>
        <Pencil/>
      </button>
    </div>
  );
};
