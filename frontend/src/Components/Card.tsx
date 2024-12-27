import React from "react";
import { motion } from "framer-motion";
import {
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsDownload,
} from "react-icons/bs";
import { LiaComment } from "react-icons/lia";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import moment from "moment";

interface NoteCardProps {
  noteId: string;
  caption: string;
  description: string;
  pdfUrl: string;
  owner: string;
  likes: Array<{ _id: string }>;
  saved: Array<{ _id: string }>;
  createdAt: string;
  currentUserId: string;
  userName: string;
  onLike: (noteId: string) => void;
  onSave: (noteId: string) => void;
  onDownload: (url: string, name: string) => void;
  onComment: () => void; // Add onComment prop for comment button
}

const NoteCard: React.FC<NoteCardProps> = ({
  noteId,
  caption,
  description,
  pdfUrl,
  owner,
  likes,
  saved,
  createdAt,
  currentUserId,
  userName,
  onLike,
  onSave,
  onDownload,
  onComment, 
}) => {
  const isLiked = likes.some((user) => user._id === currentUserId);
  const isSaved = saved.some((user) => user._id === currentUserId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "linear",
        duration: 0.2,
      }}
      className={`${
        owner === currentUserId ? "self-end" : "self-start"
      } flex flex-col rounded-md h-[15rem] w-[85vw] sm:w-[25rem] bg-slate-700 border-gray-200`}
      style={{ border: "1px solid gray" }}
    >
      <div className="h-[5rem] w-full text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl">
        NOTESLELO
      </div>
      <div className="px-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {caption}
          </h1>
          <h1 className="text-sm text-gray-500 ">{userName.toUpperCase()}</h1>
        </div>
        <h1 className="mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400">
          {description}
        </h1>
      </div>
      <div className="footer flex justify-between items-center px-3 text-xl py-2 text-white">
        <div className="flex gap-2">
          <motion.div whileTap={{ scale: 0.75 }} onClick={() => onLike(noteId)}>
            {isLiked ? (
              <BsHandThumbsUpFill className="text-red-500" />
            ) : (
              <BsHandThumbsUp />
            )}
          </motion.div>
          {/* Comment Button */}
          <motion.div whileTap={{ scale: 0.75 }} onClick={onComment}>
            <LiaComment />
          </motion.div>
          <motion.div whileTap={{ scale: 0.75 }} onClick={() => onSave(noteId)}>
            {isSaved ? <GoBookmarkFill /> : <GoBookmark />}
          </motion.div>
        </div>
        <motion.div
          whileTap={{ scale: 0.85 }}
          className="bg-cyan-400 rounded-lg border-gray-300 border-2 hover:bg-cyan-500 hover:shadow-md"
          onClick={() => onDownload(pdfUrl, caption)}
        >
          <div className="text-green-900 p-1">
            <BsDownload />
          </div>
        </motion.div>
      </div>
      <div className="flex justify-end px-2">
        <h1 className="text-white/25">
          {moment(createdAt).startOf("day").fromNow()}
        </h1>
      </div>
    </motion.div>
  );
};

export default NoteCard;
