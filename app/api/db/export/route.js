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
  const questionheader = ['id', 'review_text']

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

      /** QuestionHeader creation */
      const questionCells = entity.questions.map((qst) => qst.question)
      questionheader.push(...questionCells)
    }
  }

  /** Sane and group header rows */
  const header = [
    saneHeader(topicsHeader),
    saneHeader(usersHeader),
    questionheader,
  ]

  /** prepare sheet with headers */
  const headerSheet = XLSX.utils.aoa_to_sheet(header, {
    skipHeader: true,
  })

  /** Set merges */
  headerSheet['!merges'] = [
    ...searchMerges(topicsHeader, 0),
    ...searchMerges(usersHeader, 1),
  ]

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
        orderBy: [{ question: { topicId: 'asc' } }, { userId: 'asc' }],
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

  const sheet = utils.sheet_add_aoa(headerSheet, dataArrays, {
    origin: 'A4',
  })

  XLSX.utils.book_append_sheet(book, sheet, 'default')

  const xlsxlData = XLSX.write(book, {
    compression: true,
    type: 'buffer',
  })
  return successFileResponse({ data: xlsxlData, filename: 'default.xlsx' })
}

/**
 * Returns a horizontal merge object
 * @param { number } s col start index
 * @param { number } e col end index
 * @param { number } r row start & end index
 * @returns
 */
function mergeFactory(s, e, r) {
  return {
    s: {
      r: r,
      c: s,
    },
    e: {
      r: r,
      c: e,
    },
  }
}

/**
 *  sane header texts, remove breakpoint strings
 * @param { string[] } headerArray
 * @returns
 */
function saneHeader(headerArray) {
  return headerArray.map((element) => {
    const el = element.replace('with free text', '')
    return el.match(/.*(?=_)/g) ? el.match(/.*(?=_)/g)[0] : el
  })
}
/**
 * Create array of merges
 * @param { string[] } entityHeader
 * @param { number } row
 * @returns
 */
function searchMerges(entityHeader, row) {
  let merges = []

  const entity = new Set(entityHeader.filter((str) => str !== ''))

  entity.forEach((v, k, set) => {
    let startI = entityHeader.indexOf(v)
    let endI = entityHeader.lastIndexOf(v)
    merges = [...merges, mergeFactory(startI, endI, row)]
  })

  return merges
}
