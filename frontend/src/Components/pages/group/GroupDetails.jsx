import axios from 'axios'
import React, { useContext } from 'react'
import useSWR from 'swr'
import { MdCancel } from "react-icons/md";
import { createGroupContext } from '../../../Context';
import {motion} from 'framer-motion';

export const GroupDetails = () => {
  const token = localStorage.getItem("useDataToken");
  const groupId = localStorage.getItem('groupId')
  const {  setGroupMembers} = useContext(createGroupContext);

  const { data, error } = useSWR(`https://notes-lelo-app-backend.vercel.app/api/v1/group/members/${groupId}`,
    async (url) => {
      try {
        const resp = await axios(url, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        console.log('>>>>>>>>>>>', resp.data.Groups)

        return resp.data.Groups

      } catch (error) {
        console.log('>>>>>>>>>>>', error)
      }

    }
  )


  return (
    <>
      <motion.div
      initial={{opacity:0, scale:0.2}}
      animate={{opacity:1,scale:1,type:"spring"}}
      className='  absolute shadow-md top-[1.5rem] right-5 rounded-lg border border-gray-400 overflow-y-scroll no-scrollbar 
       h-[calc(100vh-7.15rem)]  bg-slate-700  w-[30%]'>
        <div className="header flex px-3 justify-between items-center text-white bg-slate-800/25 font-semibold text-center py-2 text-lg border-b ">
         <h1></h1>
         <h1> Members </h1>
        <MdCancel className='text-2xl' onClick={()=>setGroupMembers(false)} />
        </div>



      </motion.div>
    </>
  )
}
