import React, { useContext, useEffect, useState } from "react";
import { Post } from "../../../../types/types";
import loaderBook from "../../../../assets/loaderbook.json";
import Lottie from "lottie-react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import CommentSidebar from "@/Components/Comments";
import { motion } from "framer-motion";
import { BsDownload, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { LiaComment } from "react-icons/lia";
import moment from "moment";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { createGroupContext } from "@/Context";
import { useToken } from "@/hooks";
import handleDownload from "@/utils/handleDownload";
import { Delete } from "lucide-react";
import { deletePost } from "@/services";
import { Link } from "react-router-dom";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useContext<any>(createGroupContext);
  const { token } = useToken();

  const baseURL = import.meta.env.VITE_BASE_URL as string;
  const url = `${baseURL}/api/v1/notes/publicNotes`;
  const fetcher = async (uri: string): Promise<any> => {
    const response = await axios.get(uri);
    return response.data.notes;
  };

  const { data, error, isLoading } = useSWR<any[]>(url, fetcher);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  const likeClickHandler = async (notesId: string) => {
    // Optimistically update the UI
    const updatedPosts = posts.map((post) => {
      if (post._id === notesId) {
        const userLiked = post.likes.some(
          (user: any) => user._id === currentUser._id
        );
        if (userLiked) {
          // Remove like
          return {
            ...post,
            likes: post.likes.filter(
              (user: any) => user._id !== currentUser._id
            ),
          };
        } else {
          // Add like
          return {
            ...post,
            likes: [...post.likes, { _id: currentUser._id }],
          };
        }
      }
      return post;
    });

    // Update local state immediately
    setPosts(updatedPosts);

    try {
      // Make API call to update like status on the server
      await axios.put(
        `${baseURL}/api/v1/notes/publicNotes/addLike/${notesId}`,
        {},
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );

      // Revalidate SWR cache to sync state with the server
      mutate(`${baseURL}/api/v1/notes/publicNotes`);
    } catch (error) {
      console.error("Error updating like status:", error);

      // Revert optimistic update in case of error
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === notesId) {
            const userLiked = post.likes.some(
              (user: any) => user._id === currentUser._id
            );
            if (!userLiked) {
              // Remove like if it was optimistically added
              return {
                ...post,
                likes: post.likes.filter(
                  (user: any) => user._id !== currentUser._id
                ),
              };
            } else {
              // Add like back if it was optimistically removed
              return {
                ...post,
                likes: [...post.likes, { _id: currentUser._id }],
              };
            }
          }
          return post;
        });
      });
    }
  };

  const handleSave = async (noteId: string) => {
    // Optimistically update the UI
    const updatedPosts = posts.map((post) => {
      if (post._id === noteId) {
        const userSaved = post.saved.some(
          (user: any) => user._id === currentUser._id
        );
        if (userSaved) {
          // Remove save
          return {
            ...post,
            saved: post.saved.filter(
              (user: any) => user._id !== currentUser._id
            ),
          };
        } else {
          // Add save
          return {
            ...post,
            saved: [...post.saved, { _id: currentUser._id }],
          };
        }
      }
      return post;
    });

    // Update local state immediately
    setPosts(updatedPosts);

    try {
      // Make API call to update save status on the server
      await axios.post(
        `${baseURL}/api/v1/notes/groupNotes/saveNotes/${noteId}`,
        {},
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );

      // Revalidate SWR cache to sync state with the server
      mutate(`${baseURL}/api/v1/notes/publicNotes`);
    } catch (error) {
      console.error("Error saving note:", error);

      // Revert optimistic update in case of error
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === noteId) {
            const userSaved = post.saved.some(
              (user: any) => user._id === currentUser._id
            );
            if (!userSaved) {
              // Remove save if it was optimistically added
              return {
                ...post,
                saved: post.saved.filter(
                  (user: any) => user._id !== currentUser._id
                ),
              };
            } else {
              // Add save back if it was optimistically removed
              return {
                ...post,
                saved: [...post.saved, { _id: currentUser._id }],
              };
            }
          }
          return post;
        });
      });
    }
  };

  const handleCommentClick = (post: any) => {
    setSelectedPost(post);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const deleteNote = async (noteId: string) => {
    await deletePost(noteId)
  }

  if (isLoading) {
    return (
      <>
        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
      </>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold mt-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6  pb-32 md:pb-4 relative w-full  flex  ">
      <div className="flex flex-col  items-center  w-full mt-6 gap-6 max-h-[80vh] overflow-y-auto hide-scrollbar  ">
        {posts.map((noteData: any) => (
          <React.Fragment key={noteData._id}>
            <div
              className={`  flex flex-col md:w-1/2  w-full rounded-md h-[15rem]  bg-slate-700/50 border-gray-200 relative `}
              style={{ border: "1px solid gray" }}
            >
              {
                noteData.owner._id === currentUser._id &&
                <div onClick={() => deleteNote(noteData._id)}
                  className="absolute top-0 right-0 p-2 ">
                  <Delete className="text-gray-700" />
                </div>
              }

              <div className="h-[5rem] w-full text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl">
                NOTESLELO
              </div>
              <div className="px-2">
                <div className="flex justify-between">
                  <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {noteData.caption}
                  </h1>
                  <Link to={`/profile/${noteData.owner._id}`} 
                  className="text-sm text-gray-500 hover:text-gray-300">
                    {noteData.owner?.name.toUpperCase()}
                  </Link>
                </div>
                <h1 className="mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400">
                  {noteData.description}
                </h1>
              </div>
              <div className="footer flex justify-between items-center px-3 text-xl py-2 text-white ">
                <div className="flex gap-2">
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => likeClickHandler(noteData._id)}
                    className="flex items-center "
                  >
                    {noteData.likes.some(
                      (user: any) => user._id === currentUser._id
                    ) ? (
                      <BsHandThumbsUpFill className="text-red-500" />
                    ) : (
                      <BsHandThumbsUp />
                    )}
                    {noteData.likes.length > 0 && (
                      <p className="text-xs">{noteData.likes.length}</p>
                    )}
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => handleCommentClick(noteData)}
                    className="flex items-center gap-1"
                  >
                    <LiaComment />
                    {noteData?.comments.length > 0 && (
                      <p className="text-xs">{noteData.comments.length}</p>
                    )}
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => handleSave(noteData._id)}
                    className="flex items-center"
                  >
                    {noteData.saved.some(
                      (user: any) => user._id === currentUser._id
                    ) ? (
                      <GoBookmarkFill />
                    ) : (
                      <GoBookmark />
                    )}
                    {noteData.saved.length > 0 && (
                      <p className="text-xs">{noteData.saved.length}</p>
                    )}
                  </motion.div>
                </div>
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="bg-cyan-400 rounded-lg border-gray-300 border-2 hover:bg-cyan-500 hover:shadow-md"
                  onClick={() =>
                    handleDownload(noteData.pdf.url, noteData.caption)
                  }
                >
                  <div className="text-green-900 p-1">
                    <BsDownload />
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-end px-2">
                <h1 className="text-white/25">
                  {moment(noteData.createdAt).startOf("day").fromNow()}
                </h1>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {isSidebarOpen && selectedPost && (

        <CommentSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          postId={selectedPost?._id}
          post={selectedPost}
        />

      )}
    </div>
  );
};

export default Posts;
