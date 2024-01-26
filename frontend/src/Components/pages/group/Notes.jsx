import { Fragment, useContext, useEffect, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from '../../../Context';
import axios from 'axios';
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { LiaComment } from "react-icons/lia";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";

import { BsDownload } from "react-icons/bs";


export const Notes = () => {
    const groupId = localStorage.getItem("groupId");
    const { isUploadPage, setUploadPage, currentUser } = useContext(createGroupContext);
    const [notesData, setNotesData] = useState([]);
    const [notesId, setNotesId] = useState("");

    const token = localStorage.getItem("useDataToken")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/notes/groupNotes/${groupId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                    withCredentials: true,
                });
                // console.log('>>>>>>>>>>>', response.data.data)
                setNotesData(response.data.data);

            } catch (error) {
                console.error("Error fetching notes:", error);
                // Handle error as needed
            }
        };

        fetchData(); // Call the fetchData function

    }, [groupId, isUploadPage, notesId]); // Add 'groupId' as a dependency

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

    const likeClickHandler = async (notesId) => {
        setNotesId(notesId)

        try {
            const resp = await axios.put(
                `http://localhost:8000/api/v1/notes/groupNotes/addLike/${notesId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    },
                    withCredentials: true,
                }
            );
            // console.log('>>>>>>>>>>>', resp.data.data)

            // Update the local state with the modified notes data
            setNotesData((prevNotesData) => {
                return prevNotesData.map((note) => {
                    if (note.user._id === currentUser._id) {
                        
                        const isnotesSaved = note.user.savedNotes.some(userdata => userdata._id === currentUser._id);
                        return {
                            ...note,
                            user: {
                                ...note.user,
                                likes: isUserLiked
                                    ? note.notes.likes.filter(userdata => userdata._id !== currentUser._id)
                                    : [...note.notes.likes, currentUser],
                            },
                        };
                    }
                    return note;
                });
            });

        } catch (error) {
            console.log('>>>>>>>>>>>', error);
        }
    }

    const saveHandler = async (notesId) => {
        setNotesId(notesId);
    
        try {
            const resp = await axios.post(
                `http://localhost:8000/api/v1/notes/groupNotes/saveNotes`,
                {
                    notesId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    },
                    withCredentials: true,
                }
            );
            // console.log('>>>>>>>>>>>', resp.data);
    
            // Update the local state with the modified notes data
            setNotesData((prevNotesData) => {
                return prevNotesData.map((note) => {
                    if (note.notes._id === notesId) {
                        // Toggle the user's save status
                        const isUserSaved = note.user.savedNotes.some(userdata => userdata._id === currentUser._id);
                        return {
                            ...note,
                            user: {
                                ...note.user,
                                savedNotes: isUserSaved
                                    ? note.user.savedNotes.filter(userdata => userdata._id !== currentUser._id)
                                    : [...note.user.savedNotes, currentUser],
                            },
                        };
                    }
                    return note;
                });
            });
        } catch (error) {
            console.log('>>>>>>>>>>>', error);
        }
    };
    




    return (
        <>
            <div className="chatContent relative flex flex-col gap-[7rem] overflow-y-scroll no-scrollbar w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-7.6rem)] py-3 pt-[3rem] px-6">

                {

                    notesData?.map((data, index) => {
                        return (
                            <Fragment key={index}>

                                <div className={`  ${data.notes.owner === currentUser._id ? "self-end" : "self-start"}  flex flex-col  rounded-md h-[15rem] w-[15rem] sm:w-[20rem] bg-slate-700 border-gray-200`} style={{ border: "1px solid gray" }} >
                                    <div className='h-[5rem] w-full  text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl'>NOTESLELO</div>
                                    <div className='px-2'>
                                        <div className='flex justify-between'>
                                            <h1 className=' bg text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{data.notes.caption}</h1>
                                            <h1 className='text-sm text-gray-500 '>{data.user.name.toUpperCase()}</h1>
                                        </div>
                                        <h1 className='mb-3overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400'>{data.notes.description}</h1>
                                    </div>
                                    <div className='footer flex justify-between px-3 text-xl py-2  text-white '>
                                        <div className='flex gap-2'>
                                            <div onClick={() => { likeClickHandler(data.notes._id) }}>
                                                {data.notes.likes.some(userdata => userdata._id === currentUser._id) ?
                                                    <BsHandThumbsUpFill className='text-red-400' /> : <BsHandThumbsUp />
                                                }
                                            </div>
                                            {/* <div></div> */}
                                            <div><LiaComment /></div>
                                            <div onClick={() => { saveHandler(data.notes._id) }}>
                                                {
                                                    data.user.savedNotes.some(userdata => userdata._id === currentUser._id) ?
                                                        <GoBookmarkFill /> : <GoBookmark />
                                                }
                                            </div>
                                        </div>
                                        <div className='bg-cyan-400 rounded-lg border-gray-300 border-2 ' onClick={() => { handleDownload(data.notes.pdf, data.notes.caption) }}>
                                            <div className='text-green-900 p-1'><BsDownload /></div>
                                        </div>
                                    </div>
                                </div>




                            </Fragment>
                        )
                    })
                }

                <div className='upload sticky p-4 mt-[15rem] text-center text-xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 self-end bottom-0' onClick={() => setUploadPage(true)}>
                    <FaFileUpload />
                </div>
            </div>
        </>
    );
};