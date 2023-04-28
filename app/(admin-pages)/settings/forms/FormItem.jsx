import CloseButton from '@/app/components/CloseButton'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
import { useCallback, useState } from 'react'
import UpdateFormForm from './UpdateFormForm'

/**
 * @param {{
 *  form: { id: number, form: string },
 *  onDelete: (id: number) => Promise<void>
 * }} props
 */
const FormItem = ({ form, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const closeEditForm = useCallback(() => setIsEditing(false), [])

  return (
    <li key={form.id} className='rounded-md p-2 bg-white text-black relative'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span>{form.revisionText}</span>
          <EditButton onClick={() => setIsEditing(true)} title='Edit' />
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
