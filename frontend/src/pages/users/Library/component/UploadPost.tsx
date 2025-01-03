import React, { useRef, useState } from "react";

import { MdDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import { mutate } from "swr";

export const UploadPublicPost = ({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const token = localStorage.getItem("useDataToken") || ""; // Provide a default empty string if null

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [warning, setWarning] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const base_url = import.meta.env.VITE_BASE_URL as string;

  const [inputData, setInputData] = useState<{ caption: string; description: string }>({
    caption: "",
    description: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file || !inputData.caption || !inputData.description) {
      console.log("No file selected");
      setWarning(true);
      setWarningMsg("Something missing");
      return;
    }

    const data = new FormData();
    data.append("pdf", file);
    data.append("caption", inputData.caption);
    data.append("description", inputData.description);


    setIsUploading(true);
    try {


      await axios.post(
        `http://localhost:8000/api/v1/notes/publicNotes`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
            withCredentials: true,
          },
        }
      );
      setIsUploading(false);
      setShowForm(false)
      mutate(`http://localhost:8000/api/v1/notes/your-notes`);
      mutate(`http://localhost:8000/api/v1/notes/publicNotes`);
      // Handle the file upload response as needed
    } catch (error) {
      setIsUploading(false);
      setWarning(true);
      setWarningMsg("Error while uploading");
      console.error("Error uploading file:", error);
    }

    // Clear the input after uploading
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <>
      <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
        <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
          <form onSubmit={uploadFile}>
            <div
              className="upload flex justify-center my-3 p-1 text-center text-4xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 bottom-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <MdDriveFolderUpload />
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*, application/pdf"
              />
            </div>

            <label
              htmlFor="caption"
              className="block text-left text-sm font-medium leading-6 text-white"
            >
              Topic name (Subject)
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  name="caption"
                  value={inputData.caption}
                  onChange={onChangeHandler}
                  className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <label
              htmlFor="description"
              className="block text-left text-sm font-medium leading-6 text-white"
            >
              Description
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <textarea
                  name="description"
                  value={inputData.description}
                  onChange={onChangeHandler}
                  className="block max-h-[10rem] min-h-[3rem] flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white"
            >
              {isUploading ? "Uploading..." : " Upload"}
            </button>

            <button
              type="button" // Set type to button to prevent form submission
              className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
          <div className="h-[2rem]">
            {warning && (
              <h1 className="warning text-slate-400">{warningMsg}</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
