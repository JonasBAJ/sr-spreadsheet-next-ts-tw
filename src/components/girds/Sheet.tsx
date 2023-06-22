import { RowItem } from "../items/RowItem";
import { useGlobalState } from '../../utils/hooks/useGlobalState';
import { observer } from 'mobx-react-lite';

export const Sheet = observer(() => {
  const { sheets } = useGlobalState();
  const gridTemplateColumns = "1fr ".repeat(sheets.selectedSheet?.cols || 0);
  const rowsCount: number[] = Array(sheets.selectedSheet?.rows).fill(0);
  const columnsCount: number[] = Array(sheets.selectedSheet?.cols).fill(0);

  console.log(sheets.selectedSheet?.cells);
  return (
    <section className="w-full h-full mt-[14px]">
      <div className='overflow-x-scroll'>
        <header className="flex gap-1 mb-4">
          <div
            style={{ gridTemplateColumns }}
            className="w-full grid justify-items-center items-center"
          >
            {columnsCount.map((_, i) => (
              <h2 key={i} className="col-header">
                {sheets.selectedSheet?.colNames[i].value || "N/A"}
              </h2>
            ))}
          </div>
          {/* <button className="sheet-btn">+</button> */}
        </header>
        <section className="flex flex-col gap-1 max-h-[70vh]">
          {rowsCount.map((_, i) => (
            <RowItem key={i} row={i} />
          ))}
        </section>
      </div>
      {/* <button
        onClick={addNewRow}
        className="sheet-btn w-full mt-4"
      >
        + Add Row
      </button> */}
    </section>
  );
});
