import { getCookieId } from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import {
  fatality,
  someFieldMissing,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import {
  successRetrieveResponse,
  successUpdateResponse,
} from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'
const { ANSWERED_STATUS } = process.env
const select = {
  id: true,
  FormAnswered: {
    select: {
      id: true,
      answer: true,
      question: {
        select: {
          id: true,
          question: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      status: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  },
}
/**
 *
 * @param { NextRequest } request
 * @param { object } context
 * @param { object } context.params
 */
export async function POST(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'answer form' })
  const { id } = params
  const userId = getCookieId(request)

  const { answers, status } = validateBody(await request.json())
  try {
    /** Prepare create formAnswered transactions */
    const asyncData = answers.map(({ answer, questionId }) =>
      prisma.formAnswered.create({
        data: {
          answer,
          questionId,
          formId: id,
          statusId: status?.id ?? Number(ANSWERED_STATUS),
          userId,
        },
        select: {
          id: true,
        },
      })
    )
    /** execute transactions */
    const syncData = await prisma.$transaction(asyncData)
    const formAnsweredIds = syncData.map((ans) => ans.id)

    /** retrieve form data filtering by formAsweredIds */
    const data = await prisma.form.findFirst({
      select,
      where: {
        AND: [
          { id },
          {
            FormAnswered: {
              some: {
                AND: [{ id: { in: formAnsweredIds } }],
              },
            },
          },
        ],
      },
    })

    if (!data) return fatality()

    return successRetrieveResponse({ data })
  } catch (error) {
    console.log({ error })
    return somePrismaError(error)
  }
}

/**
 *
 * @param { NextRequest } request
 * @param { object } context
 * @param { object } context.params
 */
export async function PUT(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'update some answer' })
  const { id } = params

  const { answers, status } = validateBody(await request.json())

  try {
    /** Prepare update formAnswered transactions */
    const asyncData = answers.map(({ answer, id }) =>
      prisma.formAnswered.update({
        data: {
          answer,
          statusId: status?.id ?? Number(UPDATED_STATUS),
        },
        where: { id },
        select: {
          id: true,
        },
      })
    )

    /** execute transactions */
    const syncData = await prisma.$transaction(asyncData)
    const formAnsweredIds = syncData.map((formAnswer) => formAnswer.id)

    /** retrieve form data filtering by formAsweredIds */
    const data = await prisma.form.findFirst({
      select,
      where: {
        AND: [
          { id },
          {
            FormAnswered: {
              some: {
                AND: [{ id: { in: formAnsweredIds } }],
              },
            },
          },
        ],
      },
    })

    if (!data) return fatality()

    return successUpdateResponse({ data, entity: 'formAnwer' })
  } catch (error) {
    console.log({ error })
    return somePrismaError(error)
  }
}

function validateBody(body) {
  const { answers } = body

  const fieldsNotExists = !answers
  const areNoArray = answers.length === 0 && Array.isArray(answers)

  return fieldsNotExists || areNoArray ? someFieldMissing() : body
}
