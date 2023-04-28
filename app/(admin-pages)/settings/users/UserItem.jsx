import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
import { useCallback, useState } from 'react'
import UpdateUserForm from './UpdateUserForm'

/**
 * @param {{
 *  user: import('./types').User,
 *  onDelete: (userId: number) => Promise<void>
 * }} props
 */
const UserItem = ({ user, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const closeEditUser = useCallback(() => setIsEditing(false), [])

  return (
    <li key={user.id} className='rounded-md p-2 bg-white text-black relative'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span>
            {user.nickname} | {user.name} {user.lastname} |{' '}
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
          <EditButton onClick={() => setIsEditing(true)} title='Edit' />
        </div>
      )}
      {isEditing && (
        <>
          <DeleteButton
            entity='user'
            onConfirm={async () => {
              setIsDeleting(true)
              try {
                await onDelete(user.id)
              } catch (error) {
                throw error
              } finally {
                setIsDeleting(false)
              }
            }}
            isDeleting={isDeleting}
          />
          <UpdateUserForm
            user={user}
            onSubmit={closeEditUser}
            onCancel={closeEditUser}
          />
        </>
      )}
    </li>
  )
}

export default UserItem
