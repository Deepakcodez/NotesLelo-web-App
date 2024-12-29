import React, { useContext, useEffect, useRef, useState } from "react";
import { createGroupContext } from "../../../../Context";
import { FaBook } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import Lottie from "lottie-react";
import loaderBook from "../../../../assets/loaderbook.json";
import handleDownload from "@/utils/handleDownload";
const base_url = import.meta.env.VITE_BASE_URL as string;

interface Note {
  caption: string;
  description: string;
  pdf: { url: string };
}

const Profile: React.FC = () => {
  const { currentUser } = useContext<any>(createGroupContext);
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const navigate = useNavigate();
  const [profileOptionModal, setProfileOptionModal] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const optionIconRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("useDataToken");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        optionIconRef.current &&
        !optionIconRef.current.contains(e.target as Node)
      ) {
        setProfileOptionModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popupRef, optionIconRef]);

  const logout = async () => {
    try {
      const resp = await axios.get(`${base_url}/api/v1/user/logout/${currentUser?._id}`);
      console.log(resp);
      localStorage.removeItem("useDataToken");
      setProfileOptionModal(false);
      navigate("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  const signup = () => {
    setProfileOptionModal(false);
    navigate("/signUp");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${base_url}/api/v1/notes/your-notes`, {
          headers: {
            "Content-Type": "application/json",
            token,
          },
          withCredentials: true,
        });
        console.log("Fetched notes:", resp.data.data);
        setNotesData(resp.data.data);
      } catch (error) {
        console.log("Error fetching notes:", error);
      } finally {
        setLoader(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  if (!currentUser || !currentUser.name) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
      </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-gray-900 text-white">
     <div className="bg-gradient-to-r from-cyan-500 to-blue-300 p-4 sm:p-6">
  <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
    {/* Profile Picture and Name */}
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 sm:h-24 sm:w-24 bg-orange-400 rounded-full flex justify-center items-center text-3xl sm:text-5xl font-bold">
        {currentUser.name?.[0]?.toUpperCase() || ""}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {currentUser.name?.toUpperCase() || "User"}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Welcome to your profile!
        </p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="flex flex-wrap gap-6 justify-center md:justify-end mt-4 md:mt-0  mr-8">
      <div className="text-center ">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {currentUser.posts?.length || 0}
        </h1>
        <FaBook className="mx-auto text-3xl sm:text-4xl text-green-600 mt-2" />
        <p className="text-white text-sm sm:text-base">Notes</p>
      </div>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {currentUser.likesOnOwnNotes?.length || 0}
        </h1>
        <FaHeart className="mx-auto text-3xl sm:text-4xl text-red-500 mt-2" />
        <p className="text-white text-sm sm:text-base">Likes</p>
      </div>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {currentUser.ownNotesSaves?.length || 0}
        </h1>
        <FaBookmark className="mx-auto text-3xl sm:text-4xl text-blue-500 mt-2" />
        <p className="text-white text-sm sm:text-base">Saves</p>
      </div>
    </div>
  </div>

  {/* Options Icon */}
  <div
    ref={optionIconRef}
    className="absolute top-4 right-4 sm:top-6 sm:right-6 cursor-pointer"
    onClick={() => setProfileOptionModal(!profileOptionModal)}
  >
    <HiOutlineDotsVertical className="text-2xl sm:text-3xl" />
  </div>
</div>


      {profileOptionModal && (
        <div
          ref={popupRef}
          className="popup absolute z-30 bg-slate-500 text-white shadow-lg py-1 w-[10rem] top-8 right-6 rounded-sm md:w-[12rem]"
        >
          <ul className="flex flex-col items-center">
            <li className="hover:bg-slate-600 w-full py-3 cursor-pointer ps-4">
              <h1>Details</h1>
            </li>
            <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4">
              <h1 onClick={signup}>New Account</h1>
            </li>
            <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4">
              <h1 onClick={logout}>Logout</h1>
            </li>
          </ul>
        </div>
      )}

      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Your Notes</h2>
          {loader ? (
            <div className="flex justify-center">
              <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
            </div>
          ) : notesData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notesData.map((notes, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  <h3 className="text-xl font-bold">{notes.caption}</h3>
                  <p className="text-gray-400 mt-2">{notes.description}</p>
                  <div
                    className="mt-4 py-2 px-4 bg-blue-500 rounded-lg text-center cursor-pointer"
                    onClick={() => handleDownload(notes.pdf.url, notes.caption)}
                  >
                    <BsDownload className="inline-block mr-2 text-white" />
                    Download
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No notes found.</p>
          )}
        </div>

        <div className="w-full lg:w-[20%] bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Badges</h2>
          <p className="text-gray-400">Earn badges!!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
