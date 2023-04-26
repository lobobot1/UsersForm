'use client'

import QuestionForm from './QuestionForm'
import ErrorAlert from '@/app/components/ErrorAlert'
import { useState } from 'react'
import useQuestionDetail from '@/app/hooks/useQuestionDetail'

/**
 * @param {{ question: { id: number, question: string, answers: { id: number, value: string }[] }, onSubmit: () => void }} props
 */
const UpdateQuestionForm = ({ question, onSubmit }) => {
  const [error, setError] = useState(null)
  const { updateQuestion } = useQuestionDetail(question.id, true)

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <QuestionForm
        onSubmit={async (data) => {
          try {
            setError(null)
            await updateQuestion(data)
            onSubmit()
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message)
            }
          }
        }}
        buttonText='Save'
        defaultValues={{
          question: question.question,
          answers: question.answers,
        }}
        trackAnswers
      />
    </>
  )
}

export default UpdateQuestionForm
