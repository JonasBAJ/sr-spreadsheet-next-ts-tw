import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { SpyGlass } from '../svg/SpyGlass'
import { useSearch } from '../../state/search';

export const SearchInput: FC = () => {
  const { setSearchVal } = useSearch()
  const [value, setValue] = useState('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchVal(value);
    }
  }

  useEffect(() => {
    if (!value) {
      setSearchVal(null);
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
}
