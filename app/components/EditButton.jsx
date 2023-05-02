import { clsx } from '@/util/clsx'
import PencilSquare from './icons/PencilSquare'

/**
 * @typedef {import('react').ComponentPropsWithoutRef<'button'>} EditButtonProps
 */

const base = 'text-gray-900'

/** @param {EditButtonProps} props */
const EditButton = ({ children, className, ...props }) => {
  return (
    <button className={clsx([base, className])} type='button' {...props}>
      <PencilSquare />
    </button>
  )
}

export default EditButton
