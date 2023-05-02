import isNumber from '@/util/isNumber'
import isAdminRequest from '@lib/auth/isAdminRequest'
import {
  invalidUrlParam,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successDeleteResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function DELETE(request, { params }) {
  if (!(await isAdminRequest(request)))
    return unauthorized({ entity: 'delete user' })

  const { id } = params
  if (!isNumber(id)) return invalidUrlParam()

  try {
    await prisma.user.delete({ where: { id: Number(id) } })
    return successDeleteResponse({ entity: 'user' })
  } catch (error) {
    return somePrismaError(error)
  }
}
