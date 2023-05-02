import isNumber from '@/util/isNumber'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import {
  invalidUrlParam,
  notFoundResponse,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successRetrieveResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read question' })

  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()
  try {
    const data = await prisma.question.findFirst({
      select: {
        id: true,
        question: true,
        topic: { select: { id: true, topic: true, _count: true } },
        Forms: { select: { id: true, _count: true, author: true } },
        PossibleAnswer: { select: { answer: true, id: true } },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: Number(id),
      },
    })

    if (!data) return notFoundResponse({ entity: 'question' })

    return successRetrieveResponse({ data })
  } catch (error) {
    return somePrismaError(error)
  }
}
