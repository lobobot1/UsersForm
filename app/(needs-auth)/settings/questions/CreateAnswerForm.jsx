'use client'

import Input_label from '@/app/components/Input_label'
import useAnswers from '@/app/hooks/useAnswers'
import { useForm } from 'react-hook-form'

const CreateAnswerForm = () => {
  const { createAnswer } = useAnswers()
  const { handleSubmit, register } = useForm({
    defaultValues: { answer: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(createAnswer)}
      className='flex flex-col gap-3 max-w-xs'
    >
      <Input_label label='Answer' {...register('answer')} required />

      <button type='submit' className='bg-blue-200'>
        Create
      </button>
    </form>
  )
}

export default CreateAnswerForm
