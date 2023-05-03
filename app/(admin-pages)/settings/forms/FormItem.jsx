'use client'
import CloseButton from '@/app/components/CloseButton'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
import Clone from '@/app/components/icons/Clone'
import Spinner from '@/app/components/Spinner'
import groupBy from '@/util/groupBy'
import { useCallback, useMemo, useState } from 'react'
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

  const users = useMemo(
    () => new Map(form.FormAnswered.map((fa) => [fa.user.id, fa.user])),
    [form]
  )
  const responseMap = useMemo(
    () => groupBy(form.FormAnswered, (e) => e.user.id),
    [form]
  )

  const grouped = useMemo(() => {
    const data = []
    for (const [userId, user] of users) {
      data.push({ user, answers: responseMap.get(userId) })
    }
    return data
  }, [responseMap, users])

  const uncheckedResponses = useMemo(
    () =>
      grouped.reduce(
        (ac, c) => ac + c.answers.some((a) => a.status.status !== 'revised'),
        0
      ),
    [grouped]
  )

  return (
    <li key={form.id} className='relative p-2 text-black bg-white rounded-md'>
      {!isEditing && (
        <div className='flex items-center justify-between'>
          <span className='line-clamp-1'>
            {form.id.slice(0, 8)} - {form.revisionText}
          </span>

          <div className='flex items-center gap-3'>
            {Boolean(uncheckedResponses) && (
              <div className='p-1 text-sm font-bold leading-none text-white bg-blue-500 rounded-sm'>
                {uncheckedResponses}{' '}
                <span className='sr-only'>unchecked responses</span>
              </div>
            )}

            <FormResponsesModal
              formId={form.id}
              uncheckedResponses={uncheckedResponses}
            />

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
            className='absolute z-10 right-2 top-2'
            onClick={closeEditForm}
          />
          <DeleteButton
            entity='form'
            onConfirm={async () => {
              setIsDeleting(true)
              try {
                await onDelete(form.id)
              } catch (error) {
                throw error
              } finally {
                setIsDeleting(false)
              }
            }}
            isDeleting={isDeleting}
            className='absolute z-10 bottom-3 left-3'
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
