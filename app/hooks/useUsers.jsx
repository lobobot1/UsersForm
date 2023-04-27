import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useUsers() {
  const swr = useSWR('/api/users', fetch)

  const createUser = useCallback(
    /** @param {import('../(needs-auth)/settings/users/types').UserFormValues} data */
    async (data) => {
      await fetch('/api/auth/register', {
        method: 'POST',
        body: data,
      })
      swr.mutate()
    },
    [swr]
  )

  const updateUser = useCallback(
    /**
     * @param {import('../(needs-auth)/settings/users/types').UserFormValues} data
     * @param {number} userId
     */
    async (data, userId) => {
      await fetch(`/api/users/${userId}/update`, {
        method: 'PUT',
        body: data,
      })
      swr.mutate()
    },
    [swr]
  )

  return { ...swr, users: swr.data, createUser, updateUser }
}
