import { fetch, safeFetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useQuestions() {
  const swr = useSWR('/api/questions', fetch)

  /**
   * @param {{ question: string, answers: string[] }} data
   */
  const createQuestion = useCallback(
    async (data) => {
      try {
        const res = await fetch('/api/questions/create', {
          method: 'POST',
          body: { question: data.question },
        })

        const promises = data.answers.map(
          async (answer) =>
            await fetch('/api/answers/create', {
              method: 'POST',
              body: { answer, questionId: res.data.id },
            })
        )
        await Promise.all(promises)
        swr.mutate()
      } catch (error) {
        return error
      }
    },
    [swr]
  )

  return { ...swr, questions: swr.data, createQuestion }
}
