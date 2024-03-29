import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { Context, createGroupContext } from "../../Context";
import  logo from '../../assets/logo.png'
import {motion} from 'framer-motion'


function Navbar(props) {
  const location  = useLocation()
  const urlLocation = location.pathname
  const { name, email } = props.userDetail; //destructure the props(object) inner object calles userDetail
  // console.log('>>>>>>>>>>>name', name[0].toUpperCase())
  const [avatarSign, setAvatarSign] = useState();
  const [ispopUp, setPopUp] = useState(false);
  const {isCreateGroup,setCreateGroup} = useContext(createGroupContext)
  const logoRef = useRef();
  const popupRef = useRef();
  const {joinGroup,setJoinGroup} = useContext(createGroupContext)

  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!logoRef.current.contains(e.target) && popupRef.current) {
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
const createGroupHandler=()=>{
  setCreateGroup(true)
}
const profileClick=()=>{
  navigate("profile")
}

  useEffect(() => {
    const firstCharacter = name ? name[0] : ""; // Check if name is defined
    const capitalAvatarcharacter =
      firstCharacter && firstCharacter.toUpperCase();
    // console.log(">>>>>>>>>>>", capitalAvatarcharacter);
    setAvatarSign(capitalAvatarcharacter);
  }, [name]);

  return (
    <section className={`navbar ${urlLocation === "/group/demand" || urlLocation === "/group/notes" ? "hidden md:block" : ""}`}> 

      <div
        style={{}}
        className="flex justify-between gap-3 py-4 items-center px-3 bg-slate-800 border-b-[1px] border-slate-700"
      >
        <NavLink to={"/"} className="font-bold text-xl text-white ">
        <img className="h-[1.5rem] ps-5" src={logo} alt="Logo" />
        </NavLink>{" "}
        <section className="rightnav flex items-center gap-3 relative ">
          <div ref={logoRef}   >
            <GoPlus
              className="text-4xl text-white bg-transparent rounded-full p-[.2rem] hover:bg-slate-700"
              onClick={addHandler}
             
            />
          </div>

          {/* popup */}
          {ispopUp && (
            <motion.div
            initial={{ opacity: 0, scale: 0 ,translateY:-50}}
            animate={{ opacity: 1, scale: 1 , translateY:30 ,}}
            transition={{ type: "spring", stiffness: 500, damping: 25 ,}}
              ref={popupRef}
              className="popup absolute z-30 bg-slate-500 text-white shadow-lg py-1 w-[10rem]  top-8 end-10 rounded-sm  "
            >
              <ul className="flex flex-col items-center">
                <li className="hover:bg-slate-600 w-full py-3 cursor-pointer ps-4">
                  {" "}
                  <h1 onClick={createGroupHandler}>Create Group</h1>
                </li>
                <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4 ">
                  {" "}
                  <h1 onClick={()=>setJoinGroup(true)}>Join Group</h1>
                </li>
              </ul>
            </motion.div>
          )}

          <div
          onClick={profileClick}
          className="h-10 w-10 rounded-full bg-blue-300 items-center justify-center flex  text-white font-semibold text-2xl ">
            {avatarSign}
          </div>
        </section>
      </div>
      
    </section>
  );
}

export default Navbar;
