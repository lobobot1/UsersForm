import { cookies } from "next/headers";
import { cookieOption, verifyJwt } from '@lib/jwt';

/** @returns {boolean} */
export function isLoggedRequest() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(cookieOption.name);
  const isLoggedIn = verifyJwt(sessionToken?.value);
  return !isLoggedIn.error;
}
