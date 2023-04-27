import Spinner from '@/app/components/Spinner'
import Trash from '@/app/components/icons/Trash'

/**
 * @param {{
 *  title: string,
 *  entity: string,
 *  onConfirm: () => Promise<void>,
 *  isDeleting: boolean
 * }} props
 */
const DeleteButton = ({
  title = 'Delete',
  entity = 'item',
  onConfirm,
  isDeleting,
}) => (
  <button
    className='absolute right-2 top-2 text-red-500 disabled:text-red-300'
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
  >
    {isDeleting ? <Spinner /> : <Trash />}
  </button>
)

export default DeleteButton
