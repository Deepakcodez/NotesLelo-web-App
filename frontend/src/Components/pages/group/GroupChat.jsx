import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { createGroupContext } from "../../../Context";

export const GroupChat = () => {

  const location = useLocation();
  const { setGroupDeleteOpt, demand, setDemand, currentUser } = useContext(createGroupContext);
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
      <div className="container relative min-h-full h-fit w-fit min-w-full  flex flex-col ">
        <div className="navbar bg-slate-700 shadow-lg w-full h-[3rem] flex items-center">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold text-white text-xl flex items-center gap-2">
              <Link to="/" className="text-3xl md:hidden"><  MdChevronLeft /></Link>
              {groupData.title.toUpperCase()}
            </li>

            <li className="text-white flex items-center gap-3" >
              <div ref={optionIconRef} onClick={optionClickHandler}><SlOptionsVertical /></div>

            </li>

          </ul>
        </div>
        <div className="groupnavlinks w-full  absolute z-[40]   top-[3rem] ">
          <ul className="flex  justify-center items-center text-xl ">
            <NavLink 
               to="/group/demand">
                <li className={`${location.pathname === "/group/demand" ?"bg-orange-300 text-black":"bg-orange-300/50 text-white"}  w-[30vw] rounded-s-full text-center px-7 py-2 `}>Demands</li></NavLink>
            <NavLink 
            to="/group/notes">
              <li className={` ${location.pathname === "/group/notes" ?"bg-blue-300 text-black":"bg-blue-300/50 text-white"}  w-[30vw] rounded-e-full px-7 py-2 text-center`}>
                Notes
              </li></NavLink>
          </ul>
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
