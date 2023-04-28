import CloseButton from '@/app/components/CloseButton'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
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
          <EditButton onClick={() => setIsEditing(true)} title='Edit' />
        </div>
      )}
      {isEditing && questionDetail && (
        <>
          <CloseButton
            className='absolute right-2 top-2'
            onClick={closeEditForm}
          />
          <DeleteButton
            entity='question'
            onConfirm={async () => await deleteQuestion()}
            isDeleting={isDeleting}
            className='absolute bottom-3 left-3'
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
          />
        </>
      )}
    </li>
  )
}

export default QuestionItem
