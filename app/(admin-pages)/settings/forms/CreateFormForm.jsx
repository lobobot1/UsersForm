'use client'
import useForms from '@/app/hooks/useForms'
import FormForm from './FormForm'
import ErrorAlert from '@/app/components/ErrorAlert'
import { useState } from 'react'
import useQuestions from '@/app/hooks/useQuestions'

const CreateFormForm = () => {
  const [error, setError] = useState(null)
  const { createForm } = useForms()
  const { questions } = useQuestions()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {questions && <FormForm
        resetOnSuccess
        onSubmit={async (data) => {
          try {
            setError(null)
            await createForm(data)
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            }
          }
        }}
        questions={questions.data}
      />}
    </>
  )
}

export default CreateFormForm
