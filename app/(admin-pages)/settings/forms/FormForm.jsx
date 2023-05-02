'use client'

import AddButton from '@/app/components/AddButton'
import Button from '@/app/components/Button'
import CloseButton from '@/app/components/CloseButton'
import { labelClasses } from '@/app/components/Input_label'
import TextArea from '@/app/components/TextArea'
import XSelect from '@/app/components/XSelect'
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
 * @param {{ question: string, id: number }} [props.questions]
 */
const QuestionForm = ({
  resetOnSuccess,
  onSubmit,
  defaultValues,
  buttonText = 'Create',
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
      <TextArea label='Review text' required {...register('revisionText')} />

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
              <XSelect
                hideLabel
                label={`Question ${index + 1}`}
                name={`questions.${index}.id`}
                required
                {...register(`questions.${index}.id`, {
                  valueAsNumber: true,
                })}
              >
                {questions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.question}
                  </option>
                ))}
              </XSelect>

              {index > 0 && (
                <CloseButton
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
        <Button type='submit' disabled={isSubmitting}>
          {buttonText}
        </Button>
      </div>
    </form>
  )
}

export default QuestionForm
