import { HeaderButton } from '../buttons/HeaderButton'

export const MacHeader = () => {
  return (
    <header className='w-full bg-header/[.05] h-[35px]'>
      <div className='flex items-center max-w-[1000px] h-full px-[15px]'>
        <div className='flex gap-[6px]'>
          <HeaderButton
            color='bg-old-red'
            onClick={() => alert('TODO 1')}
          />
          <HeaderButton
            color='bg-yellow'
            onClick={() => alert('TODO 2')}
          />
          <HeaderButton
            color='bg-green'
            onClick={() => alert('TODO 3')}
          />
        </div>
      </div>
    </header>
  )
}
