import PencilSquare from '@/app/components/icons/PencilSquare'
import { useCallback, useState } from 'react'
import UpdateUserForm from './UpdateUserForm'

/** @param {{ user: import('./types').User }} props */
const UserItem = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const closeEditUser = useCallback(() => setIsEditing(false), [])

  return (
    <li key={user.id} className='rounded-md p-2 bg-white text-black'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span>
            {user.nickname} | {user.name} {user.lastname} |{' '}
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
          <button onClick={() => setIsEditing(true)} title='Edit'>
            <PencilSquare />
          </button>
        </div>
      )}
      {isEditing && (
        <UpdateUserForm
          user={user}
          onSubmit={closeEditUser}
          onCancel={closeEditUser}
        />
      )}
    </li>
  )
}

export default UserItem
