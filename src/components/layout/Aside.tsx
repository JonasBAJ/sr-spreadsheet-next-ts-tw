import { useGlobalState } from "../../utils/hooks/useGlobalState";
import { observer } from "mobx-react-lite";
import { Logo } from "../svg/Logo";
import { Close } from "../svg/Close";

export const Aside = observer(() => {
  const { ui } = useGlobalState();

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
    </aside>
  ) : null;
});
