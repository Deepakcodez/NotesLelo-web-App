import React, { useContext, useEffect, useRef, useState } from 'react'
import { createGroupContext } from '../../Context';
import { FaBook } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';

function Profile() {
  const { currentUser } = useContext(createGroupContext);
  const [profileOptionModal, setProfileOptionModal] = useState(false);
  const popupRef = useRef();
  const optionIconRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) && optionIconRef.current && !optionIconRef.current.contains(e.target)) {
        setProfileOptionModal(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popupRef, optionIconRef]);
  
    
   const logout = async()=>{
    try {
          const resp = await axios.get(`http://localhost:8000/api/v1/user/logout/${currentUser._id}`)
          console.log(resp);
          localStorage.removeItem("useDataToken")
    } catch (error) {
      console.log(error);
    }
   }








  if (!currentUser || !currentUser.name) {
    // You can return a loading indicator or handle this case accordingly
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full w-full relative'>
      {/* Profile top */}
      <div className='navbar h-8 w-full  float-end flex justify-end items-center bg-slate-700/25'>
        <HiOutlineDotsVertical ref={optionIconRef} className='text-xl mt-2 me-3 text-white'
          onClick={() => setProfileOptionModal(!profileOptionModal)}
        />
      </div>
      <div className='profileTop p-8 flex flex-col md:flex-row w-full bg-slate-700/25 justify-center'>
        <div className='h-full flex flex-col gap-3 items-center justify-center'>
          <div className='dp flex justify-center items-center text-7xl h-[10rem] w-[10rem] md:h-[10rem] md:w-[10rem] rounded-full bg-orange-400 '>
            <h1 className='text-white'>{currentUser ? currentUser.name[0].toUpperCase() : "!"}</h1>
          </div>
          <h1 className='text-white'>{currentUser ? currentUser.name.toUpperCase() : "User"}</h1>
        </div>
        <div className='stats flex gap-7 justify-center  items-center h-full w-full md:w-[50%] bg-slate-60'>
          <div className='flex flex-col justify-center items-center gap-1'>
            <h1 className='text-white text-4xl  font-semibold'>{currentUser.posts.length}</h1>
            <FaBook className='text-green-400 text-3xl' />
            <h1 className='text-white '>Notes</h1>

          </div>
          <div className='flex flex-col justify-center items-center gap-1'>
            <h1 className='text-white text-4xl  font-semibold'>{currentUser?.likesOnOwnNotes?.length}</h1>
            <FaHeart className='text-red-400 text-3xl' />
            <h1 className='text-white '>Likes</h1>

          </div>
          <div className='flex flex-col justify-center items-center gap-1'>
            <h1 className='text-white text-4xl  font-semibold'>40</h1>
            <FaBookmark className='text-blue-400 text-3xl' />
            <h1 className='text-white '>Saves</h1>
          </div>
        </div>
      </div>

      {/* Notes portion */}
      <div>
        {/* Here showing notes which share publicly */}
      </div>
      {/* modal */}
      {profileOptionModal && (
        <div
          ref={popupRef}
          className="popup absolute z-30 bg-slate-500 text-white shadow-lg py-1 w-[10rem]  top-8 end-10 rounded-sm  "
        >
          <ul className="flex flex-col items-center">
            <li className="hover:bg-slate-600 w-full py-3 cursor-pointer ps-4">
              {" "}
              <h1 >Details</h1>
            </li>
            <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4 ">
              {" "}
              <h1 >New Account</h1>
            </li>
            <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4 ">
              {" "}
              <h1 onClick={logout} >Logout</h1>
            </li>

          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;