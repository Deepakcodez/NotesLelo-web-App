import React, { useContext } from 'react'
import { createGroupContext } from '../../Context';
import { FaBook } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
function Profile() {
  const { currentUser } = useContext(createGroupContext);

   console.log(currentUser)
          
  if (!currentUser || !currentUser.name) {
    // You can return a loading indicator or handle this case accordingly
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full w-full'>
      {/* Profile top */}
      <div className='profileTop p-8 flex flex-col md:flex-row h-[50vh] md:h-[40vh] w-full bg-slate-700/25 justify-center'>
        <div className='h-full flex flex-col items-center justify-center'>
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
    </div>
  );
}

export default Profile;