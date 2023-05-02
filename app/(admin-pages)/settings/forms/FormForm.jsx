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
    watch,
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

  const _selectedQuestions = watch('questions')
  const selectedQuestions = new Set(_selectedQuestions.map((sq) => sq.id))

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
            onClick={() =>
              append(
                {
                  id: questions.find((q) => !selectedQuestions.has(q.id)).id,
                },
                { shouldFocus: false }
              )
            }
            disabled={_selectedQuestions.length === questions.length}
            className='disabled:opacity-0'
          />
        </div>

        <div className='flex flex-col gap-2'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex gap-1'>
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
                  <option
                    key={q.id}
                    value={q.id}
                    disabled={selectedQuestions.has(q.id)}
                  >
                    {q.question}
                  </option>
                ))}
              </XSelect>

              {index > 0 ? (
                <CloseButton
                  onClick={() => remove(index)}
                  title={`Remove question ${index + 1}`}
                  type='button'
                />
              ) : (
                <div className='w-6 shrink-0'></div>
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
