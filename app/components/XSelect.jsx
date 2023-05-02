import { inputClasses, labelClasses } from '@/app/components/Input_label'
import { forwardRef } from 'react'

/** @typedef {{ label: string, hideLabel?: boolean } & import('react').ComponentPropsWithRef<'select'>} SelectProps */

/** @type {import('react').ForwardRefRenderFunction<HTMLInputElement, SelectProps>} */
const XSelect = forwardRef(
  (
    { label, id, name, hideLabel = false, required, children, ...props },
    ref
  ) => {
    return (
      <div className='flex flex-col w-full'>
        <label htmlFor={id || name} className={labelClasses} hidden={hideLabel}>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>

        <select
          ref={ref}
          id={id || name}
          name={name}
          className={inputClasses}
          required={required}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
)
XSelect.displayName = 'XSelect'

export default XSelect
