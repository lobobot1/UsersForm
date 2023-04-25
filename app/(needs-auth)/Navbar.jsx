import Link from 'next/link'

const links = [
  { href: '/form', label: 'Forms' },
  { href: '/users', label: 'Users' },
  { href: '/settings/questions', label: 'Settings' },
  { href: '/api/auth/logout', label: 'Logout' },
]

const Navbar = () => {
  return (
    <header className='bg-white'>
      <div className='container mx-auto p-2 flex items-center justify-between'>
        <div>UserForms</div>

        <nav>
          <ul className='flex gap-5'>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
