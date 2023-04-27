import isAdminRequest from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { fatality, unauthorized } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 * @param { NextRequest} request
 */
export async function GET(request) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read forms' })
  const isAdmin = await isAdminRequest(request)

  const data = await prisma.form.findMany({
    select: {
      id: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          lastname: true,
        },
      },
      createdAt: true,
      question: {
        select: {
          id: true,
          question: true,
          PossibleAnswer: {
            select: {
              id: true,
              answer: true,
            },
          },
          _count: true,
        },
      },
      revisionText: true,
      FormAnswered: {
        select: {
          id: true,
          answer: true,
          status: {
            select: {
              id: true,
              status: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  if (!data) return fatality()

  return successListResponse({ data })
}
