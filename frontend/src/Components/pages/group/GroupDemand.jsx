import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from '../../../Context';
import axios from 'axios';
import { IoHandLeftOutline } from "react-icons/io5";
import { motion  } from 'framer-motion'
import useSWR from 'swr';
import { DemandGhost } from '../../shared/ghost/DemandGhost';

export const GroupDemand = () => {
  const scrollRef = useRef();
  const groupId = localStorage.getItem('groupId')
  const [newdemands, setNewDemands] = useState([])


  const { demand, setDemand, currentUser } = useContext(createGroupContext);




  useEffect(() => {

    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);


  
  const { data, error } = useSWR(`https://notes-lelo-app-backend.vercel.app/api/v1/demand/demands/${groupId}`, async (url) => {

  try {
    const resp = await axios.get(url)
    console.log('>>>>>>>>>>>', resp.data.data)
    return resp.data.data;


  } catch (error) {
    console.log('>>>>>>>>>>>', error)
  }
}

)
if (error) {
  console.log("Error fetching data:", error);
  return <div className="text-white font-semibold text-lg">Error fetching data. Please try again later.🤖</div>;
}
if (!data) {
  return <DemandGhost />;
}





  return (
    <>
      <div className="demandContent   flex flex-col gap-5 overflow-y-scroll no-scrollbar w-full
       h-[calc(100vh-10.15rem)] py-3 pt-[3rem] px-6">

        {
          data?.map((dmd, index) => {
            return (


              <Fragment key={index}>
                <motion.div
                initial={{ opacity:0}}
                  animate={{  opacity:1, }}
                  transition={{
                    ease: "linear",
                    duration: .2,
                    delay : (index*.3)
                    
                  }}
                  ref={scrollRef} className={` ${dmd.demand.from === currentUser._id ? "self-end" : "self-start"} min-h-[10rem] h-  max-h-[20rem] w-[90%] sm:w-[70%] md:w-[40%] bg-slate-600 rounded-lg px-1  border-gray-200`} style={{ borderTop: "1rem solid orange", borderBottom: "1px solid white" }}>
                  <div className='flex justify-between'>
                    <h1 className='sender text-orange-300'>{dmd.user?.name.toUpperCase()}</h1>
                    <div className='text-white/25' >{new Date(dmd.demand?.createdAt).toLocaleString()}</div>

                  </div>
                  <div className='messageArea  h-[80%] overflow-y-scroll text-2xl font-bold text-white p-5 overflow-auto no-scrollbar  '>{dmd.demand?.message}</div>
                </motion.div>
              </Fragment>


            )
          })
        }
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          du transition={{ type: "spring", delay: 0.3, duration: 1, stiffness: 300 }}
          className='demand absolute p-4 mt-[30rem] text-center text-xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 self-end right-10 bottom-[2rem]  md:bottom-[5rem]' onClick={() => setDemand(true)}>
          <IoHandLeftOutline />

        </motion.div>
      </div>


    </>
  );
};
