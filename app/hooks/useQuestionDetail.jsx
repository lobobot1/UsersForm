import { fetch } from '@lib/fetch'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { useSWRConfig } from 'swr'

/**
 * @param {number} questionId
 * @param {boolean} enabled
 */
export default function useQuestionDetail(questionId, enabled) {
  const swr = useSWR(enabled ? `/api/questions/${questionId}` : null, fetch)
  const { mutate } = useSWRConfig()
  const [isDeleting, setIsDeleting] = useState(false)

  const updateQuestion = useCallback(
    /**
     * @param {{ question: string, answers: { id?: number, value: string, isNew: boolean }[], deletedAnswersIds: number[] }} data
     */
    async (data) => {
      await fetch(`/api/questions/${questionId}/update`, {
        method: 'PUT',
        body: data,
      })

      const createOrUpdatePromises = data.answers.map(async (answer) => {
        if (answer.isNew) {
          await fetch(`/api/answers/create`, {
            method: 'POST',
            body: { answer: answer.value, questionId },
          })
        } else {
          await fetch(`/api/answers/${answer.id}/update`, {
            method: 'PUT',
            body: { answer: answer.value, questionId },
          })
        }
      })

      const deletePromises = data.deletedAnswersIds.map(
        async (id) =>
          await fetch(`/api/answers/${id}/delete`, {
            method: 'DELETE',
          })
      )

      await Promise.all([...createOrUpdatePromises, ...deletePromises])
      await swr.mutate()
      await mutate('/api/questions')
    },
    [swr, questionId, mutate]
  )

  const deleteQuestion = useCallback(async () => {
    setIsDeleting(true)
    try {
      await fetch(`/api/questions/${questionId}/delete`, {
        method: 'DELETE',
      })
      await mutate('/api/questions')
    } catch (err) {
      setIsDeleting(false)
      throw err
    } finally {
      setIsDeleting(false)
    }
  }, [questionId, mutate])

  return {
    ...swr,
    questionDetail: swr.data,
    updateQuestion,
    deleteQuestion,
    isDeleting,
  }
}
