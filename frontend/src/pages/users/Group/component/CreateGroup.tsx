import React, { useContext, useState } from "react";
import { createGroupContext } from "../../../../Context";
import { useNavigate } from "react-router-dom"; // Uncomment if you're going to use navigate
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../assets/lading.json";
import { mutate } from "swr";

interface GroupDetail {
  title: string;
  description: string;
}

export const CreateGroup: React.FC = () => {
  const { isCreateGroup, setCreateGroup } = useContext<any>(createGroupContext);
  const [warning, setWarning] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = localStorage.getItem("useDataToken");
  const [GroupDetail, setGroupDetail] = useState<GroupDetail>({
    title: "",
    description: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!GroupDetail.title) {
      setWarning(true);
      setWarningMsg("something missing");
      return;
    }

    try {
      setIsLoading(true);
      const base_url = import.meta.env.VITE_BASE_URL as string;

      const response = await axios.post(
        `http://localhost:8000/api/v1/group/create`,
        GroupDetail,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
            withCredentials: true,
          },
        }
      );

      if (response.data || response.status === 200) {
        mutate(`${base_url}/api/v1/group/all`);
        setGroupDetail({
          title: "",
          description: "",
        });
        setCreateGroup(false);
      } else {
        setWarning(true);
        setWarningMsg("server error...");
      }
    } catch (error) {
      setWarning(true);
      setWarningMsg("server error😪...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
      <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
        <form onSubmit={createHandler}>
          {/* Group name  */}
          <label htmlFor="title" className="block text-left text-sm font-medium leading-6 text-white">
            Group Name
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                name="title"
                value={GroupDetail.title}
                onChange={inputHandler}
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Description */}
          <label htmlFor="description" className="block text-left text-sm font-medium leading-6 text-white">
            Description{" "}
            <span className="text-[.8rem] font-thin">*optional</span>
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                name="description"
                value={GroupDetail.description}
                onChange={inputHandler}
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-400 rounded h-[2rem] flex justify-normal items-center py-1.5 w-full mt-3 hover:bg-blue-500"
          >
            {isLoading ? (
              <Lottie className="h-[5rem] w-full" animationData={loadingAnimation} loop={true} />
            ) : (
              <h1 className="text-center w-full text-white">Submit</h1>
            )}
          </button>

          <button
            type="button"
            className="bg-red-400 rounded md h-[2rem] py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white"
            onClick={() => setCreateGroup(false)}
          >
            Cancel
          </button>
        </form>
        <div className="h-[2rem]">
          {warning && <h1 className="warning text-slate-400">{warningMsg}</h1>}
        </div>
      </div>
    </div>
  );
};
