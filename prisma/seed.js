const { PrismaClient } = require('@prisma/client')
const fs = require('fs').promises

const CryptoJS = require('crypto-js')
const prisma = new PrismaClient()

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

  if (await questionsTopics()) console.log('📚 Questions TOpics Created ✔')
}

async function firstAdmin() {
  /** Seed first Admin user */
  console.log('👨‍💻 Generating Administrator User')
  const file = await fs.readFile('.env.local', 'utf-8')
  const secret = file.match(/SECRET="(.*)"/)[1]

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
  console.log('Generating questions topics... ')
  /** Seed question Topics */
  const topics = [
    {
      topic: 'Feedback Topics',
    },
    {
      topic: 'Product Topics',
    },
    {
      topic: 'Seller Topics',
    },
    {
      topic: 'Helpful Topics',
    },
    {
      topic: 'Sentiment Topics',
    },
  ]

  return Boolean(
    await Promise.all(
      topics.map(async (data) => await prisma.topic.create({ data }))
    )
  )
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
