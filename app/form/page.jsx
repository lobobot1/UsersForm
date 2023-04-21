import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-11 bg-slate-500">
      
      {/* title */}
      <div className=' text-center mb-10 text-5xl font-bold'>
        Form
      </div>

      {/* Information */}
      <div className='grid grid-cols-2 gap-4 justify-items-center text-lg'>
        
        <div className=' bg-slate-200 text-center rounded-md p-6 h-96 w-[80%] drop-shadow-xl'>
          information
        </div>

        <div className=' bg-green-400 rounded-md p-6 w-[90%] drop-shadow-xl'>
          section
        </div>
      </div>
    </main>
  )
}
