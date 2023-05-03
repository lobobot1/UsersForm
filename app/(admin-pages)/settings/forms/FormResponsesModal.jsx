'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import Eye from '@/app/components/icons/Eye'
import Modal from '@/app/components/Modal'
import Spinner from '@/app/components/Spinner'
import useFormDetail from '@/app/hooks/useFormDetail'
import useFormStatus from '@/app/hooks/useFormStatus'
import formatList from '@/util/formatList'
import { useMemo, useRef, useState } from 'react'
import FormResponseItem from './FormResponseItem'

/**
 * @param {{ formId: string, uncheckedResponses: number }} props
 */
const FormResponsesModal = ({ formId, uncheckedResponses }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckingAll, setIsCheckingAll] = useState(false)
  const triggerRef = useRef(null)

  const {
    form,
    isLoading: loadingDetail,
    error,
    updateResponses,
  } = useFormDetail(formId, isOpen)

  const { formStatus, isLoading: loadingStatus } = useFormStatus()

  const isLoading = loadingDetail || loadingStatus

  const formStatusMap = useMemo(
    () =>
      formStatus ? new Map(formStatus.data.map((fs) => [fs.status, fs])) : null,
    [formStatus]
  )

  const markAllAsChecked = async () => {
    setIsCheckingAll(true)
    try {
      await updateResponses({
        status: { id: formStatusMap.get('revised').id },
        answers: form.data.FormAnswered.filter((fa) =>
          fa.answers.some((a) => a.status.status !== 'revised')
        ).flatMap((userAnswers) =>
          userAnswers.answers.map((a) => ({
            id: a.id,
          }))
        ),
      })
    } catch (error) {
      alert(error.message)
    } finally {
      setIsCheckingAll(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title='View responses'
        ref={triggerRef}
      >
        <Eye />
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<h2>{formId.slice(0, 8)} - Details</h2>}
        maxSize='5xl'
        triggerRef={triggerRef.current}
      >
        {isLoading && <Spinner />}
        {form && formStatus && (
          <>
            <h3 className='mb-3'>ID: {form.data.id}</h3>
            <h3 className='font-bold'>Revision text</h3>
            <p>{form.data.revisionText}</p>

            <h3 className='mt-3 font-bold'>Questions</h3>
            <ul className='list-decimal list-inside'>
              {form.data.question.map((q) => (
                <li key={q.id}>{q.question}</li>
              ))}
            </ul>

            <div className='flex items-center justify-between mt-3 mb-2'>
              <h3 className='font-bold'>
                Responses ({form.data.FormAnswered.length})
                {Boolean(uncheckedResponses) && (
                  <span> ({uncheckedResponses} unchecked)</span>
                )}
              </h3>

              {Boolean(uncheckedResponses) && (
                <button
                  type='button'
                  className='ml-auto'
                  onClick={markAllAsChecked}
                  disabled={isCheckingAll}
                >
                  {isCheckingAll ? (
                    <Spinner />
                  ) : (
                    <div className='flex items-center gap-2 underline'>
                      <span className='w-4 bg-blue-500 rounded-full aspect-square'></span>{' '}
                      Mark all as checked
                    </div>
                  )}
                </button>
              )}
            </div>
            {form.data.FormAnswered.length && (
              <p className='mb-2'>
                Answered by:{' '}
                {formatList(
                  form.data.FormAnswered.map(
                    ({ user }) =>
                      user.name + (user.lastname ? ` ${user.lastname}` : '')
                  )
                )}
              </p>
            )}
            <ul className='space-y-2'>
              {form.data.FormAnswered.map((userAnswers) => (
                <FormResponseItem
                  key={userAnswers.user.id}
                  userAnswers={userAnswers}
                  onUpdate={updateResponses}
                  formStatus={formStatusMap}
                />
              ))}
              {form.data.FormAnswered.length === 0 && (
                <li className='italic'>No responses available...</li>
              )}
            </ul>
          </>
        )}
        {error && <ErrorAlert>{error.message}</ErrorAlert>}
      </Modal>
    </>
  )
}

export default FormResponsesModal
