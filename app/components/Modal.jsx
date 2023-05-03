'use client'
import { clsx } from '@/util/clsx'
import getFocusableElements from '@/util/getFocusableElements'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import XMark from './icons/XMark'

const maxSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: '',
}

/**
 * @param {{
 *  isOpen: boolean,
 *  setIsOpen: (open: false) => void,
 *  title: import('react').ReactNode,
 *  children: import('react').ReactNode,
 *  maxSize: keyof typeof maxSizes,
 *  triggerRef: HTMLElement
 * }} props
 */
const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  maxSize = 'md',
  triggerRef,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const id = useId()
  const contentRef = useRef(null)
  const currentFocusedElement = useRef(null)
  const hasBeenOpened = useRef(false)

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen)
    if (isOpen && contentRef.current) {
      const focusables = getFocusableElements(contentRef.current)
      focusables[0].focus()
      currentFocusedElement.current = 0
      hasBeenOpened.current = true
    }
  }, [isOpen])

  useEffect(() => {
    if (hasBeenOpened.current && !isOpen) {
      triggerRef.focus()
    }
  }, [isOpen, triggerRef])

  if (!isOpen || !isMounted) return null

  return createPortal(
    <div
      className='fixed inset-0 z-10 grid items-center justify-center'
      role='dialog'
      aria-modal='true'
      aria-labelledby={`${id}-modal-title`}
    >
      <button
        className='absolute inset-0 z-0 cursor-default bg-black/20 backdrop-blur-sm'
        onClick={() => setIsOpen(false)}
      >
        <span className='sr-only'>Close modal</span>
      </button>

      <div
        className={clsx([
          'bg-white rounded-md shadow-md z-10 p-3 w-screen max-h-screen flex flex-col',
          maxSizes[maxSize],
        ])}
        ref={contentRef}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Escape':
              setIsOpen(false)
              break

            case 'Tab':
              e.preventDefault()
              const focusables = getFocusableElements(contentRef.current)
              const firstElement = focusables[0]
              const lastElement = focusables.length - 1

              if (e.shiftKey) {
                if (currentFocusedElement.current === 0) {
                  focusables[lastElement].focus()
                  currentFocusedElement.current = lastElement
                  return
                }
                currentFocusedElement.current -= 1
                focusables[currentFocusedElement.current].focus()
                return
              }

              if (currentFocusedElement.current === lastElement) {
                firstElement.focus()
                currentFocusedElement.current = 0
                return
              }

              currentFocusedElement.current += 1
              focusables[currentFocusedElement.current].focus()
              break
          }
        }}
      >
        <div className='flex justify-between mb-2'>
          <span className='text-lg font-bold' id={`${id}-modal-title`}>
            {title}
          </span>
          <button
            className='self-start shrink-0'
            title='Close modal'
            onClick={() => setIsOpen(false)}
          >
            <XMark />
          </button>
        </div>
        <div className='max-h-full overflow-auto' tabIndex={0}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
