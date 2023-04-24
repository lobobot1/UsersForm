// import prisma from "@/lib/prisma";
// import { headers } from "next/dist/client/components/headers";
import isAdminRequest from '@lib/auth/isAdminRequest'
import {
  someFieldMissing,
  someFieldUnique,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { creationResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
// import { withIronSessionApiRoute } from 'iron-session/next'
// import { sessionOption } from "@/lib/iron-session";

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
  const isAdmin = isAdminRequest(request)
  if (!isAdmin) {
    return unauthorized({ message: 'create questions' })
  }

  const body = await request.json()
  const { question, topicId } = body
  if (!question || !topicId) {
    return someFieldMissing()
  }

  try {
    const newQuestion = await prisma.question.create({
      data: {
        question,
        topicId: Number(topicId),
      },
      select: { id: true },
    })

    if (!newQuestion) {
      console.log({ newQuestion })
      return fatality()
    }
    return creationResponse({ entity: 'question' })
  } catch (error) {
    console.log({ error })
    return someFieldUnique(error)
  }
}
