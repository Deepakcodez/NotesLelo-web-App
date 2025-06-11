import { Fragment, useContext, useState } from 'react';
import { createGroupContext } from "../../../../Context";
import axios from 'axios';
import { BsDownload } from "react-icons/bs";
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { SavedGhost } from '../../../../Components/shared/ghost/SavedGhost';

// Define the structure of a note
interface Note {
  caption: string;
  description: string;
  pdf: { url: string }; // Assuming pdf has a url property
}

const Saved: React.FC = () => {
  const token = localStorage.getItem("useDataToken");
  const { currentUser } = useContext<any>(createGroupContext);
  const base_url = import.meta.env.VITE_BASE_URL as string;

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a virtual anchor element
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;

      // Simulate a click on the anchor element to trigger the download
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Release the Object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const { data, error } = useSWR<Note[]>(`${base_url}/api/v1/notes/savedNotes`, async (url: any) => {
    try {
      const resp = await axios(url, {
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        withCredentials: true,
      });
      return resp.data.data;
    } catch (error) {
      console.log('>>>>>>>>>>>', error);
      throw error; // Rethrow error for handling
    }
  });

  if (error) {
    console.log("Error fetching data:", error);
    return <div className="text-white font-semibold text-lg">Error fetching data. Please try again later.🤖</div>;
  }
  if (!data) {
    return <SavedGhost />;
  }

  return (
    <>
      <div className="w-[100%]">
        <div className='header h-[2rem] w-[100%] bg-slate-700/25 flex items-center px-3' style={{ borderBottom: "1px solid gray" }}>
          <h1 className='text-white font-semibold'>Saved Notes</h1>
        </div>

        {/* Data */}
        <div className='h-[calc(100%-2rem)] w-full overflow-y-scroll no-scrollbar px-7 pt-10 pb-[5rem]'>
          <div className='h-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center'>
            {data.map((notes, index) => (
              <Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    duration: 0.2,
                    delay: (index * 0.3),
                  }}
                  className='bg-slate-800 rounded-md'
                  style={{ border: "1px solid gray" }}
                >
                  <div className='h-[5rem] w-full text-blue-300/50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-bold flex justify-center items-center text-2xl'>NOTESLELO</div>
                  <div className='px-2'>
                    <div className='flex justify-between'>
                      <h1 className='bg font-bold tracking-tight text-gray-900 dark:text-white text-md truncate'>{notes.caption}</h1>
                      <h1 className='text-sm text-gray-500'>{currentUser.name}</h1>
                    </div>
                    <h1 className='mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400'>{notes.description}</h1>
                  </div>
                  <div className='footer flex justify-end px-3 py-2 text-white'>
                    <div className='bg-cyan-400 rounded-lg border-gray-300 border-2'
                      onClick={() => { handleDownload(notes.pdf.url, notes.caption); }} // Accessing pdf.url
                    >
                      <div className='text-green-900 p-1 flex gap-2'><span>Download</span><BsDownload className='text-xl' /></div>
                    </div>
                  </div>
                </motion.div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Saved;
