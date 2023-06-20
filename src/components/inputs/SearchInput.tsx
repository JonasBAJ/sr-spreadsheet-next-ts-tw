import { FC, KeyboardEvent, useState } from 'react';
import { SpyGlass } from '../svg/SpyGlass'

interface Props {
  onEnter: (query: string) => void;
}

export const SearchInput: FC<Props> = ({ onEnter }) => {
  const [value, setValue] = useState('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(value);
    }
  }

  return (
    <div className='flex w-full relative rounded-[5px] overflow-hidden'>
      <div className='absolute top-[13px] left-4'>
        <SpyGlass/>
      </div>
      <input
        value={value}
        onKeyDown={onKeyDown}
        className='bg-layout w-full pl-10 pr-4 py-[7px] rounded-[5px] font-montserrat'
        onChange={e => setValue(e.target.value)}
        placeholder='Type a search query to filter'
      />
    </div>
  )
}
