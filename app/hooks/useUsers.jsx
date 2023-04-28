import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useUsers() {
  const swr = useSWR('/api/users', fetch)

  const createUser = useCallback(
    /** @param {import('../(admin-pages)/settings/users/types').UserUserValues} data */
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
     * @param {import('../(admin-pages)/settings/users/types').UserUserValues} data
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

  const deleteUser = useCallback(
    /** @param {number} userId */
    async (userId) => {
      await fetch(`/api/users/${userId}/delete`, { method: 'DELETE' })
      await swr.mutate()
    },
    [swr]
  )

  return { ...swr, users: swr.data, createUser, updateUser, deleteUser }
}
