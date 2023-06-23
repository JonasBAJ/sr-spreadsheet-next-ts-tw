import { RowItem } from '../items/RowItem';
import { useGlobalState } from '../../utils/hooks/useGlobalState';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const Sheet = observer(() => {
  const { sheets } = useGlobalState();
  const gridTemplateColumns = '1fr '.repeat(sheets.selectedSheet?.cols || 0);
  const rowsCount: number[] = Array(sheets.selectedSheet?.rows).fill(0);
  const columnsCount: number[] = Array(sheets.selectedSheet?.cols).fill(0);

  useEffect(() => {
    sheets.selectedSheet?.checkStatus();
  }, [sheets.selectedSheet?.id]);

  return (
    <section className="mt-[14px] h-full w-full">
      <div className="overflow-x-scroll">
        <header className="mb-4 flex gap-1">
          <div
            style={{ gridTemplateColumns }}
            className="grid w-full items-center justify-items-center"
          >
            {columnsCount.map((_, i) => (
              <h2 key={i} className="col-header">
                {sheets.selectedSheet?.colNames[i].value || 'N/A'}
              </h2>
            ))}
          </div>
        </header>
        <section className="flex max-h-[70vh] flex-col gap-1">
          {rowsCount.map((_, i) => (
            <RowItem key={i} row={i} />
          ))}
        </section>
      </div>
      <button
        className="sheet-btn mt-4 w-full"
        onClick={sheets.selectedSheet?.addRow}
      >
        + Add Row
      </button>
    </section>
  );
});
