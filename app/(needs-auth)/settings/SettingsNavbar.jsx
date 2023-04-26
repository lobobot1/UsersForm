'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    href: '/settings/questions',
    label: 'Questions',
  },
  {
    href: '/settings/users',
    label: 'Users',
  },
]

const SettingsNavbar = () => {
  const pathName = usePathname()

  return (
    <nav className='mt-3 p-2 text-white'>
      <ul className='flex gap-4 items-center'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                'p-2 rounded-md ' +
                (pathName === link.href ? 'bg-white text-black' : 'bg-gray-600')
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SettingsNavbar
