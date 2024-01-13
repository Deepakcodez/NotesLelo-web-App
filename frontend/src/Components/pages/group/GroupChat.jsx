import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createGroupContext } from "../../../Context";

export const GroupChat = () => {
  const { groupDeleteOpt, setGroupDeleteOpt } = useContext(createGroupContext);
  const [option, setOption] = useState(false);
  const optionModelRef = useRef();
  const optionIconRef = useRef();
  const token = localStorage.getItem("useDataToken");
  const id = localStorage.getItem("groupId");
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
  });

  //function : if user click outside of option model the model will automatically close with user permission
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!optionIconRef.current.contains(e.target) && optionModelRef.current) {
        setOption(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Cleanup function to be executed when leaving the page
  useEffect(() => {
    return () => {
      // Empty the "groupId" in localStorage
      localStorage.removeItem("groupId");
    };
  }, []);

  // function for fetching data
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

  //if user Id not stored in local storage named groupId
  // If groupId is not present, navigate to the root path
  // if groupId present than call the fetchData function
  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [id, navigate]);

  const optionClickHandler = () => {
    setOption(!option);
  };
  const deleteGroupHandler = () => {
    setGroupDeleteOpt(true);
    setOption(false);
  };

  return (
    <Fragment>
      <div className="container relative min-h-full h-fit w-fit min-w-full  flex flex-col justify-between">
        {/* navbar  */}
        <div className="navbar bg-slate-300   shadow-lg   w-full h-[3rem] flex items-center ">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold  text-xl">
              {groupData.title.toUpperCase()}
            </li>

            {/* option icon */}
            <li ref={optionIconRef} onClick={optionClickHandler}>
              <SlOptionsVertical />
            </li>
          </ul>
        </div>

        {/* //chat content div  */}
        {/* //chat content div  */}
        {/* //chat content div  */}
        <div className="chatContent  overflow-y-scroll no-scrollbar  w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-10.55rem)]">
          {/* chating portion */}
          {/* chating portion */}
          {/* chating portion */}
          {/* chating portion */}
          {/* chating portion */}
          {/* chating portion */}
          {/* chating portion */}
        </div>
        {/* model which open when user click on option button */}
        {option && (
          <div
            ref={optionModelRef}
            className="optionModel absolute right-5 top-9   bg-slate-700 w-[10rem] rounded-md h-auto min-h-[2rem] shadow-md py-2"
          >
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              Members{" "}
            </div>
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              Docs, and links{" "}
            </div>
            <div
              className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer"
              onClick={deleteGroupHandler}
            >
              Delete
            </div>

            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              more
            </div>
          </div>
        )}

        {/* typing div  */}
        <div className="typingArea bg-slate-300 h-[3rem] flex items-center px-1 md:px-10 gap-2">
        <label htmlFor="file" >
            {" "}
            <GoPlus className="text-3xl cursor-pointer" />
          </label>
          <input
            type="file"
            id="file"
            // ref={fileInputRef}
            className="hidden"
            onChange={(e) => console.log(e.target.files[0])}
          />
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
