import CreateUserForm from './CreateUserForm'
import UserList from './UserList'

export const metadata = {
  title: 'Settings | Users',
}

const Page = async () => {
  return (
    <div className='lg:flex gap-8'>
      <div className='grow'>
        <h1 className='text-xl font-bold mb-3'>Users</h1>
        <UserList />
      </div>

      <div className='w-full lg:max-w-xs'>
        <h2 className='text-xl font-bold mb-3 mt-3 lg:mt-0'>
          Create a new user
        </h2>
        <div className='bg-white p-2 text-black rounded-md'>
          <CreateUserForm />
        </div>
      </div>
    </div>
  )
}

export default Page
