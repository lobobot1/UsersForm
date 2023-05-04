import CreateFormForm from './CreateFormForm'
import DownloadSpreadsheetButton from './DownloadSpreadsheetButton'
import FormList from './FormList'

export const metadata = {
  title: 'Settings | Forms',
}

const Page = async () => {
  return (
    <div className='gap-8 lg:flex'>
      <div className='grow'>
        <div className='flex items-center justify-between mb-3'>
          <h1 className='text-xl font-bold'>Forms</h1>
          <DownloadSpreadsheetButton />
        </div>
        <FormList />
      </div>

      <div className='w-full lg:max-w-sm shrink-0'>
        <div className='mt-3 mb-3 lg:mt-0'>
          <h2 className='text-xl font-bold lg:mt-0'>Create a new form</h2>
        </div>
        <div className='p-2 text-black bg-white rounded-md'>
          <CreateFormForm />
        </div>
      </div>
    </div>
  )
}

export default Page
