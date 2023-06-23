import { KeyboardEvent, useEffect, useState } from 'react';
import { SpyGlass } from '../svg/SpyGlass';
import { useGlobalState } from '../../utils/hooks/useGlobalState';
import { observer } from 'mobx-react-lite';

export const SearchInput = observer(() => {
  const { search } = useGlobalState();
  const [value, setValue] = useState('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search.setSearchVal(value);
    }
  };

  useEffect(() => {
    if (!value) {
      search.setSearchVal(undefined);
    }
  }, [value]);

  return (
    <div className="relative flex w-full overflow-hidden rounded-[5px]">
      <div className="absolute left-4 top-[13px]">
        <SpyGlass />
      </div>
      <input
        value={value}
        type="search"
        onKeyDown={onKeyDown}
        className="w-full rounded-[5px] bg-layout py-[7px] pl-10 pr-4 font-montserrat"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a search query to filter"
      />
    </div>
  );
});
