import React, { useContext, useState } from "react";
import { mutate } from "swr";
import axios from "axios";
import { motion } from "framer-motion";
import { createGroupContext } from "@/Context";
import { useToken } from "@/hooks";
import handleDownload from "@/utils/handleDownload";
import { BsDownload, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { LiaComment } from "react-icons/lia";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import moment from "moment";
import NotesComment from "./NotesComment";
import { Delete } from "lucide-react";
import { deletePost } from "@/services";
import { Link } from "react-router-dom";

interface Note {
  _id: string;
  caption: string;
  description: string;
  pdf: { url: string };
  owner: string;
  likes: Array<{ _id: string }>;
  saved: Array<{ _id: string }>;
  createdAt: string;
}

interface NoteData {
  notes: Note;
  user: { name: string };
}

const NotesCard: React.FC<any> = ({ data }) => {
  const { currentUser } = useContext<any>(createGroupContext);
  const groupId = localStorage.getItem("groupId") || "";
  const { token } = useToken();

  const base_url = import.meta.env.VITE_BASE_URL as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Note | null>(null);

  const likeClickHandler = async (notesId: string) => {
    mutate<NoteData[]>(
      `${base_url}/api/v1/notes/groupNotes/${groupId}`,
      (currentData) =>
        currentData?.map((note) => {
          if (note.notes._id === notesId) {
            const isLiked = note.notes.likes.some(
              (user) => user._id === currentUser._id
            );
            const updatedLikes = isLiked
              ? note.notes.likes.filter((user) => user._id !== currentUser._id)
              : [...note.notes.likes, { _id: currentUser._id }];

            return { ...note, notes: { ...note.notes, likes: updatedLikes } };
          }
          return note;
        }),
      false
    );

    try {
      await axios.put(
        `${base_url}/api/v1/notes/groupNotes/addLike/${notesId}`,
        {},
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );
      mutate(`${base_url}/api/v1/notes/groupNotes/${groupId}`);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const saveHandler = async (notesId: string) => {
    mutate<NoteData[]>(
      `${base_url}/api/v1/notes/groupNotes/${groupId}`,
      (currentData) =>
        currentData?.map((note) => {
          if (note.notes._id === notesId) {
            const isUserSaved = note.notes.saved.some(
              (user) => user._id === currentUser._id
            );
            const updatedSaved = isUserSaved
              ? note.notes.saved.filter((user) => user._id !== currentUser._id)
              : [...note.notes.saved, { _id: currentUser._id }];

            return { ...note, notes: { ...note.notes, saved: updatedSaved } };
          }
          return note;
        }),
      false
    );

    try {
      await axios.post(
        `${base_url}/api/v1/notes/groupNotes/saveNotes/${notesId}`,
        {},
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );
      mutate(`${base_url}/api/v1/notes/groupNotes/${groupId}`);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const toggleSidebar = (note: Note | null) => {
    setSelectedPost(note);
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  const DeleteNote = async (postid: string) => {
    deletePost(postid)
  }

  return (
    <>

      {data?.map((noteData: any, index: number) => (
        <React.Fragment key={noteData.notes._id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: "linear",
              duration: 0.2,
              delay: index * 0.3,
            }}
            className={`${noteData.notes.owner === currentUser._id
              ? "self-end"
              : "self-start"
              } flex flex-col rounded-md h-[15rem] w-[85vw] sm:w-[25rem] bg-slate-700 border-gray-200 relative`}
            style={{ border: "1px solid gray" }}
          >
            {
              noteData.notes.owner.toString() === currentUser._id.toString() &&
              <div onClick={() => DeleteNote(noteData.notes._id)} className="absolute top-0 right-0 p-2 ">
                <Delete className="text-gray-700" />
              </div>
            }
            <div className="h-[5rem] w-full text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl">
              NOTESLELO
            </div>

            <div className="px-2">
              <div className="flex justify-between">
                <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {noteData.notes.caption}
                </h1>
                <Link to={`/profile/${noteData.user._id}`} className="text-sm text-gray-500 ">
                  {noteData.user?.name.toUpperCase()}
                </Link>
              </div>
              <h1 className="mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400">
                {noteData.notes.description}
              </h1>
            </div>
            <div className="footer flex justify-between items-center px-3 text-xl py-2 text-white ">
              <div className="flex gap-2">
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => likeClickHandler(noteData.notes._id)}
                >
                  {noteData.notes.likes.some(
                    (user: any) => user._id === currentUser._id
                  ) ? (
                    <BsHandThumbsUpFill className="text-red-500" />
                  ) : (
                    <BsHandThumbsUp />
                  )}
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => toggleSidebar(noteData.notes)}
                >
                  <LiaComment />
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => saveHandler(noteData.notes._id)}
                >
                  {noteData.notes.saved.some(
                    (user: any) => user._id === currentUser._id
                  ) ? (
                    <GoBookmarkFill />
                  ) : (
                    <GoBookmark />
                  )}
                </motion.div>
              </div>
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="bg-cyan-400 rounded-lg border-gray-300 text-white border-2 hover:bg-cyan-500 hover:shadow-md"
                onClick={() =>
                  handleDownload(noteData.notes.pdf.url, noteData.notes.caption)
                }
              >
                <div className="text-green-900 p-1">
                  <BsDownload />
                </div>
              </motion.div>
            </div>
            <div className="flex justify-end px-2">
              <h1 className="text-white/25">
                {moment(noteData.notes.createdAt).startOf("day").fromNow()}
              </h1>
            </div>
          </motion.div>
        </React.Fragment>
      ))}
      {isSidebarOpen && selectedPost && (
        <motion.div
          className="absolute top-0 right-0 w-full  "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          
        >
          <NotesComment
            isOpen={isSidebarOpen}
            toggleSidebar={() => toggleSidebar(null)}
            postId={selectedPost._id}
            post={selectedPost}
          />
        </motion.div>
      )}
    </>
  );
};

export default NotesCard;
