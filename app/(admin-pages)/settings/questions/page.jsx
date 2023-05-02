import CreateQuestionForm from './CreateQuestionForm'
import QuestionList from './QuestionList'

export const metadata = {
  title: 'Settings | Questions',
}

const Page = async () => {
  return (
    <div className='lg:flex gap-8'>
      <div className='grow'>
        <h1 className='text-xl font-bold mb-3'>Questions</h1>
        <QuestionList />
      </div>

      <div className='w-full lg:max-w-xs'>
        <h2 className='text-xl font-bold mb-3 mt-3 lg:mt-0'>
          Create a new question
        </h2>
        <div className='bg-white p-2 text-black rounded-md'>
          <CreateQuestionForm />
        </div>
      </div>
    </div>
  )
}

export default Page
