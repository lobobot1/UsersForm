import { fetch, safeFetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useQuestions() {
  const swr = useSWR('/api/questions', fetch)

  const createQuestion = useCallback(
    async (data) => {
      const res = await safeFetch('/api/questions/create', {
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

  return { ...swr, questions: swr.data, createQuestion }
}
