import { Fragment, useContext, useEffect, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from '../../../Context';
import axios from 'axios';
import { FaFileDownload } from "react-icons/fa";
export const Notes = () => {
    const groupId = localStorage.getItem("groupId");
    const { isUploadPage, setUploadPage } = useContext(createGroupContext);
    const [notesData, setNotesData] = useState([]);
    const token = localStorage.getItem("useDataToken")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/notes/groupNotes/${groupId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                    withCredentials: true,
                });
                console.log('>>>>>>>>>>>', response.data.data)
                setNotesData(response.data.data);

            } catch (error) {
                console.error("Error fetching notes:", error);
                // Handle error as needed
            }
        };

        fetchData(); // Call the fetchData function

    }, [groupId, isUploadPage]); // Add 'groupId' as a dependency

    const handleDownload = async (fileUrl, fileName) => {
        try {
          const response = await axios.get(fileUrl.url, { responseType: 'blob' });
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
      


    return (
        <>
            <div className="chatContent relative flex flex-col gap-[7rem] overflow-y-scroll no-scrollbar w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-7.6rem)] py-3 pt-[3rem] px-6">

                {

                    notesData.map((data, index) => {
                        return (
                            <Fragment key={index}>

                                <div className={`wrapper   ${data.notes.owner === data.user._id ? "self-end" : "self-start"} w-[85%] sm:w-[80%] md:w-[43%] h-[20rem] bg-slate-500 rounded-md`}>
                                    <div className='header w-full h-[2rem] bg-blue-500 rounded-t-md'></div>
                                    <div className='pdfposter h-[10rem] w-full bg-slate-800 flex justify-center items-center'>
                                        <h1 className=' text-5xl  text-slate-600/50 font-bold'>NOTES</h1>
                                    </div>


                                    <div className='notescontent  px-3 w-full h-[8rem]  bg-slate-600 rounded-md'>
                                        <div className='contentHeader h-full  flex-col justify-between  text-white'>
                                            <div className='contentHeader  flex justify-between  text-white'>
                                                <h1 className='text-white text-xl '>{data.notes.caption}</h1>
                                                <h1 className='text-blue-200/50'>{data.user.name.toUpperCase()}</h1>
                                            </div>

                                            <div className='description overflow-y-scroll  text-white  overflow-auto no-scrollbar h-[50%] text-slate-300 '>
                                                <h1>{data.notes.description}</h1>
                                            </div>
                                            <div className='footer pt-2 flex justify-end'>
                                                <div className=' text-green-300 text-xl' onClick={() => { handleDownload(data.notes.pdf , data.notes.caption) }} ><FaFileDownload /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Fragment>
                        )
                    })
                }

                <div className='upload sticky p-4 mt-[35rem] text-center text-xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 self-end bottom-0' onClick={() => setUploadPage(true)}>
                    <FaFileUpload />
                </div>
            </div>
        </>
    );
};
