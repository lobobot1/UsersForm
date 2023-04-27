import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { somePrismaError, unauthorized } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET(request) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read status' })
  try {
    const data = await prisma.status.findMany()

    if (!data) return fatality()

    return successListResponse({ data })
  } catch (error) {
    console.log({ error })
    somePrismaError(error)
  }
}
