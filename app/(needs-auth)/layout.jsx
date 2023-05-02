import { isAdminRequestFront } from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { cookieOption } from '@lib/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NavbarUser from './NavbarUser'

export default async function RootLayout({ children }) {
  const isLogged = isLoggedRequest()

  if (!isLogged) {
    redirect('/login')
  }

  const isAdmin = await isAdminRequestFront(
    cookies().get(cookieOption.name)?.value
  )
  if (isAdmin) {
    redirect('/settings/forms')
  }

  return (
    <div className='flex flex-col'>
      <NavbarUser />
      <main className='bg-neutral-200 min-h-screen'>{children}</main>
    </div>
  )
}
