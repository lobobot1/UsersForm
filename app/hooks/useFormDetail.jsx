import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useFormDetail(id, enabled = true) {
  const swr = useSWR(enabled ? `/api/forms/${id}` : null, fetch)

  const sendReply = useCallback(
    
    async (data) => {
      await fetch(`/api/forms/${id}/reply`, {
        method: 'POST',
        body: data,
      })
      swr.mutate()
    },
    [swr , id]
  )

  return { ...swr, form: swr.data , sendReply}
}
