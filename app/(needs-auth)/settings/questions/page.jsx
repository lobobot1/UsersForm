import QuestionList from './QuestionList'
import CreateQuestionForm from './CreateQuestionForm'

const Page = async () => {
  return (
    <div className='lg:flex gap-6'>
      <div className='grow'>
        <h1 className='text-xl font-bold mb-3'>Questions</h1>
        <QuestionList />
      </div>

      <div className='w-full max-w-xs'>
        <h2 className='text-xl font-bold mb-3'>Create a new question</h2>
        <CreateQuestionForm />
      </div>
    </div>
  )
}

export default Page
