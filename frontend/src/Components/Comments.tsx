import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
}

interface CommentSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div
      className={`fixed top-20 right-0 w-80 bg-slate-500/25 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg text-white font-semibold">Comments</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-700"
            aria-label="Close Sidebar"
          >
            ✖️
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-2 mb-2 bg-white rounded shadow-sm border border-gray-300"
              >
                {comment.text}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* Add Comment */}
        <div className="p-4 border-t border-gray-300">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Write a comment..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSidebar;
