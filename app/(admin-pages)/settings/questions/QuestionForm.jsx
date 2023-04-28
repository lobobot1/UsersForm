'use client'

import AddButton from '@/app/components/AddButton'
import CloseButton from '@/app/components/CloseButton'
import Input_label, { labelClasses } from '@/app/components/Input_label'
import XSelect from '@/app/components/XSelect'
import useTopics from '@/app/hooks/useTopics'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

/**
 * @typedef {{ question: string, answers: { value: '', id?: number, isNew: true }[], deletedAnswersIds: number[] }} FormValues
 */

/**
 * @param {object} props
 * @param {(data: FormValues) => Promise<void>} props.onSubmit
 * @param {FormValues} [props.defaultValues]
 * @param {string} [props.buttonText]
 * @param {boolean} [props.trackAnswers]
 */
const QuestionForm = ({
  onSubmit,
  defaultValues,
  buttonText = 'Create',
  trackAnswers = false,
}) => {
  const { topics } = useTopics()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
    getValues,
  } = useForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          topicId: defaultValues.topicId ?? topics.data[0].id,
        }
      : {
          question: '',
          answers: [],
          topicId: topics.data[0].id,
        },
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
      })}
      className='flex flex-col gap-3'
    >
      <Input_label label='Question' {...register('question')} required />

      <XSelect
        label='Question topic'
        {...register('topicId', { valueAsNumber: true })}
      >
        {topics.data.map((t) => (
          <option key={t.id} value={t.id}>
            {t.topic}
          </option>
        ))}
      </XSelect>

      <fieldset className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <legend className={labelClasses}>Possible answers</legend>
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
