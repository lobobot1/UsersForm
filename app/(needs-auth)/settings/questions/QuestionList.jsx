'use client'

import useQuestions from '@/app/hooks/useQuestions'

const QuestionList = () => {
  const { questions, error, isLoading } = useQuestions()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul>
      {questions?.data.map((question) => (
        <li key={question.id}>{question.question}</li>
      ))}
    </ul>
  )
}

export default QuestionList
