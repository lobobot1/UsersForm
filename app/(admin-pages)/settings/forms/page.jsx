import CreateFormForm from './CreateFormForm'
import FormList from './FormList'

export const metadata = {
  title: 'Settings | Forms',
}

const Page = async () => {
  return (
    <div className='lg:flex gap-8'>
      <div className='grow'>
        <h1 className='text-xl font-bold mb-3'>Forms</h1>
        <FormList />
      </div>

      <div className='w-full max-w-xs'>
        <h2 className='text-xl font-bold mb-3'>Create a new form</h2>
        <div className='bg-white p-2 text-black rounded-md'>
          <CreateFormForm />
        </div>
      </div>
    </div>
  )
}

export default Page
