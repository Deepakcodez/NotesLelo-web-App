import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { format } from 'date-fns';

function Notification() {
  const token = localStorage.getItem("useDataToken");
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await axios.get("https://notes-lelo-app-backend.vercel.app/api/v1/notification/latest_notification", {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });

        console.log(resp);
        setNotificationData(resp.data.data);
        setLoading(false); // Set loading to false when the data is received
      } catch (error) {
        console.log('>>>>>>>>>>>', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Call the fetchdata function
    fetchdata();

  }, [token]);



  return (


    <>
      <div className=" w-full  ">
        <div className='header h-[2rem] w-full bg-slate-700/25 flex items-center px-3  '
          style={{ borderBottom: "1px solid gray" }}
        >
          <h1 className='text-white font-semibold'>Notification</h1>
        </div>

        {/* data  */}
        <div className='h-[calc(100%-2rem)] w-full overflow-y-scroll no-scrollbar p-3  '>
          <div className='h-auto w-full flex flex-col gap-4 '>


            {
              notificationData?.reverse().map((data, index) => <Fragment key={index}>
                <div
                  className='h-[6rem] w-full bg-gradient-to-br from-slate-900/25 to-slate-700/25 rounded-lg p-3 flex justify-between'
                  style={{ borderTop: "1px solid #bcc6d1" }}
                >
                  <h1 className='text-white'> <span className='font-bold text-blue-100 text-lg'>{data.user[0].name.charAt(0).toUpperCase() + data.user[0].name.slice(1)}</span> {data.message} </h1>
                  <h1 className='text-white/25 font-light'>
                  {format(new Date(data.createdAt), 'hh:mm a')}
                  </h1>
                </div>
              </Fragment>)
            }

          </div>
        </div>

      </div>
    </>








  );
}

export default Notification;
