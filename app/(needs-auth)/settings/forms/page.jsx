import CreateFormForm from './CreateFormForm'

export const metadata = {
  title: 'Settings | Forms',
}

const Page = async () => {
  return (
    <div>
      <h1 className='text-xl font-bold mb-3'>Forms</h1>
      <CreateFormForm />
    </div>
  )
}

export default Page
