import Link from 'next/link'

const NavbarUser = () => {
  return (
    <nav className='bg-neutral-50 fixed top-0 w-full z-10 shadow-md flex justify-between items-center px-6 py-2'>
      <h3 className="font-bold text-xl text-neutral-800">Welcome, <span className="text-teal-600">User</span>!</h3>
      
      <Link href='/api/auth/logout'
        prefetch={false}
        className="p-2 text-red-700 hover:text-red-900 font-semibold flex gap-1 items-center cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg> Logout
      </Link>
    </nav>
  )
}

export default NavbarUser
