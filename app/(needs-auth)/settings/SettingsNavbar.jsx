import Link from 'next/link'
import { headers } from 'next/headers'

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
  const headersList = headers()
  const currentPath = headersList.get('x-original-uri')

  return (
    <nav className='mt-3 p-2 text-white'>
      <ul className='flex gap-4 items-center'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                'p-2 rounded-md ' +
                (currentPath === link.href
                  ? 'bg-white text-black'
                  : 'bg-gray-600')
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
