import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'

function Notification() {
  const token = localStorage.getItem("useDataToken");
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await axios.get("http://localhost:8000/api/v1/notification/latest_notification", {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });


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
      <div className="container w-full  ">
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
                  className='h-[6rem] w-full bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg p-3 '
                  style={{ border: "1px solid #435585" }}
                >
                  <h1 className='text-white'>{data.message}</h1>
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
