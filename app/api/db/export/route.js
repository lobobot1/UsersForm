import groupBy from '@/util/groupBy'
import { successListResponse } from '@lib/http/ResponseHandler'
import prisma from '@lib/prisma'
import { data } from 'browserslist'
import { NextResponse } from 'next/server'

/**
 *
 * @param { NextResponse } request
 * @param { import("next").NextPageContext } context
 * @param { object } context.params
 */
export async function POST(request, { params }) {
  const dataByUser = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      FormAnswered: {
        select: {
          id: true,
          answer: true,
          form: {
            select: {
              id: true,
              revisionText: true,
            },
          },
          question: {
            select: {
              id: true,
              question: true,
            },
          },
          formId: true,
        },
      },
    },
  })

  const dataByForm = await prisma.form.findMany({
    select: {
      id: true,
      FormAnswered: {
        select: {
          answer: true,
          status: { select: { id: true, status: true } },
          id: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              lastname: true,
            },
          },
          questionId: true,
        },
      },
      question: {
        select: {
          id: true,
          question: true,
          topic: {
            select: {
              id: true,
              topic: true,
            },
          },
        },
      },
      revisionText: true,
    },
  })

  for (let data of dataByForm) {
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

  return successListResponse({ data: dataByForm })
}
