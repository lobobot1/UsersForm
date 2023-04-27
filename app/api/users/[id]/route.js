import isNumber from '@/util/isNumber'
import { getCookieId } from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { fatality, somePrismaError, unauthorized } from '@lib/http/ErrorHandler'
import { successRetrieveResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 *
 * @param { NextRequest } request
 * @param { object } context
 * @param { object } context.params
 */
export async function GET(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read user' })

  const { id } = params
  if (!isNumber(id)) return invalidUrlParam()

  try {
    const userIdCookie = getCookieId(request)
    const userId = await prisma.user.findUnique({
      where: { id: userIdCookie },
      select: { id: true },
    })

    if (!isAdmin && !(userId.id === id))
      return unauthorized({ entity: 'update this user' })
    const data = await prisma.user.findFirst({
      select: {
        id: true,
        nickname: true,
        email: true,
        name: true,
        lastname: true,
        isAdmin: true,
        Form: {
          select: {
            _count: true,
            id: true,
            revisionText: true,
            question: {
              select: {
                id: true,
                question: true,
                PossibleAnswer: { select: { id: true, answer: true } },
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
        FormAnswered: {
          select: {
            id: true,
            form: {
              select: {
                id: true,
                revisionText: true,
              },
            },
            question: {
              select: {
                id: true,
                question: true,
              },
            },
            answer: true,
            status: {
              select: {
                id: true,
                status: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    })

    if (!data) return fatality()

    return successRetrieveResponse({ data })
  } catch (error) {
    return somePrismaError(error)
  }
}
