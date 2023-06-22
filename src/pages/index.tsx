import { MacHeader } from "../components/headers/MacHeader";
import { SearchInput } from "../components/inputs/SearchInput";
import { useContinuousSync } from "../utils/hooks/useContinuousSync";
import { Loader } from "../components/svg/Loader";
import { useIsClient } from "../utils/hooks/useIsClient";
import Sheet from "../components/girds/Sheet";
import { getReadableStatus } from "../utils/status";
import { Check } from "../components/svg/Check";
import { ErrorSvg } from "../components/svg/ErrorSvg";
import { observer } from 'mobx-react-lite';
import { useState } from '../utils/hooks/useState';

const Home = observer(() => {
  const { isClient } = useIsClient();
  const { sheets } = useState();

  // useContinuousSync();

  return (
    <div className="h-screen w-screen bg-white">
      <MacHeader />
      <main className="container mx-auto max-w-6xl p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-black font-montserrat font-bold text-xl">
            {sheets.selectedSheet?.title}
          </h1>
          <div className="flex gap-2 rounded-lg items-center px-2 py-1 bg-col-header text-black/50">
            {isClient && (
              <>
                {sheets.selectedSheet?.status === "DONE" && <Check />}
                {sheets.selectedSheet?.status === "ERROR" && <ErrorSvg />}
                {sheets.selectedSheet?.status === "IN_PROGRESS" && <Loader />}
                <p className="text-sm font-montserrat font-medium">
                  {getReadableStatus(sheets.selectedSheet?.status)}
                </p>
              </>
            )}
          </div>
        </div>
        <SearchInput />
        {isClient && <Sheet />}
      </main>
    </div>
  );
});

export default Home;
