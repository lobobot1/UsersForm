import React from 'react'
import Link from 'next/link'

const User = () => {
    const text = ['1. not as pictured, it wasn’t denim, it is a flimsy blue cotton to look like denim. 2. shipping was $10.99 for 1st class, not priority. and returns are accepted, but get ready to pay $5.45 to return same weight package (15oz, which is xl, so probably heavier than most). so basically it will cost you 10.99 to try it on. 3. absolutely zero communication from seller.4. offered partial payment of $10- this is not to cover shipping- do not agree!!! basically he robbed me of $20, had to file claim', 'adios']
  return (
    <main className="flex min-h-screen flex-col bg-[#0B132B]">
        <nav className='bg-cyan-500 h-12 flex justify-between items-center px-10'>
           <h3>
                User
           </h3>
           <button>
                Logout
           </button>
        </nav>
      <div className='p-11 flex flex-col justify-center'>
        <h1 className='text-5xl text-center font-bold text-[#5BC0BE]'>
            Text List Total: <strong className='text-purple-600'>{text.length}</strong>
        </h1>

        <div className='flex flex-col gap-2 mt-10 mx-16'>
            {
                text.map((item, index) => (
                    <Link href={'/form'}  key={index} className={`flex justify-center items-center rounded-md py-5 px-8 mb-2 box-border border-2 border-black border-solid shadow-[12px_17px_51px_rgba(0,0,0,0.22)] cursor-pointer transition-color duration-[0.5s] select-none font-[bolder] text-[black] bg-[#545E75] hover:border-slate-300 delay-[50ms] text-lg font-[543]`}>
                        <h2>
                            {item}
                        </h2>
                    </Link>
                ))
            }
        </div>
      </div>
    </main>
  )
}

export default User
