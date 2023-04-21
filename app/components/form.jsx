import React from 'react'
import { useForm } from 'react-hook-form'

const form = () => {
  const { register,handleSubmit, formState:{error}} = useForm
  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit()}>
      
    </form>
  )
}

export default form
