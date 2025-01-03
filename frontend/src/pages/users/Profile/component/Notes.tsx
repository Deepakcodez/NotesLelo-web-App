import handleDownload from "@/utils/handleDownload"
import Lottie from "lottie-react";
import React from "react"
import { BsDownload } from "react-icons/bs"
import loaderBook from "../../../../assets/loaderbook.json";
import { Note } from "./Profile";
import { Trash2 } from "lucide-react";



interface NoteProps {
    loader: boolean;
    notesData: any[];
    setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedNoteId: React.Dispatch<React.SetStateAction<string | null>>
}

const Notes: React.FC<NoteProps> = ({ loader, notesData, setShowDeletePopup, setSelectedNoteId }) => {

    if ( notesData === undefined || notesData === null) {
        return (
            <div className="p-12">
                Share Notes...
            </div>
        )
    }
    return (
        <div className=" p-6 flex flex-col lg:flex-row gap-6 h-full ">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                    Your Notes

                </h2>
                {loader ? (
                    <div className="flex justify-center">
                        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
                    </div>
                ) : notesData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
                        {notesData.map((notes, index: any) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-gray-900/80 via-gray-800/80 0 to-gray-800/40 p-4 rounded-lg  border border-gray-700 shadow-lg"
                            >
                                <div className="flex justify-end ">
                                    <Trash2
                                        className="cursor-pointer"
                                        color="red"
                                        size={14}
                                        onClick={() =>{ 
                                            setSelectedNoteId(notes?._id)
                                            setShowDeletePopup(true) } 
                                            } />
                                </div>

                                <h3 className="text-xl font-bold text-gray-200">{notes.caption}</h3>
                                <p className="text-gray-500 mt-2 h-16 overflow-y-scroll no-scrollbar leading-4 text-xs">{notes.description} </p>
                                <div
                                    className="mt-4 py-2 px-4 bg-blue-500 rounded-lg text-center cursor-pointer"
                                    onClick={() => handleDownload(notes.pdf.url, notes.caption)}
                                >
                                    <BsDownload className="inline-block mr-2 text-white" />
                                    Download
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No notes found.</p>
                )}
            </div>



        </div>
    )
}
export default Notes