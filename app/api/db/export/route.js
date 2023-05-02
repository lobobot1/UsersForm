import { NextResponse } from 'next/server'
import { successFileResponse } from '@lib/http/ResponseHandler'

import prisma from '@lib/prisma'
import XLSX, { utils } from 'xlsx'
/**
 *
 * @param { NextResponse } request
 * @param { import("next").NextPageContext } context
 * @param { object } context.params
 */
export async function GET(request, { params }) {
  /** Prepare SpreadSheet Book */
  const book = XLSX.utils.book_new()

  const topicWithQuestions = await prisma.topic.findMany({
    select: {
      id: true,
      topic: true,
      questions: {
        select: {
          id: true,
          question: true,
        },
        orderBy: {
          id: 'asc',
        },
      },
    },
    where: {
      questions: {
        /**for develope 1; for prod -> revised_status */
        some: { Forms: { some: { FormAnswered: { some: { statusId: 1 } } } } },
      },
    },
  })

  const formUsers = await prisma.user.findMany({
    select: { id: true, name: true, lastname: true },
    /**for develope 1; for prod -> revised_status */
    where: { FormAnswered: { some: { statusId: 1 } } },
    orderBy: {
      id: 'asc',
    },
  })
  const usersLength = formUsers.length

  const topicsHeader = ['', '']
  const usersHeader = ['', '']
  for (let entity of topicWithQuestions) {
    /** TopicsHeader creation */
    const questionLength = entity.questions.length
    const rowLength = questionLength * usersLength

    const topicCell = Array(rowLength).fill('')
    topicCell[0] = topicCell[topicCell.length - 1] = entity.topic

    topicsHeader.push(...topicCell)

    /** UsersHeader creation */
    const userPlaceCell = Array(questionLength).fill('')
    for (let user of formUsers) {
      const userCell = [...userPlaceCell]
      userCell[0] = userCell[userCell.length - 1] =
        `${user.name} ${user?.lastname}_${entity.topic}`.trim()
      usersHeader.push(...userCell)
    }
  }
  const headerSheet = XLSX.utils.aoa_to_sheet([topicsHeader, usersHeader], {
    skipHeader: true,
  })

  const formData = await prisma.form.findMany({
    select: {
      id: true,
      FormAnswered: {
        select: {
          id: true,
          questionId: true,
          answer: true,
          status: { select: { id: true } },
          user: {
            select: {
              id: true,
            },
          },
        },
        orderBy: [{ questionId: 'asc' }, { userId: 'asc' }],
      },
      revisionText: true,
    },
  })

  /** Prepare Data arrays with answers */
  const dataArrays = []
  for (let form of formData) {
    const { FormAnswered, id, revisionText } = form
    const formRow = [id, revisionText]

    for (let ans of FormAnswered) {
      const { answer } = ans
      formRow.push(answer)
    }
    dataArrays.push(formRow)
  }

  const dataSheet = utils.aoa_to_sheet(dataArrays, {
    skipHeader: true,
  })

  const sheet = utils.sheet_add_aoa(headerSheet, dataSheet)

  XLSX.utils.book_append_sheet(book, sheet, 'default')

  const xlsxlData = XLSX.write(book, {
    compression: true,
    type: 'buffer',
  })
  return successFileResponse({ data: xlsxlData, filename: 'default.xlsx' })
}
