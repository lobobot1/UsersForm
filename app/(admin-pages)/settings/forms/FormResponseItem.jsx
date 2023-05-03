import User from '@/app/components/icons/User'
import Spinner from '@/app/components/Spinner'
import { useState } from 'react'

const FormResponseItem = ({ userAnswers, onUpdate, formStatusMap }) => {
  const [isUpdateing, setIsUpdating] = useState(false)

  const markAsChecked = async () => {
    setIsUpdating(true)
    try {
      await onUpdate({
        status: { id: formStatusMap.get('revised').id },
        answers: userAnswers.answers.map((a) => ({
          id: a.id,
        })),
      })
    } catch (error) {
      alert(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <li className='p-2 border rounded-md'>
      <div className='flex items-center gap-2 mb-2 font-bold'>
        <User />
        {userAnswers.user.name}

        {userAnswers.answers.some((a) => a.status.status !== 'revised') ? (
          <button
            type='button'
            className='ml-auto font-normal'
            onClick={markAsChecked}
            disabled={isUpdateing}
          >
            {isUpdateing ? (
              <Spinner />
            ) : (
              <div className='flex items-center gap-2 underline'>
                <span className='w-4 bg-blue-500 rounded-full aspect-square'></span>{' '}
                Mark as checked
              </div>
            )}
          </button>
        ) : (
          <div className='flex items-center gap-2 ml-auto font-normal'>
            <span className='w-4 bg-green-500 rounded-full aspect-square'></span>{' '}
            Checked
          </div>
        )}
      </div>
      <ul className='pl-2 list-disc list-inside'>
        {userAnswers.answers.map((ans) => (
          <li key={ans.id}>
            <span className='font-bold'>{ans.question.question}:</span>{' '}
            {ans.answer}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default FormResponseItem
