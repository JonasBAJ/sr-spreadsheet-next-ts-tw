import { CellItem } from "./CellItem";
import { observer } from 'mobx-react-lite';
import { useGlobalState } from '../../utils/hooks/useGlobalState';

interface Props {
  row: number;
}

export const RowItem = observer<Props>(({ row }) => {
  const { sheets } = useGlobalState();
  const sheet = sheets.selectedSheet;

  const cells: number[] = Array(sheets.selectedSheet?.cols).fill(0);
  const rowOnEdit = sheet?.getRow(row)?.some((c) => c?.edit);
  const rowOnError = sheet?.getRow(row)?.some((c) => c?.error);

  const gridTemplateColumns = "1fr ".repeat(sheet?.cols || 0);
  const errorStyle = rowOnError
    ? "shadow-lg border-[1px] border-error-border"
    : "";

  return (
    <div className='flex gap-1'>
      <div
        style={{ gridTemplateColumns }}
        className={`w-full grid justify-items-center items-center rounded-lg ${errorStyle}`}
      >
        {cells.map((_, i) => {
          return (
            <CellItem
              key={i}
              col={i}
              row={row}
              rowOnEdit={rowOnEdit}
              last={i === cells.length - 1}
            />
          );
        })}
      </div>
      {/* <button onClick={() => removeRow(row)} className="sheet-btn">-</button> */}
    </div>
  );
});
