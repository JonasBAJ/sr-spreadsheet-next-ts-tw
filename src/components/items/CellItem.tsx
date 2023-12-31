import { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { Pencil } from '../svg/Pencil';
import { observer } from 'mobx-react-lite';
import { useGlobalState } from '../../utils/hooks/useGlobalState';

interface Props {
  row: number;
  col: number;
  last?: boolean;
  rowOnEdit?: boolean;
}

export const CellItem = observer<Props>(({ row, col, last, rowOnEdit }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { sheets, search } = useGlobalState();

  const cell = sheets.selectedSheet?.getCell(row, col);
  const [cellValue, setCellValue] = useState(cell?.value || '');

  useEffect(() => {
    if (cell?.edit && ref.current) {
      ref.current.focus();
    }
  }, [cell?.edit]);

  const toggleEdit = () => {
    cell?.setEdit(!cell.edit);
  };

  const onSubmit = () => {
    if (cell?.value !== cellValue) {
      cell?.setValue(cellValue);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
      toggleEdit();
    }
  };

  const bgStyle = rowOnEdit ? 'bg-input-edit' : '';
  const separator = last ? '' : 'border-r border-black/30';
  const editStyle = cell?.edit ? 'scale-y-105 z-10 rounded-sm shadow-lg' : '';
  const searchStyle = cell?.containsSearchText(search.searchValue)
    ? 'rounded-sm shadow-lg bg-green/30'
    : '';

  return (
    <div className={`cell ${editStyle} ${searchStyle} ${bgStyle}`}>
      <div className={`h-full w-full py-2.5 ${separator}`}>
        {rowOnEdit ? (
          <input
            ref={ref}
            value={cellValue}
            onBlur={onSubmit}
            onKeyDown={onKeyDown}
            className="cell-input"
            onChange={(e) => setCellValue(e.target.value)}
          />
        ) : (
          <p className="h-[24px]">{cell?.computed}</p>
        )}
      </div>
      <button
        onClick={toggleEdit}
        className="absolute bottom-1 right-0 px-2 py-1"
      >
        <Pencil />
      </button>
    </div>
  );
});
