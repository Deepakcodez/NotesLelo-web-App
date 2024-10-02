import { useContext, useEffect, useRef, useState, MouseEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { Context, createGroupContext } from "../../Context";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

// Define the type for the user details prop
interface UserDetail {
  name: string;
  email: string;
}

interface NavbarProps {
  userDetail: UserDetail;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const location = useLocation();
  const urlLocation = location.pathname;
  const { name, email } = props.userDetail; // Destructure the props
  const [avatarSign, setAvatarSign] = useState<string | undefined>();
  const [ispopUp, setPopUp] = useState<boolean>(false);
  const { isCreateGroup, setCreateGroup } = useContext<any>(createGroupContext);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { joinGroup, setJoinGroup } = useContext<any>(createGroupContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      // Cast the event as MouseEvent
      const mouseEvent = e as unknown as MouseEvent;

      if (
        logoRef.current &&
        !logoRef.current.contains(mouseEvent.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(mouseEvent.target as Node)
      ) {
        setPopUp(false);
      }
    };
  
    window.addEventListener("click", handleClickOutside);
  
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const addHandler = () => {
    setPopUp(!ispopUp);
  };

  const createGroupHandler = () => {
    setCreateGroup(true);
  };

  const profileClick = () => {
    navigate("profile");
  };

  useEffect(() => {
    const firstCharacter = name ? name[0] : ""; // Check if name is defined
    const capitalAvatarcharacter = firstCharacter?.toUpperCase();
    setAvatarSign(capitalAvatarcharacter);
  }, [name]);

  return (
    <section
      className={`navbar ${
        urlLocation === "/group/demand" || urlLocation === "/group/notes"
          ? "hidden md:block"
          : ""
      }`}
    >
      <div
        style={{}}
        className="flex justify-between gap-3 py-4 items-center px-3 bg-slate-800 border-b-[1px] border-slate-700"
      >
        <NavLink to={"/"} className="font-bold text-xl text-white ">
          <img className="h-[1.5rem] ps-5" src={logo} alt="Logo" />
        </NavLink>{" "}
        <section className="rightnav flex items-center gap-3 relative ">
          <div ref={logoRef}>
            <GoPlus
              className="text-4xl text-white bg-transparent rounded-full p-[.2rem] hover:bg-slate-700"
              onClick={addHandler}
            />
          </div>

          {/* popup */}
          {ispopUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0, translateY: -50 }}
              animate={{ opacity: 1, scale: 1, translateY: 30 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              ref={popupRef}
              className="popup absolute z-30 bg-slate-500 text-white shadow-lg py-1 w-[10rem]  top-8 end-10 rounded-sm  "
            >
              <ul className="flex flex-col items-center">
                <li
                  className="hover:bg-slate-600 w-full py-3 cursor-pointer ps-4"
                  onClick={createGroupHandler}
                >
                  Create Group
                </li>
                <li
                  className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4"
                  onClick={() => setJoinGroup(true)}
                >
                  Join Group
                </li>
              </ul>
            </motion.div>
          )}

          <div
            onClick={profileClick}
            className="h-10 w-10 rounded-full bg-blue-300 items-center justify-center flex text-white font-semibold text-2xl"
          >
            {avatarSign}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Navbar;
