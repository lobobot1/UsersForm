'use client'
import { clsx } from '@/util/clsx'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import XMark from './icons/XMark'

const maxSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: '',
}

const Modal = ({ isOpen, setIsOpen, title, children, maxSize = 'md' }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen)
  }, [isOpen])

  if (!isOpen || !isMounted) return null

  return createPortal(
    <div className='absolute inset-0 grid items-center justify-center z-10'>
      <button
        className='absolute inset-0 z-0 bg-black/20 cursor-default backdrop-blur-sm'
        onClick={() => setIsOpen(false)}
      >
        <span className='sr-only'>Close modal</span>
      </button>

      <div
        className={clsx([
          'bg-white rounded-md shadow-md z-10 p-3 w-screen max-h-screen flex flex-col',
          maxSizes[maxSize],
        ])}
      >
        <div className='flex justify-between mb-2'>
          <span className='text-lg font-bold'>{title}</span>
          <button
            className='shrink-0 self-start'
            title='Close modal'
            onClick={() => setIsOpen(false)}
          >
            <XMark />
          </button>
        </div>
        <div className='max-h-full overflow-auto'>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
