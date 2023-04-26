/** Get all topics */
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
  if (!isLoggedRequest()) return unauthorized({ entity: 'read topics' })

  const data = await prisma.topic.findMany({
    select: { id: true, name: true, updatedAt: true, createdAt: true },
    orderBy: { name: 'asc' },
  })

  if (!data) return fatality()

  return successListResponse({ data })
}
