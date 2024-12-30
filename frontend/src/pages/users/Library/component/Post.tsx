import React, { useEffect, useState } from "react";
import { Post } from "../../../../types/types";
import loaderBook from "../../../../assets/loaderbook.json";
import Lottie from "lottie-react";
import axios from "axios";
import useSWR from "swr";
import NoteCard from "@/Components/Card";
import CommentSidebar from "@/Components/Comments"; 

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

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

  const handleLike = (noteId: string) => {
    console.log(`Liked note with ID: ${noteId}`);
    // Add like functionality here
  };

  const handleSave = (noteId: string) => {
    console.log(`Saved note with ID: ${noteId}`);
    // Add save functionality here
  };

  const handleDownload = async(url: string, name: string) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      link.click();
      console.log(`Downloaded file: ${name} from URL: ${url}`);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  const handleCommentClick = (post: Post) => {
    setSelectedPost(post); 
    setIsSidebarOpen(true); 
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

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
    <div className="relative">
      <div className="p-6">
        <div className="grid grid-cols-1 mt-6 gap-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
          {posts.map((post , index) => (
             <div
             key={post._id}
             className={`transition duration-500 ease-in-out transform opacity-0 translate-y-6 animate-fade-in`}
             style={{ animationDelay: `${index * 0.1}s` }}
           >
            <NoteCard
              key={post._id}
              noteId={post._id}
              caption={post.caption}
              description={post.description}
              pdfUrl={post.pdf?.url || ""}
              owner={post.owner}
              likes={post.likes }
              saved={post.saved}
              createdAt={post.createdAt}
              currentUserId="currentUserIdPlaceholder"
              userName={post.owner || "Unknown"}
              onLike={handleLike}
              onSave={handleSave}
              onDownload={handleDownload}
              onComment={() => handleCommentClick(post)} 
            />
      </div>

          ))}
        </div>
      </div>

     
      {isSidebarOpen && selectedPost && (
        
        <CommentSidebar
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          postId={selectedPost?._id }
        />
        
      )}
    </div>
  );
};

export default Posts;
