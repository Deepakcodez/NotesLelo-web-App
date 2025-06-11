import React, { useContext, useEffect, useRef, useState } from "react";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import Lottie from "lottie-react";
import loaderBook from "../../../../assets/loaderbook.json";
import Badge from "./Badge";
import OptionModal from "./OptionModal";
import ProfileAnalytic from "./ProfileAnalytic";
import Notes from "./Notes";
import { DeleteNotePopup } from "@/Components";
import { useParams } from "react-router-dom";
import { deletePost, getUserById } from "@/services";
import toast from "react-hot-toast";
import calculateUserRank from "@/utils/rankCalculation";

export interface Note {
  caption: string;
  description: string;
  pdf: { url: string };
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useContext<any>(createGroupContext);
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [profileOptionModal, setProfileOptionModal] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const optionIconRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("useDataToken");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [userToShow, setUserToShow] = useState<any>();
  const [rank, setRank] = useState<number>(0);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const base_url = import.meta.env.VITE_BASE_URL as string;

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

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleDelete = () => {
    console.log("Note deleted!");
    setShowDeletePopup(false);
    deletePost(selectedNoteId!);
  };

  const handleCancel = () => {
    console.log("Deletion canceled.");
    setShowDeletePopup(false); // Close the popup
  };

  const fetchUser = async () => {
    try {
      const resp = await getUserById(userId);
      setUserToShow(resp);
    } catch {
      toast.error("User not found");
    }
  };
  useEffect(() => {
    if (userId && currentUser) {
      if (userId === currentUser._id.toString()) {
        // If userId matches currentUser, show currentUser
        setUserToShow(currentUser);
      } else {
        // Otherwise, fetch the user by userId
        fetchUser();
      }
    }
  }, [userId, currentUser]);

  useEffect(() => {
    if (userToShow) {
      const calculatedRank = calculateUserRank(userToShow);
      console.log(calculatedRank);
      setRank(calculatedRank.rank);
    }
  }, [userToShow]);

  if (!userToShow) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
      </div>
    );
  }

  return (
    <div className="  w-full relative bg-gray-900 text-white  ">
      {showDeletePopup && (
        <DeleteNotePopup
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      )}
      <ProfileAnalytic
        setProfileOptionModal={setProfileOptionModal}
        optionIconRef={optionIconRef}
        profileOptionModal={profileOptionModal}
        userData={userToShow}
      />
      <div className="w-full h-[calc(100vh-240px)]    grid grid-cols-12   ">
        <div className="col-span-9    overflow-y-scroll  no-scrollbar ">
          <Notes
            notesData={notesData}
            loader={loader}
            setShowDeletePopup={setShowDeletePopup}
            setSelectedNoteId={setSelectedNoteId}
          />
        </div>
        <div className="col-span-3 p-4 ">
          <Badge rank={rank} />
        </div>
      </div>

      {profileOptionModal && (
        <OptionModal
          setProfileOptionModal={setProfileOptionModal}
          popupRef={popupRef}
        />
      )}
    </div>
  );
};

export default Profile;
