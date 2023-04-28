'use client'

import AddButton from '@/app/components/AddButton'
import CloseButton from '@/app/components/CloseButton'
import Input_label from '@/app/components/Input_label'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

/**
 * @typedef {{ question: string, answers: { value: '', id?: number, isNew: true }[], deletedAnswersIds: number[] }} FormValues
 */

/**
 * @param {object} props
 * @param {boolean} props.resetOnSuccess
 * @param {(data: FormValues) => Promise<void>} props.onSubmit
 * @param {FormValues} [props.defaultValues]
 * @param {string} [props.buttonText]
 * @param {boolean} [props.trackAnswers]
 * @param {boolean} [props.onCancel]
 */
const QuestionForm = ({
  resetOnSuccess,
  onSubmit,
  defaultValues = { question: '', answers: [] },
  buttonText = 'Create',
  trackAnswers = false,
  onCancel,
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
    reset,
    getValues,
  } = useForm({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  })

  const [deletedAnswersIds, setDeletedAnswersIds] = useState([])

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await onSubmit({ ...data, deletedAnswersIds })
        if (resetOnSuccess) {
          reset()
        }
      })}
      className='flex flex-col gap-3'
    >
      <Input_label label='Question' {...register('question')} required />

      <fieldset className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <legend>Possible answers</legend>
          <AddButton
            title='Add possible answer'
            type='button'
            className='mr-2'
            onClick={() => append({ value: '', isNew: true })}
          />
        </div>

        {fields.length === 0 && (
          <p className='text-sm text-gray-500 italic'>
            If there are no possible answers, it will be a free response
            question.
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className='relative'>
            <Input_label
              label={`Answer ${index + 1}`}
              hideLabel
              id={`answers.${index}.value`}
              {...register(`answers.${index}.value`)}
              required
            />

            <input hidden {...register(`answers.${index}.id`)} />

            <CloseButton
              onClick={() => {
                const answers = getValues('answers')
                const answerId = answers[index].id
                remove(index)
                if (!answerId || !trackAnswers) return
                setDeletedAnswersIds([...deletedAnswersIds, answerId])
              }}
              className='absolute right-2 top-1/2 -translate-y-1/2'
              title={`Remove answer ${index + 1}`}
              type='button'
            />
          </div>
        ))}
      </fieldset>

      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-blue-500 text-white disabled:bg-gray-400 rounded-md py-1 px-2 hover:bg-blue-400 ml-auto'
          disabled={isSubmitting}
        >
          {buttonText}
        </button>
      </div>
    </form>
  )
}

export default QuestionForm
