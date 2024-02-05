import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from '../../../Context';
import axios from 'axios';
import { IoHandLeftOutline } from "react-icons/io5";


export const GroupDemand = () => {
  const scrollRef = useRef();
  const groupId = localStorage.getItem('groupId')
  const [newdemands, setNewDemands] = useState([])


  const { demand, setDemand, currentUser } = useContext(createGroupContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://notes-lelo-app-backend.vercel.app/api/v1/demand/demands/${groupId}`);
        setNewDemands(response.data.data);
        console.log('>>>>>>>>>>>', newdemands)


      } catch (error) {
        console.log('Error fetching demands:', error);
      }
    };

    fetchData();
  }, [groupId, demand]);


  useEffect(() => {

    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);





  return (
    <>
      <div className="chatContent relative flex flex-col gap-5 overflow-y-scroll no-scrollbar w-full
       h-[calc(100vh-3rem)] md:h-[calc(100vh-7.6rem)] py-3 pt-[3rem] px-6">
        {/* Display received messages */}
        {
          newdemands?.map((dmd, index) => {
            return (


              <Fragment key={index}>
                <div ref={scrollRef} className={` ${dmd.demand.from === currentUser._id ? "self-end" : "self-start"} min-h-[10rem] h-  max-h-[20rem] w-[90%] sm:w-[70%] md:w-[40%] bg-slate-600 rounded-lg px-1  border-gray-200`} style={{ borderTop: "1rem solid orange", borderBottom: "1px solid white" }}>
                  <div className='flex justify-between'>
                    <h1 className='sender text-orange-300'>{dmd.user?.name.toUpperCase()}</h1>
                    <div className='text-white/25' >{new Date(dmd.demand?.createdAt).toLocaleString()}</div>

                  </div>
                  <div className='messageArea  h-[80%] overflow-y-scroll text-2xl font-bold text-white p-5 overflow-auto no-scrollbar  '>{dmd.demand?.message}</div>
                </div>
              </Fragment>


            )
          })
        }
        <div className='demand sticky p-4 mt-[30rem] text-center text-xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 self-end bottom-[35rem]' onClick={() => setDemand(true)}>
          <IoHandLeftOutline />

        </div>
      </div>


    </>
  );
};
