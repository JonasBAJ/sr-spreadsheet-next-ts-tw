import { ISheetsState, useSheets } from "../../state/sheets";
import { RowItem } from "../items/RowItem";

const selector = (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;
  console.log(sheet);
  return {
    cols: sheet?.cols,
    rows: sheet?.rows,
    colNames: sheet?.colNames,
    updateTitle: s.updateTitle,
  };
};

const Sheet = () => {
  const { colNames, cols, rows } = useSheets(selector);
  const gridTemplateColumns = "1fr ".repeat(cols || 0);
  const rowsCount: number[] = Array(rows).fill(0);
  const columnsCount: number[] = Array(cols).fill(0);

  return (
    <section className="w-full h-full mt-[14px]">
      <header className="flex w-full gap-1 mb-4">
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
        <button className="w-12 col-header rounded-lg">+</button>
      </header>
      <section className="flex flex-col gap-1">
        {rowsCount.map((_, i) => (
          <RowItem key={i} row={i} />
        ))}
      </section>
    </section>
  );
};

export default Sheet;
