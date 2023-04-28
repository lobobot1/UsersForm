'use client'
import { useForm } from 'react-hook-form'
import Select from './select'
import useFormDetail from '../hooks/useFormDetail'

const Form = ({id}) => {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const {form} = useFormDetail(id)

  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <div className=' overflow-y-auto' id='scroll' >
      {form && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {form.data.question.map((item) => (
            <div key={item.id} className='flex flex-col gap-2'>
              <label className=' text-xl font-semibold'>{item.question[0].toUpperCase()+item.question.slice(1)}</label>
              {item.PossibleAnswer.length > 0 ? (
                <div className='flex flex-col'>
                  <Select
                    register={register}
                    value={item.question}
                    option={item.PossibleAnswer}
                  />
                  { errors[item.question] && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
              ) : (
                <textarea rows='' cols=''></textarea>
              )}
            </div>
          ))}
          <button id='button' type='submit' className=' mt-4'>
            <div className='svg-wrapper-1'>
              <div className='svg-wrapper'>
                <svg
                  className='animation-bounce h-6 w-6'
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

