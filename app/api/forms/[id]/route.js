import isUUID from '@/util/isUUId'
import {
  invalidUrlParam,
  notFoundResponse,
  somePrismaError,
} from '@lib/http/ErrorHandler'
import { successRetrieveResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 *
 * @param {NextRequest} request
 * @param { object } context
 * @param { object } context.params
 */
export async function GET(request, { params }) {
  const { id } = params
  if (!isUUID(id)) return invalidUrlParam()

  try {
    const data = await prisma.form.findFirst({
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

    if (!data) return notFoundResponse({ entity: 'question' })

    return successRetrieveResponse({ data })
  } catch (error) {
    return somePrismaError(error)
  }
}
