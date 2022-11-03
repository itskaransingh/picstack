import React from 'react'
import {Circles} from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
    <Circles
      
      color="#00BFFF"
      height={50}
      width={200}
      className="mt-16"
    />

    <p className="text-lg py-2 text-gray-600 text-center px-2">{message}</p>
  </div>
  )
}

export default Spinner