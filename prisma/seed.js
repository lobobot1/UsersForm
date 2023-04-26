const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function Main() {
  /** Seed status of answer form **/
  console.time('🌻 Seeder Finished. ✔')
  console.log('▶ Seeder Starting....')

  const status = [
    { id: 1, status: 'answered' },
    { id: 2, status: 'created' },
    { id: 3, status: 'deleted' },
    { id: 4, status: 'read' },
    { id: 5, status: 'revised' },
    { id: 6, status: 'updated' },
  ]

  console.log('🗄 Generate Data....')
  if (
    Promise.all(
      status.map(async (data) => await prisma.status.create({ data }))
    )
  )
    console.log('📃 Form States Created')
}

Main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(() => {
    console.timeEnd('🌻 Seeder Finished. ✔')
  })
