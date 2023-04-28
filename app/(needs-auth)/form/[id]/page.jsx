import Link from 'next/link'
import FormPage from '@/app/components/formPage'

//const inter = Inter({ subsets: ['latin'] })

export default function Home({ params }) {
  

  return (
    <main className='flex flex-col bg-neutral-200 min-h-screen'>
      <div className='text-5xl text-black pl-11 pt-11 flex justify-start '>
        <Link href={'/user'} className=' rounded-md mr-5'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div className=' text-center text-6xl font-bold text-[#5BC0BE]'>
          Form
        </div>
      </div>
      <div className='p-11'>
        {/* Information */}
        <FormPage id={params.id}/>
      </div>
    </main>
  )
}
