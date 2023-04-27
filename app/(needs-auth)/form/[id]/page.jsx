import NavbarUser from "../../NavbarUser"
import Form from "../../../components/form"

//const inter = Inter({ subsets: ['latin'] })

export default function Home({children}) {
  return (
    <main className="flex min-h-screen flex-col bg-[#0B132B]">
      <NavbarUser/>
      <div className="text-5xl text-white px-11 pt-11">
        <button className=" rounded-md">
        {'<-'}
        </button>
      </div>
      <div className="p-11">
        {/* title */}
        <div className=' text-center mb-16 text-6xl font-bold text-[#5BC0BE]'>
          Form
        </div>

        {/* Information */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center items-center text-lg'>
          
          <div className=' text-justify bg-slate-300 rounded-md p-6 h-96 w-[80%] drop-shadow-xl flex justify-center items-center'>
            <p>
            1. not as pictured, it wasn’t denim, it is a flimsy blue cotton to look like denim. 2. shipping was $10.99 for 1st class, not priority. and returns are accepted, but get ready to pay $5.45 to return same weight package (15oz, which is xl, so probably heavier than most). so basically it will cost you 10.99 to try it on. 3. absolutely zero communication from seller.4. offered partial payment of $10- this is not to cover shipping- do not agree!!! basically he robbed me of $20, had to file claim
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
