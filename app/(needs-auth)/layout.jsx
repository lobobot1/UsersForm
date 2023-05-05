import { isAdminRequestFront } from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { cookieOption } from '@lib/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NavbarUser from './NavbarUser'

export default async function RootLayout({ children }) {
  const isLogged = isLoggedRequest()

  if (!isLogged) {
    return redirect('/login')
  }

  const isAdmin = await isAdminRequestFront(
    cookies().get(cookieOption.name)?.value
  )
  if (isAdmin) {
    return redirect('/settings/forms')
  }

  return (
    <div className='flex flex-col'>
      <NavbarUser />
      <main className='min-h-screen bg-neutral-200'>{children}</main>
    </div>
  )
}
