'use client'

import CloseCircle from '@/app/components/icons/CloseCircle'
import PlusCircle from '@/app/components/icons/PlusCircle'
import { inputClasses, labelClasses } from '@/app/components/Input_label'
import { useFieldArray, useForm } from 'react-hook-form'

/**
 * @typedef {{ revisionText: string, questions: { id: number }[] }} FormValues
 */

/**
 * @param {object} props
 * @param {boolean} [props.showQuestions]
 * @param {boolean} props.resetOnSuccess
 * @param {(data: FormValues) => Promise<void>} props.onSubmit
 * @param {FormValues} [props.defaultValues]
 * @param {string} [props.buttonText]
 * @param {boolean} [props.trackQuestions]
 * @param {boolean} [props.onCancel]
 * @param {{ question: string, id: number }} [props.questions]
 */
const QuestionForm = ({
  showQuestions = true,
  resetOnSuccess,
  onSubmit,
  defaultValues,
  buttonText = 'Create',
  trackQuestions = false,
  onCancel,
  questions,
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
    reset,
    getValues,
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
        console.log(data)
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

      {showQuestions && (
        <fieldset>
          <div className='flex items-center justify-between'>
            <legend className={labelClasses}>Form questions</legend>
            <button
              title='Add question'
              type='button'
              onClick={() => append({ id: questions[0].id })}
            >
              <PlusCircle className='text-green-500' />
            </button>
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
                  <button
                    onClick={() => {
                      const questions = getValues('questions')
                      const questionId = questions[index].id
                      remove(index)
                      if (!questionId || !trackQuestions) return
                      setDeletedQuestionsIds([
                        ...deletedQuestionsIds,
                        questionId,
                      ])
                    }}
                    className='absolute right-5 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center'
                    title={`Remove question ${index + 1}`}
                    type='button'
                  >
                    <CloseCircle className='text-red-500' />
                  </button>
                )}
              </div>
            ))}
          </div>
        </fieldset>
      )}

      <div className='flex justify-end'>
        {onCancel && (
          <button
            type='button'
            className='bg-red-500 text-white rounded-md py-1 px-2 hover:bg-red-400'
            onClick={() => {
              onCancel()
              reset()
            }}
          >
            Cancel
          </button>
        )}

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
