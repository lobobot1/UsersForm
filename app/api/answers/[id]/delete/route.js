import isNumber from '@/util/isNumber'
import { invalidUrlParam } from '@lib/http/ErrorHandler'
import { successDeleteResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()

  try {
    await prisma.possibleAnswer.delete({
      where: {
        id: Number(id),
      },
    })

    return successDeleteResponse({ entity: 'answer' })
  } catch (error) {
    return somePrismaError(error)
  }
}
