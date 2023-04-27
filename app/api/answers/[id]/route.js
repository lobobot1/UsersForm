import isNumber from '@/util/isNumber'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { invalidUrlParam, notFoundResponse, unauthorized } from '@lib/http/ErrorHandler'
import { successRetrieveResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read answers' })
  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()
  const data = await prisma.possibleAnswer.findFirst({
    select: {
      id: true,
      answer: true,
      question: { select: { id: true, question: true } },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id: Number(id),
    },
  })

  if (!data) return notFoundResponse({ entity: 'answer' })

  return successRetrieveResponse({ data })
}
