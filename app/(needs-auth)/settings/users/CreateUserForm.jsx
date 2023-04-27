'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import useUsers from '@/app/hooks/useUsers'
import { useState } from 'react'
import UserForm from './UserForm'

const CreateUserForm = () => {
  const [error, setError] = useState(null)
  const { createUser } = useUsers()

  return (
    <>
      {error && <ErrorAlert className='mb-2'>{error}</ErrorAlert>}
      <UserForm
        onSubmit={async (data) => {
          try {
            setError(null)
            await createUser(data)
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            }
            throw err
          }
        }}
        sendOnlyChangedData={false}
      />
    </>
  )
}

export default CreateUserForm
