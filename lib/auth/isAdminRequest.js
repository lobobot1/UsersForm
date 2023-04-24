import { decodeCookie } from '@lib/jwt'
import { NextRequest } from 'next/server'
import prisma from '@lib/prisma'
/**
 * Check if the incoming request is from an administrator
 * @param { NextRequest } req
 * @returns { boolean }
 */
export default async function isAdminRequest(req) {
  const payload = decodeCookie(req)
  const admin = await prisma.user.findUnique({
    where: { id: payload?.id },
    select: { isAdmin: true },
  })
  console.log({ admin })
  return !!admin && admin?.isAdmin
}
