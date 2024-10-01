import React from 'react'
import Lottie from "lottie-react";
import loaderBook from  '../../assets/loaderbook.json';
export const Library:React.FC = () => {
  return (
    <>
      <div className='h-full w-full flex flex-col  justify-center  items-center'>

        <Lottie className='h-[5rem]' animationData={loaderBook} loop={true} />
      <div className='text-white'>comming soon.....</div>
      </div>
    </>
  )
}
