import dynamic from 'next/dynamic'
import { MacHeader } from '../components/headers/MacHeader'
import { SearchInput } from '../components/inputs/SearchInput'
import { useContinuousSync } from '../utils/hooks/useContinuousSync'

const Sheet = dynamic(() => import('../components/girds/Sheet'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const Home = () => {
  useContinuousSync();

  return (
    <div className='h-screen w-screen bg-white'>
      <MacHeader/>
      <main className='container mx-auto max-w-6xl p-4'>
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
