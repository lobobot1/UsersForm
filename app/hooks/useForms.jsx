import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useForms() {
  const swr = useSWR('/api/forms', fetch)

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
     * @param {{ form: string }} data
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

  return { ...swr, forms: swr.data, createForm, updateForm }
}
