'use client'

import useUsers from '@/app/hooks/useUsers'
import UserItem from './UserItem'

const UserList = () => {
  const { users, error, isLoading, deleteUser } = useUsers()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul className='space-y-3'>
      {users?.data.map((user) => (
        <UserItem key={user.id} user={user} onDelete={deleteUser} />
      ))}
    </ul>
  )
}

export default UserList
