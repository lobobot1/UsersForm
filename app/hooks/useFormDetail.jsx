import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export default function useFormDetail(id, enabled = true) {
  const swr = useSWR(enabled ? `/api/forms/${id}` : null, fetch)
  const { mutate } = useSWRConfig()

  const sendReply = useCallback(
    async (data) => {
      await fetch(`/api/forms/${id}/reply`, {
        method: 'POST',
        body: data,
      })
      swr.mutate()
    },
    [swr, id]
  )

  const updateResponses = useCallback(
    /**
     * @param {{
     *  answers: { answer?: string, id }[],
     *  status: { id: number }
     * }} data
     */
    async (data) => {
      await fetch(`/api/forms/${id}/reply`, {
        method: 'PUT',
        body: data,
      })
      await swr.mutate()
      await mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/forms'),
        undefined,
        { revalidate: true }
      )
    },
    [swr, id, mutate]
  )

  return { ...swr, form: swr.data, sendReply, updateResponses }
}
