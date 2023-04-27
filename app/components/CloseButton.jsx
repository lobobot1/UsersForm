import { clsx } from '@/util/clsx'
import CloseCircle from './icons/CloseCircle'

/**
 * @typedef {import('react').ComponentPropsWithoutRef<'button'>} CloseButtonProps
 */

const base = 'text-red-500'

/** @param {CloseButtonProps} props */
const CloseButton = ({ children, className, ...props }) => {
  return (
    <button className={clsx([base, className])} {...props}>
      <CloseCircle />
    </button>
  )
}

export default CloseButton
