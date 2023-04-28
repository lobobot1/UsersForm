import Link from 'next/link'
import Gear from '../components/icons/Gear'
import Logout from '../components/icons/Logout'

const links = [
  { href: '/settings/questions', label: 'Settings', icon: <Gear /> },
  {
    href: '/api/auth/logout',
    label: 'Logout',
    className: 'text-red-500',
    icon: <Logout />,
    dontPrefetch: true,
  },
]

const Navbar = () => {
  return (
    <header className='bg-white'>
      <div className='container mx-auto p-2 flex items-center justify-between'>
        <div className='font-bold text-lg'>Admin dashboard</div>

        <nav>
          <ul className='flex gap-5'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={link.dontPrefetch ? false : undefined}
                  className={'flex items-center gap-2' + ` ${link.className}`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
