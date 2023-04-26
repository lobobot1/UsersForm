'use client'
import useQuestions from '@/app/hooks/useQuestions'
import QuestionForm from './QuestionForm'
import ErrorAlert from '@/app/components/ErrorAlert'
import { useState } from 'react'

const CreateQuestionForm = () => {
  const [error, setError] = useState(null)
  const { createQuestion } = useQuestions()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <QuestionForm
        resetOnSuccess
        onSubmit={async (data) => {
          try {
            setError(null)
            await createQuestion({
              ...data,
              answers: data.answers.map((ans) => ans.value),
            })
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            }
          }
        }}
      />
    </>
  )
}

export default CreateQuestionForm
