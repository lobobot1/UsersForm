import { somePrismaError } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'

export async function GET(request) {
  try {
    const data = await prisma.status.findMany()

    if (!data) return fatality()

    return successListResponse({ data })
  } catch (error) {
    console.log({ error })
    somePrismaError(error)
  }
}
