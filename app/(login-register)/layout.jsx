import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { redirect } from 'next/navigation'

export default function RootLayout({ children }) {
  const isLogged = isLoggedRequest()

  if (isLogged) {
    redirect('/user')
  }

  return (
    <div className='min-w-screen min-h-screen bg-gray-800 flex flex-col items-center justify-center p-5'>
      {children}
    </div>
  )
}
