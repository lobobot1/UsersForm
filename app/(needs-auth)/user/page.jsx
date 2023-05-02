'use client'
import Link from 'next/link'
import useForms from '@/app/hooks/useForms'
//import route from '@app/api/forms/route'
//
const User = () => {

  const { forms } = useForms()
  console.log(forms?.data);

  return (
  <>
    <div className='text-neutral-800 font-bold text-3xl py-4 px-6 flex justify-between items-center'>
      <h1>Review List</h1>

      <p className='p-2 text-center bg-teal-600 rounded-md text-neutral-50 text-xl'>Total: {forms?.data.length}</p>
    </div>

    <div className=' py-[.1rem] mx-2 rounded-md bg-neutral-500'></div>

    <section className='mt-4 p-2 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2'>
      {forms?.data.map((item, index) => (
        <Link
        href={`/form/${item.id}`}
        key={index}
        className={`flex justify-center items-center rounded-md py-5 px-8 mb-2  cursor-pointer transition-color duration-[0.5s] bg-neutral-100 hover:bg-neutral-200 hover:scale-105 delay-[50ms] text-neutral-800 font-semibold shadow-xl`}
        >
          {item.revisionText}
        </Link>
      ))}
    </section>
  </>
  )
}

export default User
