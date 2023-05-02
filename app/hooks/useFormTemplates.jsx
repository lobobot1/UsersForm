import { useCallback } from 'react'
import useSWR from 'swr'
import useQuestions from './useQuestions'

const key = 'formTemplates'

export function useFormTemplates() {
  const { questions } = useQuestions()
  const swr = useSWR(questions ? key : null, (key) => {
    const templates = localStorage.getItem(key)
    if (!templates) {
      localStorage.setItem(
        key,
        JSON.stringify([
          {
            id: crypto.randomUUID(),
            revisionText: 'placeholder',
            questions: questions.data.map((q) => ({
              id: q.id,
            })),
          },
        ])
      )
      return []
    }
    return JSON.parse(templates)
  })

  const createTemplate = useCallback(
    (data) => {
      const templates = JSON.parse(localStorage.getItem(key)) ?? []
      localStorage.setItem(
        key,
        JSON.stringify([...templates, { ...data, id: crypto.randomUUID() }])
      )
      swr.mutate()
    },
    [swr]
  )

  const deleteTemplate = useCallback(
    (id) => {
      const templates = JSON.parse(localStorage.getItem(key)) ?? []
      const templateMap = new Map(templates.map((t) => [t.id, t]))
      templateMap.delete(id)
      localStorage.setItem(
        key,
        JSON.stringify(Array.from(templateMap.values()))
      )
      swr.mutate()
    },
    [swr]
  )

  const updateTemplate = useCallback(
    (id, data) => {
      const templates = JSON.parse(localStorage.getItem(key)) ?? []
      const templateMap = new Map(templates.map((t) => [t.id, t]))
      templateMap.set(id, { ...data, id })
      localStorage.setItem(
        key,
        JSON.stringify(Array.from(templateMap.values()))
      )
      swr.mutate()
    },
    [swr]
  )

  return {
    ...swr,
    templates: swr.data,
    createTemplate,
    deleteTemplate,
    updateTemplate,
  }
}
