import React, { useContext, useState } from "react";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../assets/lading.json";
import { mutate } from "swr";

export const DeleteGroup: React.FC = () => {
  const { groupDeleteOpt, setGroupDeleteOpt } = useContext<any>(createGroupContext);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const [inputId, setInputId] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const navigate = useNavigate();
  const id = localStorage.getItem("groupId") || ""; // Provide a default empty string if null
  const token = localStorage.getItem("useDataToken") || ""; // Provide a default empty string if null

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
    console.log(">>>>>>>>>>>", inputId);
  };

  console.log(">>>>>>>>>>>grp id", id);

  const deleteGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputId.trim() === id) {
      try {
        setIsLoadingBtn(true);
        const base_url = import.meta.env.VITE_BASE_URL as string;

        const response = await axios.delete(
          `${base_url}/api/v1/group/delete/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
              withCredentials: true,
            },
          }
        );
        mutate(
          `${base_url}/api/v1/notification/latest_notification`
        );
        setIsLoadingBtn(false);
        navigate("/");
        setGroupDeleteOpt(false);
      } catch (error: any) {
        setIsLoadingBtn(false);
        setWarning(error?.response?.data?.message || "An error occurred.");
      }
    } else {
      setWarning("ID didn't match");
    }
  };

  return (
    <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
      <div className="w-[70%] bg-slate-700 px-5 pb-9 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
        <form onSubmit={deleteGroup}>
          <label
            htmlFor="id"
            className="block text-left text-sm font-medium leading-6 mb-2 text-white"
          >
            Enter <span className="text-red-500">{id}</span> to Delete
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                name="id"
                value={inputId}
                onChange={inputHandler}
                placeholder="Enter Group ID"
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 rounded h-[2rem] flex justify-normal items-center py-1.5 w-full mt-3 hover:bg-blue-500"
          >
            {isLoadingBtn ? (
              <Lottie
                className="h-[5rem] w-full"
                animationData={loadingAnimation}
                loop={true}
              />
            ) : (
              <h1 className="text-center w-full text-white">Delete</h1>
            )}
          </button>
          <button
            type="button"
            className="bg-red-400 rounded-md h-[2rem] py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white"
            onClick={() => setGroupDeleteOpt(false)}
          >
            Cancel
          </button>
        </form>
        <h1 className="text-slate-400 rounded-md mt-4 h-2">{warning}</h1>
      </div>
    </div>
  );
};
