'use client'
import useForms from '@/app/hooks/useForms'
import FormForm from './FormForm'
import ErrorAlert from '@/app/components/ErrorAlert'
import { useState } from 'react'
import useQuestions from '@/app/hooks/useQuestions'

/**
 * @param {{
 *  form: { id: string, revisionText: string, questions: { id: number }[] }
 *  onSubmit?: () => void
 *  onCancel?: () => void
 * }} props
 */
const UpdateFormForm = ({ form, onSubmit, onCancel }) => {
  const [error, setError] = useState(null)
  const { updateForm } = useForms()
  const { questions } = useQuestions()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {questions && (
        <FormForm
          resetOnSuccess
          onSubmit={async (data) => {
            try {
              setError(null)
              await updateForm(data, form.id)
              onSubmit?.()
            } catch (err) {
              if (err instanceof Error) {
                setError(err.message)
              }
            }
          }}
          onCancel={onCancel}
          questions={questions.data}
          defaultValues={form}
          buttonText='Update'
        />
      )}
    </>
  )
}

export default UpdateFormForm
