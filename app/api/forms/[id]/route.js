import groupBy from '@/util/groupBy'
import isUUID from '@/util/isUUId'
import { isLoggedRequest } from '@lib/auth/isLoggedRequest'
import {
  invalidUrlParam,
  notFoundResponse,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { successRetrieveResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { NextRequest } from 'next/server'

/**
 *
 * @param {NextRequest} request
 * @param { object } context
 * @param { object } context.params
 */
export async function GET(request, { params }) {
  if (!isLoggedRequest()) return unauthorized({ entity: 'read form' })

  const { id } = params
  if (!isUUID(id)) return invalidUrlParam()

  try {
    const data = await prisma.form.findFirst({
      where: { id: id },
      select: {
        id: true,
        author: {
          select: {
            email: true,
            id: true,
            name: true,
            lastname: true,
          },
        },
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
          },
        },
        revisionText: true,
        FormAnswered: {
          select: {
            id: true,
            status: {
              select: {
                id: true,
                status: true,
              },
            },
            answer: true,
            question: {
              select: {
                id: true,
                question: true,
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
    })

    if (!data) return notFoundResponse({ entity: 'form' })

    if (data.FormAnswered.length > 0) {
      const users = new Map(
        data.FormAnswered.map((ans) => [ans.user.id, ans.user])
      ).values()

      const answereds = groupBy(data.FormAnswered, (e) => e.user.id)

      let formAnswered = []
      for (let user of users) {
        formAnswered.push({
          user,
          answers: answereds
            .get(user.id)
            .map(({ answer, question, status, id }) => ({
              id,
              answer,
              question,
              status,
            })),
        })
      }
      data.FormAnswered = formAnswered
    }
    return successRetrieveResponse({ data })
  } catch (error) {
    return somePrismaError(error)
  }
}
