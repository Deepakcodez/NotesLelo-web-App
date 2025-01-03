import React from "react";


interface DeleteNotePopupProps {
    handleDelete: () => void;
    handleCancel: () => void;
}
const DeleteNotePopup: React.FC<DeleteNotePopupProps> = ({ handleDelete, handleCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg text-center">
                <p className="mb-4 text-lg">Are you sure you want to delete this note?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteNotePopup;

