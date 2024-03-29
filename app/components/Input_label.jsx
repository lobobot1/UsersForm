import { forwardRef } from 'react'

export const inputClasses =
  'text-black focus:outline-none focus:border-cyan-500 py-1 pl-2 rounded-md border-2 border-gray-300 w-full'
export const labelClasses = 'mb-1 font-medium'

/** @typedef {{ label: string, hideLabel?: boolean } & import('react').ComponentPropsWithRef<'input'>} InputProps */

/** @type {import('react').ForwardRefRenderFunction<HTMLInputElement, InputProps>} */
const Input_label = forwardRef(
  (
    { label, id, name, hideLabel = false, type = 'text', required, ...props },
    ref
  ) => {
    return (
      <div className='flex flex-col'>
        <label htmlFor={id || name} className={labelClasses} hidden={hideLabel}>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>

        <input
          ref={ref}
          type={type}
          id={id || name}
          name={name}
          className={inputClasses}
          required={required}
          {...props}
        />
      </div>
    )
  }
)

Input_label.displayName = 'Input_label'

export default Input_label
