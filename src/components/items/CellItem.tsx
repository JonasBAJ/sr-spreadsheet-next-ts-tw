import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from 'react';
import { ICell } from '../../types/sheet';
import { Pencil } from '../svg/Pencil';
import { useSheets } from '../../state/sheets';
import { produce } from 'immer';
import { formatCellValue } from '../../utils/cellFormat';

interface Props {
  cell?: ICell;
  last?: boolean;
  rowOnEdit?: boolean;
}

export const CellItem: FC<Props> = ({
  cell,
  last,
  rowOnEdit,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { updateCell, getComputedCell } = useSheets();
  const separator = last ? '' : 'border-r border-black/30';
  const bgStyle = rowOnEdit ? 'bg-input-edit' : '';
  const editStyle = cell?.edit ? 'scale-y-105 z-10 rounded-sm shadow-lg' : '';

  useEffect(() => {
    if (cell?.edit && ref.current) {
      ref.current.focus();
    }
  }, [cell?.edit, ref.current])


  const updateCellValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newCell = produce(cell, draft => {
      if (draft) {
        draft.value = newValue;
      }
    });
    if (newCell) {
      updateCell(newCell);
    }
  }

  const toggleEdit = () => {
    const newCell = produce(cell, draft => {
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

  const computedCell = cell && getComputedCell(cell);
  console.log(computedCell);

  return (
    <div className={`cell ${bgStyle} ${editStyle}`}>
      <div className={`w-full h-full py-2.5 ${separator}`}>
        {rowOnEdit ? (
          <input
            ref={ref}
            value={cell?.value}
            onKeyDown={onKeyDown}
            className='cell-input'
            onChange={updateCellValue}
          />
        ) : (
          <p>{formatCellValue(computedCell) || "N/A"}</p>
        )}
      </div>
      <button onClick={toggleEdit} className='absolute bottom-1 right-0 py-1 px-2'>
        <Pencil/>
      </button>
    </div>
  );
};
