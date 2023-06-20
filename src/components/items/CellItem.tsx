import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from 'react';
import { Pencil } from '../svg/Pencil';
import { useSheets } from '../../state/sheets';
import { produce } from 'immer';
import { formatValue } from '../../utils/cellFormat';
import { ICell } from '../../types/sheet';
import toast from 'react-hot-toast';

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
  const { updateCell } = useSheets();
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

    if (cell?.id && newValue.includes(cell?.id)) {
      toast.error("Cell can not reference itself!");
      return;
    }


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

  return (
    <div className={`cell ${bgStyle} ${editStyle}`}>
      <div className={`w-full h-full py-2.5 ${separator}`}>
        {rowOnEdit ? (
          <input
            ref={ref}
            onKeyDown={onKeyDown}
            className='cell-input'
            value={cell?.value}
            onChange={updateCellValue}
          />
        ) : (
          <p className='h-[24px]'>
            {formatValue(cell)}
          </p>
        )}
      </div>
      <button onClick={toggleEdit} className='absolute bottom-1 right-0 py-1 px-2'>
        <Pencil/>
      </button>
    </div>
  );
};
