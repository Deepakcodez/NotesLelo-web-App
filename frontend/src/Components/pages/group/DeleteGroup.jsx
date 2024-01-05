import React, { useContext, useState } from "react";
import { createGroupContext } from "../../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const DeleteGroup = () => {
  const { groupDeleteOpt, setGroupDeleteOpt } = useContext(createGroupContext);
  const [inputId, setInputId] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("groupId");
  const token = localStorage.getItem("useDataToken");

  const inputHandler = (e) => {
    setInputId(e.target.value);
    console.log(">>>>>>>>>>>", inputId);
  };

  console.log(">>>>>>>>>>>grp id", id);
  const deleteGroup = async (e) => {
    e.preventDefault();

    if (inputId === id) {
      try {
         const response =  await axios.delete(`http://localhost:8000/api/v1/group/delete/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
              withCredentials: true,
            },
          }
        );
        navigate("/");
        setGroupDeleteOpt(false);
        console.log("Delete successful",);
        // Handle success, if needed
      } catch (error) {
        // console.error("Error deleting data", error);
        // console.log('>>>>>>>>>>>', error.response.data.message)
        setWarning( error.response.data.message)
      }
    }
    else{
      setWarning("ID did'nt matched")
    }
  };

  return (
    <>
      <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center ">
        <div className="w-[70%] bg-slate-700 px-5 pb-9 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
          <form>
            <label
              htmlFor="title"
              className="block text-left text-sm font-medium leading-6 mb-2 text-white"
            >
              Enter <span className="text-red-500">{id}</span> to Delete
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  name="id"
                  value={inputId}
                  onChange={inputHandler}
                  placeholder="Enter Group ID"
                  className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              onClick={deleteGroup}
              className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white "
            >
              Delete
            </button>
            <button
              className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white  "
              onClick={() => setGroupDeleteOpt(false)}
            >
              Cancel
            </button>{" "}
          </form>
          <h1 className="text-slate-400 rounded-md mt-4 h-2">{warning}</h1>
        </div>
      </div>
    </>
  );
};
