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
    <ul className='grid md:grid-cols-2 gap-2'>
      {questions?.data.map((question) => (
        <li key={question.id} className='border rounded-md p-2'>
          {question.question}
        </li>
      ))}
    </ul>
  )
}

export default QuestionList
