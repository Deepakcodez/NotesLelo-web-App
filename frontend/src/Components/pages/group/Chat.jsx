import { Fragment, useContext, useEffect, useRef, useState } from 'react';

import { createGroupContext } from '../../../Context';
import axios from 'axios';


export const Chat = () => {
  const scrollRef = useRef();
  const groupId = localStorage.getItem('groupId')
  const [newdemands, setNewDemands] = useState([])

  const { demand, currentUser } = useContext(createGroupContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/demand/demands/${groupId}`);
        setNewDemands(response.data.data);
        console.log('>>>>>>>>>>>resp user', response.data.data[0].user);
        console.log('>>>>>>>>>>>resp demand', response.data.data[0].demand)

      } catch (error) {
        console.log('Error fetching demands:', error);
      }
    };

    fetchData();
  }, [groupId, demand]);


  useEffect(() => { console.log('>>>>>>>>>>>', currentUser) }, [])





















  useEffect(() => {

    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);





  return (
    <>
      <div className="chatContent flex flex-col gap-5 overflow-y-scroll no-scrollbar w-full
       h-[calc(100vh-3rem)] md:h-[calc(100vh-7.6rem)] py-3 px-6">
        {/* Display received messages */}
        {
          newdemands.map((dmd, index) => {
            return (

              
               <Fragment key={index}>
                <div  className={` ${dmd.demand.from === currentUser._id?"self-end":"self-start"} min-h-[10rem] h-  max-h-[20rem] w-[90%] sm:w-[70%] md:w-[40%] bg-slate-500 rounded-lg px-1 `} style={{ borderTop: "1rem solid orange" }}>
                  <h1 className='sender text-orange-300'>{dmd.user.name.toUpperCase()}</h1>
                  <div className='messageArea  h-[80%] overflow-y-scroll  text-white p-5 overflow-auto no-scrollbar  '>{dmd.demand.message}</div>
                </div>
                </Fragment>
              
                
            )
          })
        }
      </div>


    </>
  );
};
