import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { createGroupContext } from '../../Context';
import { FaBook } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsDownload } from "react-icons/bs";
import Lottie from "lottie-react";
import loaderBook from  '../../assets/loaderbook.json';

function Profile() {
  const { currentUser } = useContext(createGroupContext);
  const [notesData, setNotesData] = useState([])
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const [profileOptionModal, setProfileOptionModal] = useState(false);
  const popupRef = useRef();
  const optionIconRef = useRef();
  const token = localStorage.getItem("useDataToken")

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


  // logout api
  const logout = async () => {
    try {
      const resp = await axios.get(`https://notes-lelo-app-backend.vercel.app/api/v1/user/logout/${currentUser._id}`)
      console.log(resp);
      localStorage.removeItem("useDataToken")
      setProfileOptionModal(false)
      navigate("/signIn")
    } catch (error) {
      console.log(error);
    }
  }

  //signup
  const signup = () => {
    setProfileOptionModal(false)
    navigate("/signUp")
  }


  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await axios.get(fileUrl.url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a virtual anchor element
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;

      // Simulate a click on the anchor element to trigger the download
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Release the Object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  useEffect(() => {
    try {
      const fetchData = async () => {
        const resp = await axios.get(
          'https://notes-lelo-app-backend.vercel.app/api/v1/notes/your-notes',
          {
            headers: {
              'Content-Type': 'application/json',
              token,
            },
            withCredentials: true,
          }
        );
        console.log('>>>>>>>>>>>your notes', resp.data.data);
        setNotesData(resp.data.data)
        setLoader(false)
      }
      fetchData()

    } catch (error) {
      console.log('>>>>>>>>>>>', error)
      
    }
  }, [])








  if (!currentUser || !currentUser.name || loader) {
    // You can return a loading indicator or handle this case accordingly
    return <div className='h-screen w-full flex justify-center items-center  overflow-y-scroll no-scrollbar'>
       <Lottie className='h-[5rem]' animationData={loaderBook} loop={true} />
    </div>;
  }

  return (
    
    <div className='h-full w-full relative overflow-y-scroll no-scrollbar pb-[5rem] '>
      {/* Profile top */}
      <div ref={optionIconRef} className='navbar   h-8 w-full  float-end flex justify-end items-center bg-slate-700/25'>
        <HiOutlineDotsVertical className='text-xl mt-2 me-3 text-white'
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
      <div className=' bg-slate-700/75 border-b border-slate-500'>
        <h1 className='text-center text-white font-bold '>Notes</h1>
      </div>

      {/* Notes portion */}
      <div className='h-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center p-4 pt-6'>


        {
          notesData?.map((notes, index) => <Fragment key={index}>


            <div className='bg-slate-800 rounded-md' style={{ border: "1px solid gray" }} >
              <div className='h-[5rem] w-full  text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl'>NOTESLELO</div>
              <div className='px-2'>
                <div className='flex justify-between'>
                  <h1 className=' bg text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{notes.caption}</h1>
                  <h1 className='text-sm text-gray-500 '>{currentUser.name}</h1>
                </div>
                <h1 className='mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400'>{notes.description}

                </h1>
              </div>
              <div className='footer flex justify-end px-3  py-2  text-white '>

                <div className='bg-cyan-400 rounded-lg  border-gray-300 border-2 '
                  onClick={() => { handleDownload(notes.pdf, notes?.caption) }}
                >
                  <div className='text-green-900 p-1 flex gap-2'><span>Download</span><BsDownload className='text-xl' /></div>
                </div>
              </div>
            </div>
          </Fragment>)
        }


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
              <h1 onClick={signup} >New Account</h1>
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