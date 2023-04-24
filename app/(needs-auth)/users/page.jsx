
import { Inter } from 'next/font/google'
import Users from '../../components/Users'

const inter = Inter({ subsets: ['latin'] })

const Page = () => {
    // example data
    let users = ['daniel','luis','agustin']
    let information =[]
  return (
    <main className="flex min-h-screen flex-col  bg-slate-400">

      <nav className=' bg-green-500 h-10 flex justify-end'>
        users
      </nav>
      <div className='p-11'>
        {/* title */}
        <div className=' text-center mb-10 text-5xl font-bold'>
          Users
        </div>

        {/* Users */}
        <Users users={users}/>
      </div>
      

  </main>
  )
}

export default Page
