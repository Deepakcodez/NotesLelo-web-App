import React, { useEffect, useState } from "react";
import { Post } from "../../../../types/types";
import loaderBook from "../../../../assets/loaderbook.json";
import Lottie from "lottie-react";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("src/data/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts.slice(0, 30));
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="p-6">
      <div className="grid grid-cols-1 mt-6 gap-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-slate-700/25 bg-opacity-60 rounded-lg shadow-md p-4 flex flex-row justify-between items-start gap-4"
            style={{
              animation: "fadeIn 1s ease-out forwards",
            }}
          >
            {/* Left Section: Notes */}
            <div className="flex-1">
              <h2 className="text-xl text-white font-semibold mb-2">{post.caption}</h2>
              <p className="text-gray-400 mb-4">{post.description}</p>

              {post.pdf && (
                <a
                  href={post.pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700 mb-2 block"
                >
                  View PDF
                </a>
              )}
            </div>

            {/* Right Section: Likes and Comments */}
            <div className="flex-shrink-0 w-1/4 text-right">
              <p className="mb-2 text-gray-400">
                <span>❤️</span> {post.likes.length} Likes
              </p>

              <strong className="text-white mb-1">Comments:</strong>
              <ul className=" text-gray-500">
                {post.comments.map((comment, index) => (
                  <li key={index}>
                    <strong className="font-medium">{comment.user}:</strong>{" "}
                    {comment.Comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
