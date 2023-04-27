import DeleteButton from '@/app/components/DeleteButton'
import PencilSquare from '@/app/components/icons/PencilSquare'
import useQuestionDetail from '@/app/hooks/useQuestionDetail'
import { useCallback, useState } from 'react'
import UpdateQuestionForm from './UpdateQuestionForm'

/** @param {{ question: { id: number, question: string } }} props */
const QuestionItem = ({ question }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { questionDetail, isLoading, deleteQuestion, isDeleting } =
    useQuestionDetail(question.id, isEditing)
  const closeEditForm = useCallback(() => setIsEditing(false), [])

  return (
    <li
      key={question.id}
      className='rounded-md p-2 bg-white text-black relative'
    >
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
          <DeleteButton
            entity='question'
            onConfirm={async () => await deleteQuestion()}
            isDeleting={isDeleting}
          />
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
