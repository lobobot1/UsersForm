import isUUID from '@/util/isUUId'
import { invalidUrlParam, somePrismaError } from '@lib/http/ErrorHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'
const { REVIEWED_STATUS } = process.env
/**
 * @param { NextRequest } request
 * @param { object } context
 * @param { object } context.params
 */
export async function DELETE(request, { params }) {
  const { id } = params
  if (!isUUID(id)) return invalidUrlParam()

  try {
    const review = await prisma.form.findFirst({
      where: {
        id: id,
        FormAnswered: {
          some: {
            NOT: {
              statusId: Number(REVIEWED_STATUS),
            },
          },
        },
      },
      select: {
        _count: true,
      },
    })
    if (review) {
      const count = Object.values(review['_count']).reduce(
        (prev, val) => (prev += val ?? 0),
        0
      )
      if (count > 0) {
        return cantDoThatResponse({ entity: 'question', action: 'delete' })
      }
    }
    console.log({ review })
  } catch (error) {
    console.log({ error })
    return somePrismaError(error)
  }
}
