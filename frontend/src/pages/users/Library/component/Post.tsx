import React, { useEffect, useState } from "react";
import { Post } from "../../../../types/types";
import loaderBook from "../../../../assets/loaderbook.json";
import Lottie from "lottie-react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import axios from "axios"; // Import axios

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.URL; 
        const response = await axios.post(`${url}/api/v1/notes/publicNotes`, {});
        setPosts(response.data.posts.slice(0, 30)); 
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching data.");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCommentClick = (post: Post) => {
    setSelectedPost(post);
  };

  const closeSidebar = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <>
        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
        <div className="text-white">Coming soon...</div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Overlay for Sidebar */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 mt-6 gap-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-800 rounded-lg shadow-md p-4 flex flex-col gap-4 relative"
              style={{ animation: "fadeIn 1s ease-out forwards" }}
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-md p-3">
                <h2 className="text-lg font-bold">{post.caption}</h2>
              </div>

              {/* Content Section */}
              <div className="p-4 text-gray-300 flex-1">
                <p className="mb-4">{post.description}</p>

                {post.pdf && (
                  <a
                    href={post.pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300 mb-2 block"
                  >
                    View PDF
                  </a>
                )}
              </div>

              {/* Footer Section with Like and Comment Icons on the Left */}
              <div className="flex items-center p-2">
                {/* Like Icon */}
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaRegHeart className="text-2xl cursor-pointer" />
                  <span>{post.likes.length}</span> {/* Display the number of likes */}
                </div>

                {/* Comment Button */}
                <button
                  onClick={() => handleCommentClick(post)}
                  className="flex items-center space-x-2 text-white py-1 px-4 rounded-lg"
                >
                  <FaRegComment className="text-2xl cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar for Comments */}
      {selectedPost && (
        <div
          className="fixed top-0 right-0 h-full w-[350px] bg-slate-900 text-white z-50 shadow-lg p-6 overflow-y-auto transition-transform transform translate-x-0"
        >
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white text-lg mb-4"
          >
            Close
          </button>

          <h2 className="font-bold text-xl mb-4">Comments</h2>
          <ul className="text-gray-400">
            {selectedPost.comments.map((comment, index) => (
              <li key={index} className="mb-2">
                <strong className="font-medium text-white">{comment.user}:</strong> {comment.Comment}
              </li>
            ))}
          </ul>

          {/* Comment Input */}
          <div className="mt-6 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            <button className="text-blue-600 font-semibold">Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
