import { isLoggedRequest } from "@lib/auth/isLoggedRequest";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";

export default function RootLayout({ children }) {
  const isLogged = isLoggedRequest();

  if (!isLogged) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </>
  );
}
