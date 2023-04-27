import isUUID from '@/util/isUUId'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import {
  invalidUrlParam,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successUpdateResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 *
 * @param {NextRequest} request
 * @param { object } context
 * @param { string } context.params
 * @returns { Promise<NextResponse> }
 */
export async function PUT(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'update forms' })

  const { id } = params

  if (!isUUID(id)) return invalidUrlParam()

  try {
    const body = await request.json()
    const { authorId, questions, revisionText } = body

    const data = await prisma.form.update({
      data: {
        authorId,
        question: {
          set: questions,
        },
        revisionText,
      },
      where: { id: id },
      select: {
        id: true,
        author: {
          select: {
            email: true,
            id: true,
            name: true,
            lastname: true,
          },
        },
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
          },
        },
        revisionText: true,
        FormAnswered: {
          select: {
            status: {
              select: {
                id: true,
                status: true,
              },
            },
            answer: true,
            question: {
              select: {
                id: true,
                question: true,
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
    })
    return successUpdateResponse({ entity: 'form', data })
  } catch (error) {
    console.log({ error })
    return somePrismaError(error)
  }
}
