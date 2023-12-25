import { FcHome, FcDocument, FcAdvertising, FcBookmark } from "react-icons/fc";
import { RiHome2Line } from "react-icons/ri";
import { GrDocumentNotes } from "react-icons/gr";
import { GiBookmark } from "react-icons/gi";
import { AiOutlineNotification } from "react-icons/ai";

import { NavLink } from "react-router-dom";
function BottomBar() {
  return (
    <>
      <section className="bottombar md:hidden fixed bottom-0 w-full">
        <div className=" flex justify-around bg-slate-800 py-4 px-3 border-tcd-[1px] border-slate-700">
          <NavLink
            to={"/"}
            style={({ isActive }) => {
              return { scale: isActive && "1.5" };
            }}
          >
            <RiHome2Line className="text-3xl text-white" />
          </NavLink>

          <NavLink
            to={"/yourNotes"}
            style={({ isActive }) => {
              return {  scale: isActive &&"1.5"  };
            }}
          >
            <GrDocumentNotes className="text-3xl text-white" />
          </NavLink>

          <NavLink
            to={"/notifications"}
            style={({ isActive }) => {
              return { scale: isActive && "1.5" };
            }}
          >
            <AiOutlineNotification className="text-3xl text-white" />
          </NavLink>

          <NavLink
            to={"/savedNotes"}
            style={({ isActive }) => {
              return { scale: isActive && "1.5" };
            }}
          >
            <GiBookmark className="text-3xl text-white" />
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default BottomBar;
