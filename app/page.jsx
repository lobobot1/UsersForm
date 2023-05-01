'use client'
import Modal from '@/app/components/Modal'
import { useState } from 'react'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<h2>Hola modal</h2>}
        body={<p>Hola modal body</p>}
      />
      <button className='bg-white p-2' onClick={() => setIsOpen(true)}>
        Abrir modal
      </button>
    </div>
  )
}

export default Page
