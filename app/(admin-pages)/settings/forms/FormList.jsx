'use client'

import { Pagination } from '@/app/components/Pagination'
import useForms from '@/app/hooks/useForms'
import { useSearchParams } from 'next/navigation'
import FormItem from './FormItem'

const FormList = () => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { forms, error, isLoading, deleteForm, createForm } = useForms({
    page: currentPage,
  })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <ul className='space-y-3'>
        {forms?.data.map((form) => (
          <FormItem
            key={form.id}
            form={form}
            onDelete={deleteForm}
            onClone={createForm}
          />
        ))}
        {forms?.data.length === 0 && (
          <li>There aren&apos;t any forms yet...</li>
        )}
      </ul>

      {/* Pagination */}
      {forms && forms.meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          pagesCount={forms.meta.totalPages}
          getLink={(page) => `/settings/forms?page=${page}`}
        />
      )}
    </>
  )
}

export default FormList
