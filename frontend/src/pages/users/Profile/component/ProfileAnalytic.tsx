import React from "react";
import { FaBook, FaBookmark, FaHeart } from "react-icons/fa6"
import { HiOutlineDotsVertical } from "react-icons/hi"


interface ProfileAnalyticProps {
    setProfileOptionModal: React.Dispatch<React.SetStateAction<boolean>>;
    optionIconRef: React.RefObject<HTMLDivElement>;
    profileOptionModal: boolean;
    userData: any

}
const ProfileAnalytic: React.FC<ProfileAnalyticProps> = ({ setProfileOptionModal, optionIconRef, profileOptionModal, userData }) => {


    return (
        <div className="bg-gradient-to-r from-cyan-800 via-cyan-800 0 to-blue-900 p-4 sm:p-6">
            <div className="flex flex-col items-center  md:flex-row gap-24">

                {/* Profile Picture and Name */}
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 bg-orange-400 rounded-full flex justify-center items-center text-3xl sm:text-5xl font-bold">
                        {userData.name?.[0]?.toUpperCase() || ""}
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            {userData.name?.toUpperCase() || "User"}
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
                            {userData.posts?.length || 0}
                        </h1>
                        <FaBook className="mx-auto text-3xl sm:text-4xl  mt-2" />
                        <p className="text-white text-sm sm:text-base">Notes</p>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            {userData.likesOnOwnNotes?.length || 0}
                        </h1>
                        <FaHeart className="mx-auto text-3xl sm:text-4xl  mt-2" />
                        <p className="text-white text-sm sm:text-base">Likes</p>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            {userData.ownNotesSaves?.length || 0}
                        </h1>
                        <FaBookmark className="mx-auto text-3xl sm:text-4xl  mt-2" />
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
    )
}
export default ProfileAnalytic