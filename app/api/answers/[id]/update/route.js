import isNumber from '@/util/isNumber'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import {
  invalidUrlParam,
  someFieldMissing,
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
  if (!isLoggedRequest()) return unauthorized({ entity: 'update answers' })
  const { id } = params

  if (!isNumber(id)) return invalidUrlParam()

  try {
    const body = await request.json()
    const { answer, questionId } = body
    console.log(typeof questionId)
    if (!validateBody(body)) return someFieldMissing()

    const data = await prisma.possibleAnswer.update({
      data: {
        answer,
        questionId: Number(questionId),
      },
      where: {
        id: Number(id),
      },
    })

    return successUpdateResponse({ entity: 'answer', data })
  } catch (error) {
    return somePrismaError(error)
  }
}

function validateBody(body) {
  return !(
    !body ||
    !body.answer ||
    body.answer === '' ||
    !body.questionId ||
    typeof body.questionId !== 'number'
  )
}
