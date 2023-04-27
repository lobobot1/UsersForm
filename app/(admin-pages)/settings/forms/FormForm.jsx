'use client'

import Button from '@/app/components/Button'
import AddButton from '@/app/components/CloseButton'
import { inputClasses, labelClasses } from '@/app/components/Input_label'
import { useFieldArray, useForm } from 'react-hook-form'

/**
 * @typedef {{ revisionText: string, questions: { id: number }[] }} FormValues
 */

/**
 * @param {object} props
 * @param {boolean} props.resetOnSuccess
 * @param {(data: FormValues) => Promise<void>} props.onSubmit
 * @param {FormValues} [props.defaultValues]
 * @param {string} [props.buttonText]
 * @param {boolean} [props.onCancel]
 * @param {{ question: string, id: number }} [props.questions]
 */
const QuestionForm = ({
  resetOnSuccess,
  onSubmit,
  defaultValues,
  buttonText = 'Create',
  onCancel,
  questions,
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm({
    defaultValues: defaultValues ?? {
      revisionText: '',
      questions: [{ id: questions[0].id }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
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
      <div className='flex flex-col'>
        <label htmlFor='revisionText' className={labelClasses}>
          Review text
        </label>
        <textarea
          id='revisionText'
          className={inputClasses}
          {...register('revisionText')}
        ></textarea>
      </div>

      <fieldset>
        <div className='flex items-center justify-between'>
          <legend className={labelClasses}>Form questions</legend>
          <AddButton
            title='Add question'
            type='button'
            onClick={() => append({ id: questions[0].id })}
          />
        </div>

        <div className='flex flex-col gap-2'>
          {fields.map((field, index) => (
            <div key={field.id} className='relative'>
              <label hidden>Question {index + 1}</label>
              <select
                id={`questions.${index}.id`}
                {...register(`questions.${index}.id`, {
                  valueAsNumber: true,
                })}
                className={inputClasses}
                required
              >
                {questions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.question}
                  </option>
                ))}
              </select>

              {index > 0 && (
                <AddButton
                  onClick={() => remove(index)}
                  className='absolute right-5 top-1/2 -translate-y-1/2'
                  title={`Remove question ${index + 1}`}
                  type='button'
                />
              )}
            </div>
          ))}
        </div>
      </fieldset>

      <div className='flex justify-end'>
        {onCancel && (
          <Button
            type='button'
            variant='danger'
            className='mr-auto'
            onClick={() => {
              onCancel()
              reset()
            }}
          >
            Cancel
          </Button>
        )}

        <Button type='submit' disabled={isSubmitting}>
          {buttonText}
        </Button>
      </div>
    </form>
  )
}

export default QuestionForm
