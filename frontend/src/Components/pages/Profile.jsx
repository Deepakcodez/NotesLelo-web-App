import React, { useContext } from 'react'
import { createGroupContext } from '../../Context';
function Profile() {
  const { currentUser } = useContext(createGroupContext);
  if (!currentUser || !currentUser.name) {
    // You can return a loading indicator or handle this case accordingly
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full w-full'>
      {/* Profile top */}
      <div className='profileTop p-8 flex flex-col md:flex-row h-[40vh] w-full bg-slate-700/25 justify-center'>
        <div className='h-full flex flex-col items-center justify-center'>
          <div className='dp flex justify-center items-center text-7xl h-[10rem] w-[10rem] md:h-[10rem] md:w-[10rem] rounded-full bg-orange-400 '>
            <h1 className='text-white'>{currentUser?currentUser.name[0].toUpperCase():"!"}</h1>
          </div>
          <h1 className='text-white'>{currentUser?currentUser.name.toUpperCase():"User"}</h1>
        </div>
        <div className='stats flex gap-7 justify-center items-center h-full w-full md:w-[50%] bg-slate-600'>
          <div>
            Notes
          </div>
          <div>
            Likes
          </div>
          <div>
            Saves
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