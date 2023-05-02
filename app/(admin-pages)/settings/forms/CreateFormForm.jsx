'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import Spinner from '@/app/components/Spinner'
import useForms from '@/app/hooks/useForms'
import useQuestions from '@/app/hooks/useQuestions'
import { useState } from 'react'
import FormForm from './FormForm'

const CreateFormForm = () => {
  const [error, setError] = useState(null)
  const { createForm } = useForms()
  const { questions, isLoading } = useQuestions()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {isLoading && (
        <div className='flex items-center justify-center'>
          <Spinner />
        </div>
      )}
      {questions && (
        <FormForm
          showCopyModal
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
        />
      )}
    </>
  )
}

export default CreateFormForm
