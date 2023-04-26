import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useQuestions() {
  const swr = useSWR('/api/questions', fetch)

  const createQuestion = useCallback(
    /**
     * @param {{ question: string, answers: string[] }} data
     */
    async (data) => {
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
    },
    [swr]
  )

  const updateQuestion = useCallback(
    /**
     * @param {{ question: string }} data
     * @param {number} questionId
     */
    async (data, questionId) => {
      const res = await fetch(`/api/questions/${questionId}/update`, {
        method: 'PUT',
        body: data,
      })

      // const promises = data.answers.map(
      //   async (answer) =>
      //     await fetch('/api/answers/create', {
      //       method: 'POST',
      //       body: { answer, questionId: res.data.id },
      //     })
      // )
      // await Promise.all(promises)
      swr.mutate()
    },
    [swr]
  )

  return { ...swr, questions: swr.data, createQuestion, updateQuestion }
}
