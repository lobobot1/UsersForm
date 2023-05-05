import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useForms({ page = 1 } = {}) {
  const swr = useSWR(`/api/forms?page=${page}`, fetch)

  const createForm = useCallback(
    /** @param {{ revisionText: string, questions: { id: string }[] }} data */
    async (data) => {
      await fetch('/api/forms/create', {
        method: 'POST',
        body: data,
      })
      swr.mutate()
    },
    [swr]
  )

  const updateForm = useCallback(
    /**
     * @param {object} data
     * @param {{ id: number }[]} data.questions
     * @param {number} data.authorId
     * @param {string} data.revisionText
     * @param {number} formId
     */
    async (data, formId) => {
      await fetch(`/api/forms/${formId}/update`, {
        method: 'PUT',
        body: data,
      })
      swr.mutate()
    },
    [swr]
  )

  const deleteForm = useCallback(
    /** @param {number} formId */
    async (formId) => {
      await fetch(`/api/forms/${formId}/delete`, { method: 'DELETE' })
      await swr.mutate()
    },
    [swr]
  )

  return { ...swr, forms: swr.data, createForm, updateForm, deleteForm }
}
