import { MacHeader } from "../components/layout/Header";
import { SearchInput } from "../components/inputs/SearchInput";
import { Loader } from "../components/svg/Loader";
import { Sheet } from "../components/girds/Sheet";
import { getReadableStatus } from "../utils/status";
import { Check } from "../components/svg/Check";
import { observer } from "mobx-react-lite";
import { useGlobalState } from "../utils/hooks/useGlobalState";
import { DocumentContext } from "next/document";
import { getCookie } from "cookies-next";
import { Aside } from '../components/layout/Aside';

export const getServerSideProps = (ctx: DocumentContext) => {
  const storeSnaptchot = getCookie("store", ctx);
  return {
    props: {
      storeSnaptchot
    },
  };
};

const Home = observer(() => {
  const { sheets } = useGlobalState();

  return (
    <div className="h-screen w-screen bg-white">
      <MacHeader />
      <Aside/>
      <main className="container mx-auto max-w-6xl p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-black font-montserrat font-bold text-xl">
            {sheets.selectedSheet?.title}
          </h1>
          <div className="flex gap-2 rounded-lg items-center px-2 py-1 bg-col-header text-black/50">
            {sheets.selectedSheet?.status === "DONE" && <Check />}
            {sheets.selectedSheet?.status === "IN_PROGRESS" && <Loader />}
            <p className="text-sm font-montserrat font-medium">
              {getReadableStatus(sheets.selectedSheet?.status)}
            </p>
          </div>
        </div>
        <SearchInput />
        <Sheet />
      </main>
    </div>
  );
});

export default Home;
