import Link from 'next/link'
import Form from '@/app/components/form'

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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center items-center text-lg'>
          <div className=' text-justify bg-slate-200 rounded-md p-6 h-96 w-[80%] drop-shadow-xl flex justify-center items-center'>
            <p>
              1. not as pictured, it wasn’t denim, it is a flimsy blue cotton to
              look like denim. 2. shipping was $10.99 for 1st class, not
              priority. and returns are accepted, but get ready to pay $5.45 to
              return same weight package (15oz, which is xl, so probably heavier
              than most). so basically it will cost you 10.99 to try it on. 3.
              absolutely zero communication from seller.4. offered partial
              payment of $10- this is not to cover shipping- do not agree!!!
              basically he robbed me of $20, had to file claim
            </p>
          </div>

          <div className=' bg-slate-400 rounded-md p-6 w-[90%] drop-shadow-xl'>
            <Form id={params.id}/>
          </div>
        </div>
      </div>
    </main>
  )
}
