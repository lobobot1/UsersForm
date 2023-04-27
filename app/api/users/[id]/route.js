import isNumber from '@/util/isNumber'
import { fatality, somePrismaError } from '@lib/http/ErrorHandler'
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
  const { id } = params
  if (!isNumber(id)) return invalidUrlParam()

  try {
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
