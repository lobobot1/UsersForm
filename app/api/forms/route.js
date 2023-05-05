import isAdminRequest, { getCookieId } from '@lib/auth/isAdminRequest'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import { fatality, unauthorized } from '@lib/http/ErrorHandler'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 * @param { NextRequest} request
 */
export async function GET(request) {
  const page = request.nextUrl.searchParams.get('page')
  if (!isLoggedRequest()) return unauthorized({ entity: 'read forms' })
  const isAdmin = await isAdminRequest(request)
  const userId = getCookieId(request)
  const where = {
    user: {
      id: userId,
    },
  }
  let pagination
  let metaPage
  if (page) {
    const formCount = await prisma.form.count({
      where: {
        FormAnswered: { some: { userId: !isAdmin ? userId : undefined } },
      },
    })
    const formForPage = 10
    const pages = Math.ceil(formCount / formForPage)

    const skip = formForPage * (page - 1)
    const take = formForPage
    metaPage = { totalPages: pages, totalResults: formCount, currentPage: page }
    pagination = { skip, take }
  }

  const data = await prisma.form.findMany({
    select: {
      id: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          lastname: true,
        },
      },
      createdAt: true,
      question: {
        select: {
          id: true,
          question: true,
          topic: { select: { id: true, topic: true } },
          PossibleAnswer: {
            select: {
              id: true,
              answer: true,
            },
          },
          _count: true,
        },
      },
      revisionText: true,
      FormAnswered: {
        where: !isAdmin ? where : undefined,
        select: {
          id: true,
          answer: true,
          status: {
            select: {
              id: true,
              status: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    ...pagination,
  })

  if (!data) return fatality()

  return successListResponse({ data, meta: metaPage })
}
