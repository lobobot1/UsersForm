import { forwardRef } from 'react'

/** @typedef {{ label: string, hideLabel?: boolean } & import('react').ComponentPropsWithRef<'input'>} InputProps */

/** @type {import('react').ForwardRefRenderFunction<HTMLInputElement, InputProps>} */
const Input_label = forwardRef(
  ({ label, id, name, hideLabel = false, type = 'text', ...props }, ref) => {
    return (
      <div className='flex flex-col'>
        <label
          htmlFor={id || name}
          className='mb-2 text-lg font-normal'
          hidden={hideLabel}
        >
          {label}
        </label>

        <input
          ref={ref}
          type={type}
          id={id || name}
          name={name}
          className='focus:outline-none focus:border-cyan-500 py-1 pl-2 rounded-md border-2 border-gray-300 w-full'
          {...props}
        />
      </div>
    )
  }
)

Input_label.displayName = 'Input_label'

export default Input_label
