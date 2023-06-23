import { observer } from 'mobx-react-lite';
import { Hamburger } from '../svg/Hamburger';
import { Logo } from '../svg/Logo';
import { useGlobalState } from '../../utils/hooks/useGlobalState';

export const MacHeader = observer(() => {
  const { ui } = useGlobalState();
  return (
    <header className="w-full bg-header/[.05] p-4">
      <div className="flex h-full max-w-[1000px] items-center">
        <button className="flex gap-[6px]" onClick={ui.toggleAsside}>
          <Hamburger />
          <div className="w-2" />
          <Logo />
          <p className="font-montserrat font-medium">Return Calc</p>
        </button>
      </div>
    </header>
  );
});
