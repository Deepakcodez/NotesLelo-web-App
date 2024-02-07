import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { createGroupContext } from "../../../Context";

export const GroupChat = () => {

  const location = useLocation();
  const { setGroupDeleteOpt, demand, setDemand, currentUser, showInviteForm, setInviteForm} = useContext(createGroupContext);
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
        `https://notes-lelo-app-backend.vercel.app/api/v1/group/${id}`,
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

  // funcion for invite  someone to group
  // required user email address 
  // send user   group id through  email for join the group
  const joinUser =()=>{
              
  }


  return (
    <Fragment>
      <div className=" relative min-h-full h-fit w-fit min-w-full  flex flex-col ">
        <div className="navbar bg-slate-700 shadow-lg w-full h-[3rem] flex items-center">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold text-white text-xl flex items-center gap-2  w-[15rem]">
              <Link to="/" className="text-3xl md:hidden"><  MdChevronLeft /></Link>
              {groupData.title ? groupData.title.toUpperCase() : <div className="bg-slate-500/25 w-[13rem] h-[1.5rem] rounded-md animate-pulse duration-1000"></div>}
            </li>
            <ul className="flex gap-3 text-lg text-white hidden md:flex">
              <NavLink to="/group/demand"> <li className={`${location.pathname === "/group/demand" ? "text-orange-400 underline underline-offset-4" : "text-white select-none "}`}>Demand</li></NavLink>
              <NavLink to="/group/notes">  <li className={`${location.pathname === "/group/notes" ? "text-blue-400 underline underline-offset-4" : "text-white select-none transition duration-3000 ease-in-out "}`}>Notes</li></NavLink>

            </ul>

            <li className="text-white flex items-center gap-3" >
              <div ref={optionIconRef} onClick={optionClickHandler}><SlOptionsVertical /></div>

            </li>

          </ul>
        </div>
          <div className='options  flex justify-evenly  md:hidden border-t-[1px] border-slate-400  '>
            <NavLink to="/group/demand" className="bg-slate-600/25 w-1/2 text-center py-2">
              <h1 className={`${location.pathname === "/group/demand" ? "text-orange-200":"text-white"} font-bold`}>Demand</h1>
            </NavLink>
            <NavLink to="/group/notes" className="bg-slate-600/25 w-1/2 text-center py-2 ">
              <h1 className={` ${location.pathname === "/group/notes" ? "text-blue-200":"text-white"}  font-bold`}>Notes</h1>
            </NavLink>
          </div>


        <Outlet />

        {option && (
          <div
            ref={optionModelRef}
            className="optionModel  absolute right-5 top-9 bg-slate-800 w-[10rem] rounded-md h-auto min-h-[2rem] shadow-md py-2"
          >
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              Members{" "}
            </div>
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              All Notes
            </div>
           
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer"
            onClick={()=>setInviteForm(true)}
            >
              Invite
            </div>
            <div
              className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer"
              onClick={deleteGroupHandler}
            >
              Delete
            </div>
          </div>
        )}

      </div>
    </Fragment>
  );
};
