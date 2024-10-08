import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import { BsHandThumbsUp, BsHandThumbsUpFill, BsDownload } from "react-icons/bs";
import { LiaComment } from "react-icons/lia";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { motion } from "framer-motion";
import useSWR, { mutate } from "swr";


// Define the structure of a note
interface Note {
  _id: string;
  caption: string;
  description: string;
  pdf: { url: string }; // Assuming pdf has a url property
  owner: string;
  likes: Array<{ _id: string }>; // Assuming user object structure
  saved: Array<{ _id: string }>; // Assuming user object structure
}

// Define the structure of the fetched note data
interface NoteData {
  notes: Note;
  user: { name: string }; // Adjust this structure as needed
}

// Define the structure of the context
interface GroupContext {
  isUploadPage: boolean;
  setUploadPage: (value: boolean) => void;
  currentUser: { _id: string }; // Adjust this structure as needed
}

export const Notes: React.FC = () => {
  const groupId = localStorage.getItem("groupId") as string; // Ensure groupId is a string
  const { isUploadPage, setUploadPage, currentUser } = useContext(createGroupContext) as GroupContext;
  const [notesData, setNotesData] = useState<NoteData[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("useDataToken");

  const fetcher = async (url: string): Promise<NoteData[]> => {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      withCredentials: true,
    });
    return response.data.data;
  };

  const { data, error } = useSWR<NoteData[]>(`https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`, fetcher);

  useEffect(() => {
    if (data) {
      setNotesData(data);
    }
  }, [data]);

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Create a virtual anchor element
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;

      // Simulate a click on the anchor element to trigger the download
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Release the Object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const likeClickHandler = async (notesId: string) => {
    // Optimistically update the cache
    mutate<NoteData[]>(`https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`, (currentData) => {
      return currentData?.map((note) => {
        if (note.notes._id === notesId) {
          const isLiked = note.notes.likes.some((user) => user._id === currentUser._id);
          const updatedLikes = isLiked
            ? note.notes.likes.filter((user) => user._id !== currentUser._id)
            : [...note.notes.likes, { _id: currentUser._id }]; // Assuming user object structure

          return { ...note, notes: { ...note.notes, likes: updatedLikes } };
        }
        return note;
      });
    }, false); // 'false' to not revalidate immediately, as we're going to call the server next

    try {
      // Now, send the like request to the server
      await axios.put(
        `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/addLike/${notesId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          withCredentials: true,
        }
      );

      // Optionally revalidate the cache after the server response
      mutate(`https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`);
    } catch (error) {
      console.error("Error updating like status:", error);
      // Optionally, rollback the optimistic update here if the request fails
    }
  };

  const saveHandler = async (notesId: string) => {
    // Optimistically update the cache
    mutate<NoteData[]>(`https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`, (currentData) => {
      return currentData?.map((note) => {
        if (note.notes._id === notesId) {
          const isUserSaved = note.notes.saved.some((userdata) => userdata._id === currentUser._id);
          const updatedSaved = isUserSaved
            ? note.notes.saved.filter((userdata) => userdata._id !== currentUser._id)
            : [...note.notes.saved, currentUser]; // Assuming currentUser object structure is correct and matches the expected format

          return { ...note, notes: { ...note.notes, saved: updatedSaved } };
        }
        return note;
      });
    }, false); // 'false' to not revalidate immediately, as we're going to call the server next

    try {
      // Now, send the save request to the server
      await axios.post(
        `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/saveNotes/${notesId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          withCredentials: true,
        }
      );

      // Optionally revalidate the cache after the server response
      mutate(`https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`);
    } catch (error) {
      console.error("Error saving note:", error);
      // Optionally, rollback the optimistic update here if the request fails
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (error) return <div>Error fetching data. Please try again later.</div>;
  // if (!data) return (
  //     <div className="flex h-[70vh] w-full justify-center items-center">
  //         <Lottie className='h-[5rem]' animationData={loaderBook} loop={true} />
  //     </div>
  // );

  return (
    <>
      <div className="chatContent flex flex-col gap-[7rem] overflow-y-scroll no-scrollbar w-full h-[calc(100vh-10.15rem)] py-3 pt-[3rem] px-6">
        {data?.map((noteData, index) => {
          return (
            <Fragment key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "linear",
                  duration: 0.2,
                  delay: index * 0.3,
                }}
                ref={scrollRef}
                className={`${
                  noteData.notes.owner === currentUser._id ? "self-end" : "self-start"
                } flex flex-col rounded-md h-[15rem] w-[85vw] sm:w-[25rem]  bg-slate-700 border-gray-200`}
                style={{ border: "1px solid gray" }}
              >
                <div className="h-[5rem] w-full text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl">
                  NOTESLELO
                </div>
                <div className="px-2">
                  <div className="flex justify-between">
                    <h1 className="bg text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {noteData.notes.caption}
                    </h1>
                    <h1 className="text-sm text-gray-500 ">
                      {noteData.user?.name.toUpperCase()}
                    </h1>
                  </div>
                  <h1 className="mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400">
                    {noteData.notes.description}
                  </h1>
                </div>
                <div className="footer flex justify-between items-center px-3 text-xl py-2 text-white ">
                  <div className="flex gap-2">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => {
                        likeClickHandler(noteData.notes._id);
                      }}
                    >
                      {noteData.notes.likes.some((userdata) => userdata._id === currentUser._id) ? (
                        <BsHandThumbsUpFill className="text-red-400" />
                      ) : (
                        <BsHandThumbsUp />
                      )}
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.75 }}>
                      <LiaComment />
                    </motion.div>
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => {
                        saveHandler(noteData.notes._id);
                      }}
                    >
                      {noteData.notes.saved.some((user) => user._id === currentUser._id) ? (
                        <GoBookmarkFill />
                      ) : (
                        <GoBookmark />
                      )}
                    </motion.div>
                  </div>
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="bg-cyan-400 rounded-lg border-gray-300 border-2 hover:bg-cyan-500 hover:shadow-md"
                    onClick={() => {
                      handleDownload(noteData.notes.pdf.url, noteData.notes.caption);
                    }}
                  >
                    <div className="text-green-900 p-1">
                      <BsDownload />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Fragment>
          );
        })}

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 0.3,
            duration: 1,
            stiffness: 300,
          }}
          className="  upload absolute p-4 mt-[15rem] text-center text-xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 self-end right-10 bottom-[3rem] md:bottom-[5rem]"
          onClick={() => setUploadPage(true)}
        >
          <FaFileUpload />
        </motion.div>
      </div>
    </>
  );
};
