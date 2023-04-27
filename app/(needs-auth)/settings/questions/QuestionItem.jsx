import { useCallback, useRef, useState } from 'react'
import UpdateQuestionForm from './UpdateQuestionForm'
import useQuestionDetail from '@/app/hooks/useQuestionDetail'
import PencilSquare from '@/app/components/icons/PencilSquare'
import Trash from '@/app/components/icons/Trash'
import Spinner from '@/app/components/Spinner'

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
          <button
            className='absolute right-2 top-2 text-red-500 disabled:text-red-300'
            title='Eliminar'
            onClick={async () => {
              if (!confirm('Are you sure you want to delete this question?'))
                return
              try {
                await deleteQuestion()
              } catch (error) {
                alert(error.message)
              }
            }}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner /> : <Trash />}
          </button>
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
