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
    return unauthorized({ message: 'create topics' })

  const body = await request.json()
  const { topic } = body
  if (!topic) {
    return someFieldMissing()
  }

  try {
    const newTopic = await prisma.topic.create({
      data: {
        name: topic,
      },
      select: { id: true },
    })

    if (!newTopic) {
      console.log({ newTopic })
      return fatality()
    }
    return creationResponse({ entity: 'topic' })
  } catch (error) {
    console.log({ error })
    return someFieldUnique(error)
  }
}
