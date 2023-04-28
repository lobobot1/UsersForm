'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import useQuestions from '@/app/hooks/useQuestions'
import useTopics from '@/app/hooks/useTopics'
import { useState } from 'react'
import QuestionForm from './QuestionForm'

const CreateQuestionForm = () => {
  const [error, setError] = useState(null)
  const { createQuestion } = useQuestions()

  const { topics } = useTopics()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {topics && (
        <QuestionForm
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
      )}
    </>
  )
}

export default CreateQuestionForm
