import isNumber from '@/util/isNumber'
import isAdminRequest from '@lib/auth/isAdminRequest'
import {
  invalidUrlParam,
  someFieldMissing,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successDeleteResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = params
  if (!isNumber(id)) return invalidUrlParam()

  if (!(await isAdminRequest(request)))
    return unauthorized({ entity: 'delete user' })
  try {
    const body = await request.json()
    if (!body.mail || !body.reMail) return someFieldMissing()

    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
      select: { email: true },
    })

    if (!(body.email === body.reMail) && !(body.email === user.email))
      return someFieldMissing({ message: 'not match correct email.' })

    await prisma.user.delete({ where: { id: Number(id) } })
    return successDeleteResponse({ entity: 'user' })
  } catch (error) {
    return somePrismaError(error)
  }
}
