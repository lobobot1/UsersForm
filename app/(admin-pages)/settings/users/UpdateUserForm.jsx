'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import useUsers from '@/app/hooks/useUsers'
import { useState } from 'react'
import UserForm from './UserForm'

/**
 * @param {{
 *  user: import('./types').User
 *  onSubmit?: () => void
 * }} props
 */
const UpdateUserForm = ({ user, onSubmit }) => {
  const [error, setError] = useState(null)
  const { updateUser } = useUsers()

  return (
    <>
      {error && <ErrorAlert className='mb-2'>{error}</ErrorAlert>}
      <UserForm
        onSubmit={async (data) => {
          try {
            setError(null)
            await updateUser(data, user.id)
            onSubmit?.()
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            }
          }
        }}
        defaultValues={{ ...user, isAdmin: user.isAdmin.toString() }}
        buttonText='Update'
        requirePassword={false}
      />
    </>
  )
}

export default UpdateUserForm
