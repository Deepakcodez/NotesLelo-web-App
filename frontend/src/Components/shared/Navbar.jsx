import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { Context, createGroupContext } from "../../Context";

function Navbar(props) {
  const { name, email } = props.userDetail; //destructure the props(object) inner object calles userDetail
  // console.log('>>>>>>>>>>>name', name[0].toUpperCase())
  const [avatarSign, setAvatarSign] = useState();
  const [ispopUp, setPopUp] = useState(false);
  const {isCreateGroup,setCreateGroup} = useContext(createGroupContext)
  const logoRef = useRef();
  const popupRef = useRef();

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

  useEffect(() => {
    const firstCharacter = name ? name[0] : ""; // Check if name is defined
    const capitalAvatarcharacter =
      firstCharacter && firstCharacter.toUpperCase();
    // console.log(">>>>>>>>>>>", capitalAvatarcharacter);
    setAvatarSign(capitalAvatarcharacter);
  }, [name]);

  return (
    <section className="top  ">
      <div
        style={{}}
        className="flex justify-between gap-3 py-4 items-center px-3 bg-slate-800 border-b-[1px] border-slate-700"
      >
        <NavLink to={"/"} className="font-bold text-xl text-white ">
          <img src="/src/assets/logo.png" className="h-[2rem]"></img>{" "}
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
            <div
              ref={popupRef}
              className="popup absolute bg-slate-400 text-white shadow-lg py-4 w-[8rem]  top-8 end-10 rounded-sm  "
            >
              <ul className="flex flex-col items-center">
                <li className="hover:bg-slate-500 w-full cursor-pointer ps-4">
                  {" "}
                  <h1 onClick={createGroupHandler}>Create Group</h1>
                </li>
                <li className="hover:bg-slate-500 w-full cursor-pointer ps-4 ">
                  {" "}
                  <h1>Join Group</h1>
                </li>
              </ul>
            </div>
          )}

          <div className="h-10 w-10 rounded-full bg-blue-300 items-center justify-center flex  text-white font-semibold text-2xl ">
            {avatarSign}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Navbar;
