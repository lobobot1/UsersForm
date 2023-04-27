'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input_label from '../../components/Input_label'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { username: '', password: '' } })

  const router = useRouter()

  const [error, setError] = useState(null)

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setError(null)
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (res.ok) {
          router.push('/user')
        } else {
          if (res.status === 403) {
            setError('Invalid credentials')
          } else {
            setError('Something went wrong. Try again.')
          }
        }
      })}
      className='mx-auto rounded-lg bg-white shadow-sm shadow-slate-200 py-5 px-8 text-gray-800 max-w-lg grid gap-4 container'
    >
      {error && (
        <p role='alert' className='p-2 bg-red-200 text-red-800 text-center'>
          {error}
        </p>
      )}

      <Input_label
        id='email'
        label='Email or username'
        placeholder='johndoe@example.com'
        required
        {...register('username')}
      />

      <Input_label
        id='name'
        label='Password'
        placeholder='••••••••'
        type='password'
        {...register('password')}
      />

      <div className='flex justify-end text-lg mt-2'>
        <button
          type='submit'
          className='bg-blue-600 rounded-lg text-white font-semibold px-3 py-2 hover:bg-blue-800 transition-colors ease-in-out disabled:bg-blue-300'
          disabled={isSubmitting}
        >
          Log in
        </button>
      </div>
    </form>
  )
}

export default LoginForm
