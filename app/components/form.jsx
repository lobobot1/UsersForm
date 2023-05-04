'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Select from './select'
import TextArea from './TextArea'

const Form = ({ form, send }) => {
  const router = useRouter()

  const hasAnswer = Boolean(form.FormAnswered.length)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await send(data)
      router.push('/user')
    } catch (e) {
      alert(e)
    }
  }

  const answerMap = hasAnswer
    ? new Map(form.FormAnswered[0].answers.map((fa) => [fa.question.id, fa]))
    : null

  return (
    <div className='h-[65vh]' id='scroll'>
      {form.question.length > 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {form.question.map((item, index) => (
            <div key={item.id} className='flex flex-col gap-2 mb-4'>
              <label className='text-xl font-semibold '>
                {item.question[0].toUpperCase() + item.question.slice(1)}
              </label>
              <input
                hidden
                {...register(
                  hasAnswer
                    ? `answers.${index}.id`
                    : `answers.${index}.questionId`,
                  {
                    valueAsNumber: !hasAnswer,
                  }
                )}
                value={hasAnswer ? answerMap.get(item.id).id : item.id}
              />
              {item.PossibleAnswer.length > 0 ? (
                <div className='flex flex-col'>
                  <Select
                    register={register}
                    value={`answers.${index}.answer`}
                    option={item.PossibleAnswer}
                    defaultValues={
                      hasAnswer ? answerMap.get(item.id).answer : ''
                    }
                  />
                  {errors[item.question] && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
              ) : (
                <TextArea
                  {...register(`answers.${index}.answer`)}
                  defaultValue={hasAnswer ? answerMap.get(item.id).answer : ''}
                />
              )}
            </div>
          ))}
          <button id='button' type='submit' className='mt-4 '>
            <div className='svg-wrapper-1'>
              <div className='svg-wrapper'>
                <svg
                  className='w-6 h-6 animation-bounce'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 0h24v24H0z' fill='none'></path>
                  <path
                    d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                    fill='currentColor'
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </form>
      )}
    </div>
  )
}

export default Form
