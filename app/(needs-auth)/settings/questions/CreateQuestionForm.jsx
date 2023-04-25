'use client'

import Input_label from '@/app/components/Input_label'
import useQuestions from '@/app/hooks/useQuestions'
import { useForm } from 'react-hook-form'

const CreateQuestionForm = () => {
  const { createQuestion } = useQuestions()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { question: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(createQuestion)}
      className='flex flex-col gap-3 max-w-xs'
    >
      <Input_label label='Question' {...register('question')} required />

      <button
        type='submit'
        className='bg-blue-200 disabled:bg-gray-400'
        disabled={isSubmitting}
      >
        Create
      </button>
    </form>
  )
}

export default CreateQuestionForm
