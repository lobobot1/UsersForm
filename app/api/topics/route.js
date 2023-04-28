import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { fatality, somePrismaError, unauthorized } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET(request) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read topics' })

  try {
    const data = await prisma.topic.findMany({
      select: {
        id: true,
        topic: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
    })

    if (!data) return fatality()

    return successListResponse({ data })
  } catch (error) {
    console.error({ error })
    somePrismaError(error)
  }
}
