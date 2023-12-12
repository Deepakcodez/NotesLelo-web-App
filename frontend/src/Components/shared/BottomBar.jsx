import { FcHome, FcDocument, FcAdvertising, FcBookmark } from "react-icons/fc";

import { NavLink } from "react-router-dom";
function BottomBar() {
  return (
    <>
      <section className="bottombar md:hidden fixed bottom-0 w-full">
        <div className=" flex justify-around bg-slate-600 py-4 px-3">
          <NavLink
            to={"/"}
            style={({ isActive }) => {
              return { scale: isActive && "1.5" };
            }}
          >
            <FcHome className="text-3xl" />
          </NavLink>

          <NavLink
            to={"/yourNotes"}
            style={({ isActive }) => {
              return {  scale: isActive &&"1.5"  };
            }}
          >
            <FcDocument className="text-3xl" />
          </NavLink>

          <NavLink
            to={"/notifications"}
            style={({ isActive }) => {
              return { scale: isActive && "1.5" };
            }}
          >
            <FcAdvertising className="text-3xl" />
          </NavLink>

          <NavLink
            to={"/savedNotes"}
            style={({ isActive }) => {
              return { scale: isActive && "1.5" };
            }}
          >
            <FcBookmark className="text-3xl" />
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default BottomBar;
