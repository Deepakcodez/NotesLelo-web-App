import { RiHome2Line } from "react-icons/ri";
import { GrDocumentNotes } from "react-icons/gr";
import { GiBookmark } from "react-icons/gi";
import { AiOutlineNotification } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";

const BottomBar: React.FC = () => {
  const location = useLocation();
  const urlLocation = location.pathname;

  return (
    <section className={`bottombar ${urlLocation === "/chat" && "hidden"} md:hidden fixed bottom-0 w-full`}>
      <div className="flex justify-around bg-slate-800 py-4 px-3 border-t-[1px] border-slate-700">
        <NavLink
          to={"/"}
          style={({ isActive }) => ({
            transform: isActive ? "scale(1.5)" : undefined,
          })}
        >
          <RiHome2Line className="text-3xl text-white" />
        </NavLink>

        <NavLink
          to={"/yourNotes"}
          style={({ isActive }) => ({
            transform: isActive ? "scale(1.5)" : undefined,
          })}
        >
          <GrDocumentNotes className="text-3xl text-white" />
        </NavLink>

        <NavLink
          to={"/notifications"}
          style={({ isActive }) => ({
            transform: isActive ? "scale(1.5)" : undefined,
          })}
        >
          <AiOutlineNotification className="text-3xl text-white" />
        </NavLink>

        <NavLink
          to={"/savedNotes"}
          style={({ isActive }) => ({
            transform: isActive ? "scale(1.5)" : undefined,
          })}
        >
          <GiBookmark className="text-3xl text-white" />
        </NavLink>
      </div>
    </section>
  );
};

export default BottomBar;
