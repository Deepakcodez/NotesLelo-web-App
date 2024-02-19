import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { format } from 'date-fns';
import Lottie from "lottie-react";
import loaderBook from '../../assets/loaderbook.json';
import { NotificationGhost } from '../shared/ghost/NotificationGhost';
import { motion } from 'framer-motion'
import useSWR from 'swr';


function Notification() {
  const token = localStorage.getItem("useDataToken");

  const { data, error } = useSWR('https://notes-lelo-app-backend.vercel.app/api/v1/notification/latest_notification', async (url) => {

    try {
      const resp = await axios(url, {
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      })
      // console.log('>>>>>>>>>>>', resp.data.data)
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
    return <NotificationGhost />;
  }



  return (
    <>
      <div className=" w-full  ">
        <div className='header h-[2rem] w-full bg-slate-700/25 flex items-center px-3  '
          style={{ borderBottom: "1px solid gray" }}>
          <h1 className='text-white font-semibold'>Notification</h1>
        </div>
        {/* data  */}
        <div className='h-[calc(100%-2rem)] w-full overflow-y-scroll no-scrollbar p-3  '>
          <div className='h-auto w-full flex flex-col gap-4 '>
            {
              data?.reverse().map((data, index) => <Fragment key={index}>
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: "linear",
                    duration: .2,
                    delay: (index * .3)

                  }}
                  className='h-[6rem] w-full bg-gradient-to-br from-slate-900/25 to-slate-700/25 rounded-lg p-3 flex justify-between'
                  style={{ borderTop: "1px solid #bcc6d1" }}
                >
                  <h1 className='text-white'> <span className='font-bold text-blue-100 text-lg'>{data.user[0].name.charAt(0).toUpperCase() + data.user[0].name.slice(1)}</span> {data.message} </h1>
                  <h1 className='text-white/25 font-light'>
                    {format(new Date(data.createdAt), 'hh:mm a')}
                  </h1>
                </motion.div>
              </Fragment>)
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
