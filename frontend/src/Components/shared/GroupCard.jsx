import React, { useRef } from 'react'
import { IoCopy } from "react-icons/io5";

export const GroupCard = () => {
  const userIdRef = useRef(null);
console.log('>>>>>>>>>>>',userIdRef.current.value )
    const  copyIdHandler =()=>{
      try {
         navigator.clipboard.writeText(userIdRef.current.value );
        console.log('Text successfully copied to clipboard');
      } catch (err) {
        console.error('Unable to copy to clipboard', err);
      }
    }

  return (
    <>
    <div className='card bg-slate-500/75 h-40  min-w-[auto]      rounded-md shadow-lg border-[1px]  border-t-slate-300 hover:border-t-slate-100 border-slate-400/50 hover:shadow-2xl hover:bg-slate-600 hover:scale-[1.009] outline-slate-200/5 outline-1 outline-offset-4 outline' >
      <div className=' border-b-[1px] pt-2 rounded-t-md border-b-slate-400/70 bg-slate-700'>
      <h1 className='groupName px-4 font-bold text-white  ' >Notes Zilla</h1>

      <div className='flex  items-center justify-between px-4 pb-2'>
      <input type='text' value={"dhhfkjdn"}
      ref={userIdRef}
      disabled={true}
      className='groupID text-slate-500 text-sm bg-transparent' />
      <IoCopy className='text-orange-200 text-lg hover:scale-110 hover:text-orange-300' 
      onClick={copyIdHandler}
      />
      </div>

      </div>
      <h1 className='p-2  text-slate-200'>Lorem ipsum dolor sit, explicabo harum dignissimos</h1>
    </div>
    </>
  )
}
