import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { redirect } from 'next/navigation'

export default function RootLayout({ children }) {
  const isLogged = isLoggedRequest()

  if (isLogged) {
    return redirect('/user')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 bg-gray-800 min-w-screen'>
      {children}
    </div>
  )
}
