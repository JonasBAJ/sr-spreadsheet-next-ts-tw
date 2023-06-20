import dynamic from 'next/dynamic'
import { MacHeader } from '../components/headers/MacHeader'
import { SearchInput } from '../components/inputs/SearchInput'

const Sheet = dynamic(() => import('../components/girds/Sheet'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const Home = () => {
  return (
    <div className='h-screen w-screen bg-white'>
      <MacHeader/>
      <main className='max-w-[615px] w-full mx-auto pt-[34px]'>
        <h1 className='text-black font-montserrat font-bold text-xl mb-[4px]'>
          Your Personal Staking Calculator
        </h1>
        <SearchInput onEnter={console.log}/>
        <Sheet/>
      </main>
    </div>
  )
}

export default Home
