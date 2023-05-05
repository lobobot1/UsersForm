import { clsx } from '@/util/clsx'
import Link from 'next/link'

/**
 * @param {{
 *  page: number
 *  pages: number
 * }} props
 */
export const Pagination = ({
  currentPage,
  pagesCount,
  getLink,
  linkBaseClassname = 'px-3 py-1 rounded-md',
  activeClassname = 'text-gray-900 bg-white',
  notActiveClassname = 'text-white bg-gray-600',
} = {}) => {
  const totalButtons = pagesCount >= 3 ? 3 : pagesCount
  const inFirstPages = currentPage < totalButtons
  const inLastPages = currentPage > pagesCount - totalButtons

  /** @type {{ number: number; active: boolean }[]} */
  let buttons = Array.from({ length: totalButtons })

  if (inFirstPages) {
    buttons = buttons.map((_, i) => ({
      number: i + 1,
      active: i + 1 === currentPage,
    }))
  } else if (inLastPages) {
    buttons = buttons.map((_, i) => {
      const number = pagesCount - totalButtons + i + 1
      return { number, active: number === currentPage }
    })
  } else {
    buttons = buttons.map((_, i) => {
      const number = currentPage - Math.floor(totalButtons / 2) + i
      return {
        number,
        active: currentPage === number,
      }
    })
  }

  return (
    <>
      <div className='flex justify-center gap-2 my-4'>
        {currentPage !== 1 && (
          <Link
            className={`${linkBaseClassname} ${notActiveClassname}`}
            href={getLink(currentPage - 1)}
          >
            <span className='sr-only'>Página anterior</span>←
          </Link>
        )}

        {buttons.map((b, i) => (
          <Link
            key={i}
            className={clsx([
              linkBaseClassname,
              b.active && activeClassname,
              !b.active && notActiveClassname,
            ])}
            href={getLink(b.number)}
          >
            {b.number}
          </Link>
        ))}

        {currentPage !== pagesCount && (
          <Link
            className={`${linkBaseClassname} ${notActiveClassname}`}
            href={getLink(currentPage + 1)}
          >
            <span className='sr-only'>Next page</span>→
          </Link>
        )}
      </div>
      <div className='text-center'>
        Page {currentPage} of {pagesCount}
      </div>
    </>
  )
}
