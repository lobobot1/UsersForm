import { useState } from 'react'
import UpdateQuestionForm from './UpdateQuestionForm'
import useQuestionDetail from '@/app/hooks/useQuestionDetail'

/** @param {{ question: { id: number, question: string } }} props */
const QuestionItem = ({ question }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { questionDetail } = useQuestionDetail(question.id, isEditing)

  return (
    <li key={question.id} className='border rounded-md p-2'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span>{question.question}</span>
          <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
        </div>
      )}
      {isEditing && questionDetail && (
        <>
          <UpdateQuestionForm
            question={{
              question: question.question,
              id: question.id,
              answers: questionDetail.data.PossibleAnswer.map((pa) => ({
                id: pa.id,
                value: pa.answer,
              })),
            }}
            onSubmit={() => setIsEditing(false)}
          />
        </>
      )}
    </li>
  )
}

export default QuestionItem
