import isNumber from '@/util/isNumber'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import {
  invalidUrlParam,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successDeleteResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextResponse } from 'next/server'
/**
 *
 * @param { NextRequest } request
 * @param { object } context
 * @param { object } context.params
 * @returns { Promise<NextResponse> }
 */
export async function DELETE(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'delete answers' })

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
