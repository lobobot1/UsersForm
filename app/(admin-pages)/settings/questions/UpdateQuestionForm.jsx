'use client'

import ErrorAlert from '@/app/components/ErrorAlert'
import useQuestionDetail from '@/app/hooks/useQuestionDetail'
import useTopics from '@/app/hooks/useTopics'
import { useState } from 'react'
import QuestionForm from './QuestionForm'

/**
 * @param {{ question: { id: number, question: string, answers: { id: number, value: string }[] }, onSubmit: () => void }} props
 */
const UpdateQuestionForm = ({ question, onSubmit }) => {
  const [error, setError] = useState(null)
  const { updateQuestion } = useQuestionDetail(question.id, true)
  const { topics } = useTopics()

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {topics && (
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
            topicId: question.topicId,
          }}
          trackAnswers
        />
      )}
    </>
  )
}

export default UpdateQuestionForm
