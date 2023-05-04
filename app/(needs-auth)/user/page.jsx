'use client'
import Link from 'next/link'
import useForms from '@/app/hooks/useForms'

const User = () => {

  const { forms } = useForms()

  const dictionary = {
    'answered': 'answered',
    'revised': 'revised',
    'updated': 'updated',
    'pending': 'pending'
  }

  const arr = forms?.data

  return (
  <>
    <div className='text-neutral-800 font-bold mt-16 text-3xl py-4 px-6 flex justify-between items-center'>
      <h1>Review List</h1>

      <p className='p-2 text-center bg-teal-600 rounded-md text-neutral-50 text-xl'>Total: {forms?.data.length}</p>
    </div>

    <div className=' py-[.1rem] mx-2 rounded-md bg-neutral-500'></div>

    <section className='mt-4 p-2 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2'>

       {/* This code is rendering a list of links based on the `arr` array. The `arr` array is filtered
      based on the `FormAnswered` property of each item in the array. The filtered array is then
      mapped to a list of links using the `Link` component from the `next/link` library. The
      `className` of each link is determined based on the `FormAnswered` property and the `status`
      property of the first item in the `FormAnswered` array. The `href` of each link is set to
      `/form/${item.id}` where `item.id` is the `id` property of each item in the `arr` array. */}

      {arr && [...arr.filter(item=>!item.FormAnswered.length),...arr.filter(item=>item.FormAnswered.length && (item.FormAnswered[0].status.status=== dictionary.answered || item.FormAnswered[0].status.status === dictionary.updated)),...arr.filter(item=>item.FormAnswered.length && item.FormAnswered[0].status.status===dictionary.revised)].map((item, index) => (
        <Link
        href={`/form/${item.id}`}
        key={index}
        className={`${item?.FormAnswered.length < 1 ? 'bg-neutral-100 hover:bg-neutral-200 hover:scale-105' : item?.FormAnswered[0].status.id === 5 ? 'bg-blue-400 transition-none opacity-60 pointer-events-none cursor-default' : 'bg-green-400 hover:bg-neutral-200 hover:scale-105'} flex justify-center items-center rounded-md py-5 px-8 mb-2  cursor-pointer transition-color duration-[0.5s] delay-[50ms] text-neutral-800 font-semibold shadow-xl`}
        >
          {item.revisionText}
        </Link>
      ))}
    </section>
  </>
  )
}

export default User
