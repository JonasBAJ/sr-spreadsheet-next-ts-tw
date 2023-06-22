import { KeyboardEvent, useEffect, useState } from 'react';
import { SpyGlass } from '../svg/SpyGlass'
import { useGlobalState } from '../../utils/hooks/useGlobalState';
import { observer } from 'mobx-react-lite';

export const SearchInput = observer(() => {
  const { search } = useGlobalState();
  const [value, setValue] = useState('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search.setSearchVal(value);
    }
  }

  useEffect(() => {
    if (!value) {
      search.setSearchVal(undefined);
    }
  }, [value])

  return (
    <div className='flex w-full relative rounded-[5px] overflow-hidden'>
      <div className='absolute top-[13px] left-4'>
        <SpyGlass/>
      </div>
      <input
        value={value}
        type="search"
        onKeyDown={onKeyDown}
        className='bg-layout w-full pl-10 pr-4 py-[7px] rounded-[5px] font-montserrat'
        onChange={e => setValue(e.target.value)}
        placeholder='Type a search query to filter'
      />
    </div>
  )
})
