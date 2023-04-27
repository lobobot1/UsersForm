import { decodeCookie, verifyJwt } from '@lib/jwt'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'
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

/**
 * Check if the incoming request is from an administrator (front)
 * @param {string} [cookie]
 */
export async function isAdminRequestFront(cookie) {
  if (!cookie) return false

  const payload = verifyJwt(cookie)
  if (payload.error) return false

  const admin = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { isAdmin: true },
  })

  return admin && admin.isAdmin
}
