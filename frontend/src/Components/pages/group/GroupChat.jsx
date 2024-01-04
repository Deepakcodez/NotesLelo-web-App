import { Fragment, useContext, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createGroupContext } from "../../../Context";

export const GroupChat = () => {
  const { groupDeleteOpt, setGroupDeleteOpt } = useContext(createGroupContext);
  const [option, setOption] = useState(false);
  const token = localStorage.getItem("useDataToken");
  const id = localStorage.getItem("groupId");
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    // Cleanup function to be executed when leaving the page
    return () => {
      // Empty the "groupId" in localStorage
      localStorage.removeItem("groupId");
    };
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/group/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      // console.log("Group data:", response.data.data.description);
      setGroupData({
        title: response.data.data.title,
        description: response.data.data.description,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!id) {
      // If groupId is not present, navigate to the root path
      navigate("/");
    } else {
      fetchData();
    }
  }, [id, navigate]);

  const optionClickHandler = () => {
    setOption(!option);
  };
  const deleteGroupHandler=()=>{
    setGroupDeleteOpt(true)
    setOption(false)
  }

  return (
    <Fragment>
      <div className="container relative  md:h-full w-full  flex flex-col justify-between">
        <div className="navbar bg-slate-500      w-full h-[3rem] flex items-center ">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold text-xl">{groupData.title}</li>
            <li onClick={optionClickHandler}>
              <SlOptionsVertical  />
            </li>
          </ul>
        </div>
        {option && (
          <div className="absolute right-5 top-9   bg-slate-700 w-[10rem] rounded-sm h-auto min-h-[2rem]  py-2">
            <div className="text-white hover:bg-slate-600 ps-4 cursor-pointer">
              info
            </div>
            <div
              className="text-white hover:bg-slate-600 ps-4 cursor-pointer"
              onClick={deleteGroupHandler}
            >
              delete group
            </div>
          </div>
        )}
        <div className="tpyingArea bg-slate-300 h-[3rem] flex items-center px-1 md:px-10 gap-2">
          <GoPlus className="text-3xl" />
          <input
            type="text"
            placeholder="enter message"
            className="w-[100%] h-[1.8rem] px-2 rounded-md"
          />
          <IoMdSend className="text-3xl" />
        </div>
      </div>
    </Fragment>
  );
};
