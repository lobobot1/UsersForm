import CloseButton from '@/app/components/CloseButton'
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
          <span className='line-clamp-1'>
            {user.nickname} | {user.name} {user.lastname} |{' '}
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
          <EditButton onClick={() => setIsEditing(true)} title='Edit' />
        </div>
      )}
      {isEditing && (
        <>
          <CloseButton
            className='absolute right-2 top-2'
            onClick={closeEditUser}
          />
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
            className='absolute bottom-3 left-3'
          />
          <UpdateUserForm user={user} onSubmit={closeEditUser} />
        </>
      )}
    </li>
  )
}

export default UserItem
