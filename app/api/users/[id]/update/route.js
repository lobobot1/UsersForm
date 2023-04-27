import isNumber from '@/util/isNumber'
import isAdminRequest, { getCookieId } from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { encryptToSaveDB } from '@lib/crypt'
import {
  fatality,
  invalidUrlParam,
  someFieldMissing,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 *
 * @param { NextRequest } request
 * @param { object } context
 * @param { object } context.params
 */
export async function PUT(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'update users' })
  
  const isAdmin = await isAdminRequest(request)
  
  try {
    const { id } = params
    if (!isNumber(id)) return invalidUrlParam()

    const userIdCookie = getCookieId(request)
    const userId = await prisma.user.findUnique({
      where: { id: userIdCookie },
      select: { id: true },
    })

    if (!isAdmin && !(userId.id === id))
      return unauthorized({ entity: 'update this user' })

    const body = await request.json()

    /** change password check */
    const adminData = {}
    if (body?.password || body?.rePassword) {
      if (!isAdmin) return unauthorized({ entity: 'change password' })

      const { password, rePassword } = body

      if (!(password === rePassword))
        return someFieldMissing({ message: 'passwords do not match' })

      adminData.newPassword = encryptToSaveDB(password)
    }

    if (body?.isAdmin !== undefined && isAdminRequest(request))
      adminData.isAdmin = body.isAdmin
    /** validate unique email */
    if (body?.email) {
      const emails = await prisma.user.count({
        where: { email: body.email },
      })
      if (emails > 0) {
        return someFieldMissing({ message: 'e-mail is already used' })
      }
    }

    const data = await prisma.user.update({
      data: {
        email: body?.email ?? undefined,
        name: body?.name ?? undefined,
        nickname: body?.nickname ?? undefined,
        lastname: body?.lastname ?? undefined,
        password: adminData?.newPassword ?? undefined,
        isAdmin: adminData?.isAdmin ?? undefined,
      },
      select: {
        id: true,
        nickname: true,
        email: true,
        name: true,
        lastname: true,
        isAdmin: true,
        _count: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: Number(id),
      },
    })

    if (!data) return fatality()

    return successListResponse({ data })
  } catch (error) {
    return somePrismaError(error)
  }
}
