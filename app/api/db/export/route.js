import * as fs from 'fs'
import { NextResponse } from 'next/server'
import { successListResponse } from '@lib/http/ResponseHandler'
import groupBy from '@/util/groupBy'
import prisma from '@lib/prisma'
import XLSX, { writeXLSX } from 'xlsx'
/**
 *
 * @param { NextResponse } request
 * @param { import("next").NextPageContext } context
 * @param { object } context.params
 */
export async function GET(request, { params }) {
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
    const { FormAnswered, question, id, revisionText } = data
    const topics = new Map(
      question
        .filter((qst) => qst.topic)
        .map((qst) => [qst.topic?.id, qst.topic])
    )

    const topicsWithquestions = []

    for (let topic of topics.values()) {
      topicsWithquestions.push({
        topic: topic.topic,
        questionCount: question
          .filter((qst) => qst?.topic?.id === topic.id)
          .map((qst) => ({ question: qst.question, id: qst.id })),
      })
    }

    const users = new Map(FormAnswered.map((ans) => [ans.user.id, ans.user]))

    const answereds = groupBy(FormAnswered, (e) => e.user.id)
    let formAnswered = []
    let userNames = []
    for (let user of users.values()) {
      userNames.push({
        name: `${user.name} ${user.lastname ?? ''}`.trim(),
        id: user.id,
      })

      formAnswered.push({
        user,
        answers: answereds
          .get(user.id)
          .map(({ answer, questionId, status, id }) => ({
            id,
            answer,
            question:
              question.find(({ id }) => id === questionId) ?? questionId,
            status,
          })),
      })
    }

    const merges = []

    let cursor = 2

    let userCursor = 2

    const numberOfUsers = userNames.length

    const secondHeader = ['', '']

    const thirdHeader = ['id', 'review_text']

    const answerRow = []
    const firstHeader = [
      '',
      '',
      ...topicsWithquestions
        .map((twqt) => {
          const topicPlaceblank = Array(
            twqt.questionCount.length * numberOfUsers - 1
          ).fill('')

          const userPlaceblank = Array(twqt.questionCount.length - 1).fill('')

          const placeLength = topicPlaceblank.length

          const mergeTopic = {
            s: {
              c: cursor,
              r: 0,
            },
            e: {
              c: cursor + placeLength,
              r: 0,
            },
          }
          merges.push(mergeTopic)
          cursor += placeLength + 1

          secondHeader.push(
            ...userNames.map((user) => {
              const mergeUser = {
                s: {
                  c: userCursor,
                  r: 1,
                },
                e: {
                  c: userCursor + userPlaceblank.length,
                  r: 1,
                },
              }
              userCursor += userPlaceblank.length + 1

              merges.push(mergeUser)
              thirdHeader.push(
                ...twqt.questionCount.map((qst) => {
                  const answer = formAnswered
                    .find((pair) => pair.user.id === user.id)
                    .answers.find((sec) => sec.question.id === qst.id).answer
                  answerRow.push(answer)
                  return qst.question
                })
              )

              return [user.name, ...userPlaceblank]
            })
          )
          return [twqt.topic, ...topicPlaceblank]
        })
        .flat(),
    ]
    data.FormAnswered = formAnswered

    const sheet = XLSX.utils.json_to_sheet(
      [
        firstHeader,
        secondHeader.flat(),
        thirdHeader,
        [id, revisionText, ...answerRow],
      ],
      {
        skipHeader: true,
      }
    )
    sheet['!merges'] = merges
    const book = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(book, sheet, id.slice(24))
    XLSX.set_fs(fs)
    const xlsxlData = XLSX.write(book, {
      compression: true,
      type: 'buffer',
    })

    return new Response(xlsxlData, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment;filename="example.xlsx"',
      },
      status: 200,
    })
  }

  // return successListResponse({ data: dataByForm })
}

function formatExcel() {
  /**
   * Esto debería ser algo así...
   *
   */
  /*              Ejemplo, 2 tópicos, 3 preguntas por tópico, 2 usuarios respondiendo...
  [
    ['',        '',         'topico_1','', '',  '','',         '',  'topico_2','', '',  '','',         ''],
    ['',        '',         'user_1','',   '',  'user_2','',   '',  'user_1','',   '',  'user_2','',   ''],
    ['form_id', 'form',     'q_1','q_2','q_3',  'q_1','q_2','q_3',  'q_4','q_5','q_6',  'q_4','q_5','q_6'],
    ['asdasss', 'r_text',   'a_1','a_2','a_3',  'a_1','a_2','a_3',  'a_4','a_5','a_6',  'a_4','a_5','a_6']
  ]
  */
}
