import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import { motion } from "framer-motion";
import useSWR, { mutate } from "swr";
import { NotesCard } from "../component/notesComponents";


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

  const url =  import.meta.env.VITE_BASE_URL as string;
  // const url = 'http://localhost:8000'

  const { data, error, isLoading } = useSWR<NoteData[]>(`${url}/api/v1/notes/groupNotes/${groupId}`, fetcher);

  useEffect(() => {
    console.log(data)
    if (data) {
      setNotesData(data);
    }
  }, [data]);



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);
  if (isLoading) return <div>Loading</div>
  if (error) return <div>Error fetching data. Please try again later.</div>;
  if (!data) return (
    <div className="flex h-[70vh] w-full justify-center items-center text-white">
      NO DATA
    </div>
  );

  return (
    <>
      <div className="chatContent flex flex-col gap-[7rem] overflow-y-scroll no-scrollbar w-full h-[calc(100vh-10.15rem)] py-3 pt-[3rem] px-6">
        {
          data &&
          <NotesCard data={data} />
        }

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
