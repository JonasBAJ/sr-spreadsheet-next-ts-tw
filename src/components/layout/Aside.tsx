import { useGlobalState } from '../../utils/hooks/useGlobalState';
import { observer } from 'mobx-react-lite';
import { Logo } from '../svg/Logo';
import { Close } from '../svg/Close';

export const Aside = observer(() => {
  const { ui, sheets } = useGlobalState();
  const allSheets = Array.from(sheets.sheets.values());

  const createNewSheet = () => {
    const sheet = sheets.createNewSheet();
    sheets.setSelectedSheetId(sheet.id);
  };

  const selectSheet = (id: string) => () => {
    sheets.setSelectedSheetId(id);
    ui.toggleAsside();
  };

  return ui.asideOpen ? (
    <aside className="fixed left-0 top-0 z-20 h-full w-64 bg-header p-4 text-white">
      <div className="flex justify-between">
        <div className="flex gap-[6px]">
          <Logo />
          <p className="font-montserrat font-medium">Return Calc</p>
        </div>
        <button onClick={ui.toggleAsside}>
          <Close />
        </button>
      </div>
      <div className="my-4 h-[1px] w-full bg-white" />
      <div className="flex flex-col gap-2">
        {allSheets.map((s) => (
          <button
            key={s.id}
            onClick={selectSheet(s.id)}
            className="sheet-btn w-full truncate border border-white bg-transparent text-left"
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="my-4 h-[1px] w-full bg-white" />
      <button
        onClick={createNewSheet}
        className="sheet-btn w-full border border-white bg-transparent"
      >
        + New Sheet
      </button>
    </aside>
  ) : null;
});
