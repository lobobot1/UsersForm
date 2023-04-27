import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { redirect } from 'next/navigation'
import NavbarUser from './NavbarUser'

export default function RootLayout({ children }) {
  const isLogged = isLoggedRequest()

  if (!isLogged) {
    redirect('/login')
  }

  return (
    <div className='flex flex-col'>
      <NavbarUser />
      <main className='container mx-auto grow'>{children}</main>
    </div>
  )
}
