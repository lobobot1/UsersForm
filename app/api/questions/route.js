/** Get all questions */
import { fatality, unauthorized } from '@lib/http/ErrorHandler'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { NextRequest } from 'next/server'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

/**
 *
 * @param { NextRequest } request
 */
export async function GET() {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read questions' })

  const data = await prisma.question.findMany({
    select: {
      id: true,
      question: true,
      updatedAt: true,
      createdAt: true,
    },
    orderBy: { question: 'asc' },
  })

  if (!data) return fatality()

  return successListResponse({ data })
}
