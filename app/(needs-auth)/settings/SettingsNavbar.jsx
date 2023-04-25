const { default: Link } = require('next/link')

const links = [
  {
    href: '/settings/questions',
    label: 'Questions',
  },
]

const SettingsNavbar = () => {
  return (
    <nav className='p-2 border-t border-b'>
      <ul className='flex gap-4 items-center'>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SettingsNavbar
