'use client'

import useQuestions from '@/app/hooks/useQuestions'
import SkeletonList from '../SkelentonList'
import QuestionItem from './QuestionItem'

const QuestionList = () => {
  const { questions, error, isLoading } = useQuestions()

  if (isLoading) {
    return <SkeletonList count={20} />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul className='space-y-3'>
      {questions?.data.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </ul>
  )
}

export default QuestionList
