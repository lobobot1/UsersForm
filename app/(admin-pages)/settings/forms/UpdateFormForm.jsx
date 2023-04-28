'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import useForms from '@/app/hooks/useForms'
import useQuestions from '@/app/hooks/useQuestions'
import { useState } from 'react'
import FormForm from './FormForm'

/**
 * @param {{
 *  form: { id: string, revisionText: string, questions: { id: number }[] }
 *  onSubmit?: () => void
 * }} props
 */
const UpdateFormForm = ({ form, onSubmit }) => {
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
          questions={questions.data}
          defaultValues={form}
          buttonText='Update'
        />
      )}
    </>
  )
}

export default UpdateFormForm
