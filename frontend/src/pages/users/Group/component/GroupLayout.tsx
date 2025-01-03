import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { createGroupContext } from "../../../../Context";
import { GroupDetails } from "./GroupDetails";
import { Chat } from "../chat";

export const GroupLayout = () => {
  const location = useLocation();
  const {
    setGroupDeleteOpt,
    demand,
    setDemand,
    currentUser,
    setShowLeftGroup,
    setInviteForm,
    showGroupMembers,
    setGroupMembers,
  } = useContext<any>(createGroupContext);
  const [option, setOption] = useState(false);
  const optionModelRef = useRef<HTMLDivElement | null>(null);
  const optionIconRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("useDataToken");
  const id = localStorage.getItem("groupId");
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_BASE_URL as string;

  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    owner: "",
  });

  useEffect(() => {
    const handleClickOutside = (e: any) => {
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
        `${base_url}/api/v1/group/${id}`,
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
        owner: response.data.data.owner[0].owner,
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

  const leftGroupHandler = () => {
    setShowLeftGroup(true);
  };

  return (
    <Fragment>
      <div className=" relative min-h-full h-fit w-fit min-w-full  flex flex-col  ">
        <div className="navbar  bg-slate-700 truncate shadow-lg w-full h-[3rem] flex items-center ">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold text-white text-xl flex items-center gap-2  w-9/12 md:w-8/12 truncate">
              <Link to="/" className="text-3xl md:hidden">
                <MdChevronLeft />
              </Link>
              {groupData.title ? (
                <p className="truncate md-w-12/12  text-ellipsis">{groupData.title.toUpperCase()}</p>
              ) : (
                <div className="bg-slate-500/25 w-[13rem] h-[1.5rem] rounded-md animate-pulse duration-1000"></div>
              )}
            </li>
            <li className="text-white flex items-center gap-3">
              <div ref={optionIconRef} onClick={optionClickHandler}>
                <SlOptionsVertical />
              </div>
            </li>
          </ul>
        </div>
        <div className="options  flex justify-evenly  border-t-[1px] border-slate-400  ">
          <NavLink
            to="/group/demand"
            className="bg-slate-600/25 w-1/2 text-center py-2 border-r-[1px]"
          >
            <h1
              className={`${location.pathname === "/group/demand"
                ? "text-orange-400"
                : "text-white"
                } font-bold`}
            >
              Demand
            </h1>
          </NavLink>
          <NavLink
            to="/group/notes"
            className="bg-slate-600/25 w-1/2 text-center py-2 "
          >
            <h1
              className={` ${location.pathname === "/group/notes"
                ? "text-blue-400"
                : "text-white"
                }  font-bold`}
            >
              Notes
            </h1>
          </NavLink>
        </div>
        <Chat />
        <Outlet />

        {option && (
          <div
            ref={optionModelRef}
            className="optionModel  absolute right-5 top-9 bg-slate-800 w-[10rem] rounded-md h-auto min-h-[2rem] shadow-md py-2"
          >
            <div
              className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer"
              onClick={() => setGroupMembers(!showGroupMembers)}
            >
              Members{" "}
            </div>
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              All Notes
            </div>

            <div
              className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer"
              onClick={() => setInviteForm(true)}
            >
              Invite
            </div>
            <div
              className="text-white bg-red-800 hover:bg-red-600 ps-4 py-3 cursor-pointer"
              onClick={
                groupData?.owner == currentUser._id
                  ? deleteGroupHandler
                  : leftGroupHandler
              }
            >
              {groupData?.owner == currentUser._id ? "Delete" : "Left"}
            </div>
          </div>
        )}

        {showGroupMembers && <GroupDetails />}
      </div>
    </Fragment>
  );
};
