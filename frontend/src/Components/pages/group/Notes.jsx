import { Fragment, useContext, useEffect, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { createGroupContext } from '../../../Context';
import axios from 'axios';

export const Notes = () => {
    const groupId = localStorage.getItem("groupId");
    const { isUploadPage, setUploadPage } = useContext(createGroupContext);
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/notes/groupNotes/${groupId}`);
                console.log('>>>>>>>>>>>', response.data.data)
                setNotesData(response.data.data); // Assuming the data is in a 'data' property
            } catch (error) {
                console.error("Error fetching notes:", error);
                // Handle error as needed
            }
        };

        fetchData(); // Call the fetchData function

    }, [groupId, isUploadPage]); // Add 'groupId' as a dependency

    console.log('Notes Data:', notesData);

    return (
        <>
            <div className="chatContent relative flex flex-col gap-5 overflow-y-scroll no-scrollbar w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-7.6rem)] py-3 pt-[3rem] px-6">

                  {
                    notesData.map((notes,index)=>{
                        return(
                            <Fragment key={index}>
                            <div className='wrapper w-[15rem] h-[20rem] bg-slate-500'>
                                {notes.caption}
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
