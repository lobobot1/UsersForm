'use client'
import React from 'react'

const Select = ({ register, value }) => {
  return (
    <select className='py-2 rounded pl-2 cursor-pointer' {...register(value,{required:true})}>
        <option value="" selected disabled>Choose an option</option>   
        <option value="Yes">Yes</option>
        <option value="No">No</option> 
    </select>
  )
}

export default Select
