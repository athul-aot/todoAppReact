import React from 'react'

function Input({id,placeholder,type,className}) {
  return (
    <input id={id}placeholder={placeholder} type={type} className={className} style={{border:'none'}}/>
  )
}

export default Input
