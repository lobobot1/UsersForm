'use client'
import { useForm } from 'react-hook-form'
import Select from './select'

const Form = () => {
  const { register, handleSubmit, formState:{errors} } = useForm()
  let product = ['Description of item, it’s parts or properties', 'Price', 'Experience Using it', 'General opinion on item']
  let seller = ['Match the description by the seller', 'Packaging', 'Shipping','Communication','Previous experience with the seller','General opinion on seller']

  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <form
      id='scroll' 
      className=' h-screen overflow-y-auto' 
      onSubmit={handleSubmit(onSubmit)}
    >      

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">Feedbacks main topic</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("feedback", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Mostly about the seller">
            Mostly about the seller
          </option>
          <option value="Mostly about the item">Mostly about the item</option>
          <option value="Equally about both seller and item">
            Equally about both seller and item
          </option>
          <option value="Does not contain any useful information">
            Does not contain any useful information
          </option>
        </select>
        {errors.feedback && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">Contains Reasons</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("Contains Reasons", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Only General Opinion">Only General Opinion</option>
          <option value="Only 1 reason">Only 1 reason</option>
          <option value="2 Or more reasons">2 Or more reasons</option>
        </select>
        {errors['Contains Reasons'] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <h2 className=" text-3xl flex justify-center mb-2 font-semibold">Product Topics</h2>

        <div>
          {   
            product.map((item, index) => (
              <div key={index} className="flex flex-col gap-1 py-3 px-1">
                <label className=' text-lg font-medium' htmlFor="">{item}</label>
                <Select register={register} value={item} />
                {errors[item] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
              </div>
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-1 p-3">
        <h2 className=" text-3xl flex justify-center mb-2 font-semibold">Seller Topics</h2>

        <div>
          {   
            seller.map((item, index) => (
              <div key={index} className="flex flex-col gap-1 py-3 px-1">
                <label className=' text-lg font-medium' htmlFor="">{item}</label>
                <Select register={register} value={item} />
                {errors[item] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
              </div>
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">How helpful is this feedback regarding the seller?</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("How-helpful-seller", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Not helpful to anyone">Not helpful to anyone</option>
          <option value="can be helpful">can be helpful</option>
          <option value="Helpful">Helpful</option>
          <option value="Very helpful">Very helpful</option>
        </select>
        {errors['How-helpful-seller'] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">Why did you find the feedback helpful or not helpful? [regarding the seller]</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("Why helpful", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Not helpful to anyone">Not helpful to anyone</option>
          <option value="can be helpful">can be helpful</option>
          <option value="Helpful">Helpful</option>
          <option value="Very helpful">Very helpful</option>
        </select>
        {errors['Why helpful'] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">How helpful is this feedback regarding the item?</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("How-helpful-item", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Not helpful to anyone">Not helpful to anyone</option>
          <option value="can be helpful">can be helpful</option>
          <option value="Helpful">Helpful</option>
          <option value="Very helpful">Very helpful</option>
        </select>
        {errors['How-helpful-item'] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">Why did you find the feedback helpful or not helpful? [regarding the item]</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("Sentiment-feedback", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Positive">Positive</option>
          <option value="Negative">Negative</option>
          <option value="Mixed positive and negative">Mixed positive and negative</option>
          <option value="Neutral">Neutral</option>
        </select>
        {errors['Sentiment-feedback'] && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">Sentiment of feedback</label>
        <select className='py-2 rounded pl-2 cursor-pointer' {...register("Sentiment", { required: true })}>
          <option value="" selected disabled>
            Select an option
          </option>
          <option value="Positive">Positive</option>
          <option value="Negative">Negative</option>
          <option value="Mixed positive and negative">Mixed positive and negative</option>
          <option value="Neutral">Neutral</option>
        </select>
        {errors.Sentiment && <span className='text-red-600 font-semibold text-base'>This field is required</span>}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <label className=' text-lg font-medium' htmlFor="">Free Text Comments</label>
        <textarea className='py-2 rounded-md px-4' cols="30" rows="10" {...register("Comment")} placeholder='Free comment here'/>
      </div>

      <div className='flex justify-center'>
        {/* <button className=' w-[30%] bg-green-600 hover:bg-green-700 transition-colors delay-75 ease-in rounded-md py-2 text-xl' type="submit">Submit</button>   */}
        <button id='button' type='submit'>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg className='animation-bounce h-6 w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>  
      </div>
    </form>
  );
}

export default Form
