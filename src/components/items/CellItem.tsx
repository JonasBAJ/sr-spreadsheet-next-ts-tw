import { FC, useEffect, useRef, KeyboardEvent, useState } from 'react';
import { Pencil } from '../svg/Pencil';
import { ISheetsState, useSheets } from '../../state/sheets';
import { produce } from 'immer';
import { formatValue } from '../../utils/cellFormat';
import { ICell } from '../../types/sheet';
import toast from 'react-hot-toast';
import { computeCell } from '../../utils/cells';
import { useSearch } from '../../state/search';
import { cellContainsSearchValue } from '../../utils/search';

const selector = (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;

  return {
    updateCell: s.updateCell,
    setCellEdit: s.setCellEdit,
    cells: sheet?.data,
  }
}

interface Props {
  cell: ICell;
  last?: boolean;
  rowOnEdit?: boolean;
}

export const CellItem: FC<Props> = ({
  cell,
  last,
  rowOnEdit,
}) => {
  const { searchValue } = useSearch();
  const { updateCell, cells, setCellEdit } = useSheets(selector);
  const ref = useRef<HTMLInputElement>(null);
  const [cellValue, setCellValue] = useState(cell?.value || '')

  const containsSearchVal = cellContainsSearchValue(searchValue, cellValue, cell?.computed);

  useEffect(() => {
    if (cell.edit && ref.current) {
      ref.current.focus();
    }
  }, [cell.edit, ref.current])

  const toggleEdit = () => {
    const newCell = produce(cell, draft => {
      draft.edit = !draft.edit;
    });
    setCellEdit(newCell);
  }

  const onSubmit = () => {
    try {
      if (cellValue !== cell.value) {
        const newCell = produce(cell, draft => {
          draft.value = cellValue;
          draft.edit = false;
        });
        const { computed } = computeCell(newCell, cells || {});
        if (computed?.error && computed.message) {
          toast.error(`${computed.id}: ${computed.message}`);
        }
        updateCell(newCell);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }

  const bgStyle = rowOnEdit ? 'bg-input-edit' : '';
  const separator = last ? '' : 'border-r border-black/30';
  const editStyle = cell?.edit ? 'scale-y-105 z-10 rounded-sm shadow-lg' : '';
  const searchStyle = containsSearchVal ? 'rounded-sm shadow-lg bg-green/30' : '';

  return (
    <div className={`cell ${editStyle} ${searchStyle} ${bgStyle}`}>
      <div className={`w-full h-full py-2.5 ${separator}`}>
        {rowOnEdit ? (
          <input
            ref={ref}
            onKeyDown={onKeyDown}
            className='cell-input'
            value={cellValue}
            onBlur={onSubmit}
            onChange={e => setCellValue(e.target.value)}
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
