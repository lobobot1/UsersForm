import isNumber from '@/util/isNumber'
import { cantDoThatResponse, invalidUrlParam } from '@lib/http/ErrorHandler'
import { successDeleteResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()
  const review = await prisma.question.findFirst({
    select: {
      _count: true,
    },
    where: {
      OR: [
        {
          Forms: { some: { question: { some: { id: Number(id) } } } },
        },
        {
          FormAnswered: { some: { questionId: Number(id) } },
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
      return cantDoThatResponse({ entity: 'question', action: 'delete' })
    }
  }
  try {
    const data = await prisma.question.delete({
      where: {
        id: Number(id),
      },
    })
    console.log({ data })
    return successDeleteResponse({ entity: 'question' })
  } catch (error) {
    return somePrismaError(error)
  }
}
