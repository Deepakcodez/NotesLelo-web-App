import { getPostComments } from "@/services";
import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Comment {
  id: number;
  text: string;
  color: string;
}

interface Post {
  _id: string;
  name: string;
  description: string;
  caption: string;
}

interface CommentSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  postId: string;

}

const getRandomColor = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFC133",
    "#8D33FF",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const CommentSidebar: React.FC<CommentSidebarProps> = ({ isOpen, toggleSidebar, postId }) => {

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);


  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        text: newComment,
        color: getRandomColor(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };


  const getAllComments = async () => {
    // await getPostComments(postId);
    setComments(comments);
  }
  useEffect(() => {
    if (isOpen) {

    }
  })
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 z-50 ${isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="bg-slate-400/25 w-11/12 max-w-4xl rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-700 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">
            {selectedPost?.caption || "Post Details"}
          </h2>

          <button
            onClick={toggleSidebar}
            className="text-2xl font-bold hover:text-gray-300"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Post Details */}
          <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <h3 className="text-xl text-white font-semibold mb-4">
              Post Description
            </h3>
            <p className="text-slate-400">
              {selectedPost?.description || "No description available."}
            </p>
          </div>

          {/* Comments Section */}
          <div className="w-full md:w-[70%] p-6">

            <div
              className="overflow-y-auto max-h-64 mb-4 space-y-3"
              style={{ scrollbarWidth: "none" }}
            >
              <style>
                {`
                  .overflow-y-scroll::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-2 bg-slate-200 rounded-lg shadow-sm  items-center space-x-3 flex"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-black"
                      style={{ backgroundColor: comment.color }}
                    >
                      {comment.text.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h1 className="text-sm">Username Kumar</h1>
                      <p className="text-gray-700">{comment.text}</p>

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 h-32">No comments yet.</p>
              )}
            </div>

            {/* Comment Input Section */}
            <div className="flex items-center space-x-3">


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
      </div>
    </div>
  );
};

export default CommentSidebar;
