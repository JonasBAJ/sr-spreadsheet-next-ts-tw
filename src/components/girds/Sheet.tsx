import { ISheetsState, useSheets } from "../../state/sheets";
import { RowItem } from "../items/RowItem";

const selector = (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;
  return {
    cols: sheet?.cols,
    rows: sheet?.rows,
    colNames: sheet?.colNames,
    addNewRow: s.addNewRow,
  };
};

const Sheet = () => {
  const { colNames, cols, rows, addNewRow } = useSheets(selector);
  const gridTemplateColumns = "1fr ".repeat(cols || 0);
  const rowsCount: number[] = Array(rows).fill(0);
  const columnsCount: number[] = Array(cols).fill(0);

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
                {colNames?.[i].value || "N/A"}
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
      <button
        onClick={addNewRow}
        className="sheet-btn w-full mt-4"
      >
        + Add Row
      </button>
    </section>
  );
};

export default Sheet;
