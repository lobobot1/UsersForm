import { creationResponse } from '@lib/http/ResponseHandler'
import { NextRequest } from 'next/server'
import {
  someFieldMissing,
  someFieldUnique,
  unauthorized,
} from '@lib/http/ErrorHandler'
import isAdminRequest from '@lib/auth/isAdminRequest'
import prisma from '@lib/prisma'

/**
 *
 * @param {NextRequest} request
 */
export async function POST(request) {
  /**
   * Check user is admin
   * Validate data fields
   * Create new Record
   * Return success response or any error
   */
  if (!(await isAdminRequest(request)))
    return unauthorized({ message: 'create questions' })

  const body = await request.json()
  const { question } = body
  if (!question) {
    return someFieldMissing()
  }

  try {
    const newQuestion = await prisma.question.create({
      data: {
        question,
      },
      select: { id: true },
    })

    if (!newQuestion) {
      return fatality()
    }
    return creationResponse({ entity: 'question' })
  } catch (error) {
    console.log({ error })
    return someFieldUnique(error)
  }
}
