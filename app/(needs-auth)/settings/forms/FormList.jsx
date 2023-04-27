'use client'

import useForms from '@/app/hooks/useForms'
import FormItem from './FormItem'

const FormList = () => {
  const { forms, error, isLoading } = useForms()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul className='space-y-3'>
      {forms?.data.map((form) => (
        <FormItem key={form.id} form={form} />
      ))}
    </ul>
  )
}

export default FormList