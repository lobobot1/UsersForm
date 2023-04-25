import QuestionList from './QuestionList'
import CreateQuestionForm from './CreateQuestionForm'

const Page = async () => {
  return (
    <div>
      <h1>Questions</h1>
      <QuestionList />

      <h2 className='text-xl font-bold mt-4'>Create new question</h2>
      <CreateQuestionForm />
    </div>
  )
}

export default Page
