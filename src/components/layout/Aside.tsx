import { useGlobalState } from "../../utils/hooks/useGlobalState";
import { observer } from "mobx-react-lite";
import { Logo } from "../svg/Logo";
import { Close } from "../svg/Close";


export const Aside = observer(() => {
  const { ui, sheets } = useGlobalState();
  const allSheets = Array.from(sheets.sheets.values());

  const createNewSheet = () => {
    const sheet = sheets.createNewSheet();
    sheets.setSelectedSheetId(sheet.id);
  }

  const selectSheet = (id: string) => () => {
    sheets.setSelectedSheetId(id)
    ui.toggleAsside()
  }

  return ui.asideOpen ? (
    <aside className="fixed top-0 left-0 w-64 h-full p-4 bg-header text-white z-20">
      <div className="flex justify-between">
        <div className="flex gap-[6px]">
          <Logo />
          <p className="font-montserrat font-medium">Return Calc</p>
        </div>
        <button onClick={ui.toggleAsside}>
          <Close />
        </button>
      </div>
      <div className="h-[1px] w-full bg-white my-4" />
      <div className="flex flex-col gap-2">
        {allSheets.map((s) => (
          <button
            key={s.id}
            onClick={selectSheet(s.id)}
            className="sheet-btn bg-transparent border border-white w-full text-left truncate"
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="h-[1px] w-full bg-white my-4" />
      <button
        onClick={createNewSheet}
        className="sheet-btn bg-transparent border border-white w-full"
      >
        + New Sheet
      </button>
    </aside>
  ) : null;
});
