import isAdminRequest, { getCookieId } from '@lib/auth/isAdminRequest'
import {
  someFieldMissing,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { creationResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 *
 * @param { NextRequest } request
 * @returns { NextResponse }
 */
export async function POST(request) {
  if (!(await isAdminRequest(request)))
    return unauthorized({ entity: 'create forms' })

  const id = getCookieId(request)
  const body = await request.json()

  if (!validateBody(body)) return someFieldMissing()
  const { revisionText, questions } = body
  try {
    const data = await prisma.form.create({
      data: {
        authorId: id,
        revisionText,
        question: {
          connect: questions.map((id) => ({ id })),
        },
      },
      select: {
        id: true,
      },
    })
    if (!data) return fatality()

    return creationResponse({ entity: 'form', id: data.id })
  } catch (error) {
    return somePrismaError(error)
  }
}

/**
 * check body
 * @param { any } body
 * @returns { boolean }
 */
function validateBody(body) {
  const { revisionText, questions } = body

  return Boolean(revisionText || questions || questions.length > 0)
}
