import { useState } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import { NavLink } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { GrDocumentNotes } from "react-icons/gr";
import { GiBookmark } from "react-icons/gi";
import { AiOutlineNotification } from "react-icons/ai";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { LuLibrary } from "react-icons/lu";

function Sidebar() {
  const [isOpen, setOpen] = useState(true);

  const menu = [
    { title: "Home", icon: <RiHome2Line />, link: "/" },
    { title: "Your Notes", icon: <GrDocumentNotes />, link: "/yourNotes" },
    { title: "Saved Notes", icon: <GiBookmark />, link: "/savedNotes" },
    {
      title: "Notifications",
      icon: <AiOutlineNotification />,
      link: "/notifications",
    },
    {
      title: "Library",
      icon: <LuLibrary />,
      link: "/library",
    },
  ];

  const showAnmation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const clickHandler = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <section className=" sidebar min-h-screen max-h-fit h-auto   hidden  md:inline-block  ">
        <motion.div
          animate={{
            width: isOpen ? "16rem" : "4rem",
            transition: { duration: 0.5, type: "spring", damping: 13 },
          }}
          className=" flex shadow-md  h-full gap-3   py-4 flex-col p-2 bg-slate-800"
        >
          <div
            className={`flex ${
              isOpen ? "justify-between " : ""
            } items-center  p-1 `}
          >
            {isOpen ? (
              <FaAngleDoubleLeft
                className="text-white text-4xl bg-slate-500 rounded-full p-2 "
                onClick={clickHandler}
              />
            ) : (
              <FaAngleDoubleRight
                className="text-white text-4xl bg-slate-500 rounded-full p-2 "
                onClick={clickHandler}
              />
            )}
          </div>
          <section>
            {menu.map((items) => (
              <NavLink
                to={items.link}
                key={items.title}
                style={({ isActive }) => {
                  return { background: isActive && "#556274" };
                }}
                className="flex text-white gap-8  px-3 py-4 mt-2   hover:border-t-4 hover:ease-in duration-300 hover:bg-slate-700 rounded-md"
              >
                <div className="text-2xl">{items.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnmation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="whitespace-nowrap text-white"
                    >
                      {items.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </section>
        </motion.div>
      </section>
    </>
  );
}

export default Sidebar;
