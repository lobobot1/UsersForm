'use client'
import CloseButton from '@/app/components/CloseButton'
import DeleteButton from '@/app/components/DeleteButton'
import EditButton from '@/app/components/EditButton'
import Clone from '@/app/components/icons/Clone'
import CloseCircle from '@/app/components/icons/CloseCircle'
import PlusCircle from '@/app/components/icons/PlusCircle'
import Modal from '@/app/components/Modal'
import Spinner from '@/app/components/Spinner'
import { useFormTemplates } from '@/app/hooks/useFormTemplates'
import useQuestions from '@/app/hooks/useQuestions'
import { useMemo, useRef, useState } from 'react'
import FormForm from './FormForm'

const CopyTemplateModal = ({ onCopy }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { questions, isLoading } = useQuestions()
  const { templates, createTemplate, deleteTemplate, updateTemplate } =
    useFormTemplates()
  const triggerRef = useRef(null)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title='Create from template'
        className='absolute top-0 right-0 z-10'
        type='button'
        ref={triggerRef}
      >
        <Clone />
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<h2>Create form from template</h2>}
        maxSize='2xl'
        triggerRef={triggerRef.current}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className='flex items-center w-full gap-2 pb-2 mb-2 border-b'
          type='button'
        >
          {showForm ? (
            <>
              <CloseCircle />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle />
              New template
            </>
          )}
        </button>
        {showForm && questions && (
          <FormForm
            questions={questions.data}
            buttonText='Save template'
            onSubmit={(data) => {
              createTemplate(data)
              setShowForm(false)
            }}
            className='pb-2 border-b'
          />
        )}
        {showForm && isLoading && <Spinner />}

        <ul className='mt-2 space-y-2'>
          {questions &&
            templates?.map((t) => (
              <TemplateItem
                key={t.id}
                template={t}
                questions={questions.data}
                onDelete={deleteTemplate}
                onUpdate={updateTemplate}
                onCopy={(data) => {
                  onCopy(data), setIsOpen(false)
                }}
              />
            ))}
        </ul>
      </Modal>
    </>
  )
}

export default CopyTemplateModal

function TemplateItem({ template, questions, onDelete, onUpdate, onCopy }) {
  const [isEditing, setIsEditing] = useState(false)
  const questionsMap = useMemo(
    () => new Map(questions.map((q) => [q.id, q])),
    [questions]
  )
  return (
    <li className='relative p-2 border rounded-md'>
      {isEditing ? (
        <>
          <CloseButton
            className='absolute top-2 right-2'
            onClick={() => setIsEditing(false)}
          />
          <FormForm
            questions={questions}
            defaultValues={{
              questions: template.questions.map((q) => ({ id: q.id })),
              revisionText: template.revisionText,
            }}
            buttonText='Update'
            onSubmit={(data) => {
              onUpdate(template.id, data)
              setIsEditing(false)
            }}
          />
          <DeleteButton
            className='absolute bottom-2 left-2'
            entity='template'
            onConfirm={() => onDelete(template.id)}
          />
        </>
      ) : (
        <>
          <div className='flex justify-between'>
            <h3 className='font-bold'>Revision text</h3>
            <div className='flex gap-3'>
              <button
                title='Use this template'
                onClick={() => {
                  let { id, questions, ...rest } = template
                  questions = questions.filter((q) => questionsMap.has(q.id))
                  onCopy({ questions, ...rest })
                }}
                type='button'
              >
                <Clone />
              </button>
              <EditButton
                title='Edit this template'
                onClick={() => setIsEditing(true)}
                type='button'
              />
            </div>
          </div>
          <p className='line-clamp-1'>{template.revisionText}</p>

          <h3 className='mt-2 font-bold'>Questions</h3>
          <ul>
            {template.questions.map((q) => (
              <li key={q.id}>
                {questionsMap.get(q.id)?.question ?? 'Question was deleted...'}
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}
