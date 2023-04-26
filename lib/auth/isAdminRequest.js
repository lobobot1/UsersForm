import { decodeCookie } from '@lib/jwt'
import { NextRequest } from 'next/server'
import prisma from '@lib/prisma'
/**
 * Check if the incoming request is from an administrator
 * @param { NextRequest } req
 * @returns { Promise<boolean> }
 */
export default async function isAdminRequest(req) {
  const payload = decodeCookie(req)
  if (!payload?.id) {
    return false
  }
  const admin = await prisma.user.findUnique({
    where: { id: payload?.id },
    select: { isAdmin: true },
  })
  return !!admin && admin?.isAdmin
}
