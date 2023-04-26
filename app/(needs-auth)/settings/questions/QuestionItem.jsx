import { useCallback, useRef, useState } from 'react'
import UpdateQuestionForm from './UpdateQuestionForm'
import useQuestionDetail from '@/app/hooks/useQuestionDetail'
import PencilSquare from '@/app/components/icons/PencilSquare'

/** @param {{ question: { id: number, question: string } }} props */
const QuestionItem = ({ question }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { questionDetail, isLoading } = useQuestionDetail(
    question.id,
    isEditing
  )
  const closeEditForm = useCallback(() => setIsEditing(false), [])

  return (
    <li key={question.id} className='border rounded-md p-2'>
      {isLoading && <p>Loading...</p>}
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span>{question.question}</span>
          <button onClick={() => setIsEditing(true)} title='Edit'>
            <PencilSquare />
          </button>
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
            onSubmit={closeEditForm}
            onCancel={closeEditForm}
          />
        </>
      )}
    </li>
  )
}

export default QuestionItem
