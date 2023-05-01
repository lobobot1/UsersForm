'use client'
import CloseButton from '@/app/components/CloseButton'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
import Spinner from '@/app/components/Spinner'
import Clone from '@/app/components/icons/Clone'
import { useCallback, useState } from 'react'
import FormResponsesModal from './FormResponsesModal'
import UpdateFormForm from './UpdateFormForm'

/**
 * @param {{
 *  form: { id: number, form: string },
 *  onDelete: (id: number) => Promise<void>,
 *  onClone: (form) => Promise<void>
 * }} props
 */
const FormItem = ({ form, onDelete, onClone }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCloning, setIsCloning] = useState(false)
  const closeEditForm = useCallback(() => setIsEditing(false), [])

  return (
    <li key={form.id} className='rounded-md p-2 bg-white text-black relative'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span className='line-clamp-1'>
            {form.id.slice(0, 8)} - {form.revisionText}
          </span>
          <div className='flex gap-3'>
            <FormResponsesModal formId={form.id} />

            {/* Clone button */}
            <button
              className='flex items-center justify-center disabled:text-gray-500'
              title='Clone form'
              disabled={isCloning}
              onClick={async () => {
                setIsCloning(true)
                try {
                  await onClone({
                    revisionText: 'COPY ' + form.revisionText,
                    questions: form.question.map((q) => ({ id: q.id })),
                  })
                } catch (error) {
                  alert(error.message)
                } finally {
                  setIsCloning(false)
                }
              }}
            >
              {isCloning ? <Spinner /> : <Clone />}
            </button>
            <EditButton onClick={() => setIsEditing(true)} title='Edit' />
          </div>
        </div>
      )}
      {isEditing && (
        <>
          <CloseButton
            className='absolute right-2 top-2'
            onClick={closeEditForm}
          />
          <DeleteButton
            entity='form'
            onConfirm={async () => {
              setIsDeleting(true)
              await onDelete(form.id)
              setIsDeleting(false)
            }}
            isDeleting={isDeleting}
            className='absolute bottom-3 left-3'
          />
          <UpdateFormForm
            form={{
              id: form.id,
              revisionText: form.revisionText,
              questions: form.question.map((q) => ({ id: q.id })),
            }}
            onSubmit={closeEditForm}
          />
        </>
      )}
    </li>
  )
}

export default FormItem
