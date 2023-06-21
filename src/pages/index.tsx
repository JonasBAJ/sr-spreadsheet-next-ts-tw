import dynamic from "next/dynamic";
import { MacHeader } from "../components/headers/MacHeader";
import { SearchInput } from "../components/inputs/SearchInput";
import { useContinuousSync } from "../utils/hooks/useContinuousSync";
import { ISheetsState, useSheets } from "../state/sheets";
import { Loader } from "../components/svg/Loader";
import { useIsClient } from "../utils/hooks/useIsClient";
import Sheet from "../components/girds/Sheet";
import { getReadableStatus } from "../utils/status";
import { Check } from "../components/svg/Check";
import { ErrorSvg } from '../components/svg/ErrorSvg';

const selector = (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;
  return {
    sheetStatus: sheet?.status,
  };
};

const Home = () => {
  const { isClient } = useIsClient();
  const { sheetStatus } = useSheets(selector);

  useContinuousSync();

  return (
    <div className="h-screen w-screen bg-white">
      <MacHeader />
      <main className="container mx-auto max-w-6xl p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-black font-montserrat font-bold text-xl">
            Your Personal Staking Calculator
          </h1>
          <div className="flex gap-2 rounded-lg items-center px-2 py-1 bg-col-header text-black/50">
            {isClient && (
              <>
                {sheetStatus === "DONE" && <Check />}
                {sheetStatus === "ERROR" && <ErrorSvg />}
                {sheetStatus === "IN_PROGRESS" && <Loader />}
                <p className="text-sm font-montserrat font-medium">
                  {getReadableStatus(sheetStatus)}
                </p>
              </>
            )}
          </div>
        </div>
        <SearchInput onEnter={console.log} />
        {isClient && <Sheet />}
      </main>
    </div>
  );
};

export default Home;
