import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { unauthorized } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET() {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read answers' })

  const answers = await prisma.possibleAnswer.findMany()
  return successListResponse({ data: answers })
}
