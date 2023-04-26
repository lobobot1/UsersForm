import Form from "../components/form"

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-11 bg-[#0B132B]">
      <div className="text-5xl text-white">
        <button className=" rounded-md">
        {'<-'}
        </button>
      </div>
      <div>
        {/* title */}
        <div className=' text-center mb-16 text-5xl font-bold text-[#5BC0BE]'>
          Form
        </div>

        {/* Information */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center items-center text-lg'>
          
          <div className=' text-justify bg-slate-300 rounded-md p-6 h-96 w-[80%] drop-shadow-xl flex justify-center items-center'>
            <p>
            ⭐️ nice part⭐️ great⭐️seller ⭐️fast shipping ⭐️
            </p>
          </div>

          <div className=' bg-slate-400 rounded-md p-6 w-[90%] drop-shadow-xl'>
            <Form />
          </div>
        </div>
      </div>
    </main>
  )
}
