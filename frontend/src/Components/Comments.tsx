import { createGroupContext } from "@/Context";
import { useToken } from "@/hooks";
import axios from "axios";
import { X } from "lucide-react";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { mutate } from "swr";
import { motion } from "framer-motion";

// interface Comment {
//   id: number;
//   text: string;
//   color: string;
// }

// interface Post {
//   _id: string;
//   name: string;
//   description: string;
//   caption: string;
// }

interface CommentSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  postId: string;
  post: any;

}

const getRandomColor = () => {
  const colors = [
    "#cfa5a5",
    "#cfa5c0",
    "#a9a5cf",
    "#a9a5cf",
    "#a5cfad",
    "#cfcea5",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const CommentSidebar: React.FC<CommentSidebarProps> = ({ isOpen, toggleSidebar, postId, post }) => {

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const { token } = useToken();
  const { currentUser } = useContext<any>(createGroupContext);
  const base_url = import.meta.env.VITE_BASE_URL as string;

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    const newCommentObject = {
      user: {
        _id: currentUser._id,
        name: currentUser.name,
      },
      Comment: newComment,
    };

    // Optimistic update
    setComments((prevComments: any) => [...prevComments, newCommentObject]);
    setNewComment("");

    try {
      const bodyData = {
        userId: currentUser._id,
        comment: newComment,
        postId,
      };

      await axios.post(
        `${base_url}/api/v1/notes/comment`,
        bodyData,
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );

      // Revalidate SWR cache to sync state with the server
      mutate(`${base_url}/api/v1/notes/publicNotes`);
    } catch (error) {
      console.error("Error adding comment:", error);

      // Rollback optimistic update
      setComments((prevComments: any) =>
        prevComments.filter(
          (comment: any) => comment.Comment !== newCommentObject.Comment
        )
      );
    }
  };


  const getAllComments = async () => {
    const getPostComments = async (postId: string) => {
      const base_url = import.meta.env.VITE_BASE_URL as string;
      let resp;
      try {
        resp = await axios.get(`${base_url}/api/v1/notes/comment/${postId}`);
        setError(false)
      } catch {
        (error: any) => {
          console.error("Error in addDislikeLikeToDemand:", error);
          setError(true);
          throw error;
        };
      }

      return resp?.data.comments;
    };
    const respComments = await getPostComments(postId);
    if (respComments) {
      setComments(respComments.reverse())
    }

  }
  useEffect(() => {
    if (isOpen) {
      getAllComments()
    }
  }, [])


  return (
    <motion.div
      className={`absolute top-0 left-0 right-0 bottom-0 md:relative md:top-0 md:left-0 md:w-full md:h-full backdrop-blur-lg flex justify-center items-center transition-opacity duration-300 z-50 bg-slate-800/60 md:bg-transparent`}
      initial={{ x: "100%" }} // Start from the right (off-screen)
      animate={{ x: isOpen ? 0 : "100%" }} // Slide in or out based on isOpen
      transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth animation
    >
      <div
        className={` absolute top-20 left-5 right-5 bottom-36 md:relative md:top-0 md:left-0  md:w-full md:h-full    backdrop-blur-lg flex justify-center items-center transition-opacity duration-300 z-50  ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="md:bg-slate-700/20 bg-slate-800/60 h-full w-full flex flex-col justify-between  pb-6 rounded-lg shadow-xl overflow-hidden border border-slate-200/10  ">
          <div className="flex justify-between  p-6 w-full border-b border-gray-500">
            <h1 className="text-2xl font-semibold   text-white w-full truncate">{post.caption}</h1>
            <X color="white" onClick={toggleSidebar} />
          </div>

          {/* Comments Section */}
          <div className="w-full h-[27rem] flex flex-col justify-between  px-6  ">
            <div
              className="overflow-y-scroll no-scrollbar  mb-4 space-y-3  bg-red-40 ">
              {
                error &&
                <div className="text-gray-600">Something Went Wrong....</div>
              }
              {comments.length > 0 ? (
                comments.map((comment: any) => (
                  <div
                    key={comment.user._id}
                    className="p-2 bg-slate-200 rounded-lg shadow-sm mt-6 items-center space-x-3 flex"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-black self-start"
                      style={{ backgroundColor: getRandomColor() }}  >
                      {comment?.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-sm font-semibold">{comment?.user.name || "Unknown"} </h1>
                      <p className="text-gray-700">{comment.Comment}</p>

                    </div>
                    <div className="text-[.5rem] text-gray-500 self-start">
                      {moment(comment.createdAt).format("h:mm A")}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 h-32">Collecting....</p>
              )}
            </div>

          </div>
          {/* Comment Input Section */}
          <div className="flex  space-x-3 items-end  px-6">
            {/* Comment Input */}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a comment..."
            />
            {/* Send Button */}
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none"
              aria-label="Send Comment"
            >
              <FaPaperPlane />
            </button>
          </div>

        </div>
      </div>
    </motion.div>

  );
};

export default CommentSidebar;
