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
import { Aside } from "../components/layout/Aside";
import { Pencil } from "../components/svg/Pencil";
import { useEffect, useRef, useState, KeyboardEvent } from 'react';

export const getServerSideProps = (ctx: DocumentContext) => {
  const snap = getCookie("store", ctx);
  return {
    props: {
      storeSnaptchot: snap || null,
    },
  };
};

const Home = observer(() => {
  const { sheets } = useGlobalState();
  const ref = useRef<HTMLInputElement>(null);
  const [editTitle, setEditTile] = useState(false);
  const [title, setTitle] = useState(sheets.selectedSheet?.title || '');

  useEffect(() => {
    if (editTitle && ref.current) {
      ref.current.focus();
    }
  }, [editTitle, ref.current])

  const toggleEdit = () => {
    setEditTile(!editTitle);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sheets.selectedSheet?.setTitle(title)
      toggleEdit();
    }
  }

  return (
    <div className="h-screen w-screen bg-white">
      <MacHeader />
      <Aside />
      <main className="container mx-auto max-w-6xl p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <div className='flex gap-2 items-center'>
            {editTitle ? (
              <input
                ref={ref}
                value={title}
                onKeyDown={onKeyDown}
                className='cell-input text-left'
                onChange={e => setTitle(e.target.value)}
              />
            ): (
              <h1 className="text-black font-montserrat font-bold text-xl">
                {sheets.selectedSheet?.title}
              </h1>
            )}
            <button onClick={toggleEdit} className="p-2">
              <Pencil />
            </button>
          </div>
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
