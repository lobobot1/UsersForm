import Link from 'next/link'
import Logout from '../components/icons/Logout'

const links = [
  // { href: '/settings/questions', label: 'Settings', icon: <Gear /> },
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
      <div className='container flex items-center justify-between p-2 mx-auto'>
        <div className='text-lg font-bold'>Admin dashboard</div>

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
