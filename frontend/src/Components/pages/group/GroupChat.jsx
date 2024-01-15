import { Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createGroupContext } from "../../../Context";
import { Chat } from "./chat";
export const GroupChat = () => {


  const { currentUser } = useContext(createGroupContext);
  const { setGroupDeleteOpt } = useContext(createGroupContext);
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



  useEffect(() => {
    return () => {
    
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
        <div className="navbar bg-slate-500 shadow-lg w-full h-[3rem] flex items-center">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold text-xl">
              {groupData.title.toUpperCase()}
            </li>
        
            <li ref={optionIconRef} onClick={optionClickHandler}>
              <SlOptionsVertical />
            </li>
         
          </ul>
        </div>
        <Chat   currentGroupId={id}
    
          />
      
        {option && (
          <div
            ref={optionModelRef}
            className="optionModel absolute right-5 top-9 bg-slate-700 w-[10rem] rounded-md h-auto min-h-[2rem] shadow-md py-2"
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
              More
            </div>
          </div>
        )}
        
      </div>
    </Fragment>
  );
};
