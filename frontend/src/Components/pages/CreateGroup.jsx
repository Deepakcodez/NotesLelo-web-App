import React, { useContext, useState } from "react";
import { createGroupContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateGroup = () => {
  const { isCreateGroup, setCreateGroup } = useContext(createGroupContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("useDataToken");
  console.log(">>>>>>>>>>>", token);
  const [GroupDetail, setGroupDetail] = useState({
    title: "",
    description: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setGroupDetail({
      ...GroupDetail,
      [name]: value,
    });
  };
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/group/create",
        GroupDetail,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
            withCredentials: true,
          },
        }
      );
      console.log('>>>>>>>>>>respomse>', response)
         // Check if the API request was successful (you can customize this based on your API response structure)
    if (response.status === 200) {
      // If successful, navigate and reset form
      navigate("/");
      setGroupDetail({
        groupName: "",
        description: "",
      });
    } else {
      // Handle unsuccessful API response, if needed
      console.log("API request was not successful");
    }
    } catch (error) {
      console.log(">>>>>>>>>>>", error);
    }

    setCreateGroup(false);
    
  };

  return (
    <>
      <div className="wrapper h-[111.5%] w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
        <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
          <form>
            {/* Group name  */}
            <label
              htmlFor="title"
              className="block text-left text-sm font-medium leading-6 text-white"
            >
              Group Name
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  name="title"
                  value={GroupDetail.groupName}
                  onChange={inputHandler}
                  className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* description   */}
            <label
              htmlFor="description"
              className="block text-left text-sm font-medium leading-6 text-white"
            >
              Description{" "}
              <span className="text-[.8rem] font-thin">*optional</span>
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  name="description"
                  value={GroupDetail.description}
                  onChange={inputHandler}
                  className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white "
              onClick={createHandler}
            >
              Create
            </button>

            <button
              className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white  "
              onClick={() => setCreateGroup(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
