import { clsx } from '@/util/clsx'
import { forwardRef } from 'react'

const base = 'rounded-md py-1 px-2'
const variants = {
  primary: 'bg-blue-500 text-white disabled:bg-gray-400 hover:bg-blue-400',
  danger: 'bg-red-500 text-white disabled:bg-gray-400 hover:bg-red-400',
}

/**
 * @typedef {{
 *  variant: keyof typeof variants,
 *  children: import('react').ReactNode
 * } & import('react').ComponentPropsWithRef<'button'>} ButtonProps
 */

/** @type {import('react').ForwardRefRenderFunction<HTMLButtonElement, ButtonProps>} */
const Button = forwardRef(
  ({ children, variant = 'primary', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx([base, variants[variant], className])}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
