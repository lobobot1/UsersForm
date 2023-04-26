'use client'

import Input_label from '@/app/components/Input_label'
import CloseCircle from '@/app/components/icons/CloseCircle'
import PlusCircle from '@/app/components/icons/PlusCircle'
import { useFieldArray, useForm } from 'react-hook-form'

const QuestionForm = ({
  showAnswers = true,
  resetOnSuccess,
  onSubmit,
  defaultValues = { question: '', answers: [{ value: '' }, { value: '' }] },
  buttonText = 'Create',
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
    rules: {
      minLength: 1,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data)
        if (resetOnSuccess) {
          reset()
        }
      })}
      className='flex flex-col gap-3'
    >
      <Input_label label='Question' {...register('question')} required />

      {showAnswers && (
        <fieldset className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <legend>Possible answers</legend>
            <button
              title='Add possible answer'
              type='button'
              className='mr-2'
              onClick={() => append({ value: '' })}
            >
              <PlusCircle className='text-green-500' />
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className='relative'>
              <Input_label
                label={`Answer ${index + 1}`}
                hideLabel
                id={`answers.${index}.value`}
                {...register(`answers.${index}.value`)}
                required
              />

              {index > 0 && (
                <button
                  onClick={() => remove(index)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center'
                  title={`Remove answer ${index + 1}`}
                  type='button'
                >
                  <CloseCircle className='text-red-500' />
                </button>
              )}
            </div>
          ))}
        </fieldset>
      )}

      <button
        type='submit'
        className='bg-blue-200 disabled:bg-gray-400 rounded-md py-1 px-2 hover:bg-blue-300'
        disabled={isSubmitting}
      >
        {buttonText}
      </button>
    </form>
  )
}

export default QuestionForm
