import Trash from '@/app/components/icons/Trash'
import Spinner from '@/app/components/Spinner'
import { clsx } from '@/util/clsx'

/**
 * @param {{
 *  title: string,
 *  entity: string,
 *  onConfirm: () => Promise<void>,
 *  isDeleting: boolean,
 *  className: string
 * }} props
 */
const DeleteButton = ({
  title = 'Delete',
  entity = 'item',
  onConfirm,
  isDeleting,
  className,
}) => (
  <button
    className={clsx(['text-red-500 disabled:text-red-300', className])}
    title={title}
    onClick={async () => {
      if (!confirm(`Are you sure you want to delete this ${entity}?`)) return
      try {
        await onConfirm()
      } catch (error) {
        alert(error.message)
      }
    }}
    disabled={isDeleting}
    type='button'
  >
    {isDeleting ? <Spinner /> : <Trash />}
  </button>
)

export default DeleteButton
