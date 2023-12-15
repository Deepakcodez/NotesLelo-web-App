import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";


function Sidebar(props) {
  const [isOpen, setOpen] = useState(true);
  // console.log(">>>>>>>>>>>props", props);
   console.log('>>>>>>>>>>>', name)
  
  // const [avatarWord, setAvatarWord] = useState(name[0]);
    
// console.log('>>>>>>>>>>>', avatarWord)

  const clickHandler = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <section className=" sidebar h-full  hidden  md:inline-block  ">
        <motion.div
          animate={{ width: isOpen ? "16rem" : "5rem" }}
          className=" flex shadow-md  h-full gap-3 py-4 flex-col px-3 bg-slate-600"
        >
          <div
            className={`flex ${
              isOpen ? "justify-between " : ""
            } items-center  p-1 `}
          >
            {/* <NavLink to={"/"} className="font-bold text-xl text-white ">
              {isOpen && (
                <img src="/public/assets/logo.png" className="h-[2rem]"></img>
              )}{" "}
            </NavLink>  */}

              {isOpen ? 
              <FaAngleDoubleLeft
                className="text-white text-4xl bg-slate-500 rounded-full p-2 "
                onClick={clickHandler}
              />
             : 
              <FaAngleDoubleRight
                className="text-white text-4xl bg-slate-500 rounded-full p-2 "
                onClick={clickHandler}
              />
            } 
          </div>

          {/* avatar  */}
           {/* <NavLink
            to={"/profile"}
            style={({ isActive }) => {
              return { background: isActive && "#556274" };
            }}
            className="avatar flex items-center gap-3  rounded-md  "
          >
            <div className="h-10 w-10 rounded-full text-white font-semibold text-xl  bg-blue-300 items-center justify-center flex">D</div>
            <div>
              {isOpen && <h1 className="text-white ">{name}</h1>}
              {isOpen && <p className="text-white text-[.7rem]">{email}</p>}
            </div>
          </NavLink>  */}


          {/* home */}
          <NavLink
            to={"/"}
            style={({ isActive }) => {
              return { background: isActive && "#556274" };
            }}
            className={`avatar flex items-center gap-3 ${
              isOpen && "hover:bg-blue-500"
            } rounded-md p-2`}
          >
            <FcHome className="h-10 w-10  text-white ease-in duration-200 p-2" />
            {isOpen && <h1 className="text-white">Home</h1>}
          </NavLink>
          {/* your notes */}
          <NavLink
            to={"/yourNotes"}
            style={({ isActive }) => {
              return { background: isActive && "#556274" };
            }}
            className={`avatar flex items-center gap-3 ${
              isOpen && "hover:bg-blue-500"
            } rounded-md p-2`}
          >
            <FcDocument className="h-10 w-10  text-white  ease-in duration-200 p-2" />
            {isOpen && <h1 className="text-white">Your Notes</h1>}
          </NavLink>
          {/* saved notes */}
          <NavLink
            to={"/savedNotes"}
            style={({ isActive }) => {
              return { background: isActive && "#556274" };
            }}
            className={`avatar flex items-center gap-3 ${
              isOpen && "hover:bg-blue-500"
            } rounded-md p-2`}
          >
            <FcBookmark className="h-10 w-10  text-white  ease-in duration-200 p-2" />
            {isOpen && <h1 className="text-white">Saved Notes</h1>}
          </NavLink>
          {/* notification */}
          <NavLink
            to={"/notifications"}
            style={({ isActive }) => {
              return { background: isActive && "#556274" };
            }}
            className={`avatar flex items-center gap-3 ${
              isOpen && "hover:bg-blue-500"
            } rounded-md p-2`}
          >
            <FcAdvertising className="h-10 w-10 rounded-full text-white ease-in duration-200 p-2" />
            {isOpen && <h1 className="text-white">Notifications</h1>}
          </NavLink>
        </motion.div>
      </section>
    </>
  );
}

export default Sidebar;
