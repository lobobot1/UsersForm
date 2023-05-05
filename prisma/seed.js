const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const CryptoJS = require('crypto-js')
const prisma = new PrismaClient({})
const questions = [
  {
    id: 1,
    topicId: 1,
    question: 'Link to Item',
  },
  {
    id: 2,
    topicId: 1,
    question: 'Free Text Comments',
  },
  {
    id: 3,
    topicId: 2,
    question: "Feedback's main topic",
  },
  {
    id: 4,
    topicId: 2,
    question: 'Contains Reasons',
  },
  {
    id: 5,
    topicId: 3,
    question: "Description of item, it's parts or properties",
  },
  {
    id: 6,
    topicId: 3,
    question: 'Price',
  },
  {
    id: 7,
    topicId: 3,
    question: 'Experience Using it',
  },
  {
    id: 8,
    topicId: 3,
    question: 'General opinion on item',
  },
  {
    id: 9,
    topicId: 4,
    question: 'Match the description by the seller',
  },
  {
    id: 10,
    topicId: 4,
    question: 'Packaging',
  },
  {
    id: 11,
    topicId: 4,
    question: 'Shipping',
  },
  {
    id: 12,
    topicId: 4,
    question: 'Communication',
  },
  {
    id: 13,
    topicId: 4,
    question: 'Previous experience with the seller',
  },
  {
    id: 14,
    topicId: 4,
    question: 'General opinion on seller',
  },
  {
    id: 15,
    topicId: 5,
    question: 'How helpful is this feedback regarding the seller?',
  },
  {
    id: 16,
    topicId: 5,
    question:
      'Why did you find the feedback helpful or not helpful? [regarding the seller]',
  },
  {
    id: 17,
    topicId: 5,
    question: 'How helpful is this feedback regarding the item?',
  },
  {
    id: 18,
    topicId: 6,
    question:
      'Why did you find the feedback helpful or not helpful? [regarding the item]',
  },
  {
    id: 19,
    topicId: 6,
    question: 'Sentiment of feedback',
  },
]
const { NODE_ENV, SECRET } = process.env
const envPaths = {
  production: '.env',
  default: '.env.example',
}

/** Execute Seeder */
Main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error({ error })
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(() => {
    console.timeEnd('🌻 Seeder Finished. ✔')
  })

async function Main() {
  console.time('🌻 Seeder Finished. ✔')
  console.log('▶ Seeder Starting....')
  console.log('🗄 Generate Data....')

  if (await formStatus()) console.log('📃 Form States Created ✔')

  if (await firstAdmin()) console.log('👨‍💻 Administrator User Created ✔')

  if (await questionsTopics()) console.log('📚 Questions Topics Created ✔')

  if (await firstQuestions()) console.log('🔍 Questions Created ✔')

  if (await firstPossibleAnswers()) console.log('🖊️ Possible Answers Created ✔')
}

async function firstAdmin() {
  /** Seed first Admin user */
  console.log('👨‍💻 Generating Administrator User')
  async function getSecret() {
    const envFile = envPaths[NODE_ENV]

    if (envFile && !fs.existsSync(envFile)) {
      return console.error('Not found env path')
    }
    const file = await fs.promises.readFile(envFile, 'utf-8')
    return file.match(/SECRET="(.*)"/)[1]
  }

  const secret = NODE_ENV === 'production' ? SECRET : await getSecret()
  const data = {
    id: 1,
    email: 'example@gmail.com',
    name: 'admin',
    isAdmin: true,
    nickname: 'admin',
    password: encryptToSaveDB('password', secret),
  }

  return Boolean(
    await prisma.user.create({
      data,
    })
  )
}
async function formStatus() {
  console.log('📃 Generating Form States...')
  /** Seed status of answer form **/
  const status = [
    { id: 1, status: 'answered' },
    { id: 2, status: 'created' },
    { id: 3, status: 'deleted' },
    { id: 4, status: 'read' },
    { id: 5, status: 'revised' },
    { id: 6, status: 'updated' },
  ]
  return Boolean(
    await Promise.all(
      status.map(async (data) => await prisma.status.create({ data }))
    )
  )
}
async function questionsTopics() {
  console.log('📚 Generating questions topics... ')
  /** Seed question Topics */
  const topics = [
    {
      id: 1,
      topic: 'with free text',
    },
    {
      id: 2,
      topic: 'Feedback Topics',
    },
    {
      id: 3,
      topic: 'Product Topics',
    },
    {
      id: 4,
      topic: 'Seller Topics',
    },
    {
      id: 5,
      topic: 'Helpful Topics',
    },
    {
      id: 6,
      topic: 'Sentiment Topics',
    },
  ]

  return Boolean(
    await Promise.all(
      topics.map(async (data) => await prisma.topic.create({ data }))
    )
  )
}
async function firstQuestions() {
  console.log('🔍 Generating questions... ')
  /** Seed first questions */

  return Boolean(
    await Promise.all(
      questions.map(async (data) => await prisma.question.create({ data }))
    )
  )
}
async function firstPossibleAnswers() {
  /** Seed First Possible Answers */
  console.log('🖊️ Generating possible answers... ')
  try {
    const answers = [
      {
        questionId: 3,
        answers: [
          {
            answer: 'mostly about the seller',
          },
          {
            answer: 'mostly about the item',
          },
          {
            answer: 'equally about both seller and item',
          },
          {
            answer: 'does not contain any useful information',
          },
        ],
      },
      {
        questionId: 4,
        answers: [
          {
            answer: 'No information',
          },
          {
            answer: 'Only General sentences',
          },
          {
            answer: 'Only 1 sentence with detail',
          },
          {
            answer: '2+ sentences with details',
          },
        ],
      },
      {
        topicId: [2, 3],
        answers: [
          {
            answer: 'yes',
          },
          {
            answer: 'no',
          },
        ],
      },
      {
        topicId: [4],
        answers: [
          {
            answer: '0 - not helpful to anyone',
          },
          {
            answer: '1 - can be helpful',
          },
          {
            answer: '2 - helpful',
          },
          {
            answer: '3 - very helpful',
          },
        ],
      },

      {
        topicId: [5],
        answers: [
          {
            answer: 'Positive',
          },
          {
            answer: 'Negative',
          },
          {
            answer: 'Mixed positive and negative',
          },
          {
            answer: 'Neutrual',
          },
        ],
      },
    ]
    for (let section of answers) {
      const { answers, questionId, topicId } = section
      if (questionId) {
        for (let { answer } of answers) {
          await createAnswer({ answer, id: questionId })
        }
      } else if (topicId) {
        for (let question of questions) {
          if (topicId.includes(question?.topicId)) {
            for (let { answer } of answers) {
              await createAnswer({ answer, id: question.id })
            }
          }
        }
      }
    }
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

/**
 *  Encrypt function, return an string hashed with *HmacSHA256*
 * @param {string} msg  HmacSHA256
 * @param {string} secret  secret from env
 * @returns {string} string with hash hashed
 */
function encryptToSaveDB(msg, secret) {
  if (!secret)
    throw new Error('Not SECRET encrypt environment variables configured')
  const k = secret
  return CryptoJS.HmacSHA256(CryptoJS.SHA256(msg).toString(), k).toString()
}

/**
 *  Allow create answers quickly
 * @param { {id:number, answer:string }} answer
 * @returns { Prisma.Prisma__PossibleAnswerClient<PossibleAnswer, never> }
 */
async function createAnswer({ id, answer }) {
  return await prisma.possibleAnswer.create({
    data: { answer, question: { connect: { id } } },
  })
}
