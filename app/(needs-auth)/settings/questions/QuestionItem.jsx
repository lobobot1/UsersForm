import { useState } from 'react'
import UpdateQuestionForm from './UpdateQuestionForm'

/** @param {{ question: { id: number, question: string } }} props */
const QuestionItem = ({ question }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <li key={question.id} className='border rounded-md p-2'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span>{question.question}</span>
          <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
        </div>
      )}
      {isEditing && (
        <UpdateQuestionForm
          question={question}
          onSubmit={() => setIsEditing(false)}
        />
      )}
    </li>
  )
}

export default QuestionItem
