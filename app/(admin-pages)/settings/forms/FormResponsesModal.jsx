'use client'
import ErrorAlert from '@/app/components/ErrorAlert'
import Modal from '@/app/components/Modal'
import Spinner from '@/app/components/Spinner'
import Download from '@/app/components/icons/Download'
import Eye from '@/app/components/icons/Eye'
import User from '@/app/components/icons/User'
import useFormDetail from '@/app/hooks/useFormDetail'
import { useState } from 'react'

const FormResponsesModal = ({ formId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { form, isLoading, error } = useFormDetail(formId, isOpen)

  return (
    <>
      <button onClick={() => setIsOpen(true)} title='View responses'>
        <Eye />
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<h2>{formId.slice(0, 8)} - Details</h2>}
        maxSize='2xl'
      >
        {isLoading && <Spinner />}
        {form && (
          <>
            <h3 className='font-bold'>Revision text</h3>
            <p>{form.data.revisionText}</p>

            <div className='flex justify-between items-center mt-3 mb-2'>
              <h3 className='font-bold'>Responses</h3>
              <button className='flex gap-2' title='Download as spreadsheet'>
                <Download />
              </button>
            </div>
            <ul>
              {form.data.FormAnswered.map((userAnswers) => (
                <li key={userAnswers.user.id} className='p-2 rounded-md border'>
                  <div className='flex items-center gap-2 font-bold mb-2'>
                    <User />
                    {userAnswers.user.name}
                  </div>
                  <ul className='pl-2 list-disc list-inside'>
                    {userAnswers.answers.map((ans) => (
                      <li key={ans.id}>
                        <span className='font-bold'>
                          {ans.question.question}:
                        </span>{' '}
                        {ans.answer}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
        {error && <ErrorAlert>{error.message}</ErrorAlert>}
      </Modal>
    </>
  )
}

export default FormResponsesModal
