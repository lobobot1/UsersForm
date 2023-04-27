
const NavbarUser = () => {
  return (
    <nav className='bg-cyan-500 h-12 flex justify-between items-center px-10'>
      <h3>User</h3>
      <button className=" text-red-700 hover:scale">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
        </svg>
      </button>
    </nav>
  )
}

export default NavbarUser
