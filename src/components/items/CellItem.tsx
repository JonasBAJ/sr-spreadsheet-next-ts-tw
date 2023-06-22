import { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { Pencil } from '../svg/Pencil';
import { useSearch } from '../../state/search';
import { observer } from 'mobx-react-lite';
import { useGlobalState } from '../../utils/hooks/useGlobalState';

interface Props {
  row: number;
  col: number;
  last?: boolean;
  rowOnEdit?: boolean;
}

export const CellItem = observer<Props>(({
  row,
  col,
  last,
  rowOnEdit,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { sheets } = useGlobalState();
  const { searchValue } = useSearch();

  const cell = sheets.selectedSheet?.getCell(row, col);
  const [cellValue, setCellValue] = useState(cell?.value || '')

  useEffect(() => {
    if (cell?.edit && ref.current) {
      ref.current.focus();
    }
  }, [cell?.edit, ref.current])

  const toggleEdit = () => cell?.setEdit(!cell.edit);

  const onSubmit = () => {
    cell?.setValue(cellValue);
    cell?.setEdit(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }

  const bgStyle = rowOnEdit ? 'bg-input-edit' : '';
  const separator = last ? '' : 'border-r border-black/30';
  const editStyle = cell?.edit ? 'scale-y-105 z-10 rounded-sm shadow-lg' : '';
  const searchStyle = cell?.containsSearchText(searchValue) ? 'rounded-sm shadow-lg bg-green/30' : '';

  return (
    <div className={`cell ${editStyle} ${searchStyle} ${bgStyle}`}>
      <div className={`w-full h-full py-2.5 ${separator}`}>
        {rowOnEdit ? (
          <input
            ref={ref}
            value={cellValue}
            onBlur={onSubmit}
            onKeyDown={onKeyDown}
            className='cell-input'
            onChange={e => setCellValue(e.target.value)}
          />
        ) : (
          <p className='h-[24px]'>
            {cell?.computed}
          </p>
        )}
      </div>
      <button onClick={toggleEdit} className='absolute bottom-1 right-0 py-1 px-2'>
        <Pencil/>
      </button>
    </div>
  );
});
