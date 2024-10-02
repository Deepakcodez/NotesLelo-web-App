import React, { useContext, useState } from "react";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../assets/lading.json";

export const JoinGroup: React.FC = () => {
  const { setJoinGroup } = useContext<any>(createGroupContext);
  const [warning, setWarning] = useState<boolean>(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState<string>("");
  const token = localStorage.getItem("useDataToken") || ""; // Provide a default empty string if null

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupId(e.target.value);
  };

  const joinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!groupId) {
      setWarning(true);
      return;
    }

    try {
      setIsLoadingBtn(true);
      const resp = await axios.post(
        `https://notes-lelo-app-backend.vercel.app/api/v1/group/join`,
        { groupId },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
            withCredentials: true,
          },
        }
      );

      if (resp.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      navigate("/");
    } finally {
      setIsLoadingBtn(false);
      setJoinGroup(false);
    }
  };

  return (
    <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
      <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
        <form onSubmit={joinHandler}>
          <label htmlFor="id" className="block text-left text-sm font-medium leading-6 text-white">
            Group ID
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                name="id"
                value={groupId}
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
              <Lottie className="h-[5rem] w-full" animationData={loadingAnimation} loop={true} />
            ) : (
              <h1 className="text-center w-full text-white">Submit</h1>
            )}
          </button>
          <button
            type="button"
            className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white"
            onClick={() => setJoinGroup(false)}
          >
            Cancel
          </button>
        </form>
        <div className="h-[2rem]">
          {warning && <h1 className="warning text-slate-400">Group ID is required</h1>}
        </div>
      </div>
    </div>
  );
};
