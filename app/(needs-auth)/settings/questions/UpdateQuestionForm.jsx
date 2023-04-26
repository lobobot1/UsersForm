'use client'
import useQuestions from '@/app/hooks/useQuestions'
import QuestionForm from './QuestionForm'
import ErrorAlert from '@/app/components/ErrorAlert'
import { useState } from 'react'

/**
 * @param {{ question: { id: number, question: string, onSubmit: () => void }}} props
 */
const UpdateQuestionForm = ({ question, onSubmit }) => {
  const [error, setError] = useState(null)
  const { updateQuestion } = useQuestions()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <QuestionForm
        onSubmit={async (data) => {
          try {
            setError(null)
            await updateQuestion(data, question.id)
            onSubmit()
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            }
          }
        }}
        showAnswers={false}
        buttonText='Save'
        defaultValues={{ question: question.question }}
      />
    </>
  )
}

export default UpdateQuestionForm
