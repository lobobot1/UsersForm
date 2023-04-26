import isNumber from '@/util/isNumber'
import {
  cantDoThatResponse,
  invalidUrlParam,
  someFieldMissing,
  somePrismaError,
} from '@lib/http/ErrorHandler'
import { successUpdateResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
const { REVIEWED_STATUS } = process.env
/**
 *
 * @param {NextRequest} request
 * @param { object } context
 * @param { string } context.params
 * @returns { Promise<NextResponse> }
 */
export async function PUT(request, { params }) {
  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()

  try {
    const review = await prisma.question.findFirst({
      select: {
        _count: true,
      },
      where: {
        OR: [
          {
            FormAnswered: {
              some: {
                AND: [
                  { statusId: Number(REVIEWED_STATUS) },
                  { questionId: Number(id) },
                ],
              },
            },
          },
        ],
      },
    })

    if (review) {
      const count = Object.values(review['_count']).reduce(
        (prev, val) => (prev += val ?? 0),
        0
      )
      if (count > 0) {
        return cantDoThatResponse({ entity: 'question', action: 'update' })
      }
    }

    const body = await request.json()
    const { question } = body

    if (!question || question == '') return someFieldMissing()

    const data = await prisma.question.update({
      data: {
        question,
      },
      where: {
        id: Number(id),
      },
    })

    return successUpdateResponse({ entity: 'question', data })
  } catch (error) {
    return somePrismaError(error)
  }
}
