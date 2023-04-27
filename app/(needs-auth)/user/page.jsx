import Link from 'next/link'

const User = () => {
  const text = [
    '1. not as pictured, it wasn’t denim, it is a flimsy blue cotton to look like denim. 2. shipping was $10.99 for 1st class, not priority. and returns are accepted, but get ready to pay $5.45 to return same weight package (15oz, which is xl, so probably heavier than most). so basically it will cost you 10.99 to try it on. 3. absolutely zero communication from seller.4. offered partial payment of $10- this is not to cover shipping- do not agree!!! basically he robbed me of $20, had to file claim',
    'adios',
  ]
  return (
  <>
    <div className='text-neutral-800 font-bold text-3xl py-4 px-6 flex justify-between items-center'>
      <h1>Review List</h1>

      <p className='p-2 text-center bg-teal-600 rounded-md text-neutral-50 text-xl'>Total: {text.length}</p>
    </div>

    <div className=' py-[.1rem] mx-2 rounded-md bg-neutral-500'></div>

    <section className='mt-4 p-2 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2'>
      {text.map((item, index) => (
        <Link
        href={'/form'}
        key={index}
        className={`flex justify-center items-center rounded-md py-5 px-8 mb-2  cursor-pointer transition-color duration-[0.5s] bg-neutral-100 hover:bg-neutral-200 hover:scale-105 delay-[50ms] text-neutral-800 font-semibold shadow-xl`}
        >
          {item}
        </Link>
      ))}
    </section>
  </>
  )
}

export default User
