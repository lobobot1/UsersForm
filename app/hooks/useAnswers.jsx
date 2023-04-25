import { fetch, safeFetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useAnswers() {
  const swr = useSWR('/api/answers', fetch)

  const createAnswer = useCallback(
    async (data) => {
      const res = await safeFetch('/api/answers/create', {
        method: 'POST',
        body: data,
      })
      if (!res.error) {
        swr.mutate()
      }
      return res
    },
    [swr]
  )

  return { ...swr, answers: swr.data, createAnswer }
}
