import { isLoggedRequest } from '@lib/auth/isLoggedRequest';
import { redirect } from "next/navigation";

export default function RootLayout({ children }) {
  const isLogged = isLoggedRequest()

  if (!isLogged) {
    redirect("/login")
  }

  return (
    <>
      {children}
    </>
  );
}
