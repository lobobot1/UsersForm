import { clsx } from '@/util/clsx'
import PlusCircle from './icons/PlusCircle'

/**
 * @typedef {import('react').ComponentPropsWithoutRef<'button'>} AddButtonProps
 */

const base = 'text-green-500'

/** @param {AddButtonProps} props */
const AddButton = ({ children, className, ...props }) => {
  return (
    <button className={clsx([base, className])} {...props}>
      <PlusCircle />
    </button>
  )
}

export default AddButton
