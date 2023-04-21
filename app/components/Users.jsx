import Link from "next/link"
const Users = ({users}) => {

  return (
    <nav className='grid grid-cols-3 gap-4 justify-items-center text-lg mb-5'>
      {users.map(user => {return (
        <Link
          className=" bg-blue-500 p-4 rounded-lg w-[40%] text-center transition-colors ease-in hover:bg-blue-700 text-2xl "
          key={user}
          href={`/users/${user}`}
        >
          {user}
        </Link>
      );})}
    </nav>
  )
}

export default Users