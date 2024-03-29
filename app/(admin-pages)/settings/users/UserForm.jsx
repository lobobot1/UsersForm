'use client'

import Button from '@/app/components/Button'
import Input_label, { labelClasses } from '@/app/components/Input_label'
import { getDirtyFields } from '@/util/getDirtyFields'
import { useForm } from 'react-hook-form'

/**
 * @param {object} props
 * @param {(data: import('./types').UserFormValues) => Promise<void>} props.onSubmit
 * @param {import('./types').UserFormValues} [props.defaultValues]
 * @param {string} [props.buttonText]
 * @param {boolean} [props.requirePassword]
 * @param {boolean} [props.sendOnlyChangedData]
 * @param {{ question: string, id: number }} [props.questions]
 */
const QuestionUser = ({
  onSubmit,
  defaultValues = {
    email: '',
    nickname: '',
    name: '',
    lastname: '',
    password: '',
    rePassword: '',
    isAdmin: 'false',
  },
  buttonText = 'Create',
  requirePassword = true,
  sendOnlyChangedData = true,
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, dirtyFields },
    reset,
  } = useForm({
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const finalData = sendOnlyChangedData
          ? getDirtyFields(
              { ...data, isAdmin: JSON.parse(data.isAdmin) },
              dirtyFields
            )
          : { ...data, isAdmin: JSON.parse(data.isAdmin) }
        try {
          await onSubmit(finalData)
          reset()
        } catch {}
      })}
      className='flex flex-col gap-1'
    >
      <Input_label label='Email' {...register('email')} required />
      <Input_label label='Nickname' {...register('nickname')} />
      <Input_label label='Name' {...register('name')} required />
      <Input_label label='Last name' {...register('lastname')} />
      <Input_label
        label='Password'
        type='password'
        {...register('password')}
        required={requirePassword}
      />
      <Input_label
        label='Confirm password'
        type='password'
        {...register('rePassword')}
        required={requirePassword}
      />

      <fieldset className='mb-3'>
        <legend className={labelClasses}>Is admin</legend>

        <div className='flex gap-4'>
          <div className='flex gap-2 items-center'>
            <label htmlFor='isAdminTrue'>Yes</label>
            <input
              type='radio'
              value='true'
              id='isAdminTrue'
              defaultChecked={defaultValues.isAdmin === 'true'}
              {...register('isAdmin')}
            />
          </div>

          <div className='flex gap-2 items-center'>
            <label htmlFor='isAdminFalse'>No</label>
            <input
              type='radio'
              value='false'
              id='isAdminFalse'
              defaultChecked={defaultValues.isAdmin === 'false'}
              {...register('isAdmin')}
            />
          </div>
        </div>
      </fieldset>

      <div className='flex justify-end'>
        <Button type='submit' className='ml-auto' disabled={isSubmitting}>
          {buttonText}
        </Button>
      </div>
    </form>
  )
}

export default QuestionUser
