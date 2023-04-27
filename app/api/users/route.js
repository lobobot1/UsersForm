import isAdminRequest from '@lib/auth/isAdminRequest'
import { fatality, somePrismaError, unauthorized } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 *
 * @param { NextRequest } request
 */
export async function GET(request) {
  if (!(await isAdminRequest(request)))
    return unauthorized({ entity: 'list users' })

  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        nickname: true,
        email: true,
        name: true,
        lastname: true,
        isAdmin: true,
        _count: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isAdmin: 'asc',
        },
        {
          name: 'asc',
        },
        {
          createdAt: 'asc',
        },
      ],
    })

    if (!data) return fatality()

    return successListResponse({ data })
  } catch (error) {
    return somePrismaError(error)
  }
}
