import isAdminRequest from '@lib/auth/isAdminRequest'
import {
  fatality,
  someFieldMissing,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { creationResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function POST(request) {
  if (!(await isAdminRequest(request)))
    return unauthorized({ entity: 'create topics' })
  const body = await request.json()

  if (!body?.topic) return someFieldMissing()

  try {
    const data = await prisma.topic.create({
      data: {
        topic: body.topic,
      },
      select: {
        id: true,
      },
    })

    if (!data) return fatality()

    return creationResponse({ entity: 'topic', id: data.id })
  } catch (error) {
    console.error({ error })
    return somePrismaError(error)
  }
}
