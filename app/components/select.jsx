'use client'
import React from 'react'

const Select = ({ register, value, option }) => {
  return (
    <select className='py-2 rounded pl-2 cursor-pointer' {...register(value,{required:true})}>
        <option value="" selected disabled>Choose an option</option>   
        {option.map(item=>(
          <option key={item.id} value={item.answer}>{item.answer}</option>
        ))}
    </select>
  )
}

export default Select
