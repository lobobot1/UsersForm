import { decodeCookie } from '@lib/jwt'
import { NextRequest } from 'next/server'
import prisma from '@lib/prisma'
/**
 * Check if the incoming request is from an administrator
 * @param { NextRequest } req
 * @returns { Promise<boolean> }
 */
export default async function isAdminRequest(req) {
  const id = getCookieId(req)
  if (!id) {
    return false
  }
  const admin = await prisma.user.findUnique({
    where: { id: id },
    select: { isAdmin: true },
  })
  return !!admin && admin?.isAdmin
}

/**
 * return the userId inside session_cookie
 * @param {NextRequest} req
 * @returns { number | boolean } id
 */
export function getCookieId(req) {
  const payload = decodeCookie(req)
  if (!payload?.id) {
    return false
  }
  return payload.id
}
