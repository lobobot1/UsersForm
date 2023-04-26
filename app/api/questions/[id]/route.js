import isNumber from '@/util/isNumber'
import { invalidUrlParam, notFoundResponse } from '@lib/http/ErrorHandler'
import { successRetrieveResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET(request, { params }) {
  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()
  const data = await prisma.question.findFirst({
    select: {
      id: true,
      question: true,
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
}
