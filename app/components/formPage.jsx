'use client'
import Form from '@/app/components/form'
import useFormDetail from '@/app/hooks/useFormDetail'

const FormPage = ({id}) => {
  const { form , sendReply } = useFormDetail(id)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center items-center text-lg'>
          <div className=' text-justify bg-slate-200 rounded-md p-6 h-96 w-[80%] drop-shadow-xl flex justify-center items-center'>
            <p>
              {form?.data?.revisionText}
            </p>
          </div>

          <div className=' bg-slate-400 rounded-md p-6 w-[90%] drop-shadow-xl'>
            <Form form={form?.data?.question} sendReply={sendReply}/>
          </div>
    </div>
  )
}

export default FormPage
