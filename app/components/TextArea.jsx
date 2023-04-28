import { inputClasses, labelClasses } from '@/app/components/Input_label'
import { forwardRef } from 'react'

/** @typedef {{ label: string, hideLabel?: boolean } & import('react').ComponentPropsWithRef<'textarea'>} TextAreaProps */

/** @type {import('react').ForwardRefRenderFunction<HTMLInputElement, TextAreaProps>} */
const TextArea = forwardRef(
  ({ label, id, name, hideLabel = false, required, ...props }, ref) => {
    return (
      <div className='flex flex-col'>
        <label htmlFor={id || name} className={labelClasses} hidden={hideLabel}>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        <textarea
          id={id || name}
          className={inputClasses}
          name={name}
          ref={ref}
          required={required}
          {...props}
        ></textarea>
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'

export default TextArea
