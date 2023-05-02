import { isAdminRequestFront } from '@lib/auth/isAdminRequest'
import { cookieOption } from '@lib/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Navbar from './Navbar'

export default async function RootLayout({ children }) {
  const cookieList = cookies()
  const isAdmin = await isAdminRequestFront(
    cookieList.get(cookieOption.name)?.value
  )

  if (!isAdmin) {
    redirect('/user')
  }

  return (
    <div className='flex flex-col'>
      <Navbar />
      <main className='container mx-auto grow'>{children}</main>
    </div>
  )
}
