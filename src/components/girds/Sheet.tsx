import { ISheetsState, useSheets } from "../../state/sheets";
import { RowItem } from '../items/RowItem';

const selector = (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  return {
    sheet: selectedId ? s.sheets[selectedId] : null,
    updateTitle: s.updateTitle,
  };
};

const Sheet = () => {
  const { sheet } = useSheets(selector);
  const gridTemplateColumns = "1fr ".repeat(sheet?.cols || 0);

  return (
    <section className="w-full h-full mt-[14px]">
      <header className="flex w-full gap-1 mb-4">
        <div
          style={{ gridTemplateColumns }}
          className="w-full grid justify-items-center items-center"
        >
          {Array(sheet?.cols)
            .fill(0)
            .map((_, i) => (
              <h2 key={i} className="col-header">
                {sheet?.colNames[i].value || "N/A"}
              </h2>
            ))}
        </div>
        <button className="w-12 col-header rounded-lg">+</button>
      </header>
      <section className="flex flex-col gap-1">
        {Array(sheet?.rows)
          .fill(0)
          .map((_, i) => (
            <RowItem key={i} cells={sheet?.data[i] || []} cols={sheet?.cols || 0} />
          ))}
      </section>
    </section>
  );
};

export default Sheet;
